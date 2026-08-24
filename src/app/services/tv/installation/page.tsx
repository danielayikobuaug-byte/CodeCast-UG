
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Wrench, 
  Settings, 
  GraduationCap, 
  Headset, 
  RefreshCw, 
  Search, 
  ChevronRight, 
  ArrowRight, 
  Home 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'TV Installation & Support',
  description: 'Expert on-site installation and 24/7 technical support for all our TV and entertainment systems.',
  alternates: { canonical: '/services/tv/installation' },
};

export default function InstallationPage() {
  return (
    <div className="flex flex-col gap-0">
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/install/1920/1080"
            alt="Installation & Support"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="technician working"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 py-20">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">Installation & <span className="text-accent">Support</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mt-4">Professional installation and 24/7 technical support for all our systems.</p>
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
          <span>Installation & Support</span>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">Installation & Support</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-12">Professional on-site installation, configuration, and 24/7 technical support for all our technology and entertainment systems in Uganda.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureItem icon={<Wrench />} title="Professional Installation" desc="Expert on-site installation by certified Kampala-based technicians." />
            <FeatureItem icon={<Settings />} title="System Configuration" desc="Complete setup and optimization for your specific business needs." />
            <FeatureItem icon={<GraduationCap />} title="Training" desc="Comprehensive training for your team and detailed documentation." />
            <FeatureItem icon={<Headset />} title="24/7 Support" desc="Round-the-clock technical support available whenever you need it." />
            <FeatureItem icon={<RefreshCw />} title="Maintenance Plans" desc="Scheduled maintenance to keep systems running smoothly and prevent downtime." />
            <FeatureItem icon={<Search />} title="Troubleshooting" desc="Fast diagnosis and resolution of issues to minimize disruption." />
          </div>

          <div className="bg-secondary/20 rounded-3xl p-12">
            <h4 className="text-xl font-bold mb-8">Our Support Process</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ProcessStep num="1" title="Site Assessment" desc="Evaluate location and technical requirements" />
              <ProcessStep num="2" title="Installation" desc="Professional on-site setup and hardware deployment" />
              <ProcessStep num="3" title="Testing" desc="Complete system verification and staff training" />
              <ProcessStep num="4" title="Ongoing Care" desc="Continuous technical support and maintenance" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Need Professional Installation?</h2>
          <p className="text-xl text-white/70 mb-12">Let our expert technicians install and configure your system.</p>
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
