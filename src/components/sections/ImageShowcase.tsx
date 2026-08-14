"use client"

import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const SHOWCASE_IMAGES = [
  ...PlaceHolderImages.map(img => img.imageUrl),
  "https://picsum.photos/seed/codecast-show1/800/600",
  "https://picsum.photos/seed/codecast-show2/800/600",
  "https://picsum.photos/seed/codecast-show3/800/600",
  "https://picsum.photos/seed/codecast-show4/800/600",
]

export function ImageShowcase() {
  // Split images into two groups for two sliding rows
  const row1 = SHOWCASE_IMAGES.slice(0, Math.ceil(SHOWCASE_IMAGES.length / 2))
  const row2 = SHOWCASE_IMAGES.slice(Math.ceil(SHOWCASE_IMAGES.length / 2))

  return (
    <section className="py-20 bg-secondary/30 overflow-hidden border-t">
      <div className="container px-4 mb-12 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground">Our Portfolio in Action</h2>
        <p className="text-muted-foreground mt-2">A glimpse into the diverse technology and entertainment solutions we deliver.</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Row 1: Sliding Left */}
        <div className="relative flex">
          <div className="marquee-row marquee-row-left gap-8">
            {[...row1, ...row1].map((src, idx) => (
              <div key={idx} className="relative w-64 md:w-80 h-48 md:h-60 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src={src}
                  alt="Portfolio showcase"
                  fill
                  className="object-cover"
                  data-ai-hint="software project"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Sliding Right */}
        <div className="relative flex">
          <div className="marquee-row marquee-row-right gap-8">
            {[...row2, ...row2].map((src, idx) => (
              <div key={idx} className="relative w-64 md:w-80 h-48 md:h-60 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src={src}
                  alt="Portfolio showcase"
                  fill
                  className="object-cover"
                  data-ai-hint="client project"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}