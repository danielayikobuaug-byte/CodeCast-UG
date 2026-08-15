
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tv, 
  Smartphone, 
  Sparkles, 
  Database, 
  Play, 
  TrendingUp, 
  Banknote, 
  ChevronRight, 
  ArrowRight, 
  Home, 
  Briefcase 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SmartTVPage() {
  return (
    <div className="flex flex-col gap-0">
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.pinimg.com/1200x/e3/43/c7/e343c78323922768bd9ffce9cbd903c2.jpg"
            alt="Smart TV Solutions"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="smart tv screen"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 py-20">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">Smart TV <span className="text-accent">Solutions</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mt-4">State-of-the-art Smart TV applications for stunning visuals and seamless performance.</p>
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
          <span>Smart TV Solutions</span>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">Smart TV Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-12">State-of-the-art Smart TV applications and platforms for Samsung, LG, Sony, and Android TV devices with stunning visuals and seamless performance.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureItem icon={<Tv />} title="Multi-Platform Support" desc="Full compatibility with Samsung Tizen, LG WebOS, and Android TV platforms." />
            <FeatureItem icon={<Sparkles />} title="Interactive UI" desc="Beautiful, intuitive user interfaces designed for TV screens with smooth navigation." />
            <FeatureItem icon={<Database />} title="Content Management" desc="Robust backend systems for easy organization and delivery of TV content." />
            <FeatureItem icon={<Play />} title="Streaming Integration" desc="Seamless integration with streaming services and content delivery platforms." />
            <FeatureItem icon={<TrendingUp />} title="Analytics" desc="Comprehensive insights into viewer behavior and engagement metrics." />
            <FeatureItem icon={<Banknote />} title="Monetization" desc="Multiple revenue models including ads, subscriptions, and premium content." />
          </div>

          <div className="bg-secondary/20 rounded-3xl p-12">
            <h4 className="text-xl font-bold mb-8">Our Development Process</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ProcessStep num="1" title="Discovery" desc="Understand your vision and technical requirements" />
              <ProcessStep num="2" title="Design" desc="Create TV-optimized UI/UX designs and prototypes" />
              <ProcessStep num="3" title="Development" desc="Build high-performance Smart TV applications" />
              <ProcessStep num="4" title="Launch" desc="Deploy and maintain your Smart TV application" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Develop Your Smart TV App?</h2>
          <p className="text-xl text-white/70 mb-12">Let's create a compelling Smart TV experience for your audience.</p>
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
