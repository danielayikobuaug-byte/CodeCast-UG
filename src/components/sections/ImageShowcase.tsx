"use client"

import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const SHOWCASE_IMAGES = [
  ...PlaceHolderImages.map(img => img.imageUrl),
  "https://picsum.photos/seed/codecast-show1/800/600",
  "https://picsum.photos/seed/codecast-show2/800/600",
  "https://picsum.photos/seed/codecast-show3/800/600",
  "https://picsum.photos/seed/codecast-show4/800/600",
  "https://picsum.photos/seed/codecast-show5/800/600",
  "https://picsum.photos/seed/codecast-show6/800/600",
  "https://picsum.photos/seed/codecast-show7/800/600",
  "https://picsum.photos/seed/codecast-show8/800/600",
  "https://picsum.photos/seed/codecast-show9/800/600",
  "https://picsum.photos/seed/codecast-show10/800/600",
  "https://picsum.photos/seed/codecast-show11/800/600",
  "https://picsum.photos/seed/codecast-show12/800/600",
]

export function ImageShowcase() {
  // Split images into three groups for three sliding rows
  const perRow = Math.ceil(SHOWCASE_IMAGES.length / 3)
  const row1 = SHOWCASE_IMAGES.slice(0, perRow)
  const row2 = SHOWCASE_IMAGES.slice(perRow, perRow * 2)
  const row3 = SHOWCASE_IMAGES.slice(perRow * 2)

  return (
    <section className="py-20 bg-secondary/30 overflow-hidden border-t w-full">
      <div className="flex flex-col gap-8 w-full">
        {/* Row 1: Sliding Left */}
        <div className="relative flex w-full">
          <div className="marquee-row marquee-row-left gap-8">
            {[...row1, ...row1, ...row1].map((src, idx) => (
              <div key={`r1-${idx}`} className="relative w-64 md:w-96 h-48 md:h-64 rounded-3xl overflow-hidden shadow-lg border-4 border-white flex-shrink-0">
                <Image
                  src={src}
                  alt="Portfolio showcase row 1"
                  fill
                  className="object-cover"
                  data-ai-hint="software project"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Sliding Right */}
        <div className="relative flex w-full">
          <div className="marquee-row marquee-row-right gap-8">
            {[...row2, ...row2, ...row2].map((src, idx) => (
              <div key={`r2-${idx}`} className="relative w-64 md:w-96 h-48 md:h-64 rounded-3xl overflow-hidden shadow-lg border-4 border-white flex-shrink-0">
                <Image
                  src={src}
                  alt="Portfolio showcase row 2"
                  fill
                  className="object-cover"
                  data-ai-hint="client project"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Sliding Left (Extra layer) */}
        <div className="relative flex w-full">
          <div className="marquee-row marquee-row-left gap-8">
            {[...row3, ...row3, ...row3].map((src, idx) => (
              <div key={`r3-${idx}`} className="relative w-64 md:w-96 h-48 md:h-64 rounded-3xl overflow-hidden shadow-lg border-4 border-white flex-shrink-0">
                <Image
                  src={src}
                  alt="Portfolio showcase row 3"
                  fill
                  className="object-cover"
                  data-ai-hint="digital solution"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
