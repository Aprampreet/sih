import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye,
  Filter,
  RefreshCw,
  BarChart3,
  Users,
  Camera,
  MessageSquare
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const mockReports = [
  {
    id: 1,
    type: "Flood",
    location: "Downtown Area, Sector 15",
    timestamp: "2 minutes ago",
    confidence: 92,
    urgency: "high",
    source: "citizen",
    status: "investigating",
    description: "Heavy flooding reported near main intersection"
  },
  {
    id: 2,
    type: "Fire",
    location: "Industrial Zone B",
    timestamp: "15 minutes ago",
    confidence: 87,
    urgency: "high",
    source: "social_media",
    status: "verified",
    description: "Smoke visible from factory area"
  },
  {
    id: 3,
    type: "Traffic Accident",
    location: "Highway 101, Exit 23",
    timestamp: "1 hour ago",
    confidence: 76,
    urgency: "medium",
    source: "sms",
    status: "resolved",
    description: "Minor collision blocking one lane"
  },
  {
    id: 4,
    type: "Power Outage",
    location: "Residential Block C",
    timestamp: "2 hours ago",
    confidence: 94,
    urgency: "low",
    source: "citizen",
    status: "investigating",
    description: "Widespread power outage affecting 200+ homes"
  }
];

const trendData = [
  { time: "00:00", reports: 12, verified: 8 },
  { time: "04:00", reports: 8, verified: 6 },
  { time: "08:00", reports: 25, verified: 18 },
  { time: "12:00", reports: 32, verified: 24 },
  { time: "16:00", reports: 28, verified: 20 },
  { time: "20:00", reports: 22, verified: 16 }
];

const categoryData = [
  { name: "Flood", value: 35, color: "#3b82f6" },
  { name: "Fire", value: 28, color: "#ef4444" },
  { name: "Accident", value: 18, color: "#f59e0b" },
  { name: "Other", value: 19, color: "#8b5cf6" }
];

const hotspots = [
  { location: "Downtown Area", reports: 15, risk: "High" },
  { location: "Industrial Zone", reports: 12, risk: "High" },
  { location: "Highway 101", reports: 8, risk: "Medium" },
  { location: "Residential Block C", reports: 5, risk: "Low" }
];

export function AnalystDashboard() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredReports = filter === "all" 
    ? mockReports 
    : mockReports.filter(report => report.urgency === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800 border-green-200";
      case "investigating": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case "citizen": return <Users className="h-3 w-3" />;
      case "social_media": return <MessageSquare className="h-3 w-3" />;
      case "sms": return <MessageSquare className="h-3 w-3" />;
      default: return <Camera className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Analyst Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor incoming reports, validate information, and track real-time incidents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Reports</p>
                <p className="text-2xl font-semibold">23</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified Today</p>
                <p className="text-2xl font-semibold">18</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Confidence</p>
                <p className="text-2xl font-semibold">87%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <p className="text-2xl font-semibold">4.2m</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">Live Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("all")}
            >
              All Reports
            </Button>
            <Button 
              variant={filter === "high" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("high")}
            >
              High Priority
            </Button>
            <Button 
              variant={filter === "medium" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("medium")}
            >
              Medium Priority
            </Button>
            <Button 
              variant={filter === "low" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("low")}
            >
              Low Priority
            </Button>
          </div>

          <div className="space-y-3">
            {filteredReports.map((report) => (
              <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{report.type}</h4>
                        <Badge className={getUrgencyColor(report.urgency)}>
                          {report.urgency}
                        </Badge>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {getSourceIcon(report.source)}
                          {report.source.replace("_", " ")}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {report.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {report.timestamp}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Confidence: </span>
                        <span className="font-medium">{report.confidence}%</span>
                      </div>
                      <Progress value={report.confidence} className="h-2 w-20" />
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports Over Time</CardTitle>
                <CardDescription>Daily report volume and verification rate</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="reports" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="verified" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Categories</CardTitle>
                <CardDescription>Distribution of incident types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hotspots" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Hotspots</CardTitle>
              <CardDescription>Areas with high incident concentration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hotspots.map((hotspot, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        <MapPin className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{hotspot.location}</h4>
                        <p className="text-sm text-muted-foreground">{hotspot.reports} reports in last 24h</p>
                      </div>
                    </div>
                    <Badge className={
                      hotspot.risk === "High" ? "bg-red-100 text-red-800 border-red-200" :
                      hotspot.risk === "Medium" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                      "bg-green-100 text-green-800 border-green-200"
                    }>
                      {hotspot.risk} Risk
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Validation Results</CardTitle>
              <CardDescription>AI-powered validation and confidence scoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-semibold text-green-600">94%</div>
                    <div className="text-sm text-muted-foreground">NLP Accuracy</div>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-semibold text-blue-600">87%</div>
                    <div className="text-sm text-muted-foreground">Image Recognition</div>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-semibold text-purple-600">91%</div>
                    <div className="text-sm text-muted-foreground">Geospatial Validation</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Recent Validations</h4>
                  {mockReports.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{report.type} - {report.location}</p>
                        <p className="text-sm text-muted-foreground">Cross-validated with 3 sources</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">{report.confidence}%</div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}