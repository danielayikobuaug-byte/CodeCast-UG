"use client"

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Send, Loader2, ChevronRight, Contact } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const db = useFirestore();
  const logoRef = useMemoFirebase(() => doc(db, 'site-assets', 'main-logo'), [db]);
  const { data: logoAsset } = useDoc(logoRef);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-secondary py-2 border-b">
        <div className="container px-4 flex justify-between items-center text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 transition-colors hover:text-primary cursor-pointer"><Contact className="w-3 h-3 text-primary" /> Daniel Ayikobua</span>
          
            <span className="flex items-center gap-2 transition-colors hover:text-primary cursor-pointer"><Phone className="w-3 h-3 text-primary" /> +256 753 998 891</span>
            <span className="flex items-center gap-2 transition-colors hover:text-primary cursor-pointer"><Mail className="w-3 h-3 text-primary" /> info@codecastug.com</span>
            <span className="flex items-center gap-2 transition-colors hover:text-primary cursor-pointer"><MapPin className="w-3 h-3 text-primary" /> Ntinda NSA Mall, Kampala</span>
          </div>
          <div className="flex items-center gap-4">
            <Facebook className="w-3 h-3 cursor-pointer hover:text-primary transition-colors" />
            <Twitter className="w-3 h-3 cursor-pointer hover:text-primary transition-colors" />
            <Linkedin className="w-3 h-3 cursor-pointer hover:text-primary transition-colors" />
            <Instagram className="w-3 h-3 cursor-pointer hover:text-primary transition-colors" />
          </div>
        </div>
      </div>

      <nav className={cn(
        "fixed top-0 lg:top-[37px] left-0 right-0 z-[1000] transition-all duration-300 border-b",
        isScrolled ? "bg-white/95 backdrop-blur-md h-16 shadow-md" : "bg-white h-20"
      )}>
        <div className="container px-4 h-full flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src={logoAsset?.value || "/logo.png"}
              alt="CodeCast UG Logo"
              width={1628}
              height={252}
              className="h-8 lg:h-10 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>
          
          <div className="hidden lg:flex flex-1 justify-center gap-1">
            <NavLink href="/" active={pathname === "/"}>Home</NavLink>
            <NavDropdown 
              label="About Us" 
              active={pathname.includes("/about")}
              items={[
                { label: "Our Story", href: "/about#story" },
                { label: "Our Team", href: "/about#team" },
                { label: "Mission & Vision", href: "/about#mission-vision" }
              ]} 
            />
            <NavDropdown
              label="TV Solutions"
              active={pathname.includes("/tv")}
              items={[
                { label: "Smart TV", href: "/services/tv/smarttv" },
                { label: "Live Streaming", href: "/services/tv/streaming" },
                { label: "Video on Demand", href: "/services/tv/vod" },
                { label: "Business IPTV", href: "/services/tv/iptv" },
                { label: "TV Interfaces", href: "/services/tv/tvinterface" },
                { label: "Installation & Support", href: "/services/tv/installation" }
              ]}
            />
            <NavDropdown
              label="Services"
              active={pathname.includes("/services/software")}
              items={[
                { label: "Web Design", href: "/services/software/web" },
                { label: "Mobile Apps", href: "/services/software/mobile" },
                { label: "System Design", href: "/services/software/systems" },
                { label: "Smart Homes & Networking", href: "/services/software/marketing" },
                { label: "Automated Caller Systems", href: "/services/software/caller" },
                { label: "Child Monitoring & Tracking", href: "/services/software/tracking" }
              ]}
            />
            <NavLink href="/projects" active={pathname === "/projects"}>Projects</NavLink>
            <NavLink href="/partnership" active={pathname === "/partnership"}>Partnership</NavLink>
            <NavLink href="/news" active={pathname === "/news"}>News</NavLink>
            <NavLink href="/contact" active={pathname === "/contact"}>Contact</NavLink>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button className="rounded-xl bg-primary hover:bg-primary/90 px-6 font-bold shadow-lg shadow-primary/20" asChild>
              <Link href="/contact">
                <Send className="mr-2 h-4 w-4" /> Get a Quote
              </Link>
            </Button>
          </div>

          {/* Mobile Menu using Sheet for side sliding */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full h-12 w-12">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 border-l-0">
              <SheetHeader className="p-6 border-b text-left bg-secondary/30">
                <SheetTitle className="text-xl font-bold tracking-tighter uppercase text-primary">Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                <MobileLink href="/" onClick={() => setIsMenuOpen(false)}>Home</MobileLink>
                <MobileLink href="/about" onClick={() => setIsMenuOpen(false)}>About Us</MobileLink>
                <MobileLink href="/services" onClick={() => setIsMenuOpen(false)}>All Services</MobileLink>
                <MobileLink href="/services/tv" onClick={() => setIsMenuOpen(false)}>TV Solutions</MobileLink>
                <MobileLink href="/projects" onClick={() => setIsMenuOpen(false)}>Our Projects</MobileLink>
                <MobileLink href="/partnership" onClick={() => setIsMenuOpen(false)}>Partnership</MobileLink>
                <MobileLink href="/news" onClick={() => setIsMenuOpen(false)}>News & Blog</MobileLink>
                <MobileLink href="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</MobileLink>
                
                <div className="mt-8 p-6 bg-secondary/50 rounded-3xl">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Direct Support</h4>
                  <div className="space-y-4">
                    <a href="tel:+256753998891" className="flex items-center gap-3 text-sm font-bold hover:text-primary transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Phone className="w-4 h-4" />
                      </div>
                      +256 753 998 891
                    </a>
                    <a href="mailto:info@codecastug.com" className="flex items-center gap-3 text-sm font-bold hover:text-primary transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Mail className="w-4 h-4" />
                      </div>
                      info@codecastug.com
                    </a>
                  </div>
                  <Button className="mt-8 w-full py-7 rounded-2xl bg-primary text-lg font-bold shadow-xl shadow-primary/20" asChild>
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                      <Send className="mr-2 h-5 w-5" /> Get a Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  )
}

function NavLink({ href, children, active }: { href: string, children: React.ReactNode, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={cn(
        "px-4 py-2 rounded-full text-[13px] font-bold tracking-tight transition-all",
        active ? "bg-secondary text-primary" : "text-gray-600 hover:text-primary hover:bg-secondary/50"
      )}
    >
      {children}
    </Link>
  );
}

function NavDropdown({ label, items, active }: { label: string, items: {label: string, href: string}[], active?: boolean }) {
  return (
    <div className="group relative">
      <button className={cn(
        "px-4 py-2 rounded-full text-[13px] font-bold tracking-tight text-gray-600 flex items-center gap-1 transition-all group-hover:text-primary group-hover:bg-secondary/50",
        active && "text-primary"
      )}>
        {label} <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
      </button>
      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="bg-white border border-muted rounded-2xl shadow-2xl w-64 p-3">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-4 py-3 text-[13px] font-bold text-gray-600 hover:bg-secondary hover:text-primary rounded-xl transition-all leading-snug"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileLink({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="text-lg font-bold p-4 border-b border-gray-50 flex items-center justify-between group"
    >
      {children}
      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-primary transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
