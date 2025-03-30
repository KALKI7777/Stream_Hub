"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Share2, Copy, Twitter, Facebook, Check } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

interface ShareModalProps {
  streamTitle: string
  streamer: string
  onClose: () => void
}

export default function ShareModal({ streamTitle, streamer, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast({
      title: "Link Copied!",
      description: "Stream link copied to clipboard",
      duration: 2000,
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareTwitter = () => {
    const text = `Watching ${streamer}'s stream: ${streamTitle}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank")
    onClose()
  }

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank")
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 bg-gradient-to-br from-indigo-800/90 to-purple-900/90 backdrop-blur-sm text-white shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-white">
            <Share2 className="h-5 w-5 mr-2 text-indigo-400" />
            Share Stream
          </DialogTitle>
          <DialogDescription className="text-indigo-200">
            Share this stream with your friends and followers
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Input value={shareUrl} readOnly className="bg-indigo-950/50 border-indigo-700 text-white" />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyLink}
              className="border-indigo-600 bg-indigo-900/50 text-indigo-300 hover:bg-indigo-800 hover:text-indigo-200"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShareTwitter}
              className="flex items-center justify-center space-x-2 p-3 rounded-md bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 text-white transition-colors"
            >
              <Twitter className="h-5 w-5 text-[#1DA1F2]" />
              <span>Twitter</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShareFacebook}
              className="flex items-center justify-center space-x-2 p-3 rounded-md bg-[#4267B2]/10 hover:bg-[#4267B2]/20 border border-[#4267B2]/30 text-white transition-colors"
            >
              <Facebook className="h-5 w-5 text-[#4267B2]" />
              <span>Facebook</span>
            </motion.button>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 border-0 text-white"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

