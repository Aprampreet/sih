import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ArchitectureOverview } from "./components/ArchitectureOverview";
import { CitizenApp } from "./components/CitizenApp";
import { AnalystDashboard } from "./components/AnalystDashboard";
import { AdminPortal } from "./components/AdminPortal";
import { SystemMonitoring } from "./components/SystemMonitoring";

export default function App() {
  const [activeView, setActiveView] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Disaster Management Platform
              </h1>
              <p className="text-muted-foreground">
                Real-time hazard detection and response system
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-muted-foreground">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Architecture Overview</TabsTrigger>
            <TabsTrigger value="citizen">Citizen App</TabsTrigger>
            <TabsTrigger value="analyst">Analyst Dashboard</TabsTrigger>
            <TabsTrigger value="admin">Admin Portal</TabsTrigger>
            <TabsTrigger value="monitoring">System Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <ArchitectureOverview />
          </TabsContent>

          <TabsContent value="citizen" className="mt-6">
            <CitizenApp />
          </TabsContent>

          <TabsContent value="analyst" className="mt-6">
            <AnalystDashboard />
          </TabsContent>

          <TabsContent value="admin" className="mt-6">
            <AdminPortal />
          </TabsContent>

          <TabsContent value="monitoring" className="mt-6">
            <SystemMonitoring />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}