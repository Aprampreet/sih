import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Activity, 
  Server, 
  Database, 
  Wifi, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  Bell,
  Eye,
  Zap
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";

const performanceData = [
  { time: "00:00", cpu: 45, memory: 67, network: 23, storage: 12 },
  { time: "04:00", cpu: 38, memory: 62, network: 18, storage: 15 },
  { time: "08:00", cpu: 72, memory: 78, network: 45, storage: 22 },
  { time: "12:00", cpu: 85, memory: 82, network: 67, storage: 28 },
  { time: "16:00", cpu: 79, memory: 75, network: 52, storage: 25 },
  { time: "20:00", cpu: 56, memory: 69, network: 34, storage: 18 }
];

const errorData = [
  { time: "00:00", errors: 2, warnings: 5 },
  { time: "04:00", errors: 1, warnings: 3 },
  { time: "08:00", errors: 4, warnings: 8 },
  { time: "12:00", errors: 3, warnings: 12 },
  { time: "16:00", errors: 2, warnings: 7 },
  { time: "20:00", errors: 1, warnings: 4 }
];

const requestData = [
  { time: "00:00", requests: 1200, success: 1185, failed: 15 },
  { time: "04:00", requests: 800, success: 795, failed: 5 },
  { time: "08:00", requests: 2500, success: 2465, failed: 35 },
  { time: "12:00", requests: 3200, success: 3145, failed: 55 },
  { time: "16:00", requests: 2800, success: 2758, failed: 42 },
  { time: "20:00", requests: 1800, success: 1775, failed: 25 }
];

const systemAlerts = [
  {
    id: 1,
    type: "warning",
    service: "Media Storage",
    message: "High disk usage detected (87%)",
    timestamp: "2 minutes ago",
    severity: "medium"
  },
  {
    id: 2,
    type: "error",
    service: "SMS Ingestion",
    message: "Connection timeout to SMS gateway",
    timestamp: "8 minutes ago",
    severity: "high"
  },
  {
    id: 3,
    type: "info",
    service: "API Gateway",
    message: "Rate limiting applied to client 192.168.1.100",
    timestamp: "15 minutes ago",
    severity: "low"
  },
  {
    id: 4,
    type: "success",
    service: "Data Processing",
    message: "Batch processing completed successfully",
    timestamp: "22 minutes ago",
    severity: "low"
  }
];

const serviceMetrics = [
  { 
    name: "API Gateway", 
    status: "healthy", 
    uptime: "99.98%", 
    requests: "3.2K/min", 
    latency: "45ms",
    instances: 3
  },
  { 
    name: "Data Processing", 
    status: "healthy", 
    uptime: "99.95%", 
    requests: "850/min", 
    latency: "120ms",
    instances: 5
  },
  { 
    name: "Media Storage", 
    status: "warning", 
    uptime: "98.12%", 
    requests: "1.1K/min", 
    latency: "200ms",
    instances: 2
  },
  { 
    name: "SMS Ingestion", 
    status: "critical", 
    uptime: "97.45%", 
    requests: "45/min", 
    latency: "500ms",
    instances: 1
  },
  { 
    name: "Social Media Service", 
    status: "healthy", 
    uptime: "99.89%", 
    requests: "2.8K/min", 
    latency: "80ms",
    instances: 4
  }
];

export function SystemMonitoring() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [autoRefresh, setAutoRefresh] = useState(true);

  const getStatusColor = (status) => {
    switch (status) {
      case "healthy": return "bg-green-100 text-green-800 border-green-200";
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "error": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">System Monitoring</h2>
          <p className="text-muted-foreground">
            Real-time infrastructure monitoring and performance analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            Auto-refresh {autoRefresh ? "ON" : "OFF"}
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-semibold">99.97%</p>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  +0.02%
                </div>
              </div>
              <Server className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Services</p>
                <p className="text-2xl font-semibold">23/25</p>
                <div className="flex items-center gap-1 text-xs text-yellow-600">
                  <TrendingDown className="h-3 w-3" />
                  2 degraded
                </div>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-semibold">127ms</p>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingDown className="h-3 w-3" />
                  -15ms
                </div>
              </div>
              <Zap className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-semibold">2</p>
                <div className="flex items-center gap-1 text-xs text-red-600">
                  <TrendingUp className="h-3 w-3" />
                  +1 new
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">Time range:</span>
            {["1h", "6h", "24h", "7d"].map((range) => (
              <Button 
                key={range}
                variant={selectedTimeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
                <CardDescription>CPU, Memory, Network, and Storage utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} name="CPU %" />
                    <Line type="monotone" dataKey="memory" stroke="#ef4444" strokeWidth={2} name="Memory %" />
                    <Line type="monotone" dataKey="network" stroke="#10b981" strokeWidth={2} name="Network %" />
                    <Line type="monotone" dataKey="storage" stroke="#f59e0b" strokeWidth={2} name="Storage %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Volume</CardTitle>
                <CardDescription>API requests and success rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={requestData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="requests" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="failed" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.8} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Tracking</CardTitle>
                <CardDescription>System errors and warnings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={errorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="errors" fill="#ef4444" />
                    <Bar dataKey="warnings" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Distribution</CardTitle>
                <CardDescription>Current resource allocation across services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Cores (32 total)</span>
                      <span>22 used</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '69%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory (128 GB total)</span>
                      <span>94 GB used</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{width: '73%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage (2 TB total)</span>
                      <span>1.2 TB used</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Network Bandwidth</span>
                      <span>45% utilized</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Health Overview</CardTitle>
              <CardDescription>Status and metrics for all system services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceMetrics.map((service, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{service.name}</h4>
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Activity className="h-3 w-3 mr-1" />
                          Logs
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Uptime</span>
                        <div className="font-medium">{service.uptime}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Requests</span>
                        <div className="font-medium">{service.requests}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Latency</span>
                        <div className="font-medium">{service.latency}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Instances</span>
                        <div className="font-medium">{service.instances}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Load</span>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${Math.random() * 80 + 20}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">System Alerts</h3>
              <p className="text-sm text-muted-foreground">Recent system notifications and alerts</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button variant="outline" size="sm">
                Mark All Read
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                {systemAlerts.map((alert, index) => (
                  <div key={alert.id} className={`p-4 border-b border-border last:border-b-0 ${index === 0 ? 'bg-red-50' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{alert.service}</span>
                          <Badge variant="outline" className="text-xs">
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {alert.timestamp}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Acknowledge
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent system events and operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                <div>[2024-01-26 14:23:45] INFO: API Gateway - Request processed successfully</div>
                <div>[2024-01-26 14:23:43] WARN: Media Storage - Disk usage at 87%</div>
                <div>[2024-01-26 14:23:40] INFO: Data Processing - Batch job completed</div>
                <div>[2024-01-26 14:23:38] ERROR: SMS Ingestion - Connection timeout</div>
                <div>[2024-01-26 14:23:35] INFO: Social Media Service - 1,250 new posts processed</div>
                <div>[2024-01-26 14:23:32] INFO: Geospatial Analytics - Hotspot analysis completed</div>
                <div>[2024-01-26 14:23:30] WARN: Alert Trigger - Rate limit reached for region A</div>
                <div>[2024-01-26 14:23:28] INFO: NLP Service - Sentiment analysis batch completed</div>
                <div>[2024-01-26 14:23:25] INFO: Image Analytics - 45 images processed</div>
                <div>[2024-01-26 14:23:22] INFO: API Gateway - Health check passed</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Traffic</CardTitle>
                <CardDescription>Inbound and outbound network activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Inbound Traffic</span>
                    <span className="font-medium">2.3 GB/hr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Outbound Traffic</span>
                    <span className="font-medium">1.8 GB/hr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Connections</span>
                    <span className="font-medium">1,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Bandwidth Utilization</span>
                    <span className="font-medium">67%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Events</CardTitle>
                <CardDescription>Recent security-related activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>TLS certificate renewed successfully</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span>Suspicious IP blocked: 192.168.1.100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>API key rotation completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span>Failed authentication attempts: 23</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}