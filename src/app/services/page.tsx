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
  Tv, 
  Play, 
  Film, 
  Server, 
  Monitor, 
  Wrench, 
  Lightbulb, 
  Users, 
  Handshake, 
  Rocket, 
  ShieldCheck, 
  Headset, 
  ArrowRight, 
  Code,
  ChevronRight,
  Briefcase
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ImageShowcase } from "@/components/sections/ImageShowcase";

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-0">
      {/* Page Hero */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.pinimg.com/736x/ce/c9/2a/cec92af999f7e5c1e1f06a223faed14e.jpg"
            alt="Services Hero"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="technology workspace"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 py-20 text-center md:text-left">
          <div className="max-w-3xl flex flex-col gap-6">
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">
              Our <span className="text-accent">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              Complete technology and entertainment solutions for your business. We deliver integrated services that drive real business results.
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
            <span>All Services</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          
          {/* Intro Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="mb-4">Everything Your Business Needs</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Integrated Tech & Entertainment</h2>
            <p className="text-muted-foreground text-lg">From custom web development to enterprise-grade Smart TV solutions, CodeCast UG LTD covers every layer of your technology stack.</p>
          </div>

          {/* Software & Development Category */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-12 pb-6 border-b-4 border-primary">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Code className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Software & Development</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                icon={<Globe />} 
                title="Web Design & Development" 
                desc="Custom responsive websites and high-performance web applications built with cutting-edge technologies to engage your audience."
                href="/services/software/web"
              />
              <ServiceCard 
                icon={<Smartphone />} 
                title="Mobile App Development" 
                desc="Native iOS and Android apps, plus cross-platform solutions that deliver exceptional user experiences on all devices."
                href="/services/software/mobile"
              />
              <ServiceCard 
                icon={<Cpu />} 
                title="System Design & Development" 
                desc="Scalable backend systems, powerful APIs, and enterprise solutions engineered to grow with your business demands."
                href="/services/software/systems"
              />
              <ServiceCard 
                icon={<Home />} 
                title="Smart Homes & Networking" 
                desc="Intelligent home automation, structured cabling, secure WiFi, and integrated CCTV systems for the modern era."
                href="/services/software/marketing"
              />
              <ServiceCard 
                icon={<Phone />} 
                title="Automated Caller Systems" 
                desc="Smart IVR and auto-dialer platforms that streamline customer communications and engagement at massive scale."
                href="/services/software/caller"
              />
              <ServiceCard 
                icon={<MapPin />} 
                title="Child Monitoring & Tracking" 
                desc="Real-time GPS tracking and comprehensive monitoring solutions that keep families connected and safe."
                href="/services/software/tracking"
              />
            </div>
          </div>

          {/* TV & Entertainment Category */}
          <div>
            <div className="flex items-center gap-4 mb-12 pb-6 border-b-4 border-accent">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Tv className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">TV & Entertainment</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                icon={<Tv />} 
                title="Smart TV Solutions" 
                desc="State-of-the-art Smart TV applications and platforms for Samsung, LG, Sony, and Android TV devices."
                href="/services/tv/smarttv"
              />
              <ServiceCard 
                icon={<Play />} 
                title="Live Streaming" 
                desc="Professional live streaming infrastructure for events, broadcasts, and real-time content delivery worldwide."
                href="/services/tv/streaming"
              />
              <ServiceCard 
                icon={<Film />} 
                title="Video on Demand" 
                desc="Complete VOD platforms with content management, monetization options, and viewer analytics."
                href="/services/tv/vod"
              />
              <ServiceCard 
                icon={<Server />} 
                title="Business IPTV" 
                desc="Enterprise-grade IPTV systems for internal communications, digital signage, and professional content distribution."
                href="/services/tv/iptv"
              />
              <ServiceCard 
                icon={<Monitor />} 
                title="TV Interfaces" 
                desc="Beautiful, intuitive UI/UX design for TV applications optimized for remote control navigation."
                href="/services/tv/tvinterface"
              />
              <ServiceCard 
                icon={<Wrench />} 
                title="Installation & Support" 
                desc="Professional on-site installation, configuration, and 24/7 technical support for all our systems."
                href="/services/tv/installation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">The CodeCast Advantage</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Why Choose CodeCast?</h2>
            <p className="text-muted-foreground text-lg">Trusted by leading organizations across Uganda for innovative solutions and exceptional service.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Lightbulb />} 
              title="Innovative" 
              desc="Cutting-edge technology and creative problem-solving approaches tailored to your unique challenges."
            />
            <FeatureCard 
              icon={<Users />} 
              title="Expert Team" 
              desc="Experienced engineers, designers, and technicians working collaboratively on every single project."
            />
            <FeatureCard 
              icon={<Handshake />} 
              title="Partnership" 
              desc="We view ourselves as your technology partner, committed to your long-term success and growth."
            />
            <FeatureCard 
              icon={<Rocket />} 
              title="Scalable" 
              desc="Every solution is architected for growth, scaling effortlessly as your business expands."
            />
            <FeatureCard 
              icon={<ShieldCheck />} 
              title="Secure" 
              desc="Enterprise-grade security, encryption, and compliance standards to protect your data."
            />
            <FeatureCard 
              icon={<Headset />} 
              title="Support" 
              desc="Dedicated post-launch support with maintenance, monitoring, and optimization included."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="container relative z-10 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Transform Your Business?</h2>
            <p className="text-xl text-white/70 mb-12">
              Let's discuss how our comprehensive technology and entertainment solutions can help you achieve your goals and drive growth.
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

      {/* Image Showcase - Placed above the footer */}
      <ImageShowcase />
    </div>
  );
}

function ServiceCard({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: string, href: string }) {
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

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Card className="h-full rounded-2xl border-muted bg-white/50 backdrop-blur-sm shadow-sm">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mx-auto mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
      </CardContent>
    </Card>
  );
}
