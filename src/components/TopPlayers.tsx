import { useState, useEffect } from "react";

export const TopPlayers = () => {
  const [orangeCap, setOrangeCap] = useState<any[]>([]);
  const [purpleCap, setPurpleCap] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'orange' | 'purple'>('orange');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Orange Cap
        const orangeResponse = await fetch('http://localhost:3001/api/stats/orange-cap');
        const orangeData = await orangeResponse.json();
        
        // Fetch Purple Cap
        const purpleResponse = await fetch('http://localhost:3001/api/stats/purple-cap');
        const purpleData = await purpleResponse.json();
        
        setOrangeCap(orangeData.slice(0, 10));
        setPurpleCap(purpleData.slice(0, 10));
        setError(null);
      } catch (error) {
        console.error('Error loading player stats:', error);
        setError('Failed to load player statistics. Make sure backend is running on port 3001');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading players...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
        <p>{error}</p>
        <p style={{ fontSize: '12px', marginTop: '10px' }}>
          Make sure: cd backend && npm start
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>IPL 2025 Leaderboards</h1>
      
      {/* Tab Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('orange')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: activeTab === 'orange' ? '#ff6b35' : '#ddd',
            color: activeTab === 'orange' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Orange Cap (Batsmen)
        </button>
        <button 
          onClick={() => setActiveTab('purple')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'purple' ? '#9b59b6' : '#ddd',
            color: activeTab === 'purple' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Purple Cap (Bowlers)
        </button>
      </div>

      {/* Orange Cap */}
      {activeTab === 'orange' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Top Run Scorers</h2>
          {orangeCap.map((player, idx) => (
            <div 
              key={idx}
              style={{
                padding: '15px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: idx === 0 ? '#fff3e0' : 'white'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b35' }}>
                  #{player.position}
                </span>
                <div>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{player.batsman}</p>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{player.team}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', fontSize: '14px' }}>
                <div>
                  <strong>Runs:</strong> {player.runs}
                </div>
                <div>
                  <strong>Average:</strong> {player.average || 'N/A'}
                </div>
                <div>
                  <strong>Strike Rate:</strong> {player.strike_rate || 'N/A'}
                </div>
              </div>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                100s: {player.hundreds} | 50s: {player.fifties} | 4s: {player.fours} | 6s: {player.sixes}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Purple Cap */}
      {activeTab === 'purple' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Top Wicket Takers</h2>
          {purpleCap.map((player, idx) => (
            <div 
              key={idx}
              style={{
                padding: '15px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: idx === 0 ? '#f3e5f5' : 'white'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#9b59b6' }}>
                  #{player.position}
                </span>
                <div>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{player.bowler}</p>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{player.team}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', fontSize: '14px' }}>
                <div>
                  <strong>Wickets:</strong> {player.wickets}
                </div>
                <div>
                  <strong>Economy:</strong> {player.economy_rate || 'N/A'}
                </div>
                <div>
                  <strong>Best:</strong> {player.best_bowling_figure}
                </div>
              </div>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                Matches: {player.matches} | Overs: {player.overs} | 4W: {player.four_wicket_haul} | 5W: {player.five_wicket_hall}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
