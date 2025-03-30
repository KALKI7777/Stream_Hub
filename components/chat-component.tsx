"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Smile, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import EmojiPicker from "@/components/emoji-picker"

// Mock user data
const CURRENT_USER = {
  id: "user1",
  name: "CurrentUser",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
}

// Mock chat messages
const INITIAL_MESSAGES = [
  {
    id: "msg1",
    userId: "user2",
    username: "StreamFan123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=StreamFan123",
    content: "Hey everyone! Excited for today's stream!",
    timestamp: new Date(Date.now() - 300000),
    isSubscriber: true,
  },
  {
    id: "msg2",
    userId: "user3",
    username: "GameLover",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GameLover",
    content: "What game are we playing today?",
    timestamp: new Date(Date.now() - 240000),
    isSubscriber: false,
  },
  {
    id: "msg3",
    userId: "user4",
    username: "TechWizard",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechWizard",
    content: "The graphics look amazing on this game!",
    timestamp: new Date(Date.now() - 180000),
    isSubscriber: true,
    isDonator: true,
  },
  {
    id: "msg4",
    userId: "user5",
    username: "CasualGamer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CasualGamer",
    content: "First time catching your stream live!",
    timestamp: new Date(Date.now() - 120000),
    isSubscriber: false,
  },
  {
    id: "msg5",
    userId: "user6",
    username: "StreamerFriend",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=StreamerFriend",
    content: "Good luck with the stream today!",
    timestamp: new Date(Date.now() - 60000),
    isSubscriber: true,
    isModerator: true,
  },
]

// Mock automated messages to simulate chat activity
const AUTO_MESSAGES = [
  "This is so cool!",
  "Great stream today!",
  "Can you explain that again?",
  "LOL 😂",
  "Wow, nice move!",
  "I've been following for months, love your content!",
  "What settings are you using?",
  "Hello from Germany!",
  "First time here, this is awesome",
  "Do you stream every day?",
]

// Mock usernames for automated messages
const AUTO_USERNAMES = [
  "GameEnthusiast",
  "StreamViewer",
  "DigitalNomad",
  "TechFan",
  "CasualWatcher",
  "ContentLover",
  "NewFollower",
  "RegularViewer",
  "GamingPro",
  "ChillVibes",
]

interface ChatMessage {
  id: string
  userId: string
  username: string
  avatar: string
  content: string
  timestamp: Date
  isSubscriber?: boolean
  isDonator?: boolean
  isModerator?: boolean
}

interface ChatComponentProps {
  streamId: string
}

export default function ChatComponent({ streamId }: ChatComponentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate incoming chat messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        // 50% chance to add a message
        const randomUserIndex = Math.floor(Math.random() * AUTO_USERNAMES.length)
        const randomMessageIndex = Math.floor(Math.random() * AUTO_MESSAGES.length)
        const username = AUTO_USERNAMES[randomUserIndex]

        const newMessage: ChatMessage = {
          id: `auto-${Date.now()}`,
          userId: `auto-user-${randomUserIndex}`,
          username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          content: AUTO_MESSAGES[randomMessageIndex],
          timestamp: new Date(),
          isSubscriber: Math.random() > 0.7,
          isDonator: Math.random() > 0.9,
          isModerator: Math.random() > 0.95,
        }

        setMessages((prev) => [...prev, newMessage])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const newMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      userId: CURRENT_USER.id,
      username: CURRENT_USER.name,
      avatar: CURRENT_USER.avatar,
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setShowEmojiPicker(false)
  }

  const handleEmojiSelect = (emoji: string) => {
    setInput((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  return (
    <>
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 mb-4 bg-gradient-to-b from-transparent to-indigo-900/30"
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className="flex items-start space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar className="h-8 w-8 ring-1 ring-indigo-500/50">
                <AvatarImage src={message.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-pink-500 to-indigo-600 text-white">
                  {message.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-sm text-white">{message.username}</span>
                  {message.isModerator && (
                    <Badge variant="outline" className="text-xs bg-green-500 text-white border-0 px-1.5 py-0">
                      MOD
                    </Badge>
                  )}
                  {message.isSubscriber && !message.isModerator && (
                    <Badge variant="outline" className="text-xs bg-purple-500 text-white border-0 px-1.5 py-0">
                      SUB
                    </Badge>
                  )}
                  {message.isDonator && (
                    <Badge variant="outline" className="text-xs bg-yellow-500 text-white border-0 px-1.5 py-0">
                      DONOR
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-indigo-100">{message.content}</p>
                <span className="text-xs text-indigo-300">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-indigo-700/50 bg-indigo-900/50">
        <form onSubmit={handleSendMessage} className="flex space-x-2 relative">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0 border-indigo-600 bg-indigo-900/50 text-pink-400 hover:bg-indigo-800 hover:text-pink-300"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-indigo-950/50 border-indigo-700 text-white placeholder:text-indigo-400 focus:ring-pink-500 focus:border-pink-500"
          />
          <Button
            type="submit"
            size="icon"
            className="shrink-0 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 border-0"
          >
            <Send className="h-5 w-5" />
          </Button>

          {showEmojiPicker && (
            <EmojiPicker onEmojiSelect={handleEmojiSelect} onClose={() => setShowEmojiPicker(false)} />
          )}
        </form>
      </div>
    </>
  )
}

