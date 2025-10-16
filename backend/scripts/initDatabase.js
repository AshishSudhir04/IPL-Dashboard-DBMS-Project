import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const createDatabase = async () => {
  try {
    // Connect without database to create it
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '#Manpetrol7',
      port: process.env.DB_PORT || 3306
    });

    console.log('Connected to MySQL server');

    // Create database
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'ipl_dashboard'}`);
    console.log(`✅ Database '${process.env.DB_NAME || 'ipl_dashboard'}' created or already exists`);

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME || 'ipl_dashboard'}`);

    // Drop existing tables to recreate with new schema
    await connection.query(`DROP TABLE IF EXISTS matches`);
    await connection.query(`DROP TABLE IF EXISTS deliveries`);
    await connection.query(`DROP TABLE IF EXISTS orange_cap`);
    await connection.query(`DROP TABLE IF EXISTS purple_cap`);

    // Create matches table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS matches (
        match_id INT PRIMARY KEY,
        date VARCHAR(50),
        venue VARCHAR(200),
        team1 VARCHAR(50),
        team2 VARCHAR(50),
        stage VARCHAR(50),
        toss_winner VARCHAR(50),
        toss_decision VARCHAR(20),
        first_ings_score INT,
        first_ings_wkts INT,
        second_ings_score INT,
        second_ings_wkts INT,
        match_result VARCHAR(50),
        match_winner VARCHAR(50),
        wb_runs VARCHAR(20),
        wb_wickets VARCHAR(20),
        balls_left INT,
        player_of_the_match VARCHAR(100),
        top_scorer VARCHAR(100),
        highscore INT,
        best_bowling VARCHAR(100),
        best_bowling_figure VARCHAR(20)
      )
    `);
    console.log('✅ Table "matches" created');

    // Create deliveries table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS deliveries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        match_no INT,
        date VARCHAR(50),
        stage VARCHAR(50),
        venue VARCHAR(200),
        batting_team VARCHAR(50),
        bowling_team VARCHAR(50),
        innings INT,
        over_no DECIMAL(3,1),
        striker VARCHAR(100),
        bowler VARCHAR(100),
        runs_of_bat INT,
        extras INT,
        wide INT,
        legbyes INT,
        byes INT,
        noballs INT,
        wicket_type VARCHAR(50),
        player_dismissed VARCHAR(100),
        fielder VARCHAR(100),
        INDEX idx_match (match_no),
        INDEX idx_batting_team (batting_team),
        INDEX idx_bowler (bowler),
        INDEX idx_striker (striker)
      )
    `);
    console.log('✅ Table "deliveries" created');

    // Create orange_cap table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orange_cap (
        position INT PRIMARY KEY,
        batsman VARCHAR(100),
        team VARCHAR(50),
        matches INT,
        innings INT,
        not_out INT,
        runs INT,
        highest_score VARCHAR(20),
        average DECIMAL(6,2),
        balls_faced INT,
        strike_rate DECIMAL(6,2),
        hundreds INT,
        fifties INT,
        ducks INT,
        fours INT,
        sixes INT
      )
    `);
    console.log('✅ Table "orange_cap" created');

    // Create purple_cap table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS purple_cap (
        position INT PRIMARY KEY,
        bowler VARCHAR(100),
        team VARCHAR(50),
        matches INT,
        innings INT,
        balls INT,
        overs DECIMAL(5,1),
        maidens INT,
        runs INT,
        wickets INT,
        best_bowling_figure VARCHAR(20),
        economy_rate DECIMAL(5,2),
        four_wicket_haul INT,
        five_wicket_hall INT
      )
    `);
    console.log('✅ Table "purple_cap" created');

    await connection.end();
    console.log('\n🎉 Database initialization completed successfully!');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

createDatabase();
