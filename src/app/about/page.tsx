import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Target, 
  Eye, 
  Gem, 
  Layers, 
  UserCheck, 
  Headset, 
  ListCheck, 
  Globe, 
  Linkedin, 
  Mail, 
  ChevronRight, 
  Phone, 
  Handshake,
  Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ImageShowcase } from "@/components/sections/ImageShowcase";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-0">
      {/* Page Hero */}
      <section className="relative py-20 bg-secondary/30 border-b overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="container relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">About Us</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A Kampala-based technology and entertainment company bringing software development together with Smart TV and IPTV solutions.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="text-primary hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>About Us</span>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background" id="story">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image 
                src="https://picsum.photos/seed/codecast-story/800/600" 
                alt="Our Story" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-ai-hint="team collaboration"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">100+</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Projects Delivered</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <Badge className="mb-4">Our Story</Badge>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-foreground">
                  Solving Real Problems With Practical Technology
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground">
                  <p>
                    CodeCast UG LTD is a technology and entertainment company based at Ntinda NSA Mall in Kampala, bringing software development and digital solutions together with Android TV, Smart TV and IPTV entertainment services.
                  </p>
                  <p>
                    From a single website to a full office network to a hotel-wide IPTV rollout, our team handles the technology and the entertainment systems that depend on it — so our clients only have one number to call.
                  </p>
                </div>
              </div>
              <Button size="lg" className="w-fit rounded-full px-8 h-14 text-lg">
                <Handshake className="mr-2 h-5 w-5" /> Work With Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24 bg-secondary/20" id="mission-vision">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">What Drives Us</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Mission, Vision & Values</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Target />} 
              title="Our Mission" 
              desc="To bring reliable software development and next-generation entertainment technology together, giving Ugandan businesses and homes one trusted technology partner."
            />
            <ValueCard 
              icon={<Eye />} 
              title="Our Vision" 
              desc="To be Uganda's most trusted partner for digital and entertainment technology, setting the standard for quality and reliability."
            />
            <ValueCard 
              icon={<Gem />} 
              title="How We Work" 
              desc="Reliability, craftsmanship and responsiveness guide every project we deliver — whether it's a line of code or a live TV installation."
            />
          </div>
        </div>
      </section>

      {/* Advantage Section */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Our Advantage</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">What Sets CodeCast UG Apart</h2>
            <p className="text-muted-foreground text-lg">One vendor for both your technology and entertainment needs, backed by a certified local team.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <AdvantageItem 
                icon={<Layers />} 
                title="One Vendor, Two Divisions" 
                desc="Software development and Smart TV/IPTV entertainment services from a single trusted partner."
              />
              <AdvantageItem 
                icon={<UserCheck />} 
                title="Certified Local Technicians" 
                desc="Our Kampala-based technicians know local conditions and provide prompt on-site support."
              />
              <AdvantageItem 
                icon={<Headset />} 
                title="24-Hour Remote Support" 
                desc="Round-the-clock remote monitoring keeps your systems and screens running smoothly."
              />
              <AdvantageItem 
                icon={<ListCheck />} 
                title="Clearly Scoped Engagements" 
                desc="Every project starts with a clear scope and quote, ensuring transparency and no surprises."
              />
              <AdvantageItem 
                icon={<Globe />} 
                title="Global Standards" 
                desc="We build to standards that hold up internationally, ensuring your solutions are future-proof."
              />
            </div>

            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-foreground">
              <Image 
                src="https://picsum.photos/seed/codecast-dev/800/1000" 
                alt="Technology Excellence" 
                fill 
                className="object-cover opacity-80"
                data-ai-hint="software developers"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <h3 className="text-2xl font-bold mb-4">Technology + Entertainment, Handled</h3>
                <p className="text-white/80">We don't just write the code or install the TV — we make sure everything works together, on the ground, in your business or home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-secondary/20" id="team">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">The People Behind CodeCast UG</h2>
            <p className="text-muted-foreground text-lg">A dedicated team of developers, engineers and support specialists working to move your business forward.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamCard 
              initials="JM" 
              name="James M." 
              role="Founder & Lead Systems Engineer" 
            />
            <TeamCard 
              initials="SN" 
              name="Sarah N." 
              role="Lead Web & Mobile Developer" 
            />
            <TeamCard 
              initials="DK" 
              name="David K." 
              role="Network & Hardware Specialist" 
            />
            <TeamCard 
              initials="GA" 
              name="Grace A." 
              role="Smart Homes Lead" 
            />
          </div>
        </div>
      </section>

      {/* Image Showcase */}
      <ImageShowcase />

      {/* Stats Band */}
      <section className="py-20 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="container relative z-10 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-6xl font-extrabold text-accent mb-2">100+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">Projects Delivered</p>
            </div>
            <div>
              <p className="text-4xl md:text-6xl font-extrabold text-accent mb-2">50+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">Happy Clients</p>
            </div>
            <div>
              <p className="text-4xl md:text-6xl font-extrabold text-accent mb-2">12</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">Core Services</p>
            </div>
            <div>
              <p className="text-4xl md:text-6xl font-extrabold text-accent mb-2">24/7</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Let's build your future in technology</h2>
              <p className="text-xl text-white/80 mb-12">Reach out today and tell us what you're trying to achieve. Our team is ready to help you innovate.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" className="rounded-full px-12 h-14 text-lg" asChild>
                  <Link href="/contact"><Phone className="mr-2 h-5 w-5" /> Contact CodeCast UG</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Card className="h-full rounded-2xl border-muted bg-white hover:shadow-xl transition-all">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mx-auto mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
      </CardContent>
    </Card>
  );
}

function AdvantageItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="mt-1 w-12 h-12 rounded-xl bg-secondary flex-shrink-0 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-bold mb-2">{title}</h4>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TeamCard({ initials, name, role }: { initials: string, name: string, role: string }) {
  return (
    <Card className="overflow-hidden rounded-2xl border-muted group">
      <div className="h-48 bg-secondary flex items-center justify-center relative overflow-hidden">
        <span className="text-4xl font-black text-primary/20 group-hover:scale-110 transition-transform">{initials}</span>
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <CardContent className="p-6 text-center">
        <h4 className="text-lg font-bold mb-1">{name}</h4>
        <p className="text-sm font-semibold text-primary mb-4">{role}</p>
        <div className="flex justify-center gap-3">
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary">
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}