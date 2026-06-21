import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { PulseMap } from "@/components/map/PulseMap";
import { PulseFeed } from "@/components/pulse/PulseFeed";
import { QuickReport } from "@/components/pulse/QuickReport";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col pt-16 h-[calc(100vh-80px)]">
        <Tabs defaultValue="map" className="flex-1 flex flex-col">
          <div className="px-4 py-2 bg-background border-b z-10">
            <TabsList className="w-full bg-secondary/50 rounded-full p-1">
              <TabsTrigger value="map" className="flex-1 rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">Live Map</TabsTrigger>
              <TabsTrigger value="feed" className="flex-1 rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">Pulse Feed</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="map" className="flex-1 m-0 p-0 overflow-hidden relative">
            <PulseMap />
          </TabsContent>

          <TabsContent value="feed" className="flex-1 m-0 p-0 overflow-auto">
            <div className="max-w-xl mx-auto p-4">
              <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <h3 className="text-primary font-bold text-sm mb-1">Trending in Kampala</h3>
                <p className="text-xs text-muted-foreground">Power restoration in Naalya is currently the most discussed topic.</p>
              </div>
              <PulseFeed />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <QuickReport />
      <BottomNav />
    </div>
  );
}