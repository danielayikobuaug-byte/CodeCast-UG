
import { Button } from "@/components/ui/button";
import { 
  Locate, 
  Smartphone, 
  ShieldCheck, 
  History, 
  Bell, 
  Lock, 
  ChevronRight, 
  ArrowRight 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ChildTrackingPage() {
  return (
    <div className="flex flex-col gap-0">
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/tracking-system/1920/1080"
            alt="Child Monitoring & Tracking"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="parent tracking child"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 py-20">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">Child Monitoring & <span className="text-accent">Tracking</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mt-4">Keep your children safe with comprehensive real-time tracking and monitoring.</p>
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
          <span>Child Monitoring & Tracking</span>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">Peace of Mind for Families</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-12">Know where they are, what they're doing, and ensure their safety at all times. Our systems provide real-time updates and emergency features to keep families connected.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureItem icon={<Locate />} title="Real-Time GPS Tracking" desc="Accurate positioning updated every few seconds for live tracking." />
            <FeatureItem icon={<Smartphone />} title="Mobile Monitoring" desc="Monitor device usage and app activity from a parent dashboard." />
            <FeatureItem icon={<ShieldCheck />} title="Safety Features" desc="Geofencing alerts and emergency SOS buttons for quick response." />
            <FeatureItem icon={<History />} title="Location History" desc="Detailed movement patterns and visited locations over time." />
            <FeatureItem icon={<Bell />} title="Smart Alerts" desc="Instant notifications for location changes and emergency situations." />
            <FeatureItem icon={<Lock />} title="Privacy & Security" desc="Enterprise-grade encryption protecting your family's data." />
          </div>

          <div className="bg-secondary/20 rounded-3xl p-12">
            <h4 className="text-xl font-bold mb-8">Our Setup Process</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ProcessStep num="1" title="Setup" desc="Install monitoring app on child's device" />
              <ProcessStep num="2" title="Configuration" desc="Set up tracking and alert preferences" />
              <ProcessStep num="3" title="Activation" desc="Activate monitoring and start tracking" />
              <ProcessStep num="4" title="Support" desc="Ongoing guidance and technical troubleshooting" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Keep Your Children Safe Today</h2>
          <p className="text-xl text-white/70 mb-12">Set up comprehensive monitoring to protect your family.</p>
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
