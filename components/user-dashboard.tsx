"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, AlertTriangle, CheckCircle, Eye, FileText, Calendar, Clock, Shield, Users, BarChart3, PieChart, Activity } from 'lucide-react'

export function UserDashboard() {
  const analysisHistory = [
    {
      id: 1,
      type: "fake-news",
      title: "Economic Report Analysis",
      result: "fake",
      confidence: 87,
      date: "2024-01-15",
      time: "14:30"
    },
    {
      id: 2,
      type: "deepfake",
      title: "Political Speech Video",
      result: "authentic",
      confidence: 92,
      date: "2024-01-15",
      time: "12:15"
    },
    {
      id: 3,
      type: "fake-news",
      title: "Health Claim Article",
      result: "fake",
      confidence: 76,
      date: "2024-01-14",
      time: "16:45"
    },
    {
      id: 4,
      type: "deepfake",
      title: "Celebrity Interview",
      result: "deepfake",
      confidence: 89,
      date: "2024-01-14",
      time: "10:20"
    },
    {
      id: 5,
      type: "fake-news",
      title: "Breaking News Alert",
      result: "authentic",
      confidence: 94,
      date: "2024-01-13",
      time: "18:30"
    }
  ]

  const weeklyStats = [
    { day: "Mon", fakeNews: 3, deepfakes: 1, authentic: 5 },
    { day: "Tue", fakeNews: 2, deepfakes: 2, authentic: 4 },
    { day: "Wed", fakeNews: 4, deepfakes: 1, authentic: 3 },
    { day: "Thu", fakeNews: 1, deepfakes: 3, authentic: 6 },
    { day: "Fri", fakeNews: 5, deepfakes: 2, authentic: 2 },
    { day: "Sat", fakeNews: 2, deepfakes: 1, authentic: 4 },
    { day: "Sun", fakeNews: 3, deepfakes: 2, authentic: 5 }
  ]

  const getResultIcon = (type: string, result: string) => {
    if (type === "fake-news") {
      return result === "fake" ? 
        <AlertTriangle className="h-4 w-4 text-red-500" /> : 
        <CheckCircle className="h-4 w-4 text-green-500" />
    } else {
      return result === "deepfake" ? 
        <AlertTriangle className="h-4 w-4 text-red-500" /> : 
        <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getResultBadge = (result: string) => {
    switch (result) {
      case "fake":
      case "deepfake":
        return <Badge variant="destructive">Fake</Badge>
      case "authentic":
      case "real":
        return <Badge variant="default">Authentic</Badge>
      default:
        return <Badge variant="secondary">Uncertain</Badge>
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Analytics Dashboard</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your content analysis history, view statistics, and monitor your protection against misinformation.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Fake News Detected</p>
                <p className="text-3xl font-bold text-red-700">23</p>
                <p className="text-xs text-red-500">This month</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Deepfakes Found</p>
                <p className="text-3xl font-bold text-orange-700">7</p>
                <p className="text-xs text-orange-500">This month</p>
              </div>
              <Eye className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Authentic Content</p>
                <p className="text-3xl font-bold text-green-700">156</p>
                <p className="text-xs text-green-500">This month</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Analyses</p>
                <p className="text-3xl font-bold text-blue-700">186</p>
                <p className="text-xs text-blue-500">This month</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Activity Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Weekly Activity
              </CardTitle>
              <CardDescription>
                Your content analysis activity over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyStats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{stat.day}</div>
                    <div className="flex-1 flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-6 flex overflow-hidden">
                        <div 
                          className="bg-red-500 h-full" 
                          style={{ width: `${(stat.fakeNews / (stat.fakeNews + stat.deepfakes + stat.authentic)) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-orange-500 h-full" 
                          style={{ width: `${(stat.deepfakes / (stat.fakeNews + stat.deepfakes + stat.authentic)) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-green-500 h-full" 
                          style={{ width: `${(stat.authentic / (stat.fakeNews + stat.deepfakes + stat.authentic)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.fakeNews + stat.deepfakes + stat.authentic} total
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Fake News</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Deepfakes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Authentic</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis History */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Recent Analysis History
              </CardTitle>
              <CardDescription>
                Your latest content analysis results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      {getResultIcon(item.type, item.result)}
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.type === "fake-news" ? "News" : "Media"}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {item.date} at {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-sm font-medium">{item.confidence}%</div>
                        <Progress value={item.confidence} className="w-16 h-2" />
                      </div>
                      {getResultBadge(item.result)}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All History
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Protection Score */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Protection Score
              </CardTitle>
              <CardDescription>
                Your misinformation awareness level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.87)}`}
                      className="text-green-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">87</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-green-600">Excellent Protection</p>
                  <p className="text-sm text-gray-600">You're well-protected against misinformation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Monthly Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Fake content avoided</span>
                <Badge variant="destructive">30 items</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Verified sources found</span>
                <Badge variant="default">127 sources</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Community contributions</span>
                <Badge variant="outline">8 reports</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Accuracy rate</span>
                <Badge variant="default">94.2%</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">Truth Seeker</p>
                  <p className="text-xs text-gray-600">Analyzed 100+ items</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Eye className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">Deepfake Hunter</p>
                  <p className="text-xs text-gray-600">Detected 10+ deepfakes</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">Community Helper</p>
                  <p className="text-xs text-gray-600">5+ community reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
