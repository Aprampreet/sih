import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  Settings, 
  Send,
  Eye,
  Edit,
  Trash2,
  Plus,
  Activity,
  Database,
  Bell,
  Lock,
  UserCheck,
  BarChart3
} from "lucide-react";

const systemAlerts = [
  {
    id: 1,
    title: "Critical Flood Alert",
    description: "Downtown area experiencing severe flooding. Immediate evacuation recommended.",
    severity: "critical",
    timestamp: "5 minutes ago",
    status: "active",
    recipients: 1250
  },
  {
    id: 2,
    title: "Fire Emergency",
    description: "Industrial zone fire detected. Emergency services dispatched.",
    severity: "high",
    timestamp: "22 minutes ago",
    status: "resolved",
    recipients: 850
  },
  {
    id: 3,
    title: "Traffic Advisory",
    description: "Highway 101 partial closure due to accident.",
    severity: "medium",
    timestamp: "1 hour ago",
    status: "active",
    recipients: 500
  }
];

const userRoles = [
  { id: 1, name: "Sarah Chen", role: "System Administrator", department: "IT Operations", status: "active" },
  { id: 2, name: "Dr. Michael Roberts", role: "Emergency Coordinator", department: "Emergency Services", status: "active" },
  { id: 3, name: "Lisa Thompson", role: "Data Analyst", department: "Analytics", status: "active" },
  { id: 4, name: "James Wilson", role: "Field Coordinator", department: "Response Team", status: "inactive" }
];

const systemMetrics = [
  { label: "Total Reports Today", value: "847", change: "+12%" },
  { label: "Active Alerts", value: "23", change: "-5%" },
  { label: "System Uptime", value: "99.97%", change: "+0.02%" },
  { label: "Response Time Avg", value: "2.1m", change: "-15%" }
];

const serviceStatus = [
  { name: "API Gateway", status: "operational", uptime: "99.98%" },
  { name: "Data Processing", status: "operational", uptime: "99.95%" },
  { name: "Media Storage", status: "degraded", uptime: "98.12%" },
  { name: "Alert System", status: "operational", uptime: "99.99%" },
  { name: "Database Cluster", status: "operational", uptime: "99.97%" }
];

export function AdminPortal() {
  const [newAlert, setNewAlert] = useState({
    title: "",
    description: "",
    severity: "medium",
    targetAreas: ""
  });
  const [isCreatingAlert, setIsCreatingAlert] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "operational": return "bg-green-100 text-green-800 border-green-200";
      case "degraded": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "down": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleCreateAlert = () => {
    setIsCreatingAlert(true);
    // Simulate alert creation
    setTimeout(() => {
      setIsCreatingAlert(false);
      setNewAlert({ title: "", description: "", severity: "medium", targetAreas: "" });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Government Admin Portal</h2>
          <p className="text-muted-foreground">
            Secure platform for managing alerts, users, and system configuration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Shield className="h-3 w-3 mr-1" />
            Secure Session
          </Badge>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <Badge variant="outline" className="text-xs">
                    {metric.change}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="alerts">Alert Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System Status</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create New Alert */}
            <Card>
              <CardHeader>
                <CardTitle>Create Emergency Alert</CardTitle>
                <CardDescription>Broadcast critical information to citizens and agencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Alert Title</label>
                  <Input 
                    placeholder="Emergency alert title..."
                    value={newAlert.title}
                    onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea 
                    placeholder="Detailed description of the emergency..."
                    rows={3}
                    value={newAlert.description}
                    onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Severity Level</label>
                  <select 
                    className="w-full p-2 border border-border rounded-md bg-background"
                    value={newAlert.severity}
                    onChange={(e) => setNewAlert({...newAlert, severity: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Target Areas</label>
                  <Input 
                    placeholder="Comma-separated areas or 'All' for citywide"
                    value={newAlert.targetAreas}
                    onChange={(e) => setNewAlert({...newAlert, targetAreas: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={handleCreateAlert}
                  disabled={!newAlert.title || !newAlert.description || isCreatingAlert}
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isCreatingAlert ? "Broadcasting..." : "Broadcast Alert"}
                </Button>
              </CardContent>
            </Card>

            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
                <CardDescription>Currently broadcast emergency alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="border border-border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-muted-foreground">
                          {alert.recipients} recipients • {alert.timestamp}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">User Management</h3>
              <p className="text-sm text-muted-foreground">Manage user access and permissions</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium">Name</th>
                      <th className="text-left p-4 font-medium">Role</th>
                      <th className="text-left p-4 font-medium">Department</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userRoles.map((user) => (
                      <tr key={user.id} className="border-b border-border">
                        <td className="p-4">{user.name}</td>
                        <td className="p-4">{user.role}</td>
                        <td className="p-4">{user.department}</td>
                        <td className="p-4">
                          <Badge className={user.status === "active" 
                            ? "bg-green-100 text-green-800 border-green-200" 
                            : "bg-gray-100 text-gray-800 border-gray-200"
                          }>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Lock className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Status</CardTitle>
                <CardDescription>Real-time status of system components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {serviceStatus.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                      </div>
                      <Badge className={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
                <CardDescription>Current resource utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU Usage</span>
                    <span>67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '67%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Memory Usage</span>
                    <span>82%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{width: '82%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Storage Usage</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Network I/O</span>
                    <span>34%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '34%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-semibold">2,847</div>
                <div className="text-sm text-muted-foreground">Total Reports This Month</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-semibold">156</div>
                <div className="text-sm text-muted-foreground">Active Analysts</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-semibold">23</div>
                <div className="text-sm text-muted-foreground">Critical Alerts Sent</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Manage system-wide settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-Alert Generation</h4>
                  <p className="text-sm text-muted-foreground">Automatically generate alerts based on AI analysis</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Real-time Notifications</h4>
                  <p className="text-sm text-muted-foreground">Send immediate notifications to administrators</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Retention Policy</h4>
                  <p className="text-sm text-muted-foreground">Automatically archive old reports and data</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Public API Access</h4>
                  <p className="text-sm text-muted-foreground">Allow external systems to access public data</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}