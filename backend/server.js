import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import matchesRouter from './routes/matches.js';
import deliveriesRouter from './routes/deliveries.js';
import statsRouter from './routes/stats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/matches', matchesRouter);
app.use('/api/deliveries', deliveriesRouter);
app.use('/api/stats', statsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'IPL Dashboard API is running' });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'IPL Dashboard API',
    version: '1.0.0',
    endpoints: {
      matches: '/api/matches',
      deliveries: '/api/deliveries',
      stats: '/api/stats',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});
