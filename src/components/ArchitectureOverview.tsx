import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Smartphone, 
  BarChart3, 
  Shield, 
  Database, 
  Cloud, 
  MessageSquare,
  Camera,
  Share2,
  Cpu,
  Brain,
  MapPin,
  AlertTriangle,
  Eye,
  Activity
} from "lucide-react";

const architectureLayers = [
  {
    title: "Client Layer",
    description: "User-facing interfaces for citizens and authorities",
    color: "bg-blue-50 border-blue-200",
    components: [
      { name: "Citizen App", icon: Smartphone, description: "Mobile & web app for geotagged reports" },
      { name: "Analyst Dashboard", icon: BarChart3, description: "Real-time monitoring and validation" },
      { name: "Govt/Admin Portal", icon: Shield, description: "Official management and alerts" }
    ]
  },
  {
    title: "Ingestion & Gateway Layer",
    description: "Entry point for all data with authentication and routing",
    color: "bg-green-50 border-green-200",
    components: [
      { name: "SMS Ingestion", icon: MessageSquare, description: "SMS report processing" },
      { name: "Media Upload", icon: Camera, description: "Photo and video handling" },
      { name: "Social Media Service", icon: Share2, description: "Real-time social media feeds" },
      { name: "API Gateway", icon: Cloud, description: "Authentication and rate limiting" }
    ]
  },
  {
    title: "Processing & Analytics Layer",
    description: "Core intelligence with ML models and analytics",
    color: "bg-purple-50 border-purple-200",
    components: [
      { name: "Data Cleansing", icon: Cpu, description: "Validation and noise removal" },
      { name: "NLP & Sentiment", icon: Brain, description: "Text analysis and urgency detection" },
      { name: "Image Analytics", icon: Eye, description: "Computer vision for media analysis" },
      { name: "Geospatial Analytics", icon: MapPin, description: "Location clustering and hotspots" },
      { name: "Alert Trigger", icon: AlertTriangle, description: "Automated alert generation" }
    ]
  },
  {
    title: "Persistent Storage",
    description: "Data management from raw files to processed information",
    color: "bg-orange-50 border-orange-200",
    components: [
      { name: "Data Lake", icon: Database, description: "Historical analytics data" },
      { name: "Geospatial DB", icon: MapPin, description: "Real-time structured data" },
      { name: "Media Storage", icon: Camera, description: "Images and videos" }
    ]
  },
  {
    title: "Infrastructure & Operations",
    description: "Security, monitoring, and deployment management",
    color: "bg-gray-50 border-gray-200",
    components: [
      { name: "TLS/SSL Encryption", icon: Shield, description: "End-to-end security" },
      { name: "Monitoring Platform", icon: Activity, description: "System performance tracking" }
    ]
  }
];

export function ArchitectureOverview() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-semibold">System Architecture Overview</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          A scalable, microservices-based disaster management platform with five distinct layers 
          handling everything from citizen reports to real-time analytics and emergency alerts.
        </p>
      </div>

      <div className="space-y-6">
        {architectureLayers.map((layer, layerIndex) => (
          <Card key={layer.title} className={`${layer.color} transition-all hover:shadow-md`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {layer.title}
                    <Badge variant="secondary">{layer.components.length} Components</Badge>
                  </CardTitle>
                  <CardDescription>{layer.description}</CardDescription>
                </div>
                <div className="text-2xl font-mono text-muted-foreground">
                  {layerIndex + 1}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {layer.components.map((component) => {
                  const IconComponent = component.icon;
                  return (
                    <div
                      key={component.name}
                      className="bg-white/50 rounded-lg p-4 border border-white/20 hover:bg-white/70 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-white shadow-sm">
                          <IconComponent className="h-5 w-5 text-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground">{component.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {component.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {layerIndex < architectureLayers.length - 1 && (
                <div className="flex justify-center mt-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-0.5 bg-border"></div>
                    <div className="text-xs text-muted-foreground bg-white px-2 py-1 rounded">
                      Data Flow
                    </div>
                    <div className="h-8 w-0.5 bg-border"></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle>Key System Features</CardTitle>
          <CardDescription>
            Highlights of the disaster management platform's capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl font-semibold text-blue-600">24/7</div>
              <div className="text-sm text-muted-foreground">Real-time Monitoring</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-semibold text-green-600">Multi-channel</div>
              <div className="text-sm text-muted-foreground">Input Sources</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-semibold text-purple-600">AI-powered</div>
              <div className="text-sm text-muted-foreground">Analytics</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-semibold text-orange-600">Scalable</div>
              <div className="text-sm text-muted-foreground">Microservices</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}