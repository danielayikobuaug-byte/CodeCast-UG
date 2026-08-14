
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Laptop, Smartphone, Settings, Network, PhoneCall, Locate, Monitor, Radio, Tv, ChevronRight, Phone } from "lucide-react";
import Link from "next/link";
import { StatsCarousel } from "@/components/sections/StatsCarousel";

const PROJECTS = [
  {
    tag: "Web Design & Redesign",
    title: "Corporate Website Redesign",
    desc: "A full revamp of an outdated corporate site into a fast, modern, mobile-friendly website with a CMS the client's own team can manage.",
    icon: <Laptop className="h-10 w-10" />,
    image: "https://picsum.photos/seed/p1/800/600"
  },
  {
    tag: "Mobile App Development",
    title: "Retail Ordering Mobile App",
    desc: "A cross-platform shopping app with order tracking and mobile payments, built for a growing retail chain.",
    icon: <Smartphone className="h-10 w-10" />,
    image: "https://picsum.photos/seed/p2/800/600"
  },
  {
    tag: "System Design & Development",
    title: "School Management System",
    desc: "A custom system covering admissions, fees, timetabling and reporting for a private secondary school.",
    icon: <Settings className="h-10 w-10" />,
    image: "https://picsum.photos/seed/p3/800/600"
  },
  {
    tag: "Networking",
    title: "Office Network Rollout",
    desc: "Structured cabling, wireless coverage and a secured network setup for a multi-floor office in Kampala.",
    icon: <Network className="h-10 w-10" />,
    image: "https://picsum.photos/seed/p4/800/600"
  },
  {
    tag: "Automated Caller Systems",
    title: "Clinic Appointment Caller System",
    desc: "An automated IVR system that reminds patients of appointments and reduces missed-visit rates for a busy clinic.",
    icon: <PhoneCall className="h-10 w-10" />,
    image: "https://picsum.photos/seed/p5/800/600"
  },
  {
    tag: "Child Monitoring & Tracking",
    title: "School Bus Tracking System",
    desc: "GPS tracking devices and a parent-facing dashboard so families can follow the school bus in real time.",
    icon: <Locate className="h-10 w-10" />,
    image: "https://picsum.photos/seed/p6/800/600"
  },
  {
    tag: "Business IPTV",
    title: "Hotel-Wide IPTV Rollout",
    desc: "A business IPTV deployment across every guest room, with a management dashboard for content and channel control.",
    icon: <Monitor className="h-10 w-10" />,
    image: "https://picsum.photos/seed/p7/800/600"
  },
  {
    tag: "Live Streaming",
    title: "Sports Bar Live Streaming Setup",
    desc: "500+ channel live streaming across multiple screens, tuned for a smooth, buffer-free match-day experience.",
    icon: <Radio className="h-10 w-10" />,
    image: "https://picsum.photos/seed/p8/800/600"
  },
  {
    tag: "Smart TV Solutions",
    title: "Family Home Smart TV Setup",
    desc: "Smart TV installation and configuration across a family home, with apps and accounts set up and ready to use.",
    icon: <Tv className="h-10 w-10" />,
    image: "https://picsum.photos/seed/p9/800/600"
  }
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-secondary to-white border-b py-20">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-navy-900 mb-6">Our Projects</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A look at the technology and entertainment work we've delivered for businesses, schools and organisations across Uganda.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="text-primary hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Projects</span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <Card key={index} className="group overflow-hidden rounded-3xl border-muted hover:shadow-2xl transition-all duration-500">
                <div 
                  className="h-56 bg-cover bg-center relative flex items-center justify-center overflow-hidden"
                  style={{ backgroundImage: `linear-gradient(rgba(14,29,48,0.5), rgba(14,29,48,0.5)), url(${project.image})` }}
                >
                  <div className="text-white transform transition-transform duration-500 group-hover:scale-125">
                    {project.icon}
                  </div>
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-8">
                  <Badge variant="secondary" className="mb-4 bg-secondary text-primary font-bold text-[10px] uppercase tracking-wider px-3">
                    {project.tag}
                  </Badge>
                  <h3 className="text-xl font-bold mb-3 text-navy-900 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
                </CardContent>
              </Card>
            ))}
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
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Have a project in mind?</h2>
              <p className="text-xl text-white/80 mb-12">Let's talk about what you're trying to build.</p>
              <Button size="lg" variant="secondary" className="rounded-full px-12 h-14 text-lg font-bold">
                <Phone className="mr-2 h-6 w-6" /> Contact CodeCast UG LTD
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
