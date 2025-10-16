# IPL Dashboard - DBMS Project

A full-stack cricket dashboard application displaying IPL 2025 match data, statistics, and ball-by-ball commentary using MySQL database.

## 🎯 Project Overview

This is a Database Management System (DBMS) project that demonstrates:
- Full-stack web application development
- MySQL database integration
- RESTful API design
- Data visualization and analytics
- Real-time cricket statistics

## ⚡ Quick Links

- **[Quick Start Guide](QUICK_START.md)** - Get up and running in 5 minutes
- **[Complete Setup Guide](SETUP_GUIDE.md)** - Detailed installation instructions
- **[Backend API Documentation](backend/README.md)** - API endpoints reference

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b62911e3-2276-4d0f-b2b1-f0a74be3fc63) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **shadcn/ui** - Component library
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **mysql2** - MySQL driver
- **csv-parser** - CSV data import
- **CORS** - Cross-origin requests

## 📊 Features

✅ **Match Dashboard** - View all IPL matches with detailed information  
✅ **Live Statistics** - Orange Cap & Purple Cap leaderboards  
✅ **Ball-by-Ball Commentary** - Detailed delivery data for each match  
✅ **Player Stats** - Batting and bowling performance analytics  
✅ **MySQL Integration** - All data stored in relational database  
✅ **RESTful API** - Clean API architecture for data access  
✅ **Responsive Design** - Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL (v8.0+)
- npm or yarn

### Installation

See **[QUICK_START.md](QUICK_START.md)** for step-by-step instructions.

**TL;DR:**
```bash
# 1. Setup backend
cd backend
npm install
# Edit .env with your MySQL password
npm run init-db
npm run load-data
npm start

# 2. Setup frontend (new terminal)
cd ..
npm install
npm run dev
```

Visit: http://localhost:5173

## 📁 Project Structure

```
ipl-dash-buzz-main/
├── backend/              # Express.js + MySQL backend
│   ├── config/          # Database configuration
│   ├── routes/          # API route handlers
│   ├── scripts/         # DB initialization & data loading
│   └── server.js        # Main server file
├── src/                 # React frontend
│   ├── components/      # UI components
│   ├── services/        # API service layer
│   └── ...
├── public/data/         # CSV source files
│   ├── matches.csv
│   ├── deliveries.csv
│   ├── orange_cap.csv
│   └── purple_cap.csv
└── ...
```

## 🗄️ Database Schema

### Tables
1. **matches** - Match information (venue, teams, scores, winner)
2. **deliveries** - Ball-by-ball data (~17K records)
3. **orange_cap** - Top batsmen rankings
4. **purple_cap** - Top bowlers rankings

## 🔌 API Endpoints

**Matches**
- `GET /api/matches` - All matches
- `GET /api/matches/:id` - Single match details
- `GET /api/matches/team/:name` - Team-specific matches

**Statistics**
- `GET /api/stats/orange-cap` - Top batsmen
- `GET /api/stats/purple-cap` - Top bowlers
- `GET /api/stats/player/:name` - Player statistics

**Deliveries**
- `GET /api/deliveries/match/:id` - Ball-by-ball data
- `GET /api/deliveries/match/:id/commentary` - Match commentary

[Full API Documentation](backend/README.md)

## 📝 License

This is an educational project for DBMS coursework.

## 👨‍💻 Development

Made with ❤️ using React, Express, and MySQL
