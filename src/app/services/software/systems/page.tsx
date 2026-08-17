
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Plug, 
  Database, 
  Cloud, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  ArrowRight 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'System Design & Development',
  description: 'Scalable backend systems, powerful APIs and enterprise database solutions built to move your business forward.',
  alternates: { canonical: '/services/software/systems' },
};

export default function SystemsPage() {
  return (
    <div className="flex flex-col gap-0">
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/systems-dev/1920/1080"
            alt="System Design & Development"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="system architecture"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 py-20">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">System Design & <span className="text-accent">Development</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mt-4">Scalable backend systems and enterprise solutions built to move your business forward.</p>
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
          <span>System Design & Development</span>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">Enterprise Systems & APIs</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-12">We architect backend solutions that handle your growing business needs. From custom business systems to optimized database designs, we build for longevity and scale.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureItem icon={<Code />} title="Backend Development" desc="Robust server-side applications built with Node.js, Python, or Java." />
            <FeatureItem icon={<Plug />} title="API Development" desc="Scalable, secure APIs designed for seamless integration." />
            <FeatureItem icon={<Database />} title="Database Design" desc="Optimized SQL and NoSQL solutions tailored to your data needs." />
            <FeatureItem icon={<Cloud />} title="Cloud Integration" desc="Seamless deployment with AWS, Google Cloud, or Azure." />
            <FeatureItem icon={<ShieldCheck />} title="Enterprise Security" desc="Comprehensive encryption and authentication implementation." />
            <FeatureItem icon={<Zap />} title="Performance Scaling" desc="Systems engineered to handle growing user loads efficiently." />
          </div>

          <div className="bg-secondary/20 rounded-3xl p-12">
            <h4 className="text-xl font-bold mb-8">Our Development Process</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ProcessStep num="1" title="Requirements" desc="Analyze business and technical needs" />
              <ProcessStep num="2" title="Architecture" desc="Design scalable system infrastructure" />
              <ProcessStep num="3" title="Implementation" desc="Build robust systems with rigorous testing" />
              <ProcessStep num="4" title="Maintenance" desc="Ongoing monitoring and optimization" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Build Your System?</h2>
          <p className="text-xl text-white/70 mb-12">Let's architect a scalable solution that supports your business growth.</p>
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
