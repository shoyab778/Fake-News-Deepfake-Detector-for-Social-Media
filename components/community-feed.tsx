"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageSquare, ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle, Flag, Share, Clock, TrendingUp, Eye, FileText, Plus } from 'lucide-react'

interface CommunityPost {
  id: number
  user: {
    name: string
    avatar: string
    reputation: number
  }
  type: "report" | "verification" | "discussion"
  title: string
  content: string
  contentType: "fake-news" | "deepfake" | "general"
  votes: {
    up: number
    down: number
    userVote?: "up" | "down"
  }
  comments: number
  timestamp: string
  status: "pending" | "verified" | "disputed"
  tags: string[]
}

export function CommunityFeed() {
  const [activeTab, setActiveTab] = useState("feed")
  const [newReport, setNewReport] = useState("")
  const [reportUrl, setReportUrl] = useState("")

  const communityPosts: CommunityPost[] = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        avatar: "/diverse-woman-portrait.png",
        reputation: 1250
      },
      type: "report",
      title: "Suspicious video circulating on social media",
      content: "Found this video claiming to show a recent event, but the facial movements look unnatural. The lighting seems inconsistent and there are visible artifacts around the mouth area.",
      contentType: "deepfake",
      votes: { up: 23, down: 2 },
      comments: 8,
      timestamp: "2 hours ago",
      status: "verified",
      tags: ["deepfake", "social-media", "urgent"]
    },
    {
      id: 2,
      user: {
        name: "Mike Rodriguez",
        avatar: "/thoughtful-man.png",
        reputation: 890
      },
      type: "verification",
      title: "Fact-check: Economic statistics claim",
      content: "I've verified this claim against official government data. The numbers cited in the article are accurate and match the latest economic reports from credible sources.",
      contentType: "fake-news",
      votes: { up: 45, down: 1 },
      comments: 12,
      timestamp: "4 hours ago",
      status: "verified",
      tags: ["economics", "fact-check", "verified"]
    },
    {
      id: 3,
      user: {
        name: "Dr. Emily Watson",
        avatar: "/caring-doctor.png",
        reputation: 2100
      },
      type: "discussion",
      title: "New deepfake detection techniques",
      content: "Sharing some insights on the latest research in deepfake detection. The new temporal consistency algorithms are showing promising results in identifying subtle manipulations.",
      contentType: "general",
      votes: { up: 67, down: 3 },
      comments: 24,
      timestamp: "6 hours ago",
      status: "verified",
      tags: ["research", "technology", "deepfake"]
    },
    {
      id: 4,
      user: {
        name: "Alex Thompson",
        avatar: "/diverse-group.png",
        reputation: 650
      },
      type: "report",
      title: "Misleading health article spreading rapidly",
      content: "This article contains several false claims about a medical treatment. I've cross-referenced with peer-reviewed studies and the claims don't hold up to scientific scrutiny.",
      contentType: "fake-news",
      votes: { up: 34, down: 5 },
      comments: 15,
      timestamp: "8 hours ago",
      status: "pending",
      tags: ["health", "misinformation", "urgent"]
    }
  ]

  const handleVote = (postId: number, voteType: "up" | "down") => {
    // Handle voting logic
    console.log(`Voted ${voteType} on post ${postId}`)
  }

  const submitReport = () => {
    // Handle report submission
    console.log("Submitting report:", { content: newReport, url: reportUrl })
    setNewReport("")
    setReportUrl("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="default" className="bg-green-100 text-green-800">Verified</Badge>
      case "disputed":
        return <Badge variant="destructive">Disputed</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "fake-news":
        return <FileText className="h-4 w-4" />
      case "deepfake":
        return <Eye className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Community Verification</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join our community of fact-checkers and help verify content. Report suspicious media and contribute to the fight against misinformation.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-700">12,847</p>
            <p className="text-sm text-blue-600">Active Members</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-700">3,291</p>
            <p className="text-sm text-green-600">Verified Reports</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-700">1,456</p>
            <p className="text-sm text-orange-600">Pending Reviews</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-700">89.2%</p>
            <p className="text-sm text-purple-600">Accuracy Rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="report">Submit Report</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        {/* Community Feed */}
        <TabsContent value="feed" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-6">
              {communityPosts.map((post) => (
                <Card key={post.id} className="border-0 shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{post.user.name}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {post.user.reputation} rep
                            </Badge>
                            <span className="text-xs text-gray-500">{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(post.status)}
                        <Badge variant="outline" className="flex items-center space-x-1">
                          {getContentTypeIcon(post.contentType)}
                          <span className="capitalize">{post.contentType.replace('-', ' ')}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(post.id, "up")}
                          className="flex items-center space-x-1"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.votes.up}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(post.id, "down")}
                          className="flex items-center space-x-1"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span>{post.votes.down}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Trending Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">#deepfake</span>
                    <Badge variant="outline">234 posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">#misinformation</span>
                    <Badge variant="outline">189 posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">#fact-check</span>
                    <Badge variant="outline">156 posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">#social-media</span>
                    <Badge variant="outline">98 posts</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p>Provide evidence for your claims</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p>Be respectful in discussions</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p>Cite credible sources</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p>Report suspicious content</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Submit Report */}
        <TabsContent value="report" className="space-y-6">
          <Card className="border-0 shadow-lg max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Submit New Report
              </CardTitle>
              <CardDescription>
                Help the community by reporting suspicious content or misinformation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Content URL (optional)</label>
                <Input
                  placeholder="https://example.com/suspicious-content"
                  value={reportUrl}
                  onChange={(e) => setReportUrl(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Report Description</label>
                <Textarea
                  placeholder="Describe what makes this content suspicious. Include details about inconsistencies, false claims, or manipulation signs you've noticed..."
                  value={newReport}
                  onChange={(e) => setNewReport(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Content Type</label>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Fake News
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Deepfake
                  </Button>
                  <Button variant="outline" size="sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Other
                  </Button>
                </div>
              </div>
              
              <Button onClick={submitReport} className="w-full" size="lg">
                <Flag className="h-4 w-4 mr-2" />
                Submit Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaderboard */}
        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Top Contributors
              </CardTitle>
              <CardDescription>
                Community members making the biggest impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Dr. Emily Watson", reputation: 2100, reports: 45, accuracy: 96.2 },
                  { name: "Sarah Chen", reputation: 1250, reports: 32, accuracy: 94.8 },
                  { name: "Mike Rodriguez", reputation: 890, reports: 28, accuracy: 92.1 },
                  { name: "Alex Thompson", reputation: 650, reports: 19, accuracy: 89.5 },
                  { name: "Lisa Park", reputation: 580, reports: 15, accuracy: 91.3 }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.reports} reports verified</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{user.reputation} rep</p>
                      <p className="text-sm text-gray-600">{user.accuracy}% accuracy</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
