
"use client"

import { Home, Briefcase, Layout, MessageSquare, Handshake } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Projects', icon: Layout, href: '/projects' },
  { label: 'Partnership', icon: Handshake, href: '/partnership' },
  { label: 'Contact', icon: MessageSquare, href: '/contact' },
]

export function BottomNav() {
  const pathname = usePathname()
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1200] lg:hidden bg-white/95 backdrop-blur-md border-t h-20 px-4 flex items-center justify-between pb-safe">
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
      <a 
        href="tel:+256753998891"
        className="flex flex-col items-center gap-1 transition-all flex-1 text-muted-foreground"
      >
        <div className="h-5 w-5 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
      </a>
    </div>
  )
}
