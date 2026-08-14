'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  ArrowRight, 
  Calendar, 
  Tag 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  const blogPosts = [
    {
      id: 1,
      category: "Web Development",
      date: "June 12, 2026",
      title: "5 Signs Your Business Website Needs A Redesign",
      description: "Slow load times, an outdated look and poor mobile support could be costing you customers. Here's how to tell it's time for a revamp.",
      imageId: "blog-1",
      imageHint: "coding workspace"
    },
    {
      id: 2,
      category: "Company News",
      date: "May 28, 2026",
      title: "CodeCast UG LTD Expands Support Team To Serve More Clients",
      description: "We've grown our technical support team to keep response times fast as we take on more projects across Uganda.",
      imageId: "about-story",
      imageHint: "team collaboration"
    },
    {
      id: 3,
      category: "Smart Homes",
      date: "May 14, 2026",
      title: "Why Local SEO Matters For Ugandan Businesses",
      description: "Showing up when nearby customers search online can make a bigger difference than a bigger ad budget. Here's where to start.",
      imageId: "blog-2",
      imageHint: "business meeting"
    },
    {
      id: 4,
      category: "Networking",
      date: "April 30, 2026",
      title: "Structured Cabling: Why It's Worth Doing Right",
      description: "A messy, ad-hoc network setup causes downtime down the line. We break down what proper structured cabling actually involves.",
      imageId: "blog-3",
      imageHint: "network cables"
    },
    {
      id: 5,
      category: "Mobile Apps",
      date: "April 9, 2026",
      title: "Native vs. Cross-Platform: Which App Approach Fits Your Business?",
      description: "We weigh the trade-offs between native and cross-platform development to help you choose the right path for your next app.",
      imageId: "blog-4",
      imageHint: "mobile interface"
    },
    {
      id: 6,
      category: "Child Safety",
      date: "March 22, 2026",
      title: "How GPS Tracking Devices Are Giving Parents Peace Of Mind",
      description: "A look at how schools and families are using real-time tracking and geofencing to keep children safer on daily commutes.",
      imageId: "blog-5",
      imageHint: "data analytics"
    }
  ];

  return (
    <div className="flex flex-col gap-0">
      {/* Page Hero */}
      <section className="relative py-20 bg-secondary/30 border-b overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="container relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">News & Blog</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Insights, updates and practical tips from the CodeCast UG LTD team on software, technology and entertainment in Uganda.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="text-primary hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>News & Blog</span>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden rounded-2xl border-muted hover:shadow-xl transition-all duration-300">
                <div className="relative h-56 w-full">
                  <Image 
                    src={`https://picsum.photos/seed/${post.imageId}/800/600`}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={post.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    <span className="text-primary flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {post.category}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.description}
                  </p>
                  <Link 
                    href="#" 
                    className="inline-flex items-center text-sm font-bold text-primary gap-2 hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay Updated</h2>
              <p className="text-lg text-white/80 mb-10">
                Get occasional tips and updates from CodeCast UG LTD straight to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="h-14 rounded-full bg-white text-foreground px-8 border-none"
                  required
                />
                <Button variant="secondary" size="lg" className="h-14 rounded-full px-12 text-lg font-bold" type="submit">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-background">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto p-12 rounded-[2.5rem] bg-secondary/30 border border-muted">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Got a technology question?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team is happy to talk through your project, big or small.
            </p>
            <Button size="lg" className="rounded-full px-12 h-14 text-lg" asChild>
              <Link href="/contact">Contact CodeCast UG LTD</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
