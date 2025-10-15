import { MatchList } from "@/components/MatchList";
import { TopPlayers } from "@/components/TopPlayers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">IPL 2025 Live Info</h1>
              <p className="text-primary-foreground/80 text-sm">Your complete cricket companion</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="matches">All Matches</TabsTrigger>
            <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="matches">
            <MatchList />
          </TabsContent>
          
          <TabsContent value="leaderboards">
            <TopPlayers />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>IPL 2025 Live Info • Built with React & Vite</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
