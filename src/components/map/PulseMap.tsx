"use client"

import { useEffect, useState } from "react"
import { PulseReport } from "@/lib/types"
import { INITIAL_REPORTS } from "@/lib/mock-data"
import { AlertTriangle, Car, Zap, Calendar, Droplets, ShieldAlert, Fuel, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const TYPE_ICONS: Record<string, any> = {
  Emergency: AlertTriangle,
  Traffic: Car,
  'Power outage': Zap,
  Event: Calendar,
  Flood: Droplets,
  Crime: ShieldAlert,
  'Fuel shortage': Fuel,
}

const TYPE_COLORS: Record<string, string> = {
  Emergency: 'text-red-500 bg-red-500',
  Traffic: 'text-orange-500 bg-orange-500',
  'Power outage': 'text-yellow-500 bg-yellow-500',
  Event: 'text-green-500 bg-green-500',
  Flood: 'text-blue-400 bg-blue-400',
  Crime: 'text-slate-700 bg-slate-700',
  'Fuel shortage': 'text-amber-600 bg-amber-600',
}

export function PulseMap() {
  const [reports] = useState<PulseReport[]>(INITIAL_REPORTS)
  const [selectedPulse, setSelectedPulse] = useState<PulseReport | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return <div className="w-full h-full bg-secondary animate-pulse" />

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#E8E8EF] map-gradient">
      {/* Mock Map Background Grid */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Pins */}
      {reports.map((report) => {
        const Icon = TYPE_ICONS[report.type] || Info
        // Simplified mapping for visual representation in this mock
        const left = (report.longitude - 32.5) * 400 + 50
        const top = (report.latitude - 0.3) * 800 + 40

        return (
          <button
            key={report.id}
            onClick={() => setSelectedPulse(report)}
            className="absolute transition-transform hover:scale-110 active:scale-90"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <div className="relative">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white",
                TYPE_COLORS[report.type].split(' ')[1]
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <div className={cn(
                "absolute -inset-1 rounded-full animate-ping opacity-30",
                TYPE_COLORS[report.type].split(' ')[1]
              )} />
            </div>
          </button>
        )
      })}

      {/* Selected Pulse Detail Card */}
      {selectedPulse && (
        <Card className="absolute bottom-6 left-6 right-6 p-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start gap-4">
            <div className={cn(
              "p-3 rounded-xl text-white",
              TYPE_COLORS[selectedPulse.type].split(' ')[1]
            )}>
              {(() => {
                const Icon = TYPE_ICONS[selectedPulse.type] || Info
                return <Icon className="w-6 h-6" />
              })()}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-headline font-bold">{selectedPulse.type}</h3>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  {new Date(selectedPulse.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {selectedPulse.description}
              </p>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" className="flex-1 text-xs">Confirm</Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => setSelectedPulse(null)}>Dismiss</Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Map Controls */}
      <div className="absolute top-20 right-4 flex flex-col gap-2">
        <Button size="icon" variant="secondary" className="bg-background shadow-md">
          <span className="font-bold">+</span>
        </Button>
        <Button size="icon" variant="secondary" className="bg-background shadow-md">
          <span className="font-bold">-</span>
        </Button>
      </div>
    </div>
  )
}