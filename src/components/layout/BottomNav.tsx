"use client"

import { Home, User, Briefcase, Layout, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'About', icon: User, href: '/about' },
  { label: 'Services', icon: Briefcase, href: '/services' },
  { label: 'Projects', icon: Layout, href: '/projects' },
  { label: 'Contact', icon: MessageSquare, href: '/contact' },
]

export function BottomNav() {
  const pathname = usePathname()
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t h-20 px-4 flex items-center justify-between pb-safe">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link 
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all flex-1",
              isActive ? "text-primary scale-110" : "text-muted-foreground"
            )}
          >
            <item.icon className={cn("w-5 h-5", isActive && "fill-primary/10")} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}