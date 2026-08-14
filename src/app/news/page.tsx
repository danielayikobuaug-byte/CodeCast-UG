'use client';

import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const blogPosts = [
    {
      id: 1,
      category: "Web Development",
      date: "June 12, 2026",
      title: "5 Signs Your Business Website Needs A Redesign",
      description: "Slow load times, an outdated look and poor mobile support could be costing you customers. Here's how to tell it's time for a revamp.",
      content: "A website is often the first point of contact between a business and its potential customers. If your site looks like it belongs in the early 2000s, it sends a message that your company isn't keeping up with the times. Slow performance, lack of mobile responsiveness, and difficult navigation are all critical warning signs. In today's digital landscape, user experience is paramount. A redesign isn't just about aesthetics; it's about optimizing for conversion, speed, and cross-device compatibility. We recommend evaluating your site every 2-3 years to ensure it still serves your business goals effectively.",
      imageId: "blog-1",
      imageHint: "coding workspace"
    },
    {
      id: 2,
      category: "Company News",
      date: "May 28, 2026",
      title: "CodeCast UG LTD Expands Support Team To Serve More Clients",
      description: "We've grown our technical support team to keep response times fast as we take on more projects across Uganda.",
      content: "As we continue to grow and partner with more organizations across East Africa, our commitment to reliability remains our top priority. We are excited to announce the expansion of our dedicated technical support team. By bringing in more certified network engineers and software specialists, we are ensuring that our clients receive the prompt, high-quality assistance they've come to expect from CodeCast UG LTD. This expansion allows us to offer 24/7 monitoring for our enterprise IPTV and system clients, guaranteeing minimal downtime and maximum efficiency.",
      imageId: "about-story",
      imageHint: "team collaboration"
    },
    {
      id: 3,
      category: "Smart Homes",
      date: "May 14, 2026",
      title: "Why Local SEO Matters For Ugandan Businesses",
      description: "Showing up when nearby customers search online can make a bigger difference than a bigger ad budget. Here's where to start.",
      content: "For businesses in Kampala and across Uganda, being visible in local search results is crucial. Local SEO ensures that when someone searches for 'Smart TV setup near me' or 'Software developers in Ntinda', your business is at the top of the list. This involves optimizing your Google Business Profile, managing local reviews, and ensuring your contact information is consistent across the web. At CodeCast, we help our clients integrate local SEO best practices into their web development projects from day one, helping them reach the customers who are literally just around the corner.",
      imageId: "blog-2",
      imageHint: "business meeting"
    },
    {
      id: 4,
      category: "Networking",
      date: "April 30, 2026",
      title: "Structured Cabling: Why It's Worth Doing Right",
      description: "A messy, ad-hoc network setup causes downtime down the line. We break down what proper structured cabling actually involves.",
      content: "Structured cabling is the invisible backbone of any modern office. Many businesses fall into the trap of adding cables incrementally, leading to a 'spaghetti' mess that is impossible to maintain. A professional structured cabling setup provides a standardized approach to network infrastructure, allowing for easier troubleshooting, better scalability, and significantly reduced downtime. Whether it's Cat6, Cat6a, or fiber optics, doing it right the first time saves money and headaches in the long run. Our team specializes in designing and implementing these robust physical networks.",
      imageId: "blog-3",
      imageHint: "network cables"
    },
    {
      id: 5,
      category: "Mobile Apps",
      date: "April 9, 2026",
      title: "Native vs. Cross-Platform: Which App Approach Fits Your Business?",
      description: "We weigh the trade-offs between native and cross-platform development to help you choose the right path for your next app.",
      content: "Choosing between native (Swift/Kotlin) and cross-platform (React Native/Flutter) is a critical decision for any mobile project. Native apps offer the highest performance and deepest integration with hardware, but require maintaining two separate codebases. Cross-platform development allows for faster time-to-market and lower development costs by using a single codebase for both iOS and Android. For most business applications, cross-platform is now the preferred choice due to its maturity and efficiency. We work with you to analyze your specific requirements and choose the framework that best balances performance, cost, and long-term maintainability.",
      imageId: "blog-4",
      imageHint: "mobile interface"
    },
    {
      id: 6,
      category: "Child Safety",
      date: "March 22, 2026",
      title: "How GPS Tracking Devices Are Giving Parents Peace Of Mind",
      description: "A look at how schools and families are using real-time tracking and geofencing to keep children safer on daily commutes.",
      content: "Safety is a primary concern for every parent and school administrator. Our GPS-based child tracking solutions provide real-time location data, geofencing alerts, and historical route playback. By integrating these hardware devices with a custom-built software dashboard, we empower parents to know exactly where their children are during their school commute. Schools also benefit from optimized bus routing and automated arrival notifications. It's a prime example of how simple, reliable technology can solve complex real-world challenges and provide invaluable peace of mind.",
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
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center text-sm font-bold text-primary gap-2 hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="h-4 w-4" />
                  </button>
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

      {/* Article Detail Popup */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl">
          {selectedPost && (
            <div className="flex flex-col gap-6 py-4">
              <DialogHeader>
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  <span className="text-primary flex items-center gap-1">
                    <Tag className="h-3 w-3" /> {selectedPost.category}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {selectedPost.date}
                  </span>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight text-foreground">
                  {selectedPost.title}
                </DialogTitle>
              </DialogHeader>

              <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-lg">
                <Image 
                  src={`https://picsum.photos/seed/${selectedPost.imageId}/800/600`}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p className="font-bold text-foreground italic border-l-4 border-primary pl-4 py-2 bg-secondary/20 rounded-r-xl">
                  {selectedPost.description}
                </p>
                <div className="prose prose-slate max-w-none">
                  {selectedPost.content}
                </div>
                <p>
                  At CodeCast UG LTD, we are dedicated to bringing these innovative solutions to businesses across Uganda. Whether it's a software revamp or a complete entertainment system rollout, our team is here to guide you through every step of the process.
                </p>
              </div>

              <div className="pt-6 border-t mt-4 flex justify-end">
                <Button onClick={() => setSelectedPost(null)} variant="secondary" className="rounded-full px-8">
                  Close Article
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
