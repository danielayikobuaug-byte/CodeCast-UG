
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Home, 
  Phone, 
  MapPin, 
  ChevronRight, 
  ArrowRight, 
  Code,
  Briefcase
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SoftwareServicesHubPage() {
  return (
    <div className="flex flex-col gap-0">
      {/* Page Hero */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/software-hub/1920/1080"
            alt="Software Services Hero"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="software development workspace"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 py-20 text-center md:text-left">
          <div className="max-w-3xl flex flex-col gap-6">
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">
              Software & <span className="text-accent">Development</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              Custom software solutions tailored to your business needs. From high-performance web apps to intelligent automation and security.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b py-4">
        <div className="container px-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="text-primary hover:underline flex items-center gap-1">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/services" className="text-primary hover:underline">All Services</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Software & Development</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceHubCard 
              icon={<Globe />} 
              title="Web Design & Development" 
              desc="Custom responsive websites and web applications built with modern frameworks."
              href="/services/software/web"
            />
            <ServiceHubCard 
              icon={<Smartphone />} 
              title="Mobile App Development" 
              desc="Native and cross-platform apps for iOS and Android that drive engagement."
              href="/services/software/mobile"
            />
            <ServiceHubCard 
              icon={<Cpu />} 
              title="System Design & Development" 
              desc="Scalable backend systems, powerful APIs, and enterprise database solutions."
              href="/services/software/systems"
            />
            <ServiceHubCard 
              icon={<Home />} 
              title="Smart Homes & Networking" 
              desc="Intelligent automation, structured cabling, and secure WiFi for homes/offices."
              href="/services/software/marketing"
            />
            <ServiceHubCard 
              icon={<Phone />} 
              title="Automated Caller Systems" 
              desc="Smart IVR and auto-dialer platforms for large-scale customer engagement."
              href="/services/software/caller"
            />
            <ServiceHubCard 
              icon={<MapPin />} 
              title="Child Monitoring & Tracking" 
              desc="Real-time GPS tracking and comprehensive family security solutions."
              href="/services/software/tracking"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="container relative z-10 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Build Your Next Project?</h2>
            <p className="text-xl text-white/70 mb-12">
              Let's discuss how we can help bring your software vision to life with our expert team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full px-12 h-14 text-lg bg-white text-foreground hover:bg-white/90" asChild>
                <Link href="/contact"><ArrowRight className="mr-2 h-5 w-5" /> Get in Touch</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-12 h-14 text-lg border-white/20 text-white hover:bg-white/10" asChild>
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
