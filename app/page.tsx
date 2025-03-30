"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="container mx-auto py-10">
        <motion.h1
          className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          StreamHub
        </motion.h1>

        <motion.p
          className="text-center text-xl mb-10 text-indigo-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Create, watch, and interact with live streams
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="shadow-xl border-0 overflow-hidden bg-gradient-to-br from-indigo-800/90 to-purple-900/90 backdrop-blur-sm text-white hover:shadow-indigo-500/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl">Start Streaming</CardTitle>
                <CardDescription className="text-indigo-200">
                  Create your own live stream and connect with viewers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/placeholder.svg?height=200&width=400&text=Go+Live"
                  alt="Streaming illustration"
                  className="rounded-md w-full h-48 object-cover mb-4 bg-gradient-to-r from-pink-500 to-indigo-600"
                />
                <p className="text-indigo-100">
                  Share your content with the world. Easy setup with our streaming tools.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/stream/create" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 border-0 text-white">
                    Go Live
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="shadow-xl border-0 overflow-hidden bg-gradient-to-br from-purple-800/90 to-pink-900/90 backdrop-blur-sm text-white hover:shadow-pink-500/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl">Watch Streams</CardTitle>
                <CardDescription className="text-pink-200">Discover live content from creators</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/placeholder.svg?height=200&width=400&text=Watch+Now"
                  alt="Watching illustration"
                  className="rounded-md w-full h-48 object-cover mb-4 bg-gradient-to-r from-indigo-600 to-pink-500"
                />
                <p className="text-pink-100">Find your favorite streamers and join interactive live sessions.</p>
              </CardContent>
              <CardFooter>
                <Link href="/browse" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 border-0 text-white">
                    Browse Streams
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

