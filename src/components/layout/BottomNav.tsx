
"use client"

import { Home, Layout, MessageSquare, Handshake, Tv, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Work', icon: Layout, href: '/projects' },
  { label: 'TV Solutions', icon: Tv, href: '/services/tv' },
  { label: 'Partner', icon: Handshake, href: '/partnership' },
  { label: 'Contact', icon: MessageSquare, href: '/contact' },
]

export function BottomNav() {
  const pathname = usePathname()
  
  return (
    <>
      {/* Floating Call Button for Mobile */}
      <a 
        href="tel:+256753998891"
        className="fixed bottom-24 right-6 z-[1200] lg:hidden w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/40 border-4 border-white active:scale-95 transition-transform"
        aria-label="Call CodeCast UG"
      >
        <Phone className="w-6 h-6 fill-white/20" />
      </a>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[1200] lg:hidden bg-white/95 backdrop-blur-md border-t h-20 px-2 flex items-center justify-between pb-safe">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          // Specialized styling for the middle TV Solutions tab to make it stand out
          const isMiddle = item.label === 'TV Solutions'

          return (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-all flex-1 py-2",
                isActive ? "text-primary scale-105" : "text-muted-foreground",
                isMiddle && "relative"
              )}
            >
              <div className={cn(
                "p-1 rounded-lg transition-colors",
                isMiddle && "bg-secondary text-primary"
              )}>
                <item.icon className={cn("w-5 h-5", isActive && "fill-primary/10")} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-tighter text-center whitespace-nowrap">
                {item.label}
              </span>
              {isActive && !isMiddle && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </div>
    </>
  )
}
