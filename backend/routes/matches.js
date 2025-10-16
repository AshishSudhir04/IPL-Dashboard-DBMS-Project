import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Get all matches
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM matches ORDER BY match_id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// Get match by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM matches WHERE match_id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching match:', error);
    res.status(500).json({ error: 'Failed to fetch match' });
  }
});

// Get recent matches (limit)
router.get('/recent/:limit', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 10;
    const [rows] = await pool.query('SELECT * FROM matches ORDER BY match_id DESC LIMIT ?', [limit]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching recent matches:', error);
    res.status(500).json({ error: 'Failed to fetch recent matches' });
  }
});

// Get matches by team
router.get('/team/:teamName', async (req, res) => {
  try {
    const teamName = req.params.teamName;
    const [rows] = await pool.query(
      'SELECT * FROM matches WHERE team1 = ? OR team2 = ? ORDER BY match_id DESC',
      [teamName, teamName]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching team matches:', error);
    res.status(500).json({ error: 'Failed to fetch team matches' });
  }
});

// Get match statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const [totalMatches] = await pool.query('SELECT COUNT(*) as total FROM matches');
    const [teams] = await pool.query('SELECT DISTINCT team1 FROM matches');
    const [venues] = await pool.query('SELECT DISTINCT venue FROM matches');
    
    res.json({
      totalMatches: totalMatches[0].total,
      totalTeams: teams.length,
      totalVenues: venues.length
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;
