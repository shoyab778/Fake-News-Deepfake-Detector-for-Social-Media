"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Link, AlertTriangle, CheckCircle, ExternalLink, FileText, Clock, TrendingUp, Users, Shield } from 'lucide-react'

interface AnalysisResult {
  confidence: number
  verdict: "fake" | "real" | "uncertain"
  explanation: string
  suspiciousWords: string[]
  sources: Array<{
    title: string
    url: string
    credibility: number
  }>
  factChecks: Array<{
    source: string
    verdict: string
    url: string
  }>
}

export function FakeNewsDetector() {
  const [inputText, setInputText] = useState("")
  const [inputUrl, setInputUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [activeTab, setActiveTab] = useState("text")

  const analyzeContent = async () => {
    setIsAnalyzing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock analysis result
    const mockResult: AnalysisResult = {
      confidence: Math.floor(Math.random() * 40) + 60, // 60-100%
      verdict: Math.random() > 0.3 ? "fake" : "real",
      explanation: "This content contains several indicators of misinformation including sensationalized language, lack of credible sources, and emotional manipulation tactics commonly used in fake news.",
      suspiciousWords: ["BREAKING", "SHOCKING", "MUST READ", "THEY DON'T WANT YOU TO KNOW"],
      sources: [
        {
          title: "Reuters - Fact Check",
          url: "https://reuters.com/fact-check",
          credibility: 95
        },
        {
          title: "Associated Press Verification",
          url: "https://apnews.com/hub/ap-fact-check",
          credibility: 92
        },
        {
          title: "Snopes Analysis",
          url: "https://snopes.com",
          credibility: 88
        }
      ],
      factChecks: [
        {
          source: "PolitiFact",
          verdict: "False",
          url: "https://politifact.com"
        },
        {
          source: "FactCheck.org",
          verdict: "Misleading",
          url: "https://factcheck.org"
        }
      ]
    }
    
    setResult(mockResult)
    setIsAnalyzing(false)
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "fake": return "text-red-600 bg-red-50 border-red-200"
      case "real": return "text-green-600 bg-green-50 border-green-200"
      default: return "text-yellow-600 bg-yellow-50 border-yellow-200"
    }
  }

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "fake": return <AlertTriangle className="h-5 w-5" />
      case "real": return <CheckCircle className="h-5 w-5" />
      default: return <Shield className="h-5 w-5" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Fake News Detection</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Analyze news articles, headlines, and content using advanced NLP models to detect misinformation and fake news.
        </p>
      </div>

      {/* Input Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Content Analysis
          </CardTitle>
          <CardDescription>
            Enter text content or provide a URL to analyze for fake news indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Text Analysis</TabsTrigger>
              <TabsTrigger value="url">URL Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Article Text or Headline</label>
                <Textarea
                  placeholder="Paste the news article content or headline here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Article URL</label>
                <Input
                  placeholder="https://example.com/news-article"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <Button 
            onClick={analyzeContent}
            disabled={isAnalyzing || (!inputText && !inputUrl)}
            className="w-full mt-4"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing Content...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Analyze for Fake News
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Result */}
          <div className="lg:col-span-2 space-y-6">
            <Card className={`border-2 ${getVerdictColor(result.verdict)}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getVerdictIcon(result.verdict)}
                    <span className="ml-2 capitalize">{result.verdict} News Detected</span>
                  </div>
                  <Badge variant={result.verdict === "fake" ? "destructive" : result.verdict === "real" ? "default" : "secondary"}>
                    {result.confidence}% Confidence
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Confidence Score</label>
                    <Progress value={result.confidence} className="h-3" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Analysis Explanation</label>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{result.explanation}</p>
                  </div>
                  
                  {result.suspiciousWords.length > 0 && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Suspicious Keywords</label>
                      <div className="flex flex-wrap gap-2">
                        {result.suspiciousWords.map((word, index) => (
                          <Badge key={index} variant="outline" className="text-red-600 border-red-200">
                            {word}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Fact Checks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Fact Check Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.factChecks.map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{check.source}</p>
                        <Badge variant={check.verdict === "False" ? "destructive" : "secondary"}>
                          {check.verdict}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={check.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Verified Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verified Sources</CardTitle>
                <CardDescription>
                  Credible sources for fact-checking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.sources.map((source, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium text-sm">{source.title}</p>
                        <Badge variant="outline">{source.credibility}%</Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-auto" asChild>
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          Visit Source <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detection Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <p>Check multiple sources before sharing</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                    <p>Verify publication date and context</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Users className="h-4 w-4 text-green-500 mt-0.5" />
                    <p>Look for author credentials</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <TrendingUp className="h-4 w-4 text-purple-500 mt-0.5" />
                    <p>Be wary of sensational headlines</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
