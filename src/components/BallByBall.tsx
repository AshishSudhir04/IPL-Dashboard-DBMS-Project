import { Badge } from "@/components/ui/badge";

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

interface BallByBallProps {
  deliveries: Delivery[];
}

export const BallByBall = ({ deliveries }: BallByBallProps) => {
  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      <h3 className="font-bold text-lg text-foreground sticky top-0 bg-background pb-2">
        Ball-by-Ball Commentary
      </h3>
      {deliveries.map((delivery, idx) => (
        <div
          key={idx}
          className={`p-3 rounded-lg border border-border ${
            delivery.runs_of_bat === 6 ? 'bg-success/10 border-success' : 'bg-card'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Over {delivery.over_no}
            </span>
            <div className="flex gap-2">
              {delivery.runs_of_bat === 6 && (
                <Badge className="bg-success text-success-foreground font-bold">
                  SIX!
                </Badge>
              )}
              {delivery.runs_of_bat === 4 && (
                <Badge variant="secondary" className="font-bold">
                  FOUR
                </Badge>
              )}
              {delivery.wicket_type && (
                <Badge variant="destructive">WICKET</Badge>
              )}
            </div>
          </div>
          
          <div className="text-sm space-y-1">
            <p className="text-foreground">
              <span className="font-semibold">{delivery.striker}</span> facing{' '}
              <span className="font-semibold">{delivery.bowler}</span>
            </p>
            
            <p className="text-muted-foreground">
              Runs: <span className={`font-bold ${delivery.runs_of_bat === 6 ? 'text-success' : 'text-foreground'}`}>
                {delivery.runs_of_bat}
              </span>
              {delivery.extras > 0 && ` (+${delivery.extras} extras)`}
            </p>
            
            {delivery.wicket_type && (
              <p className="text-destructive font-semibold">
                {delivery.player_dismissed} {delivery.wicket_type}
                {delivery.fielder && ` by ${delivery.fielder}`}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
