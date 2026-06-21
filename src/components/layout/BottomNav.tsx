"use client"

import { Map as MapIcon, Rss, Heart, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { label: 'Map', icon: MapIcon, href: '/' },
  { label: 'Feed', icon: Rss, href: '/feed' },
  { label: 'Saved', icon: Heart, href: '/saved' },
  { label: 'Profile', icon: Settings, href: '/profile' },
]

export function BottomNav() {
  const pathname = usePathname()
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t h-20 px-6 flex items-center justify-between pb-4">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link 
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className={cn("w-6 h-6", isActive && "fill-primary/10")} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
