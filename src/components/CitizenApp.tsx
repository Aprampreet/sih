import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  MapPin, 
  Camera, 
  Send, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Upload
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const mockReports = [
  {
    id: 1,
    type: "Flood",
    location: "Downtown Area, Sector 15",
    timestamp: "2 minutes ago",
    status: "synced",
    urgency: "high"
  },
  {
    id: 2,
    type: "Traffic Accident",
    location: "Highway 101, Exit 23",
    timestamp: "15 minutes ago",
    status: "pending",
    urgency: "medium"
  },
  {
    id: 3,
    type: "Power Outage",
    location: "Residential Block C",
    timestamp: "1 hour ago",
    status: "synced",
    urgency: "low"
  }
];

export function CitizenApp() {
  const [isOnline, setIsOnline] = useState(true);
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Getting location...");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReport = async () => {
    setIsSubmitting(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSubmitting(false);
          setReportType("");
          setDescription("");
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  const urgencyColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200"
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-semibold">Citizen Reporting App</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Submit geotagged reports about hazards and emergencies in your area. 
          Reports are stored locally when offline and synced when connection is restored.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Submission Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Submit New Report</CardTitle>
                <CardDescription>Report emergencies and hazards in real-time</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <>
                    <Wifi className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-orange-600">Offline</span>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Report Type</label>
              <select 
                className="w-full p-2 border border-border rounded-md bg-background"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="">Select emergency type...</option>
                <option value="flood">Flood</option>
                <option value="fire">Fire</option>
                <option value="accident">Traffic Accident</option>
                <option value="poweroutage">Power Outage</option>
                <option value="earthquake">Earthquake</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea 
                placeholder="Describe what you're observing..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <div className="flex items-center gap-2 p-2 border border-border rounded-md bg-muted">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{location}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Photos/Videos</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Tap to add photos or videos
                </p>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Media
                </Button>
              </div>
            </div>

            {isSubmitting && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading report...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <Button 
              onClick={handleSubmitReport}
              disabled={!reportType || !description || isSubmitting}
              className="w-full"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>

            {!isOnline && (
              <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
                <div className="flex items-center gap-2">
                  <WifiOff className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-800">
                    You're offline. Reports will be saved locally and synced when connection is restored.
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Your Recent Reports</CardTitle>
            <CardDescription>Track the status of your submitted reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockReports.map((report) => (
                <div key={report.id} className="border border-border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{report.type}</h4>
                      <p className="text-sm text-muted-foreground">{report.location}</p>
                    </div>
                    <Badge className={urgencyColors[report.urgency]}>
                      {report.urgency}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {report.timestamp}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {report.status === "synced" ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">Synced</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm text-orange-600">Pending</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* App Features */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle>App Features</CardTitle>
          <CardDescription>Key capabilities of the citizen reporting app</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium">Geotagged Reports</h3>
              <p className="text-sm text-muted-foreground">
                Automatic location detection for precise incident reporting
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-green-100 rounded-full w-fit mx-auto">
                <WifiOff className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium">Offline Sync</h3>
              <p className="text-sm text-muted-foreground">
                Store reports locally and sync when connection is available
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto">
                <Camera className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium">Media Upload</h3>
              <p className="text-sm text-muted-foreground">
                Include photos and videos to provide visual evidence
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connection Toggle for Demo */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={() => setIsOnline(!isOnline)}
          className="text-sm"
        >
          {isOnline ? <WifiOff className="h-4 w-4 mr-2" /> : <Wifi className="h-4 w-4 mr-2" />}
          {isOnline ? "Simulate Offline" : "Go Online"}
        </Button>
      </div>
    </div>
  );
}