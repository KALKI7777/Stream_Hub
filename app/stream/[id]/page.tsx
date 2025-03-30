"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, DollarSign, Share2, Users } from "lucide-react"
import ChatComponent from "@/components/chat-component"
import DonationModal from "@/components/donation-modal"
import ShareModal from "@/components/share-modal"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

// Mock data for the stream
const MOCK_STREAM_DATA = {
  stream1: {
    title: "Gaming Marathon: New Releases",
    streamer: "GameMaster",
    category: "Gaming",
    viewers: 1245,
    description: "Join me as we explore the latest game releases and discuss gaming news!",
  },
  stream2: {
    title: "Cooking Italian Classics",
    streamer: "ChefAlex",
    category: "Cooking",
    viewers: 876,
    description: "Learn how to make authentic Italian pasta and sauces from scratch.",
  },
  stream3: {
    title: "Music Production Workshop",
    streamer: "BeatMaker",
    category: "Music",
    viewers: 543,
    description: "Tips and tricks for producing professional-sounding music at home.",
  },
  stream4: {
    title: "Art & Design: Digital Painting",
    streamer: "CreativeMinds",
    category: "Art",
    viewers: 321,
    description: "Digital painting techniques for beginners and intermediate artists.",
  },
  stream5: {
    title: "Tech Talk: AI Developments",
    streamer: "TechGuru",
    category: "Technology",
    viewers: 987,
    description: "Discussing the latest developments in artificial intelligence and machine learning.",
  },
  stream6: {
    title: "Fitness Session: HIIT Workout",
    streamer: "FitCoach",
    category: "Fitness",
    viewers: 654,
    description: "High-intensity interval training for all fitness levels.",
  },
}

export default function StreamPage() {
  const params = useParams()
  const streamId = params.id as string
  const streamData = MOCK_STREAM_DATA[streamId as keyof typeof MOCK_STREAM_DATA] || {
    title: "Unknown Stream",
    streamer: "Unknown",
    category: "Miscellaneous",
    viewers: 0,
    description: "No description available.",
  }

  const [isLiked, setIsLiked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [viewerCount, setViewerCount] = useState(streamData.viewers)
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Simulate random viewer count changes
    const interval = setInterval(() => {
      setViewerCount((prev) => Math.max(0, prev + Math.floor(Math.random() * 11) - 5))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // This would normally connect to a real streaming service
    // For demo purposes, we're just showing a placeholder
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Autoplay prevented:", e))
    }
  }, [])

  const toggleLike = () => {
    setIsLiked(!isLiked)
    if (!isLiked) {
      toast({
        title: "Stream Liked!",
        description: "You've liked this stream",
        duration: 2000,
      })
    }
  }

  const toggleFollow = () => {
    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? "Unfollowed" : "Following!",
      description: isFollowing
        ? `You've unfollowed ${streamData.streamer}`
        : `You're now following ${streamData.streamer}!`,
      duration: 2000,
    })
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - video and stream info */}
          <div className="lg:col-span-2">
            <motion.div
              className="relative bg-black rounded-lg overflow-hidden aspect-video shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                poster="/placeholder.svg?height=720&width=1280&text=Live+Stream"
                controls
                muted
                loop
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>

            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-white">{streamData.title}</h1>
                  <div className="flex items-center mt-2 space-x-2">
                    <Badge variant="outline" className="border-indigo-400 text-indigo-200">
                      {streamData.category}
                    </Badge>
                    <div className="flex items-center text-sm text-indigo-200">
                      <Users className="h-4 w-4 mr-1" />
                      {viewerCount.toLocaleString()} viewers
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleLike}
                    className={`border-pink-500 ${isLiked ? "bg-pink-500/20" : "bg-transparent"} hover:bg-pink-500/30 transition-all duration-300`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-pink-500 text-pink-500" : "text-pink-500"}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleShare}
                    className="border-indigo-400 bg-transparent hover:bg-indigo-500/30 text-indigo-300 transition-all duration-300"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => setShowDonationModal(true)}
                    className="bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 border-0 text-white transition-all duration-300"
                  >
                    <DollarSign className="h-5 w-5 mr-2" /> Donate
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex items-center">
                <Avatar className="h-12 w-12 ring-2 ring-pink-500 ring-offset-2 ring-offset-indigo-900">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${streamData.streamer}`} />
                  <AvatarFallback className="bg-gradient-to-br from-pink-500 to-indigo-600 text-white">
                    {streamData.streamer.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h3 className="font-semibold text-white">{streamData.streamer}</h3>
                  <Button
                    variant={isFollowing ? "default" : "outline"}
                    size="sm"
                    onClick={toggleFollow}
                    className={
                      isFollowing
                        ? "bg-pink-500 hover:bg-pink-600 text-white"
                        : "border-pink-500 text-pink-500 hover:bg-pink-500/20"
                    }
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="about" className="mt-6">
                <TabsList className="bg-indigo-800/50 border border-indigo-700">
                  <TabsTrigger
                    value="about"
                    className="data-[state=active]:bg-indigo-700 text-indigo-200 data-[state=active]:text-white"
                  >
                    About
                  </TabsTrigger>
                  <TabsTrigger
                    value="schedule"
                    className="data-[state=active]:bg-indigo-700 text-indigo-200 data-[state=active]:text-white"
                  >
                    Schedule
                  </TabsTrigger>
                  <TabsTrigger
                    value="videos"
                    className="data-[state=active]:bg-indigo-700 text-indigo-200 data-[state=active]:text-white"
                  >
                    Videos
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="mt-4 text-indigo-100">
                  <p>{streamData.description}</p>
                </TabsContent>
                <TabsContent value="schedule" className="mt-4 text-indigo-100">
                  <p>Upcoming streams schedule will appear here.</p>
                </TabsContent>
                <TabsContent value="videos" className="mt-4 text-indigo-100">
                  <p>Past broadcasts and highlights will appear here.</p>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Chat sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="h-full border-0 bg-gradient-to-br from-indigo-800/90 to-purple-900/90 backdrop-blur-sm text-white shadow-xl">
              <CardHeader className="pb-3 border-b border-indigo-700/50">
                <CardTitle className="text-lg flex items-center text-white">
                  <MessageSquare className="h-5 w-5 mr-2 text-pink-400" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100vh-16rem)] flex flex-col p-0">
                <ChatComponent streamId={streamId} />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <AnimatePresence>
          {showDonationModal && (
            <DonationModal streamer={streamData.streamer} onClose={() => setShowDonationModal(false)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showShareModal && (
            <ShareModal
              streamTitle={streamData.title}
              streamer={streamData.streamer}
              onClose={() => setShowShareModal(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

