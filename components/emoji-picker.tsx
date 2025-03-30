"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  onClose: () => void
}

// Common emojis for streaming
const EMOJIS = [
  "😀",
  "😂",
  "🤣",
  "😍",
  "🥰",
  "😎",
  "🤩",
  "😮",
  "😱",
  "👍",
  "👎",
  "👏",
  "🙌",
  "🔥",
  "💯",
  "❤️",
  "💔",
  "💪",
  "🎮",
  "🎯",
  "🏆",
  "🎸",
  "🎬",
  "🎨",
  "🎭",
  "🎤",
  "🎧",
  "🤔",
  "🧐",
  "🤯",
  "😴",
  "😭",
  "😡",
  "🤬",
  "🤮",
  "🤢",
  "🍕",
  "🍔",
  "🍟",
  "🍩",
  "🍦",
  "🍺",
  "🍷",
  "☕",
  "🍿",
]

export default function EmojiPicker({ onEmojiSelect, onClose }: EmojiPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <motion.div
      ref={pickerRef}
      className="absolute bottom-14 left-0 z-50 p-2 rounded-md shadow-lg bg-indigo-900 border border-indigo-700 w-64"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-8 gap-1">
        {EMOJIS.map((emoji, index) => (
          <button
            key={index}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-indigo-800 transition-colors"
            onClick={() => onEmojiSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

