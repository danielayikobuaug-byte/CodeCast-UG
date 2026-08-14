
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  FileText, 
  Send, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  MessageSquare,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-0">
      {/* Page Hero */}
      <section className="relative py-20 bg-secondary/30 border-b overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">Get In Touch</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Have a project in mind or need support? Our team at Ntinda NSA Mall, Kampala is ready to help.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="text-primary hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Contact Us</span>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Info Card */}
            <div className="relative rounded-3xl overflow-hidden bg-foreground text-white p-12 min-h-[600px] flex flex-col justify-center shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/network/1200/800" 
                alt="Contact Information" 
                fill 
                className="object-cover opacity-20"
                data-ai-hint="server network"
              />
              <div className="relative z-10 space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Contact Information</h3>
                  <p className="text-white/70">Reach us directly, or fill in the form and we'll get back to you within one business day.</p>
                </div>

                <div className="space-y-6">
                  <ContactItem 
                    icon={<MapPin />} 
                    title="Visit Us" 
                    desc="Ntinda NSA Mall, Kampala, Uganda" 
                  />
                  <ContactItem 
                    icon={<Phone />} 
                    title="Call Us" 
                    desc="+256 753 998 891" 
                    href="tel:+256753998891"
                  />
                  <ContactItem 
                    icon={<Mail />} 
                    title="Email Us" 
                    desc="info@codecastug.com" 
                    href="mailto:info@codecastug.com"
                  />
                  <ContactItem 
                    icon={<FileText />} 
                    title="TIN" 
                    desc="1017321312" 
                  />
                  <ContactItem 
                    icon={<Clock />} 
                    title="Working Hours" 
                    desc={
                      <>
                        Mon – Fri: 8:00 AM – 6:00 PM <br />
                        Sat: 9:00 AM – 2:00 PM
                      </>
                    }
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <SocialLink icon={<Facebook />} />
                  <SocialLink icon={<Twitter />} />
                  <SocialLink icon={<Linkedin />} />
                  <SocialLink icon={<Instagram />} />
                  <SocialLink icon={<MessageSquare />} />
                </div>
              </div>
            </div>

            {/* Form Card */}
            <Card className="rounded-3xl border-muted shadow-xl overflow-hidden">
              <CardContent className="p-12">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Send Us A Message</h3>
                  <p className="text-muted-foreground">Tell us a bit about what you need and we'll follow up promptly.</p>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                      <Input placeholder="Your full name" className="h-12 rounded-xl bg-secondary/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Email Address *</label>
                      <Input type="email" placeholder="you@example.com" className="h-12 rounded-xl bg-secondary/50" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                      <Input placeholder="+256 7XX XXX XXX" className="h-12 rounded-xl bg-secondary/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Service of Interest</label>
                      <Select>
                        <SelectTrigger className="h-12 rounded-xl bg-secondary/50">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Web Design & Development</SelectItem>
                          <SelectItem value="mobile">Mobile App Development</SelectItem>
                          <SelectItem value="systems">System Design & Development</SelectItem>
                          <SelectItem value="smart-homes">Smart Homes & Networking</SelectItem>
                          <SelectItem value="tv">Smart TV Solutions</SelectItem>
                          <SelectItem value="iptv">Business IPTV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Message *</label>
                    <Textarea placeholder="Tell us about your project or support need..." className="min-h-[150px] rounded-xl bg-secondary/50" />
                  </div>

                  <Button className="w-full h-14 rounded-full text-lg font-bold shadow-lg shadow-primary/20">
                    <Send className="mr-2 h-5 w-5" /> Send Message
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground font-medium uppercase tracking-widest pt-4">
                    Responses typically within 24 hours.
                  </p>
                </form>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Find Us</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Location</h2>
            <p className="text-muted-foreground text-lg">Visit our office at Ntinda NSA Mall for a consultation.</p>
          </div>
          
          <div className="rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl h-[500px] relative">
            <iframe
              src="https://www.google.com/maps?q=Ntinda+NSA+Mall,+Kampala,+Uganda&output=embed"
              className="absolute inset-0 w-full h-full grayscale contrast-125"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CodeCast UG LTD Location"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border rounded-2xl px-6 bg-secondary/10">
                <AccordionTrigger className="text-lg font-bold hover:no-underline">What areas do you serve?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  We're based at Ntinda NSA Mall, Kampala, and serve clients across Uganda, with remote support available for software and entertainment systems anywhere in the world.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-2xl px-6 bg-secondary/10">
                <AccordionTrigger className="text-lg font-bold hover:no-underline">How long does a typical website project take?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Most business websites take 2–4 weeks depending on scope, while larger custom systems and redesigns may take longer. We'll give you a clear timeline after our first consultation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-2xl px-6 bg-secondary/10">
                <AccordionTrigger className="text-lg font-bold hover:no-underline">Do you offer support after a project is completed?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Yes. All our services include a support period after launch or installation, with ongoing maintenance packages available for long-term reliability.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-2xl px-6 bg-secondary/10">
                <AccordionTrigger className="text-lg font-bold hover:no-underline">Can you supply and install hardware as well?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Yes — from networking equipment to GPS tracking devices, Smart TVs, and IPTV installations, we handle both the software and the physical technology setup.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-20 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="container relative z-10">
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
    </div>
  );
}

function ContactItem({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: React.ReactNode, href?: string }) {
  const content = (
    <div className="flex gap-4 group">
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-foreground transition-all">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-white/60 text-xs uppercase tracking-widest mb-1">{title}</h4>
        <div className="text-lg font-medium text-white group-hover:text-accent transition-colors">{desc}</div>
      </div>
    </div>
  );

  return href ? <Link href={href} className="block">{content}</Link> : content;
}

function SocialLink({ icon }: { icon: React.ReactNode }) {
  return (
    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl bg-white/5 hover:bg-accent hover:text-foreground text-white transition-all border border-white/10">
      {icon}
    </Button>
  );
}
