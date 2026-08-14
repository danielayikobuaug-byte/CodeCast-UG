import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Laptop, Smartphone, Settings, Network, PhoneCall, Locate, Tv, Radio, Film, Monitor, Layout, Wrench, ArrowRight, CheckCircle2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Announcement Bar */}
      <div className="bg-primary text-white overflow-hidden py-2 hidden md:block">
        <div className="announcement-track whitespace-nowrap">
          <span className="px-4 text-xs font-semibold uppercase tracking-wider">
            Now available in Uganda and the rest of the World • Technology & Entertainment Solutions • Smart TV, Live Streaming & Business IPTV
          </span>
          <span className="px-4 text-xs font-semibold uppercase tracking-wider">
            Now available in Uganda and the rest of the World • Technology & Entertainment Solutions • Smart TV, Live Streaming & Business IPTV
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/codecast1/1920/1080"
            alt="Hero Background"
            fill
            className="object-cover opacity-30 hero-zoom"
            priority
            data-ai-hint="technology workspace"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 py-20">
          <div className="max-w-3xl flex flex-col gap-6">
            <Badge variant="outline" className="w-fit text-accent border-accent/60 px-4 py-1 text-sm bg-accent/10">
              Technology & Digital Excellence
            </Badge>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">
              Code Smart. <br />
              <span className="text-accent">Stream the World.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl">
              CodeCast UG LTD delivers end-to-end technology solutions from web and mobile products to Smart TV, live streaming and IPTV systems built for your business.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8" asChild>
                <Link href="/services">Explore Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/60 hover:bg-white/10 rounded-full px-12 h-14 text-lg" asChild>
                <Link href="/contact">Start a Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By - Endless Sliding Marquee */}
      <section className="py-12 bg-secondary/30 border-y overflow-hidden">
        <div className="container px-4 mb-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">Trusted by leading organizations</p>
        </div>
        <div className="relative flex overflow-hidden">
          <div className="announcement-track whitespace-nowrap flex items-center gap-16 md:gap-32 px-4 opacity-60">
             {/* Mock client logos - duplicated for seamless loop */}
             {[1, 2, 3, 4, 5, 6, 7, 8].map((i, idx) => (
              <div key={idx} className="text-foreground font-black text-2xl md:text-3xl italic grayscale shrink-0">
                CLIENT_{i}
              </div>
            ))}
             {[1, 2, 3, 4, 5, 6, 7, 8].map((i, idx) => (
              <div key={`dup-${idx}`} className="text-foreground font-black text-2xl md:text-3xl italic grayscale shrink-0">
                CLIENT_{i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Our Expertise</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Software & Systems</h2>
            <p className="text-muted-foreground text-lg">From your first line of code to complex network solutions, we cover every layer of your technology stack.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Laptop />} 
              title="Web Development" 
              desc="Fast, secure and modern websites designed for high performance and digital growth."
              href="/services/software/web"
            />
            <ServiceCard 
              icon={<Smartphone />} 
              title="Mobile Apps" 
              desc="Native and cross-platform apps for iOS and Android, built around real user needs."
              href="/services/software/mobile"
            />
            <ServiceCard 
              icon={<Settings />} 
              title="System Design" 
              desc="Custom business systems, databases and software architecture built to scale."
              href="/services/software/systems"
            />
            <ServiceCard 
              icon={<Network />} 
              title="Smart Homes" 
              desc="Home automation, Wi-Fi installation, CCTV integration, and secure networking."
              href="/services/software/marketing"
            />
            <ServiceCard 
              icon={<PhoneCall />} 
              title="Caller Systems" 
              desc="Smart IVR and auto-dialer solutions that streamline customer communication."
              href="/services/software/caller"
            />
            <ServiceCard 
              icon={<Locate />} 
              title="Child Tracking" 
              desc="GPS-based monitoring devices that give parents real-time peace of mind."
              href="/services/software/tracking"
            />
          </div>

          <div className="text-center max-w-3xl mx-auto mt-24 mb-16">
            <Badge variant="outline" className="mb-4 border-primary text-primary">Entertainment</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Smart TV & IPTV</h2>
            <p className="text-muted-foreground text-lg">Innovative entertainment technology for homes and businesses across Uganda.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Tv />} 
              title="Smart TV Solutions" 
              desc="Setup and configuration for Samsung, LG, Sony and Android TV devices."
              href="/services/tv/smarttv"
            />
            <ServiceCard 
              icon={<Radio />} 
              title="Live Streaming" 
              desc="500+ live channels with reliable HD and 4K streaming setup and support."
              href="/services/tv/streaming"
            />
            <ServiceCard 
              icon={<Monitor />} 
              title="Business IPTV" 
              desc="IPTV systems with management dashboards for hotels, hospitals and offices."
              href="/services/tv/iptv"
            />
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-20 bg-foreground text-white">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-6xl font-bold text-accent mb-2">100+</p>
              <p className="text-sm font-medium uppercase tracking-wider text-white/60">Projects Delivered</p>
            </div>
            <div>
              <p className="text-4xl md:text-6xl font-bold text-accent mb-2">50+</p>
              <p className="text-sm font-medium uppercase tracking-wider text-white/60">Happy Clients</p>
            </div>
            <div>
              <p className="text-4xl md:text-6xl font-bold text-accent mb-2">12</p>
              <p className="text-sm font-medium uppercase tracking-wider text-white/60">Core Services</p>
            </div>
            <div>
              <p className="text-4xl md:text-6xl font-bold text-accent mb-2">24/7</p>
              <p className="text-sm font-medium uppercase tracking-wider text-white/60">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/codecast2/800/1000" 
                alt="Working at CodeCast" 
                fill 
                className="object-cover"
                data-ai-hint="software developers"
              />
            </div>
            <div className="flex flex-col gap-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">Built On Trust, Delivered With Precision</h2>
              <div className="space-y-6">
                <FeatureItem 
                  title="Experienced Team" 
                  desc="Engineers, network technicians and designers working as one unit."
                />
                <FeatureItem 
                  title="Ongoing Support" 
                  desc="We don't disappear after launch — maintenance is part of the package."
                />
                <FeatureItem 
                  title="All-in-One Provider" 
                  desc="One team handles your software and entertainment hardware."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container px-4 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to future-proof your business?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Talk to our team today and let's plan the right technology or entertainment solution for you.</p>
          <Button size="lg" variant="secondary" className="rounded-full px-12 h-14 text-lg border-white/20" asChild>
            <Link href="/contact">Contact CodeCast UG LTD</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: string, href: string }) {
  return (
    <Card className="group hover:border-primary/50 transition-all hover:shadow-xl rounded-2xl overflow-hidden border-muted">
      <CardContent className="p-8">
        <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{desc}</p>
        <Link href={href} className="inline-flex items-center text-primary font-bold text-sm">
          Learn more <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

function FeatureItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <CheckCircle2 className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h4 className="text-lg font-bold mb-1">{title}</h4>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
