"use client"

import { INITIAL_REPORTS } from "@/lib/mock-data"
import { PulseReport } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, MapPin, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const CATEGORY_COLORS: Record<string, string> = {
  Emergency: 'bg-red-500/10 text-red-600',
  Traffic: 'bg-orange-500/10 text-orange-600',
  'Power outage': 'bg-yellow-500/10 text-yellow-600',
  Event: 'bg-green-500/10 text-green-600',
}

export function PulseFeed() {
  return (
    <div className="space-y-4 pb-24">
      <div className="flex items-center justify-between px-2 mb-4">
        <h2 className="text-lg font-bold">Recent Pulses</h2>
        <Button variant="link" size="sm" className="text-primary p-0">View All</Button>
      </div>

      {INITIAL_REPORTS.map((pulse) => (
        <Card key={pulse.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge className={cn("rounded-full border-none", CATEGORY_COLORS[pulse.type] || 'bg-secondary text-secondary-foreground')}>
                  {pulse.type}
                </Badge>
                {pulse.isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-primary fill-primary/10" />
                )}
              </div>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                {new Date(pulse.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <p className="text-sm text-foreground/90 leading-relaxed mb-4">
              {pulse.description}
            </p>

            {pulse.photoUrl && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                <Image 
                  src={pulse.photoUrl} 
                  alt="Pulse media" 
                  fill 
                  className="object-cover"
                  data-ai-hint="city incident"
                />
              </div>
            )}

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-4">
              <MapPin className="w-3 h-3" />
              <span>{pulse.latitude.toFixed(4)}, {pulse.longitude.toFixed(4)}</span>
              <span className="mx-1">•</span>
              <span>Reported by {pulse.userName}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 px-2 gap-1.5 hover:text-primary">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-xs">{pulse.confirmations}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 gap-1.5 hover:text-destructive">
                  <ThumbsDown className="w-4 h-4" />
                  <span className="text-xs">{pulse.denials}</span>
                </Button>
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}