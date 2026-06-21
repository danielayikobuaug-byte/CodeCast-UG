"use client"

import { Search, Bell, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b px-4 h-16 flex items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
        </div>
        <span className="font-headline font-bold text-xl tracking-tighter text-primary">STREET PULSE</span>
      </Link>
      
      <div className="hidden md:flex flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search areas, events, or pulses..." 
          className="pl-10 bg-secondary/50 border-none rounded-full"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle className="w-6 h-6" />
        </Button>
      </div>
    </nav>
  )
}