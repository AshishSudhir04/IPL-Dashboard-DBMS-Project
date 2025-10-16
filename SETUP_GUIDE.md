# IPL Dashboard - Complete Setup Guide

This project is a full-stack IPL Cricket Dashboard using **React (Frontend)**, **Express.js (Backend)**, and **MySQL (Database)**.

## 📋 Prerequisites

Before starting, ensure you have:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MySQL Server** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
3. **npm** or **yarn** package manager
4. **Git** (optional)

---

## 🚀 Quick Start

### Step 1: Install MySQL

1. Download and install MySQL from the official website
2. During installation, set a root password (remember this!)
3. Verify installation by opening terminal/PowerShell and running:
   ```bash
   mysql --version
   ```

### Step 2: Backend Setup

#### 2.1 Install Backend Dependencies

Open terminal in the project root and run:

```bash
cd backend
npm install
```

#### 2.2 Configure Database Connection

Create a `.env` file in the `backend` folder:

```bash
# Windows PowerShell
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit the `.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=ipl_dashboard
DB_PORT=3306

PORT=3001
```

**⚠️ Important**: Replace `your_mysql_password_here` with your actual MySQL root password.

#### 2.3 Initialize Database

Run this command to create the database and tables:

```bash
npm run init-db
```

You should see:
```
✅ Database 'ipl_dashboard' created or already exists
✅ Table "matches" created
✅ Table "deliveries" created
✅ Table "orange_cap" created
✅ Table "purple_cap" created
```

#### 2.4 Load CSV Data into MySQL

Import all CSV data from `public/data/` into the database:

```bash
npm run load-data
```

This will:
- Load ~75 matches
- Load ~17,000 deliveries (ball-by-ball data)
- Load Orange Cap (top batsmen) data
- Load Purple Cap (top bowlers) data

**Note**: This may take 1-2 minutes depending on your system.

#### 2.5 Start Backend Server

```bash
npm start
```

The backend API will run on `http://localhost:3001`

**Verify it's working**: Open browser and go to `http://localhost:3001/api/health`

You should see: `{"status":"OK","message":"IPL Dashboard API is running"}`

---

### Step 3: Frontend Setup

Open a **NEW terminal window** (keep backend running) and navigate to project root:

#### 3.1 Install Frontend Dependencies

```bash
npm install
```

#### 3.2 Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 🎉 Access the Application

Open your browser and visit: **http://localhost:5173**

You should see the IPL Dashboard with:
- Live matches list
- Orange Cap (top batsmen) leaderboard
- Purple Cap (top bowlers) leaderboard
- Ball-by-ball commentary
- Match scorecards

---

## 📁 Project Structure

```
ipl-dash-buzz-main/
│
├── backend/                 # Backend API (Express + MySQL)
│   ├── config/             # Database configuration
│   ├── routes/             # API endpoints
│   ├── scripts/            # Database initialization & data loading
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env                # Database credentials (create this)
│
├── src/                    # Frontend (React + TypeScript)
│   ├── components/         # React components
│   ├── services/           # API service layer
│   └── ...
│
├── public/
│   └── data/               # CSV files (source data)
│       ├── matches.csv
│       ├── deliveries.csv
│       ├── orange_cap.csv
│       └── purple_cap.csv
│
└── package.json            # Frontend dependencies
```

---

## 🔌 API Endpoints

Once backend is running, these endpoints are available:

### Matches
- `GET /api/matches` - All matches
- `GET /api/matches/:id` - Single match
- `GET /api/matches/recent/:limit` - Recent matches
- `GET /api/matches/team/:teamName` - Team matches
- `GET /api/matches/stats/overview` - Match statistics

### Deliveries (Ball-by-Ball)
- `GET /api/deliveries/match/:matchNo` - Match deliveries
- `GET /api/deliveries/batsman/:name` - Batsman deliveries
- `GET /api/deliveries/bowler/:name` - Bowler deliveries
- `GET /api/deliveries/match/:matchNo/overs` - Over summary
- `GET /api/deliveries/match/:matchNo/commentary` - Commentary

### Statistics
- `GET /api/stats/orange-cap` - Top batsmen
- `GET /api/stats/purple-cap` - Top bowlers
- `GET /api/stats/top-scorers/:limit` - Top scorers
- `GET /api/stats/top-wicket-takers/:limit` - Top wicket takers
- `GET /api/stats/team/:teamName` - Team stats
- `GET /api/stats/player/:playerName` - Player stats
- `GET /api/stats/venue/:venueName` - Venue stats

---

## 🛠️ Troubleshooting

### Backend Issues

**Problem**: `Database connection failed`
- **Solution**: Check MySQL is running and credentials in `.env` are correct
- Verify MySQL service: 
  - Windows: Services → MySQL → Start
  - Mac: `brew services start mysql`

**Problem**: `Port 3001 already in use`
- **Solution**: Change `PORT` in `backend/.env` to another port (e.g., 3002)
- Update frontend API URL if needed

**Problem**: `Error loading CSV data`
- **Solution**: Ensure CSV files exist in `public/data/`
- Run `npm run init-db` first before `npm run load-data`

### Frontend Issues

**Problem**: `Failed to load matches`
- **Solution**: Ensure backend is running on port 3001
- Check browser console for errors
- Verify backend health: `http://localhost:3001/api/health`

**Problem**: `Port 5173 already in use`
- **Solution**: Stop other Vite servers or change port in `vite.config.ts`

---

## 📊 Database Schema

### Tables Created

1. **matches** - Match details (75 rows)
   - Match ID, date, venue, teams, scores, winner, etc.

2. **deliveries** - Ball-by-ball data (~17,000 rows)
   - Match number, over, batsman, bowler, runs, wickets, etc.

3. **orange_cap** - Top batsmen rankings (16 rows)
   - Position, runs, average, strike rate, etc.

4. **purple_cap** - Top bowlers rankings (16 rows)
   - Position, wickets, economy, best figures, etc.

---

## 🔄 Reloading Data

If you need to reload CSV data:

```bash
cd backend
npm run load-data
```

This will clear existing data and reload from CSV files.

---

## 📝 Development Scripts

### Backend
```bash
cd backend
npm start        # Start server
npm run dev      # Start with auto-reload
npm run init-db  # Initialize database
npm run load-data # Load CSV data
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run linter
```

---

## 🎯 Key Features

- ✅ MySQL database integration
- ✅ RESTful API with Express.js
- ✅ React frontend with TypeScript
- ✅ Real-time match data display
- ✅ Player leaderboards (Orange & Purple Cap)
- ✅ Ball-by-ball commentary
- ✅ Match scorecards with player stats
- ✅ Modern UI with shadcn/ui components
- ✅ Responsive design

---

## 🆘 Need Help?

1. Check that MySQL service is running
2. Verify all dependencies are installed (`npm install`)
3. Ensure `.env` file exists in `backend/` with correct credentials
4. Run database initialization before loading data
5. Keep both backend and frontend servers running simultaneously

---

## 📚 Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- Lucide Icons

### Backend
- Node.js
- Express.js
- MySQL2
- csv-parser
- CORS
- dotenv

### Database
- MySQL 8.0

---

## 🎓 Project Purpose

This is a **DBMS Project** demonstrating:
- Database design and normalization
- SQL queries and operations
- Full-stack web development
- API development
- Data visualization
- Modern web technologies

---

**Happy Coding! 🚀**
