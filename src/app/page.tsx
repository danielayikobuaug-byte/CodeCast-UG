'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Laptop, 
  Smartphone, 
  Settings, 
  Network, 
  PhoneCall, 
  Locate, 
  Tv, 
  Radio, 
  Monitor, 
  ArrowRight, 
  CheckCircle2, 
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HeroStats } from "@/components/sections/HeroStats";
import { StatsBand } from "@/components/sections/StatsBand";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

const CATEGORIES = [
  "Software Development", 
  "Digital Marketing", 
  "Smart Home Devices", 
  "Startup MVPS", 
  "Automated Call Centers", 
  "Child Monitoring",
  "Business IPTV",
  "Custom Web Apps",
  "Mobile Solutions",
  "Network Security",
  "Cloud Architecture",
  "24/7 Remote Support"
];

export default function Home() {
  const db = useFirestore();
  const logosQuery = useMemoFirebase(() => {
    return query(collection(db, 'client-logos'), orderBy('order', 'asc'));
  }, [db]);

  const { data: logos } = useCollection(logosQuery);

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] lg:min-h-[550px] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/codecast-industrial/1920/1080"
            alt="Hero Background"
            fill
            className="object-cover opacity-40 hero-zoom brightness-[0.4]"
            priority
            data-ai-hint="industrial technology"
          />
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/60 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 pt-16 pb-20 lg:pt-20 lg:pb-24 h-full flex flex-col justify-center">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-8 flex flex-col gap-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">Next-Gen Solutions</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter max-w-2xl mx-auto lg:mx-0">
                Apps your <br className="hidden sm:block" />
                customers <br className="hidden sm:block" />
                <span className="text-accent">will love to use.</span>
              </h1>
              
              <p className="text-sm md:text-base text-white/60 max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
                We craft high-performance iOS and Android apps with beautiful interfaces and rock-solid backends, delivered fast.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-foreground font-black rounded-xl px-8 h-12 text-sm" asChild>
                  <Link href="/projects">See Our Work <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/60 hover:bg-white/10 rounded-xl px-8 h-12 text-sm font-bold" asChild>
                  <Link href="/contact">Start a Project</Link>
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 mt-4">
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="rounded-full w-8 h-8 border-white/10 text-white/40 hover:text-white">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full w-8 h-8 border-white/10 text-white/40 hover:text-white">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-[2px] w-12 bg-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent w-1/2" />
                  </div>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">02 / 03</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <HeroStats />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-foreground/50 backdrop-blur-sm z-20 overflow-hidden">
          <div className="py-4">
            <div className="hero-marquee-track flex items-center gap-12 whitespace-nowrap">
               {CATEGORIES.map((label, idx) => (
                <CategoryItem key={idx} label={label} active={idx % 4 === 0} />
               ))}
               {CATEGORIES.map((label, idx) => (
                <CategoryItem key={`dup-${idx}`} label={label} active={idx % 4 === 0} />
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-10 lg:py-16 bg-white border-y overflow-hidden">
        <div className="container px-4 mb-6 lg:mb-10">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">Trusted by leading organizations</p>
        </div>
        <div className="relative flex overflow-hidden">
          <div className="trusted-marquee-track whitespace-nowrap flex items-center gap-12 md:gap-32 px-4">
            {logos && logos.length > 0 ? (
              <>
                {logos.map((logo: any) => (
                  <div key={logo.id} className="relative h-8 w-24 md:h-12 md:w-32 shrink-0 transition-transform hover:scale-110">
                    <Image 
                      src={logo.imageUrl} 
                      alt={logo.name} 
                      fill 
                      className="object-contain" 
                      unoptimized
                    />
                  </div>
                ))}
                {logos.map((logo: any) => (
                  <div key={`dup-${logo.id}`} className="relative h-8 w-24 md:h-12 md:w-32 shrink-0 transition-transform hover:scale-110">
                    <Image 
                      src={logo.imageUrl} 
                      alt={logo.name} 
                      fill 
                      className="object-contain" 
                      unoptimized
                    />
                  </div>
                ))}
              </>
            ) : (
              [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="text-foreground font-black text-xl md:text-3xl italic grayscale opacity-20 shrink-0 uppercase tracking-tighter mx-8">
                  Partner_{i}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="mb-4">Our Expertise</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Software & Systems</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">From your first line of code to complex network solutions, we cover every layer of your technology stack.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Smart TV & IPTV</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">Innovative entertainment technology for homes and businesses across Uganda.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <StatsBand className="py-24" />

      {/* Why Choose Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/codecast2/800/1000" 
                alt="Working at CodeCast" 
                fill 
                className="object-cover"
                data-ai-hint="software developers"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            </div>
            <div className="flex flex-col gap-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">Built On Trust, Delivered With Precision</h2>
              <div className="space-y-6">
                <FeatureItem 
                  title="Experienced Team" 
                  desc="Engineers, network technicians and designers working as one cohesive unit on every project."
                />
                <FeatureItem 
                  title="Ongoing Support" 
                  desc="We don't disappear after launch — dedicated maintenance and updates are part of the package."
                />
                <FeatureItem 
                  title="All-in-One Provider" 
                  desc="One team handles your software and entertainment hardware, giving you one number to call."
                />
              </div>
              <Button size="lg" className="w-fit rounded-xl px-8 h-14 font-bold" asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary">
        <div className="container px-4 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Ready to future-proof your business?</h2>
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Talk to our Kampala-based team today and let's plan the right technology or entertainment solution for your unique needs.
          </p>
          <Button size="lg" variant="secondary" className="rounded-full px-12 h-16 text-lg font-bold border-white/20 hover:scale-105 transition-transform" asChild>
            <Link href="/contact">Contact CodeCast UG LTD</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function CategoryItem({ label, active }: { label: string, active?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={cn("w-2 h-2 rounded-full", active ? "bg-accent" : "bg-white/20")} />
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-widest transition-colors",
        active ? "text-white" : "text-white/40"
      )}>
        {label}
      </span>
    </div>
  );
}

function ServiceCard({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: string, href: string }) {
  return (
    <Card className="group hover:border-primary/50 transition-all hover:shadow-2xl rounded-3xl overflow-hidden border-muted bg-white">
      <CardContent className="p-8">
        <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{desc}</p>
        <Link href={href} className="inline-flex items-center text-primary font-bold text-xs group-hover:gap-2 transition-all">
          Learn more <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

function FeatureItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-5">
      <div className="mt-1 shrink-0">
        <CheckCircle2 className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h4 className="text-lg font-bold mb-1 text-foreground tracking-tight">{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
