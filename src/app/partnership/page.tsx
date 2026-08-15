
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Handshake, Users, Wrench, TrendingUp, Cpu, Store, Building2, ChevronRight, Phone } from "lucide-react";
import Link from "next/link";
import { StatsCarousel } from "@/components/sections/StatsCarousel";

export default function PartnershipPage() {
  return (
    <div className="flex flex-col">
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-secondary to-white border-b py-20">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-navy-900 mb-6">Partner With CodeCast UG LTD</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Grow together : combine your reach with our technology and entertainment expertise to deliver more value to shared clients.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="text-primary hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Partnership</span>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-primary text-white p-12 flex flex-col justify-center">
              <div className="absolute inset-0 opacity-20 bg-[url('https://i.pinimg.com/1200x/65/cf/90/65cf90be1f0a7027061c582d2eaf978c.jpg')] bg-cover bg-center" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6">Better Together</h2>
                <p className="text-lg text-white/90">
                  Whether you're an agency, a reseller or a fellow technology company, partnering with CodeCast UG LTD means combining strengths to serve clients better.
                </p>
              </div>
            </div>

            <div className="grid gap-8">
              <PartnerFeature 
                icon={<Handshake className="h-6 w-6" />}
                title="Shared Expertise"
                desc="Bring your strengths, we bring ours — from software development to Smart TV and IPTV installation and support."
              />
              <PartnerFeature 
                icon={<Users className="h-6 w-6" />}
                title="Wider Reach"
                desc="Partnering opens doors to new markets and client bases for both organisations."
              />
              <PartnerFeature 
                icon={<Wrench className="h-6 w-6" />}
                title="Dedicated Support"
                desc="Partners get a direct line to our technical team for faster turnaround on joint projects."
              />
              <PartnerFeature 
                icon={<TrendingUp className="h-6 w-6" />}
                title="Shared Growth"
                desc="Co-branded solutions and referral opportunities that grow revenue for both sides."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-24 bg-secondary/30">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Partnership Types</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-navy-900">Ways To Work With Us</h2>
            <p className="text-muted-foreground text-lg">We structure partnerships around what makes sense for your business.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PartnerCard 
              icon={<Cpu className="h-10 w-10" />}
              title="Technology Partners"
              desc="Software vendors and platform providers who want to integrate with or resell CodeCast UG LTD-built solutions."
            />
            <PartnerCard 
              icon={<Store className="h-10 w-10" />}
              title="Reseller & Channel Partners"
              desc="Agencies and vendors who sell our web, mobile, systems or Smart TV/IPTV services to their own client base."
            />
            <PartnerCard 
              icon={<Building2 className="h-10 w-10" />}
              title="Strategic Alliances"
              desc="Corporates, schools and NGOs looking for a long-term technology partner across multiple projects."
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-navy-900">Becoming A Partner</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProcessStep num="1" title="Reach Out" desc="Send us a message with a bit about your business and partnership interest." />
            <ProcessStep num="2" title="Discovery Call" desc="We discuss goals, fit and how a partnership could work for both sides." />
            <ProcessStep num="3" title="Agreement" desc="We formalise terms, roles and expectations in a simple partnership agreement." />
            <ProcessStep num="4" title="Launch & Grow" desc="We onboard your team and start delivering joint value to clients." />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsCarousel />

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Ready to explore a partnership?</h2>
              <p className="text-xl text-white/80 mb-12">Tell us about your business and let's find the right way to work together.</p>
              <Button size="lg" variant="secondary" className="rounded-full px-12 h-14 text-lg font-bold">
                <Handshake className="mr-2 h-6 w-6" /> Start The Conversation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PartnerFeature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2 text-navy-900">{title}</h4>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function PartnerCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Card className="rounded-3xl border-muted bg-white hover:shadow-xl transition-all p-10 text-center">
      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary text-primary">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-4 text-navy-900">{title}</h4>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </Card>
  );
}

function ProcessStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="p-10 rounded-[2rem] bg-secondary/30 border border-muted hover:border-primary/50 transition-colors">
      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm mb-6">{num}</div>
      <h4 className="text-lg font-bold mb-3 text-navy-900">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
