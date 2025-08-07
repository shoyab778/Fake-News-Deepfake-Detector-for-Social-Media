"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, CheckCircle, Eye, FileText, Image, TrendingUp, Users, Bell, Search, Upload, Link, BarChart3 } from 'lucide-react'
import { FakeNewsDetector } from "@/components/fake-news-detector"
import { DeepfakeDetector } from "@/components/deepfake-detector"
import { UserDashboard } from "@/components/user-dashboard"
import { CommunityFeed } from "@/components/community-feed"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")

  const stats = [
    { label: "Fake News Detected", value: "12,847", icon: AlertTriangle, color: "text-red-500" },
    { label: "Deepfakes Identified", value: "3,291", icon: Eye, color: "text-orange-500" },
    { label: "Verified Sources", value: "45,672", icon: CheckCircle, color: "text-green-500" },
    { label: "Active Users", value: "89,234", icon: Users, color: "text-blue-500" }
  ]

  const recentAlerts = [
    {
      type: "fake-news",
      title: "Misleading headline about economic data spreading on Twitter",
      confidence: 87,
      timestamp: "2 hours ago"
    },
    {
      type: "deepfake",
      title: "Manipulated video of political figure detected",
      confidence: 94,
      timestamp: "4 hours ago"
    },
    {
      type: "fake-news",
      title: "False health claim circulating on Facebook",
      confidence: 76,
      timestamp: "6 hours ago"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TruthGuard AI
                </h1>
                <p className="text-sm text-gray-600">Fake News & Deepfake Detection</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
              <Button size="sm">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="home" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-4"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="fake-news"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-4"
              >
                <FileText className="h-4 w-4 mr-2" />
                Fake News
              </TabsTrigger>
              <TabsTrigger 
                value="deepfake"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-4"
              >
                <Image className="h-4 w-4 mr-2" />
                Deepfake
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-4"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="community"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-4"
              >
                <Users className="h-4 w-4 mr-2" />
                Community
              </TabsTrigger>
            </TabsList>

            {/* Home/Dashboard Tab */}
            <TabsContent value="home" className="mt-6">
              <div className="container mx-auto px-4 pb-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Combat Misinformation with AI
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    Real-time detection of fake news and deepfakes using advanced NLP and computer vision models. 
                    Protect yourself and others from misinformation.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button size="lg" onClick={() => setActiveTab("fake-news")}>
                      <Search className="h-5 w-5 mr-2" />
                      Analyze Content
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setActiveTab("deepfake")}>
                      <Upload className="h-5 w-5 mr-2" />
                      Check Media
                    </Button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {stats.map((stat, index) => (
                    <Card key={index} className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                          </div>
                          <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Alerts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                        Recent Alerts
                      </CardTitle>
                      <CardDescription>
                        Latest detected misinformation and deepfakes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentAlerts.map((alert, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                          <div className={`p-1 rounded-full ${
                            alert.type === 'fake-news' ? 'bg-red-100' : 'bg-orange-100'
                          }`}>
                            {alert.type === 'fake-news' ? 
                              <FileText className="h-4 w-4 text-red-600" /> : 
                              <Eye className="h-4 w-4 text-orange-600" />
                            }
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant={alert.confidence > 80 ? "destructive" : "secondary"}>
                                {alert.confidence}% confidence
                              </Badge>
                              <span className="text-xs text-gray-500">{alert.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>
                        Start analyzing content for misinformation
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button 
                        className="w-full justify-start h-auto p-4" 
                        variant="outline"
                        onClick={() => setActiveTab("fake-news")}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">Analyze News Article</p>
                            <p className="text-sm text-gray-600">Check headlines and content for fake news</p>
                          </div>
                        </div>
                      </Button>
                      
                      <Button 
                        className="w-full justify-start h-auto p-4" 
                        variant="outline"
                        onClick={() => setActiveTab("deepfake")}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Image className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">Detect Deepfakes</p>
                            <p className="text-sm text-gray-600">Scan images and videos for manipulation</p>
                          </div>
                        </div>
                      </Button>
                      
                      <Button 
                        className="w-full justify-start h-auto p-4" 
                        variant="outline"
                        onClick={() => setActiveTab("community")}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Users className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">Community Reports</p>
                            <p className="text-sm text-gray-600">View and contribute to community verification</p>
                          </div>
                        </div>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Fake News Detection Tab */}
            <TabsContent value="fake-news" className="mt-6">
              <div className="container mx-auto px-4 pb-8">
                <FakeNewsDetector />
              </div>
            </TabsContent>

            {/* Deepfake Detection Tab */}
            <TabsContent value="deepfake" className="mt-6">
              <div className="container mx-auto px-4 pb-8">
                <DeepfakeDetector />
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-6">
              <div className="container mx-auto px-4 pb-8">
                <UserDashboard />
              </div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community" className="mt-6">
              <div className="container mx-auto px-4 pb-8">
                <CommunityFeed />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </nav>
    </div>
  )
}
