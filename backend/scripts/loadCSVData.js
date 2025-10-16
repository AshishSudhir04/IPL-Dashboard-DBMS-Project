import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import csv from 'csv-parser';
import pool from '../config/database.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, '../../public/data');

const loadMatches = async () => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(join(dataPath, 'matches.csv'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          console.log(`📊 Loading ${results.length} matches...`);
          
          // Clear existing data
          await pool.query('DELETE FROM matches');
          
          for (const row of results) {
            await pool.query(`
              INSERT INTO matches (
                match_id, date, venue, team1, team2, stage, toss_winner, 
                toss_decision, first_ings_score, first_ings_wkts, second_ings_score, 
                second_ings_wkts, match_result, match_winner, wb_runs, wb_wickets, 
                balls_left, player_of_the_match, top_scorer, highscore, 
                best_bowling, best_bowling_figure
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
              row.match_id,
              row.date,
              row.venue,
              row.team1,
              row.team2,
              row.stage,
              row.toss_winner,
              row.toss_decision,
              row.first_ings_score || null,
              row.first_ings_wkts || null,
              row.second_ings_score || null,
              row.second_ings_wkts || null,
              row.match_result,
              row.match_winner,
              row.wb_runs || null,
              row.wb_wickets || null,
              row.balls_left || null,
              row.player_of_the_match,
              row.top_scorer,
              row.highscore || null,
              row.best_bowling,
              row.best_bowling_figure
            ]);
          }
          console.log('✅ Matches loaded successfully');
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
};

const loadDeliveries = async () => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(join(dataPath, 'deliveries.csv'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          console.log(`📊 Loading ${results.length} deliveries...`);
          
          // Clear existing data
          await pool.query('DELETE FROM deliveries');
          
          // Insert in batches for performance
          const batchSize = 1000;
          for (let i = 0; i < results.length; i += batchSize) {
            const batch = results.slice(i, i + batchSize);
            const values = batch.map(row => [
              row.match_no,
              row.date,
              row.stage,
              row.venue,
              row.batting_team,
              row.bowling_team,
              row.innings,
              row.over,
              row.striker,
              row.bowler,
              row.runs_of_bat || 0,
              row.extras || 0,
              row.wide || 0,
              row.legbyes || 0,
              row.byes || 0,
              row.noballs || 0,
              row.wicket_type || null,
              row.player_dismissed || null,
              row.fielder || null
            ]);
            
            await pool.query(`
              INSERT INTO deliveries (
                match_no, date, stage, venue, batting_team, bowling_team, 
                innings, over_no, striker, bowler, runs_of_bat, extras, 
                wide, legbyes, byes, noballs, wicket_type, player_dismissed, fielder
              ) VALUES ?
            `, [values]);
            
            console.log(`  Loaded ${Math.min(i + batchSize, results.length)} / ${results.length} deliveries`);
          }
          
          console.log('✅ Deliveries loaded successfully');
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
};

const loadOrangeCap = async () => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(join(dataPath, 'orange_cap.csv'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          console.log(`📊 Loading ${results.length} orange cap entries...`);
          
          // Clear existing data
          await pool.query('DELETE FROM orange_cap');
          
          for (const row of results) {
            await pool.query(`
              INSERT INTO orange_cap (
                position, batsman, team, matches, innings, not_out, runs, 
                highest_score, average, balls_faced, strike_rate, hundreds, 
                fifties, ducks, fours, sixes
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
              row.Position,
              row.Batsman,
              row.Team,
              row.Matches,
              row.Innings,
              row.Not_out,
              row.Runs,
              row.Highest_score,
              row.Average,
              row.Balls_faced,
              row.Strike_rate,
              row.Hundreds,
              row.Fifties,
              row.Ducks,
              row.Fours,
              row.Sixes
            ]);
          }
          console.log('✅ Orange cap data loaded successfully');
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
};

const loadPurpleCap = async () => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(join(dataPath, 'purple_cap.csv'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          console.log(`📊 Loading ${results.length} purple cap entries...`);
          
          // Clear existing data
          await pool.query('DELETE FROM purple_cap');
          
          for (const row of results) {
            await pool.query(`
              INSERT INTO purple_cap (
                position, bowler, team, matches, innings, balls, overs, 
                maidens, runs, wickets, best_bowling_figure, economy_rate, 
                four_wicket_haul, five_wicket_hall
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
              row.Position,
              row.Bowler,
              row.Team,
              row.Matches,
              row.Innings,
              row.Balls,
              row.Overs,
              row.Maidens,
              row.Runs,
              row.Wickets,
              row.Best_bowling_figure,
              row.Economy_rate,
              row.Four_wicket_haul,
              row.Five_wicket_hall
            ]);
          }
          console.log('✅ Purple cap data loaded successfully');
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
};

const loadAllData = async () => {
  try {
    console.log('🚀 Starting data load...\n');
    
    await loadMatches();
    await loadDeliveries();
    await loadOrangeCap();
    await loadPurpleCap();
    
    console.log('\n🎉 All data loaded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error loading data:', error);
    process.exit(1);
  }
};

loadAllData();
