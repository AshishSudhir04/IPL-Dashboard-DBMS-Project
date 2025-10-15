import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Match } from "./MatchList";
import { Scorecard } from "./Scorecard";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-border">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Match Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Match {match.match_id}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {match.stage}
              </Badge>
            </div>
            {match.match_result === "completed" && (
              <Badge className="bg-success text-success-foreground">
                Completed
              </Badge>
            )}
          </div>

          {/* Teams & Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg text-foreground">{match.team1}</span>
                {match.match_winner === match.team1 && (
                  <Trophy className="h-4 w-4 text-orange" />
                )}
              </div>
              <span className="font-semibold text-lg">
                {match.first_ings_score}/{match.first_ings_wkts}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg text-foreground">{match.team2}</span>
                {match.match_winner === match.team2 && (
                  <Trophy className="h-4 w-4 text-orange" />
                )}
              </div>
              <span className="font-semibold text-lg">
                {match.second_ings_score}/{match.second_ings_wkts}
              </span>
            </div>
          </div>

          {/* Match Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{match.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{match.venue}</span>
            </div>
          </div>

          {/* Result */}
          {match.match_winner && (
            <div className="pt-2 border-t border-border">
              <p className="font-semibold text-foreground">
                {match.match_winner} won
                {match.wb_runs && ` by ${match.wb_runs} runs`}
                {match.wb_wickets && ` by ${match.wb_wickets} wickets`}
              </p>
              {match.player_of_the_match && match.player_of_the_match.trim() && (
                <p className="text-sm text-muted-foreground mt-1">
                  Player of the Match: <span className="text-foreground font-medium">{match.player_of_the_match}</span>
                </p>
              )}
            </div>
          )}

          {/* Expand Button */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Hide Scorecard
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show Scorecard
              </>
            )}
          </Button>

          {/* Scorecard */}
          {expanded && <Scorecard matchId={match.match_id} />}
        </div>
      </CardContent>
    </Card>
  );
};
