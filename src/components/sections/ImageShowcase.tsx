"use client"

import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const SHOWCASE_IMAGES = [
  ...PlaceHolderImages.map(img => img.imageUrl),
  "https://i.pinimg.com/736x/d3/52/57/d352573864c1a7bd725ba623580702e6.jpg",
  "https://i.pinimg.com/1200x/10/58/1d/10581d73dc31d9ec3e80f405783b80b1.jpg",
  "https://i.pinimg.com/736x/e2/f4/2d/e2f42d698adad76e8763cfb6d86e15fd.jpg",
  "https://i.pinimg.com/736x/37/11/ff/3711ffab46c55240b66bd7c5c25ff20e.jpg",
  "https://i.pinimg.com/736x/9d/4e/ec/9d4eece9270237637ef35363cfc844cf.jpg",
  "https://i.pinimg.com/736x/5f/4f/dd/5f4fdd4af6c39fc9a57c7819ac2b5214.jpg",
  "https://i.pinimg.com/736x/39/0b/13/390b134fecb09c25b16e92de9afc3ee7.jpg",
  "https://i.pinimg.com/736x/88/71/f0/8871f028125bb077eeecf7f24daeeb0e.jpg",
  "https://i.pinimg.com/1200x/8e/6a/10/8e6a10cccef671c062353f7590333215.jpg",
  "https://i.pinimg.com/1200x/b4/11/e4/b411e44595c8cdda7cff914f58db21f9.jpg",
  "https://i.pinimg.com/1200x/22/bf/85/22bf854acae56d81d4574335650137ff.jpg",
  "https://i.pinimg.com/1200x/ad/17/52/ad1752b41ce3c70d4722e6c02e4cdd24.jpg",
  "https://i.pinimg.com/736x/a4/6f/3d/a46f3d3f9200dc501d9f209675a8b726.jpg",
  "https://i.pinimg.com/1200x/2b/b3/89/2bb3896ad84839c6f562496ec1b98444.jpg",
  "https://i.pinimg.com/1200x/04/a6/41/04a641f4b03a7a685ee7292b20b040c5.jpg",

]

export function ImageShowcase() {
  // here we will  Split images into three groups for three sliding rows
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
