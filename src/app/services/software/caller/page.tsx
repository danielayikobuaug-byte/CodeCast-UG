
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  BarChart, 
  Phone, 
  Sliders, 
  TrendingUp, 
  Plug, 
  ChevronRight, 
  ArrowRight 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Automated Caller Systems',
  description: 'Smart IVR and auto-dialer platforms to reach your customers at scale with intelligent automated calling solutions.',
  alternates: { canonical: '/services/software/caller' },
};

export default function CallerSystemsPage() {
  return (
    <div className="flex flex-col gap-0">
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/caller-system/1920/1080"
            alt="Automated Caller Systems"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="call center technology"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 py-20">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">Automated <span className="text-accent">Caller Systems</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mt-4">Reach your customers at scale with intelligent automated calling solutions.</p>
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
          <span>Automated Caller Systems</span>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">Intelligent IVR & Notifications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-12">Our automated systems are perfect for notifications, surveys, and business communications. Streamline your customer calls and alerts at massive scale with our reliable technology.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureItem icon={<Bell />} title="Notification Calls" desc="Bulk notification calls for appointments, reminders, and alerts." />
            <FeatureItem icon={<BarChart />} title="Survey Campaigns" desc="Collect customer feedback through automated voice surveys." />
            <FeatureItem icon={<Phone />} title="IVR Systems" desc="Interactive systems that handle inquiries and route calls intelligently." />
            <FeatureItem icon={<Sliders />} title="Campaign Management" desc="Schedule and manage calling campaigns with ease." />
            <FeatureItem icon={<TrendingUp />} title="Analytics & Reporting" desc="Detailed call logs and performance metrics for optimization." />
            <FeatureItem icon={<Plug />} title="Seamless Integration" desc="Connect with your CRM and existing business data systems." />
          </div>

          <div className="bg-secondary/20 rounded-3xl p-12">
            <h4 className="text-xl font-bold mb-8">Our Implementation Process</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ProcessStep num="1" title="Configuration" desc="Set up calling scripts and routing rules" />
              <ProcessStep num="2" title="Integration" desc="Connect with your existing business systems" />
              <ProcessStep num="3" title="Testing" desc="Validate system performance and reliability" />
              <ProcessStep num="4" title="Deployment" desc="Launch campaigns and monitor live results" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Scale Your Communications?</h2>
          <p className="text-xl text-white/70 mb-12">Let's set up an automated calling solution tailored to your needs.</p>
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
