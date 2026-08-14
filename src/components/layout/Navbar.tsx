
"use client"

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
            <span className="flex items-center gap-2 transition-colors hover:text-primary cursor-pointer"><Phone className="w-3 h-3 text-primary" /> +256 753 998 891</span>
            <span className="flex items-center gap-2 transition-colors hover:text-primary cursor-pointer"><Mail className="w-3 h-3 text-primary" /> infor@codecastug.com</span>
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
        <div className="container h-full px-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-accent rounded-sm rotate-45" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-xl tracking-tighter text-navy-900 uppercase">CodeCast UG</span>
              <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">Technology solutions</span>
            </div>
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
                { label: "IPTV", href: "/services/tv/iptv" }
              ]} 
            />
            <NavDropdown 
              label="Services" 
              active={pathname.includes("/services")}
              items={[
                { label: "Web Design", href: "/services/software/web" },
                { label: "Mobile Apps", href: "/services/software/mobile" },
                { label: "Smart Homes", href: "/services/software/marketing" }
              ]} 
            />
            <NavLink href="/projects" active={pathname === "/projects"}>Projects</NavLink>
            <NavLink href="/partnership" active={pathname === "/partnership"}>Partnership</NavLink>
            <NavLink href="/news" active={pathname === "/news"}>News</NavLink>
            <NavLink href="/contact" active={pathname === "/contact"}>Contact</NavLink>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button className="rounded-xl bg-primary hover:bg-primary/90 px-6 font-bold shadow-lg shadow-primary/20">
              <Send className="mr-2 h-4 w-4" /> Get a Quote
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden rounded-full h-12 w-12" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[1100] bg-white lg:hidden pt-20 overflow-y-auto">
          <div className="p-6 flex flex-col gap-2">
            <MobileLink href="/" onClick={() => setIsMenuOpen(false)}>Home</MobileLink>
            <MobileLink href="/about" onClick={() => setIsMenuOpen(false)}>About Us</MobileLink>
            <MobileLink href="/projects" onClick={() => setIsMenuOpen(false)}>Projects</MobileLink>
            <MobileLink href="/partnership" onClick={() => setIsMenuOpen(false)}>Partnership</MobileLink>
            <MobileLink href="/news" onClick={() => setIsMenuOpen(false)}>News & Blog</MobileLink>
            <MobileLink href="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</MobileLink>
            <Button className="mt-8 w-full py-7 rounded-2xl bg-primary text-lg font-bold shadow-xl shadow-primary/20">
              <Send className="mr-2 h-5 w-5" /> Get a Quote
            </Button>
          </div>
        </div>
      )}
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
        <div className="bg-white border border-muted rounded-2xl shadow-2xl w-56 p-3 overflow-hidden">
          {items.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="block px-4 py-3 text-[13px] font-bold text-gray-600 hover:bg-secondary hover:text-primary rounded-xl transition-all"
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
      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-primary" />
    </Link>
  );
}
