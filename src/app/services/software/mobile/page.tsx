
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Apple, 
  Layers, 
  Palette, 
  Database, 
  Rocket, 
  ChevronRight, 
  ArrowRight 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MobileAppsPage() {
  return (
    <div className="flex flex-col gap-0">
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/mobile-dev/1920/1080"
            alt="Mobile App Development"
            fill
            className="object-cover opacity-40 hero-zoom"
            priority
            data-ai-hint="mobile app interface"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>
        <div className="container relative z-10 px-4 py-20">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">Mobile App <span className="text-accent">Development</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mt-4">Powerful applications for iOS and Android that drive engagement and deliver exceptional user experiences.</p>
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
          <span>Mobile App Development</span>
        </div>
      </div>

      <section className="py-24 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">Native & Cross-Platform Apps</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-12">From initial concept to deployment on the app stores, we handle every stage of the mobile lifecycle. We build robust apps that scale with your business.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureItem icon={<Apple />} title="iOS Development" desc="Native apps built with Swift for optimal performance on Apple devices." />
            <FeatureItem icon={<Smartphone />} title="Android Development" desc="Native apps using Kotlin that leverage the full power of the Android ecosystem." />
            <FeatureItem icon={<Layers />} title="Cross-Platform Apps" desc="Reach both platforms efficiently with Flutter or React Native." />
            <FeatureItem icon={<Palette />} title="UI/UX Design" desc="Beautiful, intuitive interfaces designed to maximize user engagement." />
            <FeatureItem icon={<Database />} title="Backend Integration" desc="Seamless synchronization with APIs, cloud services, and databases." />
            <FeatureItem icon={<Rocket />} title="App Store Deployment" desc="Complete handling of the submission process and optimization." />
          </div>

          <div className="bg-secondary/20 rounded-3xl p-12">
            <h4 className="text-xl font-bold mb-8">Our Development Process</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ProcessStep num="1" title="Strategy" desc="Define app goals and target audience" />
              <ProcessStep num="2" title="Design" desc="Create prototypes and visual designs" />
              <ProcessStep num="3" title="Build" desc="Develop robust, scalable features" />
              <ProcessStep num="4" title="Launch" desc="Rigorous testing and app store release" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Build Your Mobile App?</h2>
          <p className="text-xl text-white/70 mb-12">Let's bring your app idea to life with professional mobile development.</p>
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
