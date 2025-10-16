// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function for API calls
const fetchAPI = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

// Match APIs
export const matchesAPI = {
  getAll: () => fetchAPI('/matches'),
  getById: (id: number) => fetchAPI(`/matches/${id}`),
  getRecent: (limit: number = 10) => fetchAPI(`/matches/recent/${limit}`),
  getByTeam: (teamName: string) => fetchAPI(`/matches/team/${teamName}`),
  getStats: () => fetchAPI('/matches/stats/overview'),
};

// Delivery APIs
export const deliveriesAPI = {
  getByMatch: (matchNo: number) => fetchAPI(`/deliveries/match/${matchNo}`),
  getByBatsman: (batsmanName: string) => fetchAPI(`/deliveries/batsman/${batsmanName}`),
  getByBowler: (bowlerName: string) => fetchAPI(`/deliveries/bowler/${bowlerName}`),
  getOversByMatch: (matchNo: number) => fetchAPI(`/deliveries/match/${matchNo}/overs`),
  getCommentary: (matchNo: number) => fetchAPI(`/deliveries/match/${matchNo}/commentary`),
};

// Stats APIs
export const statsAPI = {
  getOrangeCap: () => fetchAPI('/stats/orange-cap'),
  getPurpleCap: () => fetchAPI('/stats/purple-cap'),
  getTopScorers: (limit: number = 10) => fetchAPI(`/stats/top-scorers/${limit}`),
  getTopWicketTakers: (limit: number = 10) => fetchAPI(`/stats/top-wicket-takers/${limit}`),
  getTeamStats: (teamName: string) => fetchAPI(`/stats/team/${teamName}`),
  getPlayerStats: (playerName: string) => fetchAPI(`/stats/player/${playerName}`),
  getVenueStats: (venueName: string) => fetchAPI(`/stats/venue/${venueName}`),
};

// Health check
export const healthCheck = () => fetchAPI('/health');
