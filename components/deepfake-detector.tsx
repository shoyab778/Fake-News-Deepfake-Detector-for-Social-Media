"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, ImageIcon, Video, AlertTriangle, CheckCircle, Eye, Camera, FileImage, Play, Download, Share, Zap } from 'lucide-react'

interface DeepfakeResult {
  confidence: number
  verdict: "deepfake" | "authentic" | "uncertain"
  explanation: string
  suspiciousRegions: Array<{
    region: string
    confidence: number
    description: string
  }>
  technicalDetails: {
    resolution: string
    frameRate?: string
    compressionArtifacts: boolean
    inconsistentLighting: boolean
    unnaturalMovement: boolean
  }
}

export function DeepfakeDetector() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DeepfakeResult | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setResult(null)
    }
  }

  const analyzeMedia = async () => {
    if (!selectedFile) return
    
    setIsAnalyzing(true)
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 4000))
    
    // Mock result
    const mockResult: DeepfakeResult = {
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
      verdict: Math.random() > 0.4 ? "deepfake" : "authentic",
      explanation: "Analysis detected inconsistencies in facial landmarks, unnatural eye movements, and compression artifacts typical of deepfake generation. The temporal consistency analysis revealed frame-to-frame inconsistencies in facial features.",
      suspiciousRegions: [
        {
          region: "Eye Region",
          confidence: 87,
          description: "Unnatural blinking patterns and inconsistent eye reflections"
        },
        {
          region: "Mouth Area",
          confidence: 73,
          description: "Lip-sync inconsistencies and unnatural teeth appearance"
        },
        {
          region: "Face Boundary",
          confidence: 65,
          description: "Blending artifacts around face edges"
        }
      ],
      technicalDetails: {
        resolution: "1920x1080",
        frameRate: selectedFile.type.includes('video') ? "30 fps" : undefined,
        compressionArtifacts: true,
        inconsistentLighting: true,
        unnaturalMovement: selectedFile.type.includes('video') ? true : false
      }
    }
    
    setResult(mockResult)
    setIsAnalyzing(false)
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "deepfake": return "text-red-600 bg-red-50 border-red-200"
      case "authentic": return "text-green-600 bg-green-50 border-green-200"
      default: return "text-yellow-600 bg-yellow-50 border-yellow-200"
    }
  }

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "deepfake": return <AlertTriangle className="h-5 w-5" />
      case "authentic": return <CheckCircle className="h-5 w-5" />
      default: return <Eye className="h-5 w-5" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Deepfake Detection</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload images or videos to detect AI-generated deepfakes using advanced computer vision and neural network analysis.
        </p>
      </div>

      {/* Upload Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Media Upload
          </CardTitle>
          <CardDescription>
            Upload an image or video file to analyze for deepfake manipulation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">File Upload</TabsTrigger>
              <TabsTrigger value="camera">Camera Capture</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {previewUrl ? (
                  <div className="space-y-4">
                    {selectedFile?.type.startsWith('image/') ? (
                      <img 
                        src={previewUrl || "/placeholder.svg"} 
                        alt="Preview" 
                        className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                      />
                    ) : (
                      <video 
                        src={previewUrl} 
                        controls 
                        className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                      />
                    )}
                    <div className="flex items-center justify-center space-x-2">
                      <FileImage className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{selectedFile?.name}</span>
                      <Badge variant="outline">
                        {(selectedFile?.size || 0) > 1024 * 1024 
                          ? `${((selectedFile?.size || 0) / (1024 * 1024)).toFixed(1)} MB`
                          : `${((selectedFile?.size || 0) / 1024).toFixed(1)} KB`
                        }
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">Upload media file</p>
                      <p className="text-gray-600">Drag and drop or click to select</p>
                      <p className="text-sm text-gray-500 mt-2">Supports: JPG, PNG, MP4, MOV (Max 50MB)</p>
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="mt-4"
                >
                  {previewUrl ? "Change File" : "Select File"}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="camera" className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">Camera Capture</p>
                <p className="text-gray-600 mb-4">Take a photo or record video directly</p>
                <Button variant="outline" disabled>
                  <Camera className="h-4 w-4 mr-2" />
                  Open Camera (Demo)
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <Button 
            onClick={analyzeMedia}
            disabled={isAnalyzing || !selectedFile}
            className="w-full mt-4"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing Media...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Detect Deepfakes
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
                    <span className="ml-2 capitalize">
                      {result.verdict === "deepfake" ? "Deepfake Detected" : 
                       result.verdict === "authentic" ? "Authentic Media" : "Uncertain Result"}
                    </span>
                  </div>
                  <Badge variant={result.verdict === "deepfake" ? "destructive" : result.verdict === "authentic" ? "default" : "secondary"}>
                    {result.confidence}% Confidence
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Detection Confidence</label>
                    <Progress value={result.confidence} className="h-3" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Analysis Details</label>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{result.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Suspicious Regions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Suspicious Regions
                </CardTitle>
                <CardDescription>
                  Areas of the media that show signs of manipulation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.suspiciousRegions.map((region, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{region.region}</h4>
                        <Badge variant={region.confidence > 80 ? "destructive" : "secondary"}>
                          {region.confidence}% suspicious
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{region.description}</p>
                      <Progress value={region.confidence} className="h-2 mt-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technical Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Resolution:</span>
                      <span className="text-sm">{result.technicalDetails.resolution}</span>
                    </div>
                    {result.technicalDetails.frameRate && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Frame Rate:</span>
                        <span className="text-sm">{result.technicalDetails.frameRate}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Compression Artifacts:</span>
                      <Badge variant={result.technicalDetails.compressionArtifacts ? "destructive" : "default"}>
                        {result.technicalDetails.compressionArtifacts ? "Detected" : "None"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Inconsistent Lighting:</span>
                      <Badge variant={result.technicalDetails.inconsistentLighting ? "destructive" : "default"}>
                        {result.technicalDetails.inconsistentLighting ? "Yes" : "No"}
                      </Badge>
                    </div>
                    {result.technicalDetails.unnaturalMovement !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Unnatural Movement:</span>
                        <Badge variant={result.technicalDetails.unnaturalMovement ? "destructive" : "default"}>
                          {result.technicalDetails.unnaturalMovement ? "Detected" : "Natural"}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share className="h-4 w-4 mr-2" />
                  Share Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report Content
                </Button>
              </CardContent>
            </Card>

            {/* Detection Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detection Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Facial Landmark Analysis</p>
                      <p className="text-gray-600">XceptionNet CNN model</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Temporal Consistency</p>
                      <p className="text-gray-600">Frame-to-frame analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Compression Artifacts</p>
                      <p className="text-gray-600">MesoNet detection</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Physiological Signals</p>
                      <p className="text-gray-600">Pulse and blink analysis</p>
                    </div>
                  </div>
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
                    <Eye className="h-4 w-4 text-blue-500 mt-0.5" />
                    <p>Look for unnatural eye movements or blinking</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Video className="h-4 w-4 text-green-500 mt-0.5" />
                    <p>Check for lip-sync inconsistencies</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <ImageIcon className="h-4 w-4 text-purple-500 mt-0.5" />
                    <p>Examine face boundaries and edges</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <p>Be cautious of low-quality or compressed media</p>
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
