import { useState, useEffect } from "react";
import { MatchCard } from "./MatchCard";
import { Loader2 } from "lucide-react";

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

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/data/matches.csv');
        const text = await response.text();
        const rows = text.split('\n').slice(1);
        
        // Helper function to parse CSV row with quoted fields
        const parseCSVRow = (row: string): string[] => {
          const values: string[] = [];
          let currentValue = '';
          let insideQuotes = false;
          
          for (let i = 0; i < row.length; i++) {
            const char = row[i];
            
            if (char === '"') {
              insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
              values.push(currentValue);
              currentValue = '';
            } else {
              currentValue += char;
            }
          }
          values.push(currentValue);
          return values;
        };
        
        const parsedMatches = rows
          .filter(row => row.trim())
          .map(row => {
            const values = parseCSVRow(row);
            return {
              match_id: parseInt(values[0]),
              date: values[1],
              venue: values[2],
              team1: values[3],
              team2: values[4],
              stage: values[5],
              toss_winner: values[6],
              toss_decision: values[7],
              first_ings_score: parseInt(values[8]) || 0,
              first_ings_wkts: parseInt(values[9]) || 0,
              second_ings_score: parseInt(values[10]) || 0,
              second_ings_wkts: parseInt(values[11]) || 0,
              match_result: values[12],
              match_winner: values[13],
              wb_runs: values[14],
              wb_wickets: values[15],
              balls_left: parseInt(values[16]) || 0,
              player_of_the_match: values[17],
              top_scorer: values[18],
              highscore: parseInt(values[19]) || 0,
              best_bowling: values[20],
              best_bowling_figure: values[21]
            };
          });
        
        setMatches(parsedMatches);
      } catch (error) {
        console.error('Error loading matches:', error);
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
