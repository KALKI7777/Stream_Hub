"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Gamepad, Music, Palette, Code, Dumbbell, Camera } from "lucide-react"

const CATEGORIES = [
  {
    name: "Gaming",
    icon: Gamepad,
    color: "from-purple-500 to-indigo-600",
    viewers: "250K",
  },
  {
    name: "Music",
    icon: Music,
    color: "from-pink-500 to-rose-600",
    viewers: "120K",
  },
  {
    name: "Art",
    icon: Palette,
    color: "from-blue-500 to-cyan-600",
    viewers: "85K",
  },
  {
    name: "Tech",
    icon: Code,
    color: "from-green-500 to-emerald-600",
    viewers: "95K",
  },
  {
    name: "Fitness",
    icon: Dumbbell,
    color: "from-orange-500 to-red-600",
    viewers: "65K",
  },
  {
    name: "IRL",
    icon: Camera,
    color: "from-violet-500 to-purple-600",
    viewers: "180K",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Popular Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <Card className="relative overflow-hidden h-32 bg-gradient-to-br border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`} />
              <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
                <category.icon className="h-8 w-8 mb-2" />
                <h3 className="font-semibold text-sm">{category.name}</h3>
                <p className="text-xs opacity-80">{category.viewers} viewers</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 