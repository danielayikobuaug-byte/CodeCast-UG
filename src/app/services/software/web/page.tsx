
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  PencilRuler, 
  Code, 
  Smartphone, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight, 
  Home as HomeIcon 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Web Design & Development',
  description: 'Custom responsive websites and web applications built with modern frameworks to engage visitors and drive business results.',
  alternates: { canonical: '/services/software/web' },
};

export default function WebDesignPage() {
  return (
    <div className="flex flex-col gap-0">
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.pinimg.com/736x/5f/4f/dd/5f4fdd4af6c39fc9a57c7819ac2b5214.jpg"
            alt="Web Design & Development"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="web design code"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 py-20">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">Web Design & <span className="text-accent">Development</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mt-4">Create stunning, functional websites that engage visitors and drive business results.</p>
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
          <span>Web Design & Development</span>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">Custom Web Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-12">From responsive design to complex e-commerce platforms, we build web experiences that convert. Our team uses cutting-edge technologies to ensure your online presence is powerful and secure.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureItem icon={<PencilRuler />} title="Custom Design" desc="Bespoke website designs tailored to your brand identity and user needs." />
            <FeatureItem icon={<Code />} title="Full Stack Development" desc="Front-end and back-end development using modern technologies." />
            <FeatureItem icon={<Smartphone />} title="Responsive Design" desc="Websites that work perfectly on all devices, from desktops to mobile phones." />
            <FeatureItem icon={<ShoppingCart />} title="E-Commerce Solutions" desc="Complete online store setup with secure payment gateways." />
            <FeatureItem icon={<Zap />} title="Performance Optimization" desc="Fast loading times and SEO optimization for maximum visibility." />
            <FeatureItem icon={<ShieldCheck />} title="Security First" desc="SSL encryption and secure authentication to protect your data." />
          </div>

          <div className="bg-secondary/20 rounded-3xl p-12">
            <h4 className="text-xl font-bold mb-8">Our Development Process</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ProcessStep num="1" title="Discovery" desc="Understand your goals and requirements" />
              <ProcessStep num="2" title="Design" desc="Create wireframes and mockups for approval" />
              <ProcessStep num="3" title="Build" desc="Develop and test your website thoroughly" />
              <ProcessStep num="4" title="Launch" desc="Deploy and monitor your live website" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Build Your Website?</h2>
          <p className="text-xl text-white/70 mb-12">Let's discuss your web project and create something amazing together.</p>
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
