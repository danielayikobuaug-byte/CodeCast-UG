import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tv, 
  Play, 
  Film, 
  Server, 
  Monitor, 
  Wrench, 
  ChevronRight, 
  ArrowRight, 
  Home, 
  Briefcase,
  Smartphone,
  Sparkles,
  Database,
  TrendingUp,
  Banknote,
  Video,
  Layers,
  MessageSquare,
  Shield,
  Cloud,
  Lock,
  CreditCard,
  Users,
  BarChart,
  Megaphone,
  Palette,
  Keyboard,
  Search,
  Accessibility,
  Settings,
  GraduationCap,
  Headset,
  RefreshCw
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'TV & Entertainment Solutions',
  description: 'Professional streaming, IPTV, and TV solutions for every audience — next-generation entertainment technology for Ugandan businesses and homes.',
  alternates: { canonical: '/services/tv' },
};

export default function TVServicesHubPage() {
  return (
    <div className="flex flex-col gap-0">
      {/* Page Hero */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/tv-hub/1920/1080"
            alt="TV Services Hero"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="television studio"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 py-20 text-center md:text-left">
          <div className="max-w-3xl flex flex-col gap-6">
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">
              TV & <span className="text-accent">Entertainment</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              Professional streaming, IPTV, and TV solutions for every audience. We bring next-generation entertainment technology to Ugandan businesses and homes.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b py-4">
        <div className="container px-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="text-primary hover:underline flex items-center gap-1">
              <Home className="h-3 w-3" /> Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/services" className="text-primary hover:underline">All Services</Link>
            <ChevronRight className="h-4 w-4" />
            <span>TV & Entertainment</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceHubCard 
              icon={<Tv />} 
              title="Smart TV Solutions" 
              desc="Custom apps and platforms for Samsung, LG, Sony, and Android TV."
              href="/services/tv/smarttv"
            />
            <ServiceHubCard 
              icon={<Play />} 
              title="Live Streaming" 
              desc="Professional infrastructure for broadcasts and global events."
              href="/services/tv/streaming"
            />
            <ServiceHubCard 
              icon={<Film />} 
              title="Video on Demand" 
              desc="Complete VOD platforms with management and monetization."
              href="/services/tv/vod"
            />
            <ServiceHubCard 
              icon={<Server />} 
              title="Business IPTV" 
              desc="Enterprise-grade IPTV for hotels, hospitals and offices."
              href="/services/tv/iptv"
            />
            <ServiceHubCard 
              icon={<Monitor />} 
              title="TV Interfaces" 
              desc="Beautiful, intuitive UI design optimized for TV screens."
              href="/services/tv/tvinterface"
            />
            <ServiceHubCard 
              icon={<Wrench />} 
              title="Installation & Support" 
              desc="Expert on-site installation and 24/7 technical support."
              href="/services/tv/installation"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="container relative z-10 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Stream Your Content?</h2>
            <p className="text-xl text-white/70 mb-12">
              Let's discuss how we can help you launch your TV and entertainment platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full px-12 h-14 text-lg bg-white text-foreground hover:bg-white/90" asChild>
                <Link href="/contact"><ArrowRight className="mr-2 h-5 w-5" /> Get in Touch</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-12 h-14 text-lg border-white/60 text-white hover:bg-white/10" asChild>
                <Link href="/projects"><Briefcase className="mr-2 h-5 w-5" /> View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceHubCard({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: string, href: string }) {
  return (
    <Card className="group h-full rounded-2xl border-muted bg-white hover:shadow-xl hover:border-primary/50 transition-all">
      <CardContent className="p-8 flex flex-col h-full">
        <div className="w-14 h-14 rounded-xl bg-foreground flex items-center justify-center text-white mb-6 group-hover:bg-primary transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">{desc}</p>
        <Link href={href} className="inline-flex items-center text-sm font-bold text-primary gap-2 group-hover:gap-3 transition-all">
          Explore Service <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
