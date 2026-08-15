
"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const STATS = [
  { value: 100, label: "Projects Completed", suffix: "+", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop" },
  { value: 50, label: "Happy Clients", suffix: "+", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop" },
  { value: 12, label: "Core Services", suffix: "", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop" },
  { value: 24, label: "Support Available", suffix: "/7", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=400&fit=crop" }
]

export function StatsCarousel() {
  const [current, setCurrent] = useState(0)
  const [counts, setCounts] = useState(STATS.map(() => 0))

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % STATS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const target = STATS[current].value
    let start = 0
    const duration = 1500
    const increment = target / (duration / 16)
    
    const countTimer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCounts(prev => {
          const next = [...prev]
          next[current] = target
          return next
        })
        clearInterval(countTimer)
      } else {
        setCounts(prev => {
          const next = [...prev]
          next[current] = Math.floor(start)
          return next
        })
      }
    }, 16)

    return () => clearInterval(countTimer)
  }, [current])

  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-black">
      {STATS.map((stat, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
            index === current ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url(${stat.image})` }}
        >
          <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-[2px]" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl md:text-7xl font-black bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                {counts[index]}
              </span>
              <span className="text-3xl font-bold text-accent">{stat.suffix}</span>
            </div>
            <span className="mt-4 text-sm md:text-lg font-bold uppercase tracking-widest text-white/90">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {STATS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === current ? "w-8 bg-accent" : "w-2 bg-white/30"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
