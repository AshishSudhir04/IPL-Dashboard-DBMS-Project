import { useState, useEffect } from "react";
import { MatchCard } from "./MatchCard";
import { Loader2 } from "lucide-react";
import { matchesAPI } from "@/services/api";

export interface Match {
  match_id: number;
  date: string;
  venue: string;
  team1: string;
  team2: string;
  stage: string;
  toss_winner: string;
  toss_decision: string;
  first_ings_score: number;
  first_ings_wkts: number;
  second_ings_score: number;
  second_ings_wkts: number;
  match_result: string;
  match_winner: string;
  wb_runs: string;
  wb_wickets: string;
  balls_left: number;
  player_of_the_match: string;
  top_scorer: string;
  highscore: number;
  best_bowling: string;
  best_bowling_figure: string;
}

export const MatchList = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await matchesAPI.getAll();
        setMatches(data);
        setError(null);
      } catch (error) {
        console.error('Error loading matches:', error);
        setError('Failed to load matches. Please ensure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-destructive text-lg font-semibold">{error}</p>
        <p className="text-muted-foreground text-sm">
          Run the backend server: <code className="bg-secondary px-2 py-1 rounded">cd backend && npm start</code>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">All Matches</h2>
      <div className="grid gap-4">
        {matches.map((match) => (
          <MatchCard key={match.match_id} match={match} />
        ))}
      </div>
    </div>
  );
};
