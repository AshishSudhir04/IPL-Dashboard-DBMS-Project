# IPL Dashboard Backend

Backend API server for IPL Dashboard with MySQL database integration.

## Prerequisites

- Node.js (v18 or higher)
- MySQL Server (v8.0 or higher)
- npm or yarn

## Setup Instructions

### 1. Install MySQL

If you don't have MySQL installed:
- Download from: https://dev.mysql.com/downloads/mysql/
- Install and remember your root password

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ipl_dashboard
DB_PORT=3306

PORT=3001
```

### 4. Initialize Database

This will create the database and tables:

```bash
npm run init-db
```

### 5. Load CSV Data

This will import all CSV data into MySQL:

```bash
npm run load-data
```

### 6. Start the Server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### Matches

- `GET /api/matches` - Get all matches
- `GET /api/matches/:id` - Get match by ID
- `GET /api/matches/recent/:limit` - Get recent matches
- `GET /api/matches/team/:teamName` - Get matches by team
- `GET /api/matches/stats/overview` - Get match statistics overview

### Deliveries

- `GET /api/deliveries/match/:matchNo` - Get deliveries by match number
- `GET /api/deliveries/batsman/:batsmanName` - Get deliveries by batsman
- `GET /api/deliveries/bowler/:bowlerName` - Get deliveries by bowler
- `GET /api/deliveries/match/:matchNo/overs` - Get over-by-over summary
- `GET /api/deliveries/match/:matchNo/commentary` - Get ball-by-ball commentary

### Statistics

- `GET /api/stats/orange-cap` - Get Orange Cap standings (top batsmen)
- `GET /api/stats/purple-cap` - Get Purple Cap standings (top bowlers)
- `GET /api/stats/top-scorers/:limit` - Get top run scorers
- `GET /api/stats/top-wicket-takers/:limit` - Get top wicket takers
- `GET /api/stats/team/:teamName` - Get team statistics
- `GET /api/stats/player/:playerName` - Get player statistics
- `GET /api/stats/venue/:venueName` - Get venue statistics

### Health Check

- `GET /api/health` - Check if API is running

## Database Schema

### Tables

1. **matches** - Match details
2. **deliveries** - Ball-by-ball data
3. **orange_cap** - Top batsmen rankings
4. **purple_cap** - Top bowlers rankings

## Troubleshooting

### MySQL Connection Issues

If you get connection errors:
1. Ensure MySQL server is running
2. Verify credentials in `.env` file
3. Check if port 3306 is available
4. Grant necessary permissions to your MySQL user

### Port Already in Use

If port 3001 is busy:
1. Change `PORT` in `.env` file
2. Update frontend API URL accordingly

### Data Loading Issues

If CSV import fails:
1. Verify CSV files exist in `../public/data/`
2. Check file permissions
3. Ensure database is initialized (`npm run init-db`)

## Technologies Used

- **Express.js** - Web framework
- **MySQL2** - MySQL client
- **csv-parser** - CSV file parsing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management
