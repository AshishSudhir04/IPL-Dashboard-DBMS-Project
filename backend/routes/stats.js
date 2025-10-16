import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Get Orange Cap standings
router.get('/orange-cap', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orange_cap ORDER BY position');
    // Convert string fields to numbers where needed
    const formatted = rows.map(row => ({
      ...row,
      position: parseInt(row.position),
      matches: parseInt(row.matches),
      innings: parseInt(row.innings),
      not_out: parseInt(row.not_out),
      runs: parseInt(row.runs),
      average: parseFloat(row.average),
      balls_faced: parseInt(row.balls_faced),
      strike_rate: parseFloat(row.strike_rate),
      hundreds: parseInt(row.hundreds),
      fifties: parseInt(row.fifties),
      ducks: parseInt(row.ducks),
      fours: parseInt(row.fours),
      sixes: parseInt(row.sixes)
    }));
    res.json(formatted);
  } catch (error) {
    console.error('Error fetching orange cap:', error);
    res.status(500).json({ error: 'Failed to fetch orange cap data' });
  }
});

// Get Purple Cap standings
router.get('/purple-cap', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM purple_cap ORDER BY position');
    // Convert string fields to numbers where needed
    const formatted = rows.map(row => ({
      ...row,
      position: parseInt(row.position),
      matches: parseInt(row.matches),
      innings: parseInt(row.innings),
      balls: parseInt(row.balls),
      overs: parseFloat(row.overs),
      maidens: parseInt(row.maidens),
      runs: parseInt(row.runs),
      wickets: parseInt(row.wickets),
      economy_rate: parseFloat(row.economy_rate),
      four_wicket_haul: parseInt(row.four_wicket_haul),
      five_wicket_hall: parseInt(row.five_wicket_hall)
    }));
    res.json(formatted);
  } catch (error) {
    console.error('Error fetching purple cap:', error);
    res.status(500).json({ error: 'Failed to fetch purple cap data' });
  }
});

// Get top run scorers (from orange cap)
router.get('/top-scorers/:limit?', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 10;
    const [rows] = await pool.query('SELECT * FROM orange_cap ORDER BY runs DESC LIMIT ?', [limit]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching top scorers:', error);
    res.status(500).json({ error: 'Failed to fetch top scorers' });
  }
});

// Get top wicket takers (from purple cap)
router.get('/top-wicket-takers/:limit?', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 10;
    const [rows] = await pool.query('SELECT * FROM purple_cap ORDER BY wickets DESC LIMIT ?', [limit]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching top wicket takers:', error);
    res.status(500).json({ error: 'Failed to fetch top wicket takers' });
  }
});

// Get team-wise statistics from matches
router.get('/team/:teamName', async (req, res) => {
  try {
    const teamName = req.params.teamName;
    
    const [matches] = await pool.query(`
      SELECT 
        COUNT(*) as played,
        SUM(CASE WHEN match_winner = ? THEN 1 ELSE 0 END) as won,
        SUM(CASE WHEN (team1 = ? OR team2 = ?) AND match_winner != ? AND match_result = 'completed' THEN 1 ELSE 0 END) as lost
      FROM matches
      WHERE team1 = ? OR team2 = ?
    `, [teamName, teamName, teamName, teamName, teamName, teamName]);
    
    res.json(matches[0]);
  } catch (error) {
    console.error('Error fetching team stats:', error);
    res.status(500).json({ error: 'Failed to fetch team statistics' });
  }
});

// Get player statistics from deliveries
router.get('/player/:playerName', async (req, res) => {
  try {
    const playerName = req.params.playerName;
    
    // Batting stats
    const [battingStats] = await pool.query(`
      SELECT 
        COUNT(DISTINCT match_no) as matches,
        SUM(runs_of_bat) as runs,
        COUNT(*) as balls_faced,
        ROUND(SUM(runs_of_bat) * 100.0 / COUNT(*), 2) as strike_rate,
        SUM(CASE WHEN runs_of_bat = 4 THEN 1 ELSE 0 END) as fours,
        SUM(CASE WHEN runs_of_bat = 6 THEN 1 ELSE 0 END) as sixes
      FROM deliveries
      WHERE striker = ?
    `, [playerName]);
    
    // Bowling stats
    const [bowlingStats] = await pool.query(`
      SELECT 
        COUNT(DISTINCT match_no) as matches,
        COUNT(*) as balls_bowled,
        SUM(runs_of_bat + extras) as runs_conceded,
        COUNT(CASE WHEN wicket_type IS NOT NULL AND wicket_type != '' THEN 1 END) as wickets,
        ROUND(SUM(runs_of_bat + extras) * 6.0 / COUNT(*), 2) as economy_rate
      FROM deliveries
      WHERE bowler = ?
    `, [playerName]);
    
    res.json({
      batting: battingStats[0],
      bowling: bowlingStats[0]
    });
  } catch (error) {
    console.error('Error fetching player stats:', error);
    res.status(500).json({ error: 'Failed to fetch player statistics' });
  }
});

// Get venue statistics
router.get('/venue/:venueName', async (req, res) => {
  try {
    const venueName = req.params.venueName;
    
    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as matches_played,
        AVG(first_ings_score) as avg_first_innings,
        AVG(second_ings_score) as avg_second_innings,
        MAX(first_ings_score) as highest_score
      FROM matches
      WHERE venue = ?
    `, [venueName]);
    
    res.json(stats[0]);
  } catch (error) {
    console.error('Error fetching venue stats:', error);
    res.status(500).json({ error: 'Failed to fetch venue statistics' });
  }
});

export default router;
