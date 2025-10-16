import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Get deliveries by match number
router.get('/match/:matchNo', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM deliveries WHERE match_no = ? ORDER BY innings, over_no',
      [req.params.matchNo]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    res.status(500).json({ error: 'Failed to fetch deliveries' });
  }
});

// Get deliveries by batsman
router.get('/batsman/:batsmanName', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM deliveries WHERE striker = ? ORDER BY match_no, over_no',
      [req.params.batsmanName]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching batsman deliveries:', error);
    res.status(500).json({ error: 'Failed to fetch batsman deliveries' });
  }
});

// Get deliveries by bowler
router.get('/bowler/:bowlerName', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM deliveries WHERE bowler = ? ORDER BY match_no, over_no',
      [req.params.bowlerName]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching bowler deliveries:', error);
    res.status(500).json({ error: 'Failed to fetch bowler deliveries' });
  }
});

// Get over-by-over summary for a match
router.get('/match/:matchNo/overs', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        innings,
        FLOOR(over_no) as over_number,
        batting_team,
        bowling_team,
        SUM(runs_of_bat + extras) as runs,
        COUNT(CASE WHEN wicket_type IS NOT NULL AND wicket_type != '' THEN 1 END) as wickets
      FROM deliveries
      WHERE match_no = ?
      GROUP BY innings, FLOOR(over_no), batting_team, bowling_team
      ORDER BY innings, over_number
    `, [req.params.matchNo]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching over summary:', error);
    res.status(500).json({ error: 'Failed to fetch over summary' });
  }
});

// Get ball-by-ball commentary for a match
router.get('/match/:matchNo/commentary', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        innings,
        over_no,
        striker,
        bowler,
        runs_of_bat,
        extras,
        wide,
        noballs,
        wicket_type,
        player_dismissed,
        fielder
      FROM deliveries
      WHERE match_no = ?
      ORDER BY innings, over_no
    `, [req.params.matchNo]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching commentary:', error);
    res.status(500).json({ error: 'Failed to fetch commentary' });
  }
});

export default router;
