"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturedStreamer } from "@/components/featured-streamer"

// Mock data for streams
const MOCK_STREAMS = [
  {
    id: "stream1",
    title: "Gaming Marathon: New Releases",
    streamer: "GameMaster",
    category: "Gaming",
    viewers: 1245,
    thumbnail: "/placeholder.svg?height=200&width=350&text=Gaming+Marathon",
  },
  {
    id: "stream2",
    title: "Cooking Italian Classics",
    streamer: "ChefAlex",
    category: "Cooking",
    viewers: 876,
    thumbnail: "/placeholder.svg?height=200&width=350&text=Cooking+Stream",
  },
  {
    id: "stream3",
    title: "Music Production Workshop",
    streamer: "BeatMaker",
    category: "Music",
    viewers: 543,
    thumbnail: "/placeholder.svg?height=200&width=350&text=Music+Production",
  },
  {
    id: "stream4",
    title: "Art & Design: Digital Painting",
    streamer: "CreativeMinds",
    category: "Art",
    viewers: 321,
    thumbnail: "/placeholder.svg?height=200&width=350&text=Digital+Art",
  },
  {
    id: "stream5",
    title: "Tech Talk: AI Developments",
    streamer: "TechGuru",
    category: "Technology",
    viewers: 987,
    thumbnail: "/placeholder.svg?height=200&width=350&text=Tech+Talk",
  },
  {
    id: "stream6",
    title: "Fitness Session: HIIT Workout",
    streamer: "FitCoach",
    category: "Fitness",
    viewers: 654,
    thumbnail: "/placeholder.svg?height=200&width=350&text=Fitness+Session",
  },
]

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="container mx-auto py-10">
        <FeaturedStreamer />
        <CategoriesSection />
        
        <motion.h2
          className="text-2xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Live Channels
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_STREAMS.map((stream, index) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="h-full"
            >
              <Link href={`/stream/${stream.id}`} className="h-full block">
                <Card className="overflow-hidden h-full border-0 bg-gradient-to-br from-indigo-800/90 to-purple-900/90 backdrop-blur-sm text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
                  <div className="relative">
                    <img
                      src={stream.thumbnail || "/placeholder.svg"}
                      alt={stream.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 border-0 text-white animate-pulse">
                      LIVE
                    </Badge>
                    <Badge className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm border-0">
                      {stream.viewers.toLocaleString()} viewers
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white">{stream.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-indigo-200">{stream.streamer}</p>
                  </CardContent>
                  <CardFooter>
                    <Badge variant="outline" className="border-indigo-400 text-indigo-200">
                      {stream.category}
                    </Badge>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

