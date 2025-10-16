# 🚀 Quick Start - IPL Dashboard

## One-Time Setup (First Time Only)

### 1. Configure MySQL Password

Edit `backend/.env` file:
```env
DB_PASSWORD=your_mysql_password
```

### 2. Install & Setup Backend

```bash
cd backend
npm install
npm run init-db
npm run load-data
```

### 3. Install Frontend

```bash
cd ..
npm install
```

---

## Running the Application (Every Time)

### Terminal 1 - Start Backend
```bash
cd backend
npm start
```
✅ Backend runs on: http://localhost:3001

### Terminal 2 - Start Frontend
```bash
npm run dev
```
✅ Frontend runs on: http://localhost:5173

---

## Access the Dashboard

Open browser: **http://localhost:5173**

---

## Verify Everything Works

### Check Backend
Visit: http://localhost:3001/api/health

Should show: `{"status":"OK","message":"IPL Dashboard API is running"}`

### Check Data
Visit: http://localhost:3001/api/matches

Should show JSON array of matches

---

## Troubleshooting

**Problem**: Can't connect to database
- ✅ MySQL is running
- ✅ Password in `backend/.env` is correct
- ✅ Run `npm run init-db` in backend folder

**Problem**: Frontend shows error
- ✅ Backend is running (Terminal 1)
- ✅ Check http://localhost:3001/api/health

**Problem**: No data showing
- ✅ Run `npm run load-data` in backend folder

---

## Project Structure
```
📁 backend/          → Express API + MySQL
📁 src/              → React Frontend
📁 public/data/      → CSV Source Files
```

---

## Common Commands

```bash
# Backend
cd backend
npm start              # Start server
npm run load-data      # Reload CSV data

# Frontend  
npm run dev            # Start dev server
npm run build          # Build for production
```

---

## Database Info

- **Database**: `ipl_dashboard`
- **Tables**: `matches`, `deliveries`, `orange_cap`, `purple_cap`
- **Data**: 75 matches, 17K+ deliveries, 16 top batsmen, 16 top bowlers

---

## API Endpoints Quick Reference

- `/api/matches` - All matches
- `/api/deliveries/match/:id` - Ball-by-ball data
- `/api/stats/orange-cap` - Top batsmen
- `/api/stats/purple-cap` - Top bowlers

Full API docs: See `backend/README.md`

---

**For detailed setup:** See `SETUP_GUIDE.md`
