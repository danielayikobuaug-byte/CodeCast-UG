
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Palette, 
  Keyboard, 
  Sparkles, 
  Search, 
  Accessibility, 
  Smartphone, 
  ChevronRight, 
  ArrowRight, 
  Home 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'TV Interface Design',
  description: 'Intuitive, beautiful user interface design crafted specifically for the big screen experience.',
  alternates: { canonical: '/services/tv/tvinterface' },
};

export default function TVInterfacePage() {
  return (
    <div className="flex flex-col gap-0">
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/interface/1920/1080"
            alt="TV Interfaces"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="graphic design UI"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 py-20">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">TV <span className="text-accent">Interfaces</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mt-4">Intuitive user interface design specifically crafted for the big screen experience.</p>
        </div>
      </section>

      <div className="bg-secondary/30 border-b py-4">
        <div className="container px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/services" className="text-primary hover:underline">All Services</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/services/tv" className="text-primary hover:underline">TV & Entertainment</Link>
          <ChevronRight className="h-3 w-3" />
          <span>TV Interfaces</span>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">TV Interfaces</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-12">Beautiful, intuitive UI design specifically crafted for TV viewing, ensuring excellent navigation and engaging visual experiences for the "10-foot experience".</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureItem icon={<Palette />} title="UI Design" desc="Custom interface design optimized for TV screens with large text and remote navigation." />
            <FeatureItem icon={<Keyboard />} title="Remote Control" desc="Intuitive focus-based interactions designed for remote control simplicity." />
            <FeatureItem icon={<Sparkles />} title="Visual Design" desc="Beautiful animations, transitions, and effects that enhance the viewing experience." />
            <FeatureItem icon={<Search />} title="Search & Discovery" desc="Powerful search and smart recommendations to help viewers find content easily." />
            <FeatureItem icon={<Accessibility />} title="Accessibility" desc="Accessible design including subtitles, audio descriptions, and high-contrast modes." />
            <FeatureItem icon={<Smartphone />} title="Responsive Design" desc="Interfaces that adapt beautifully to different TV screen sizes and resolutions." />
          </div>

          <div className="bg-secondary/20 rounded-3xl p-12">
            <h4 className="text-xl font-bold mb-8">Interface Design Process</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ProcessStep num="1" title="Discovery" desc="Understand user needs and content requirements" />
              <ProcessStep num="2" title="Design" desc="Create wireframes and visual designs for TV" />
              <ProcessStep num="3" title="Prototyping" desc="Build interactive prototypes for hardware testing" />
              <ProcessStep num="4" title="Implementation" desc="Develop production-ready interfaces" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Want a Stunning TV Interface?</h2>
          <p className="text-xl text-white/70 mb-12">Let's design an engaging user experience for your TV platform.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full px-12 h-14 text-lg bg-white text-foreground hover:bg-white/90" asChild>
              <Link href="/contact"><ArrowRight className="mr-2 h-5 w-5" /> Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-secondary/10 rounded-2xl border-l-4 border-primary">
      <div className="text-primary mb-4">{icon}</div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-muted-foreground text-sm">{desc}</p>
    </div>
  );
}

function ProcessStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">{num}</div>
      <h4 className="font-bold mb-2">{title}</h4>
      <p className="text-muted-foreground text-xs">{desc}</p>
    </div>
  );
}
