"use client"

import { useState } from "react"
import { Plus, AlertTriangle, Car, Zap, Calendar, Droplets, ShieldAlert, Fuel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import { EventType } from "@/lib/types"
import { cn } from "@/lib/utils"

const REPORT_TYPES: { type: EventType; icon: any; color: string }[] = [
  { type: 'Emergency', icon: AlertTriangle, color: 'bg-red-500' },
  { type: 'Traffic', icon: Car, color: 'bg-orange-500' },
  { type: 'Power outage', icon: Zap, color: 'bg-yellow-500' },
  { type: 'Event', icon: Calendar, color: 'bg-green-500' },
  { type: 'Flood', icon: Droplets, color: 'bg-blue-400' },
  { type: 'Crime', icon: ShieldAlert, color: 'bg-slate-700' },
  { type: 'Fuel shortage', icon: Fuel, color: 'bg-amber-600' },
]

export function QuickReport() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-xl shadow-primary/30 z-40 transition-transform active:scale-95"
          size="icon"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Pulse Report</DialogTitle>
          <DialogDescription>
            What is happening near you? Select a category to report.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          {REPORT_TYPES.map((item) => (
            <button
              key={item.type}
              onClick={() => setIsOpen(false)}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-secondary transition-colors group"
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110",
                item.color
              )}>
                <item.icon className="w-7 h-7" />
              </div>
              <span className="text-xs font-medium text-center leading-tight">{item.type}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}