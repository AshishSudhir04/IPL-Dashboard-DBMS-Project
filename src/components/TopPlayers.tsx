import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Target } from "lucide-react";

interface OrangeCapPlayer {
  Position: number;
  Batsman: string;
  Team: string;
  Matches: number;
  Innings: number;
  Not_out: number;
  Runs: number;
  Highest_score: number;
  Average: number;
  Balls_faced: number;
  Strike_rate: number;
  Hundreds: number;
  Fifties: number;
  Ducks: number;
  Fours: number;
  Sixes: number;
}

interface PurpleCapPlayer {
  Position: number;
  Bowler: string;
  Team: string;
  Matches: number;
  Innings: number;
  Balls: number;
  Overs: number;
  Maidens: number;
  Runs: number;
  Wickets: number;
  Best_bowling_figure: string;
  Economy_rate: number;
  Four_wicket_haul: number;
  Five_wicket_hall: number;
}

export const TopPlayers = () => {
  const [orangeCap, setOrangeCap] = useState<OrangeCapPlayer[]>([]);
  const [purpleCap, setPurpleCap] = useState<PurpleCapPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Orange Cap
        const orangeResponse = await fetch('/data/orange_cap.csv');
        const orangeText = await orangeResponse.text();
        const orangeRows = orangeText.split('\n').slice(1);
        
        const parsedOrange = orangeRows
          .filter(row => row.trim())
          .map(row => {
            const values = row.split(',');
            return {
              Position: parseInt(values[0]),
              Batsman: values[1],
              Team: values[2],
              Matches: parseInt(values[3]),
              Innings: parseInt(values[4]),
              Not_out: parseInt(values[5]),
              Runs: parseInt(values[6]),
              Highest_score: parseInt(values[7]),
              Average: parseFloat(values[8]),
              Balls_faced: parseInt(values[9]),
              Strike_rate: parseFloat(values[10]),
              Hundreds: parseInt(values[11]),
              Fifties: parseInt(values[12]),
              Ducks: parseInt(values[13]),
              Fours: parseInt(values[14]),
              Sixes: parseInt(values[15])
            };
          })
          .slice(0, 10);

        // Fetch Purple Cap
        const purpleResponse = await fetch('/data/purple_cap.csv');
        const purpleText = await purpleResponse.text();
        const purpleRows = purpleText.split('\n').slice(1);
        
        const parsedPurple = purpleRows
          .filter(row => row.trim())
          .map(row => {
            const values = row.split(',');
            return {
              Position: parseInt(values[0]),
              Bowler: values[1],
              Team: values[2],
              Matches: parseInt(values[3]),
              Innings: parseInt(values[4]),
              Balls: parseInt(values[5]),
              Overs: parseFloat(values[6]),
              Maidens: parseInt(values[7]),
              Runs: parseInt(values[8]),
              Wickets: parseInt(values[9]),
              Best_bowling_figure: values[10],
              Economy_rate: parseFloat(values[11]),
              Four_wicket_haul: parseInt(values[12]),
              Five_wicket_hall: parseInt(values[13])
            };
          })
          .slice(0, 10);

        setOrangeCap(parsedOrange);
        setPurpleCap(parsedPurple);
      } catch (error) {
        console.error('Error loading player stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-orange" />
          IPL 2025 Leaderboards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="orange" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orange" className="data-[state=active]:bg-orange data-[state=active]:text-orange-foreground">
              Orange Cap
            </TabsTrigger>
            <TabsTrigger value="purple" className="data-[state=active]:bg-purple data-[state=active]:text-purple-foreground">
              Purple Cap
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orange" className="space-y-3 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-orange" />
              <h3 className="font-bold text-lg text-foreground">Top Run Scorers</h3>
            </div>
            {orangeCap.map((player, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border border-border ${
                  idx === 0 ? 'bg-orange/10 border-orange' : 'bg-card'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-orange">#{player.Position}</span>
                      <div>
                        <p className="font-bold text-lg text-foreground">{player.Batsman}</p>
                        <p className="text-sm text-muted-foreground">{player.Team}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Runs</p>
                        <p className="font-bold text-lg text-foreground">{player.Runs}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Average</p>
                        <p className="font-semibold text-foreground">{player.Average.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">SR</p>
                        <p className="font-semibold text-foreground">{player.Strike_rate.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
                      <span>100s: {player.Hundreds}</span>
                      <span>50s: {player.Fifties}</span>
                      <span>4s: {player.Fours}</span>
                      <span className="text-success font-semibold">6s: {player.Sixes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="purple" className="space-y-3 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-purple" />
              <h3 className="font-bold text-lg text-foreground">Top Wicket Takers</h3>
            </div>
            {purpleCap.map((player, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border border-border ${
                  idx === 0 ? 'bg-purple/10 border-purple' : 'bg-card'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-purple">#{player.Position}</span>
                      <div>
                        <p className="font-bold text-lg text-foreground">{player.Bowler}</p>
                        <p className="text-sm text-muted-foreground">{player.Team}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Wickets</p>
                        <p className="font-bold text-lg text-purple">{player.Wickets}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Economy</p>
                        <p className="font-semibold text-foreground">{player.Economy_rate.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Best</p>
                        <p className="font-semibold text-foreground">{player.Best_bowling_figure}</p>
                      </div>
                    </div>
                    <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
                      <span>Matches: {player.Matches}</span>
                      <span>Overs: {player.Overs}</span>
                      <span>4W: {player.Four_wicket_haul}</span>
                      <span>5W: {player.Five_wicket_hall}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
