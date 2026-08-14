"use client"

import { useState, useEffect } from "react";
import { Search, Bell, UserCircle, Menu, X, ChevronDown, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-secondary py-2 border-b">
        <div className="container px-4 flex justify-between items-center text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone className="w-3 h-3 text-primary" /> +256 753 998 891</span>
            <span className="flex items-center gap-2"><Mail className="w-3 h-3 text-primary" /> infor@codecastug.com</span>
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-primary" /> Ntinda NSA Mall, Kampala</span>
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
        "fixed top-0 lg:top-[37px] left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled ? "bg-white/95 backdrop-blur-md h-16 shadow-md" : "bg-white h-20"
      )}>
        <div className="container h-full px-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-accent rounded-sm rotate-45" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-xl tracking-tighter text-foreground uppercase">CodeCast UG</span>
              <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">Technology solutions</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex flex-1 justify-center gap-2">
            <NavLink href="/" active>Home</NavLink>
            <NavDropdown label="About Us" items={["Our Story", "Our Team", "Mission & Vision"]} />
            <NavDropdown label="TV Solutions" items={["Smart TV", "Live Streaming", "IPTV"]} />
            <NavDropdown label="Services" items={["Web Design", "Mobile Apps", "Smart Homes"]} />
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
              Get a Quote
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white lg:hidden pt-20">
          <div className="p-6 flex flex-col gap-4">
            <Link href="/" className="text-lg font-bold p-2 border-b">Home</Link>
            <Link href="/about" className="text-lg font-bold p-2 border-b">About Us</Link>
            <Link href="/services" className="text-lg font-bold p-2 border-b">Services</Link>
            <Link href="/tv" className="text-lg font-bold p-2 border-b">TV Solutions</Link>
            <Link href="/projects" className="text-lg font-bold p-2 border-b">Projects</Link>
            <Link href="/contact" className="text-lg font-bold p-2 border-b">Contact</Link>
            <Button className="mt-6 w-full py-6 rounded-2xl bg-primary">Get a Quote</Button>
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
        "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
        active ? "bg-secondary text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

function NavDropdown({ label, items }: { label: string, items: string[] }) {
  return (
    <div className="group relative">
      <button className="px-4 py-2 rounded-full text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1">
        {label} <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
      </button>
      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="bg-white border rounded-2xl shadow-xl w-48 p-2 overflow-hidden">
          {items.map((item) => (
            <Link 
              key={item} 
              href="#" 
              className="block px-4 py-3 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}