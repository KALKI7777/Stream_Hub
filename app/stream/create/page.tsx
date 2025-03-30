"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, Camera, Mic, Settings, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

export default function CreateStreamPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [testingVideo, setTestingVideo] = useState(false)
  const [testingAudio, setTestingAudio] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleStartStream = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !category) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and select a category",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call to create stream
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Stream Created!",
        description: "Your stream is now live",
      })
      // Redirect to a mock stream page
      router.push("/stream/stream1")
    }, 2000)
  }

  const testVideo = () => {
    setTestingVideo(true)

    // Request camera access
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
        toast({
          title: "Camera Test",
          description: "Your camera is working properly!",
        })
      })
      .catch((err) => {
        console.error("Error accessing camera:", err)
        toast({
          title: "Camera Test Failed",
          description: "Could not access your camera. Please check permissions.",
          variant: "destructive",
        })
      })
      .finally(() => {
        setTimeout(() => setTestingVideo(false), 3000)
      })
  }

  const testAudio = () => {
    setTestingAudio(true)

    // Request microphone access
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        // Create audio context to visualize audio
        const audioContext = new AudioContext()
        const analyser = audioContext.createAnalyser()
        const microphone = audioContext.createMediaStreamSource(stream)
        microphone.connect(analyser)

        toast({
          title: "Microphone Test",
          description: "Your microphone is working properly!",
        })

        // Stop microphone after a few seconds
        setTimeout(() => {
          stream.getTracks().forEach((track) => track.stop())
          setTestingAudio(false)
        }, 3000)
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err)
        toast({
          title: "Microphone Test Failed",
          description: "Could not access your microphone. Please check permissions.",
          variant: "destructive",
        })
        setTestingAudio(false)
      })
  }

  const toggleAdvancedSettings = () => {
    setShowSettings(!showSettings)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="container mx-auto py-10">
        <motion.h1
          className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create Live Stream
        </motion.h1>

        <motion.p
          className="mb-8 text-indigo-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Set up your stream and go live in minutes
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="border-0 bg-gradient-to-br from-indigo-800/90 to-purple-900/90 backdrop-blur-sm text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Stream Setup</CardTitle>
                <CardDescription className="text-indigo-200">Configure your stream settings</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStartStream}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-indigo-100">
                        Stream Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter a catchy title for your stream"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="bg-indigo-950/50 border-indigo-700 text-white placeholder:text-indigo-400 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-indigo-100">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Tell viewers what your stream is about"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="bg-indigo-950/50 border-indigo-700 text-white placeholder:text-indigo-400 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-indigo-100">
                        Category
                      </Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger
                          id="category"
                          className="bg-indigo-950/50 border-indigo-700 text-white focus:ring-pink-500 focus:border-pink-500"
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-indigo-900 border-indigo-700 text-white">
                          <SelectItem value="gaming" className="focus:bg-indigo-800 text-white">
                            Gaming
                          </SelectItem>
                          <SelectItem value="music" className="focus:bg-indigo-800 text-white">
                            Music
                          </SelectItem>
                          <SelectItem value="cooking" className="focus:bg-indigo-800 text-white">
                            Cooking
                          </SelectItem>
                          <SelectItem value="art" className="focus:bg-indigo-800 text-white">
                            Art
                          </SelectItem>
                          <SelectItem value="technology" className="focus:bg-indigo-800 text-white">
                            Technology
                          </SelectItem>
                          <SelectItem value="fitness" className="focus:bg-indigo-800 text-white">
                            Fitness
                          </SelectItem>
                          <SelectItem value="just-chatting" className="focus:bg-indigo-800 text-white">
                            Just Chatting
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="private"
                        checked={isPrivate}
                        onCheckedChange={setIsPrivate}
                        className="data-[state=checked]:bg-pink-500"
                      />
                      <Label htmlFor="private" className="text-indigo-100">
                        Private Stream (Only accessible with link)
                      </Label>
                    </div>

                    <Alert className="bg-indigo-950/70 border-indigo-700">
                      <AlertCircle className="h-4 w-4 text-pink-500" />
                      <AlertTitle className="text-white">Stream Key</AlertTitle>
                      <AlertDescription className="text-indigo-200">
                        Your stream key is:{" "}
                        <span className="font-mono bg-indigo-950 p-1 rounded">XXXX-XXXX-XXXX-XXXX</span>
                        <br />
                        Keep this private! Use this key in your streaming software (OBS, Streamlabs, etc.)
                      </AlertDescription>
                    </Alert>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  onClick={handleStartStream}
                  disabled={isLoading || !title || !category}
                  className="bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 border-0 text-white"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span> Setting up...
                    </>
                  ) : (
                    "Start Streaming"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="mb-6 border-0 bg-gradient-to-br from-purple-800/90 to-pink-900/90 backdrop-blur-sm text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-white">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-md aspect-video flex items-center justify-center overflow-hidden">
                  {testingVideo ? (
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted />
                  ) : (
                    <Camera className="h-12 w-12 text-pink-500" />
                  )}
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={testVideo}
                      disabled={testingVideo}
                      className="border-pink-500 text-pink-500 hover:bg-pink-500/20 hover:text-pink-400"
                    >
                      {testingVideo ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <Camera className="h-4 w-4 mr-2" />
                          Test Video
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={testAudio}
                      disabled={testingAudio}
                      className="border-indigo-400 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300"
                    >
                      {testingAudio ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-2" />
                          Test Audio
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-indigo-800/90 to-purple-900/90 backdrop-blur-sm text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-white">Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="quality" className="text-indigo-100">
                      Stream Quality
                    </Label>
                    <Select defaultValue="720p">
                      <SelectTrigger id="quality" className="w-24 bg-indigo-950/50 border-indigo-700 text-white">
                        <SelectValue placeholder="Quality" />
                      </SelectTrigger>
                      <SelectContent className="bg-indigo-900 border-indigo-700 text-white">
                        <SelectItem value="1080p">1080p</SelectItem>
                        <SelectItem value="720p">720p</SelectItem>
                        <SelectItem value="480p">480p</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="latency" className="text-indigo-100">
                      Latency Mode
                    </Label>
                    <Select defaultValue="normal">
                      <SelectTrigger id="latency" className="w-24 bg-indigo-950/50 border-indigo-700 text-white">
                        <SelectValue placeholder="Latency" />
                      </SelectTrigger>
                      <SelectContent className="bg-indigo-900 border-indigo-700 text-white">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-indigo-400 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300"
                    onClick={toggleAdvancedSettings}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {showSettings ? "Hide Settings" : "More Settings"}
                  </Button>

                  {showSettings && (
                    <motion.div
                      className="space-y-4 mt-4 p-4 rounded-md bg-indigo-950/50 border border-indigo-700"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="bitrate" className="text-indigo-100">
                          Bitrate (kbps)
                        </Label>
                        <Select defaultValue="3000">
                          <SelectTrigger id="bitrate" className="bg-indigo-950/50 border-indigo-700 text-white">
                            <SelectValue placeholder="Bitrate" />
                          </SelectTrigger>
                          <SelectContent className="bg-indigo-900 border-indigo-700 text-white">
                            <SelectItem value="1500">1500</SelectItem>
                            <SelectItem value="3000">3000</SelectItem>
                            <SelectItem value="6000">6000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="framerate" className="text-indigo-100">
                          Frame Rate
                        </Label>
                        <Select defaultValue="30">
                          <SelectTrigger id="framerate" className="bg-indigo-950/50 border-indigo-700 text-white">
                            <SelectValue placeholder="FPS" />
                          </SelectTrigger>
                          <SelectContent className="bg-indigo-900 border-indigo-700 text-white">
                            <SelectItem value="24">24 fps</SelectItem>
                            <SelectItem value="30">30 fps</SelectItem>
                            <SelectItem value="60">60 fps</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="dvr" defaultChecked={true} className="data-[state=checked]:bg-pink-500" />
                        <Label htmlFor="dvr" className="text-indigo-100">
                          Enable DVR Mode (Allow Rewind)
                        </Label>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

