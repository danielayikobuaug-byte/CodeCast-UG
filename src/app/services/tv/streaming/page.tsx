
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Video, 
  Layers, 
  TrendingUp, 
  MessageSquare, 
  Shield, 
  Cloud, 
  ChevronRight, 
  ArrowRight, 
  Home, 
  Briefcase 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Live Streaming Services',
  description: 'Professional live streaming infrastructure for broadcasts and global events, built for reliable, high-quality audience reach.',
  alternates: { canonical: '/services/tv/streaming' },
};

export default function StreamingPage() {
  return (
    <div className="flex flex-col gap-0">
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/streaming/1920/1080"
            alt="Live Streaming"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="camera broadcast"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 py-20">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">Live <span className="text-accent">Streaming</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mt-4">Professional streaming infrastructure for global audience reach.</p>
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
          <span>Live Streaming</span>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">Live Streaming</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-12">Professional live streaming infrastructure for events, broadcasts, and real-time content delivery to thousands of viewers worldwide.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureItem icon={<Video />} title="High-Quality Streaming" desc="Crystal-clear video streaming with adaptive quality based on viewer bandwidth." />
            <FeatureItem icon={<Layers />} title="Multi-Bitrate Delivery" desc="Automatic bitrate adjustment for optimal viewing experience on all devices." />
            <FeatureItem icon={<TrendingUp />} title="Live Analytics" desc="Real-time metrics on viewers, engagement, and performance during broadcasts." />
            <FeatureItem icon={<MessageSquare />} title="Audience Engagement" desc="Interactive features including live chat, polls, and Q&A functionality." />
            <FeatureItem icon={<Shield />} title="DRM Protection" desc="Digital rights management to protect your content from unauthorized access." />
            <FeatureItem icon={<Cloud />} title="Scale Infrastructure" desc="Cloud-based infrastructure that scales automatically to handle millions of viewers." />
          </div>

          <div className="bg-secondary/20 rounded-3xl p-12">
            <h4 className="text-xl font-bold mb-8">Our Launch Process</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ProcessStep num="1" title="Planning" desc="Define streaming requirements and broadcast specifications" />
              <ProcessStep num="2" title="Setup" desc="Configure streaming infrastructure and encoding" />
              <ProcessStep num="3" title="Testing" desc="Pre-broadcast testing and quality assurance" />
              <ProcessStep num="4" title="Go Live" desc="Launch broadcast with monitoring and support" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Stream Your Event?</h2>
          <p className="text-xl text-white/70 mb-12">Let's set up professional live streaming for your next broadcast.</p>
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
