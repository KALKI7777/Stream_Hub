"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Home, Compass, Video, Settings, LogOut } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-sm border-b border-indigo-800/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-400">
            StreamHub
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <Button variant="ghost" className="text-indigo-100 hover:text-white hover:bg-indigo-800/50">
              <Home className="h-5 w-5 mr-2" />
              Home
            </Button>
          </Link>
          <Link href="/browse">
            <Button variant="ghost" className="text-indigo-100 hover:text-white hover:bg-indigo-800/50">
              <Compass className="h-5 w-5 mr-2" />
              Browse
            </Button>
          </Link>
          <Link href="/stream/create">
            <Button className="bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700">
              <Video className="h-5 w-5 mr-2" />
              Go Live
            </Button>
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-gradient-to-br from-pink-500 to-indigo-600">
                  U
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-indigo-900 border-indigo-800 text-white">
            <DropdownMenuItem className="hover:bg-indigo-800">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-indigo-800 text-red-400 hover:text-red-300">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
} 