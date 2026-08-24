
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Camera, 
  Wifi, 
  Smartphone, 
  Mic, 
  Leaf, 
  ChevronRight, 
  ArrowRight 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Smart Homes & Networking',
  description: 'Intelligent home and office automation, structured cabling and secure WiFi networking for modern living and working.',
  alternates: { canonical: '/services/software/marketing' },
};

export default function SmartHomesPage() {
  return (
    <div className="flex flex-col gap-0">
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/smart-home/1920/1080"
            alt="Smart Homes & Networking"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="smart home living"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 py-20">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">Smart Homes & <span className="text-accent">Networking</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mt-4">Intelligent automation and networking for modern living and working.</p>
        </div>
      </section>

      <div className="bg-secondary/30 border-b py-4">
        <div className="container px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/services" className="text-primary hover:underline">All Services</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/services/software" className="text-primary hover:underline">Software & Development</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Smart Homes & Networking</span>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">Automation & Connectivity</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-12">Transform your spaces with intelligent solutions. Control your environment with ease and efficiency, backed by professional networking infrastructure.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureItem icon={<Lightbulb />} title="Home Automation" desc="Smart lighting, temperature control, and automated appliances." />
            <FeatureItem icon={<Camera />} title="Security Systems" desc="Integrated CCTV, smart locks, and sensors with remote monitoring." />
            <FeatureItem icon={<Wifi />} title="Network Infrastructure" desc="High-speed WiFi, structured cabling, and secure network setup." />
            <FeatureItem icon={<Smartphone />} title="Mobile Control" desc="Control your entire smart space from anywhere using our apps." />
            <FeatureItem icon={<Mic />} title="Voice Integration" desc="Seamless control via Alexa, Google Home, and other assistants." />
            <FeatureItem icon={<Leaf />} title="Energy Management" desc="Monitor and optimize usage to reduce costs and environmental impact." />
          </div>

          <div className="bg-secondary/20 rounded-3xl p-12">
            <h4 className="text-xl font-bold mb-8">Our Implementation Process</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ProcessStep num="1" title="Assessment" desc="Evaluate your space and requirements" />
              <ProcessStep num="2" title="Design" desc="Plan custom automation and network design" />
              <ProcessStep num="3" title="Installation" desc="Install devices and configure secure systems" />
              <ProcessStep num="4" title="Support" desc="Comprehensive training and tech support" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Smart-Enable Your Home?</h2>
          <p className="text-xl text-white/70 mb-12">Let's design and install the perfect smart solution for your needs.</p>
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
