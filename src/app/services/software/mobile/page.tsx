
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
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">Native & Cross-Platform Apps</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  From initial concept to deployment on the app stores, we handle every stage of the mobile lifecycle. 
                  We build robust apps that scale with your business and provide seamless experiences for your users.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 bg-secondary/10 rounded-2xl border-l-4 border-primary">
                  <Apple className="text-primary mb-3 h-6 w-6" />
                  <h4 className="font-bold mb-2">iOS Development</h4>
                  <p className="text-muted-foreground text-sm">Native apps built with Swift for optimal performance on Apple devices.</p>
                </div>
                <div className="p-6 bg-secondary/10 rounded-2xl border-l-4 border-primary">
                  <Smartphone className="text-primary mb-3 h-6 w-6" />
                  <h4 className="font-bold mb-2">Android Development</h4>
                  <p className="text-muted-foreground text-sm">Native apps using Kotlin that leverage the full power of the Android ecosystem.</p>
                </div>
              </div>
            </div>
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/mobile-show/800/1000" 
                alt="Mobile App Showcase" 
                fill 
                className="object-cover"
                data-ai-hint="smartphone app"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            <FeatureItem icon={<Layers />} title="Cross-Platform Apps" desc="Reach both platforms efficiently with Flutter or React Native solutions." />
            <FeatureItem icon={<Palette />} title="UI/UX Design" desc="Beautiful, intuitive interfaces designed to maximize user engagement." />
            <FeatureItem icon={<Database />} title="Backend Integration" desc="Seamless synchronization with APIs, cloud services, and databases." />
            <FeatureItem icon={<Rocket />} title="App Store Deployment" desc="Complete handling of the submission process and optimization." />
          </div>

          <div className="bg-secondary/20 rounded-[3rem] p-8 md:p-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h4 className="text-3xl font-bold mb-12">Our Development Process</h4>
                <div className="space-y-12">
                  <ProcessStepHorizontal num="1" title="Strategy" desc="Define app goals, user personas, and a clear roadmap for success." />
                  <ProcessStepHorizontal num="2" title="Design" desc="Create high-fidelity prototypes and engaging visual designs." />
                  <ProcessStepHorizontal num="3" title="Build" desc="Develop robust, scalable features using the latest technologies." />
                  <ProcessStepHorizontal num="4" title="Launch" desc="Rigorous testing followed by a smooth app store release." />
                </div>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <Image 
                  src="https://picsum.photos/seed/mob-strat/800/600" 
                  alt="Development Process" 
                  fill 
                  className="object-cover"
                  data-ai-hint="team strategy"
                />
              </div>
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
    <div className="p-8 bg-secondary/10 rounded-2xl border-b-4 border-primary hover:bg-white transition-all hover:shadow-xl group">
      <div className="text-primary mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ProcessStepHorizontal({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg">
        {num}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
