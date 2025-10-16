import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { BallByBall } from "./BallByBall";
import { Button } from "@/components/ui/button";
import { deliveriesAPI } from "@/services/api";

interface ScorecardProps {
  matchId: number;
}

interface Delivery {
  match_no: number;
  date: string;
  stage: string;
  venue: string;
  batting_team: string;
  bowling_team: string;
  innings: number;
  over_no: number;
  striker: string;
  bowler: string;
  runs_of_bat: number;
  extras: number;
  wide: number;
  legbyes: number;
  byes: number;
  noballs: number;
  wicket_type: string;
  player_dismissed: string;
  fielder: string;
}

export const Scorecard = ({ matchId }: ScorecardProps) => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBallByBall, setShowBallByBall] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const data = await deliveriesAPI.getByMatch(matchId);
        setDeliveries(data);
        setError(null);
      } catch (error) {
        console.error('Error loading deliveries:', error);
        setError('Failed to load delivery data');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, [matchId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-destructive">
        {error}
      </div>
    );
  }

  // Calculate player stats
  const calculatePlayerStats = () => {
    const batsmen: { [key: string]: { runs: number; balls: number; fours: number; sixes: number } } = {};
    const bowlers: { [key: string]: { runs: number; wickets: number; overs: number } } = {};

    deliveries.forEach(d => {
      // Batting stats
      if (!batsmen[d.striker]) {
        batsmen[d.striker] = { runs: 0, balls: 0, fours: 0, sixes: 0 };
      }
      batsmen[d.striker].runs += d.runs_of_bat;
      batsmen[d.striker].balls++;
      if (d.runs_of_bat === 4) batsmen[d.striker].fours++;
      if (d.runs_of_bat === 6) batsmen[d.striker].sixes++;

      // Bowling stats
      if (!bowlers[d.bowler]) {
        bowlers[d.bowler] = { runs: 0, wickets: 0, overs: 0 };
      }
      bowlers[d.bowler].runs += d.runs_of_bat + d.extras;
      if (d.wicket_type) bowlers[d.bowler].wickets++;
    });

    return { batsmen, bowlers };
  };

  const { batsmen, bowlers } = calculatePlayerStats();

  if (deliveries.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No ball-by-ball data available for this match
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4 border-t border-border">
      {/* Batting Stats */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-foreground">Batting Performance</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(batsmen).map(([player, stats]) => (
            <div key={player} className="bg-secondary/30 p-3 rounded-lg">
              <p className="font-semibold text-foreground">{player}</p>
              <div className="flex gap-4 text-sm mt-1">
                <span className="text-muted-foreground">
                  Runs: <span className="font-semibold text-foreground">{stats.runs}</span>
                </span>
                <span className="text-muted-foreground">
                  Balls: <span className="font-semibold text-foreground">{stats.balls}</span>
                </span>
              </div>
              <div className="flex gap-4 text-sm mt-1">
                <span className="text-muted-foreground">4s: {stats.fours}</span>
                <span className="text-success font-semibold">6s: {stats.sixes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bowling Stats */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-foreground">Bowling Performance</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(bowlers).map(([player, stats]) => (
            <div key={player} className="bg-secondary/30 p-3 rounded-lg">
              <p className="font-semibold text-foreground">{player}</p>
              <div className="flex gap-4 text-sm mt-1">
                <span className="text-muted-foreground">
                  Runs: <span className="font-semibold text-foreground">{stats.runs}</span>
                </span>
                <span className="text-muted-foreground">
                  Wickets: <span className="font-semibold text-purple">{stats.wickets}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ball by Ball Toggle */}
      <Button
        variant="default"
        className="w-full bg-accent hover:bg-accent/90"
        onClick={() => setShowBallByBall(!showBallByBall)}
      >
        {showBallByBall ? 'Hide' : 'Show'} Ball-by-Ball Commentary
      </Button>

      {showBallByBall && <BallByBall deliveries={deliveries} />}
    </div>
  );
};
