"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, Users } from "lucide-react"

export function FeaturedStreamer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-xl overflow-hidden mb-8"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
      <img
        src="/placeholder.svg?height=400&width=1200"
        alt="Featured Stream"
        className="w-full h-[400px] object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-pink-500 ring-offset-2 ring-offset-black">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>FS</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">Epic Gaming Marathon</h2>
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="outline" className="bg-pink-500/20 text-pink-300 border-pink-500">
                <Users className="w-4 h-4 mr-1" />
                12.5K Watching
              </Badge>
              <Badge variant="outline" className="bg-indigo-500/20 text-indigo-300 border-indigo-500">
                Gaming
              </Badge>
            </div>
            <p className="text-gray-200 max-w-2xl mb-4">
              Join GameMaster on an epic gaming adventure! Featuring the latest releases and community challenges.
            </p>
            <div className="flex items-center gap-4">
              <Button className="bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700">
                Watch Now
              </Button>
              <Button variant="outline" className="border-pink-500 text-pink-400 hover:bg-pink-500/20">
                <Heart className="w-4 h-4 mr-2" />
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 