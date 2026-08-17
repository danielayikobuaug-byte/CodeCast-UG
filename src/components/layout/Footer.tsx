"use client"

import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function Footer() {
  const db = useFirestore();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const logoRef = useMemoFirebase(() => doc(db, 'site-assets', 'main-logo'), [db]);
  const { data: logoAsset } = useDoc(logoRef);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const id = Date.now().toString();
      await setDoc(doc(db, 'subscribers', id), {
        id,
        email,
        timestamp: serverTimestamp(),
        source: 'footer'
      });
      toast({ title: "Subscribed!", description: "You've been added to our mailing list." });
      setEmail("");
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Subscription Failed", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-secondary/30 pt-24 pb-12 border-t">
      <div className="container px-4">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              {logoAsset?.value ? (
                <div className="relative h-10 w-10 shrink-0">
                  <Image
                    src={logoAsset.value}
                    alt="CodeCast UG Logo"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center shrink-0">
                  <div className="w-5 h-5 border-2 border-accent rounded-sm rotate-45" />
                </div>
              )}
              <span className="font-bold text-xl tracking-tighter text-foreground">
                CodeCast<span className="ml-0.5 px-1.5 py-0.5 rounded-md bg-[#08AFCB] text-white">UG</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Technology and entertainment solutions provider based in Kampala, Uganda. We code smart and stream the world.
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon icon={<Facebook />} />
              <SocialIcon icon={<Twitter />} />
              <SocialIcon icon={<Linkedin />} />
              <SocialIcon icon={<Instagram />} />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/projects">Projects</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Our Services</h4>
            <ul className="flex flex-col gap-3">
              <FooterLink href="/services/software/web">Web Development</FooterLink>
              <FooterLink href="/services/software/mobile">Mobile App Design</FooterLink>
              <FooterLink href="/services/tv/smarttv">Smart TV Solutions</FooterLink>
              <FooterLink href="/services/tv/streaming">Live Streaming</FooterLink>
              <FooterLink href="/services/tv/iptv">Business IPTV</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe for tech tips and project updates.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input 
                placeholder="Email address" 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full bg-white border-muted" 
              />
              <Button size="icon" disabled={loading} className="rounded-full flex-shrink-0 bg-primary">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              </Button>
            </form>
            <div className="mt-8 space-y-4">
              <ContactItem icon={<Phone />} text="+256 753 998 891" />
              <ContactItem icon={<Mail />} text="info@codecastug.com" />
              <ContactItem icon={<MapPin />} text="Ntinda NSA Mall, Kampala" />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">
          <p>© {new Date().getFullYear()} CodeCast UG LTD. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-9 h-9 rounded-xl bg-white border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all">
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-muted-foreground hover:text-primary hover:pl-1 transition-all">
        {children}
      </Link>
    </li>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <div className="text-primary">{icon}</div>
      <span>{text}</span>
    </div>
  );
}
