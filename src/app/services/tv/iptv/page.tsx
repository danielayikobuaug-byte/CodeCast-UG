
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Server, 
  Megaphone, 
  Monitor, 
  Tv, 
  Shield, 
  Settings, 
  ChevronRight, 
  ArrowRight, 
  Home 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function IPTVPage() {
  return (
    <div className="flex flex-col gap-0">
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/iptv/1920/1080"
            alt="Business IPTV"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="server rack room"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 py-20">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">Business <span className="text-accent">IPTV</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mt-4">Enterprise-grade IPTV solutions for internal communication and digital signage.</p>
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
          <span>Business IPTV</span>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">Business IPTV</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-12">Enterprise-grade IPTV systems for internal communications, digital signage, and professional content distribution across hospitals, hotels, and offices.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureItem icon={<Server />} title="IPTV Infrastructure" desc="Reliable backend with scalable architecture for enterprise deployments." />
            <FeatureItem icon={<Megaphone />} title="Internal Broadcasting" desc="Broadcast announcements and training videos across the organization." />
            <FeatureItem icon={<Monitor />} title="Digital Signage" desc="Manage digital displays and screens throughout your facilities centrally." />
            <FeatureItem icon={<Tv />} title="Multi-Channel Support" desc="Support for multiple content channels for different departments." />
            <FeatureItem icon={<Shield />} title="Access Control" desc="Granular permissions to ensure appropriate content reaches the right audience." />
            <FeatureItem icon={<Settings />} title="Management Portal" desc="Easy-to-use admin portal for content scheduling and monitoring." />
          </div>

          <div className="bg-secondary/20 rounded-3xl p-12">
            <h4 className="text-xl font-bold mb-8">IPTV Deployment Process</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ProcessStep num="1" title="Planning" desc="Design IPTV architecture for your organization" />
              <ProcessStep num="2" title="Installation" desc="Deploy servers and configure network" />
              <ProcessStep num="3" title="Training" desc="Train staff on platform usage" />
              <ProcessStep num="4" title="Support" desc="Ongoing technical support and maintenance" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Need IPTV for Your Business?</h2>
          <p className="text-xl text-white/70 mb-12">Let's set up a professional IPTV system for your facilities.</p>
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
