'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  ArrowRight, 
  Calendar, 
  Tag,
  Loader2,
  Newspaper,
  CheckCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";

const STATIC_POSTS = [
  {
    id: "s1",
    category: "Web Development",
    date: "June 12, 2026",
    title: "5 Signs Your Business Website Needs A Redesign",
    description: "Slow load times, an outdated look and poor mobile support could be costing you customers. Here's how to tell it's time for a revamp.",
    content: "A website is often the first point of contact between a business and its potential customers. If your site looks like it belongs in the early 2000s, it sends a message that your company isn't keeping up with the times. Slow performance, lack of mobile responsiveness, and difficult navigation are all critical warning signs. In today's digital landscape, user experience is paramount. A redesign isn't just about aesthetics; it's about optimizing for conversion, speed, and cross-device compatibility. We recommend evaluating your site every 2-3 years to ensure it still serves your business goals effectively.",
    imageUrl: "https://picsum.photos/seed/blog1/800/600",
  },
  {
    id: "s2",
    category: "Company News",
    date: "May 28, 2026",
    title: "CodeCast UG LTD Expands Support Team To Serve More Clients",
    description: "We've grown our technical support team to keep response times fast as we take on more projects across Uganda.",
    content: "As we continue to grow and partner with more organizations across East Africa, our commitment to reliability remains our top priority. We are excited to announce the expansion of our dedicated technical support team. By bringing in more certified network engineers and software specialists, we are ensuring that our clients receive the prompt, high-quality assistance they've come to expect from CodeCast UG LTD. This expansion allows us to offer 24/7 monitoring for our enterprise IPTV and system clients, guaranteeing minimal downtime and maximum efficiency.",
    imageUrl: "https://picsum.photos/seed/codecast-story/800/600",
  },
  {
    id: "s3",
    category: "Smart Homes",
    date: "May 14, 2026",
    title: "Why Local SEO Matters For Ugandan Businesses",
    description: "Showing up when nearby customers search online can make a bigger difference than a bigger ad budget. Here's where to start.",
    content: "For businesses in Kampala and across Uganda, being visible in local search results is crucial. Local SEO ensures that when someone searches for 'Smart TV setup near me' or 'Software developers in Ntinda', your business is at the top of the list. This involves optimizing your Google Business Profile, managing local reviews, and ensuring your contact information is consistent across the web. At CodeCast, we help our clients integrate local SEO best practices into their web development projects from day one, helping them reach the customers who are literally just around the corner.",
    imageUrl: "https://picsum.photos/seed/blog2/800/600",
  },
  {
    id: "s4",
    category: "Networking",
    date: "April 30, 2026",
    title: "Structured Cabling: Why It's Worth Doing Right",
    description: "A messy, ad-hoc network setup causes downtime down the line. We break down what proper structured cabling actually involves.",
    content: "Structured cabling is the invisible backbone of any modern office. Many businesses fall into the trap of adding cables incrementally, leading to a 'spaghetti' mess that is impossible to maintain. A professional structured cabling setup provides a standardized approach to network infrastructure, allowing for easier troubleshooting, better scalability, and significantly reduced downtime. Whether it's Cat6, Cat6a, or fiber optics, doing it right the first time saves money and headaches in the long run. Our team specializes in designing and implementing these robust physical networks.",
    imageUrl: "https://picsum.photos/seed/blog3/800/600",
  },
  {
    id: "s5",
    category: "Mobile Apps",
    date: "April 9, 2026",
    title: "Native vs. Cross-Platform: Which App Approach Fits Your Business?",
    description: "We weigh the trade-offs between native and cross-platform development to help you choose the right path for your next app.",
    content: "Choosing between native (Swift/Kotlin) and cross-platform (React Native/Flutter) is a critical decision for any mobile project. Native apps offer the highest performance and deepest integration with hardware, but require maintaining two separate codebases. Cross-platform development allows for faster time-to-market and lower development costs by using a single codebase for both iOS and Android. For most business applications, cross-platform is now the preferred choice due to its maturity and efficiency. We work with you to analyze your specific requirements and choose the framework that best balances performance, cost, and long-term maintainability.",
    imageUrl: "https://picsum.photos/seed/blog4/800/600",
  },
  {
    id: "s6",
    category: "Child Safety",
    date: "March 22, 2026",
    title: "How GPS Tracking Devices Are Giving Parents Peace Of Mind",
    description: "A look at how schools and families are using real-time tracking and geofencing to keep children safer on daily commutes.",
    content: "Safety is a primary concern for every parent and school administrator. Our GPS-based child tracking solutions provide real-time location data, geofencing alerts, and historical route playback. By integrating these hardware devices with a custom-built software dashboard, we empower parents to know exactly where their children are during their school commute. Schools also benefit from optimized bus routing and automated arrival notifications. It's a prime example of how simple, reliable technology can solve complex real-world challenges and provide invaluable peace of mind.",
    imageUrl: "https://picsum.photos/seed/blog5/800/600",
  }
];

export default function NewsPage() {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  
  const db = useFirestore();
  const newsQuery = useMemoFirebase(() => {
    return query(collection(db, 'blog-posts'), orderBy('date', 'desc'));
  }, [db]);

  const { data: dbPosts, loading } = useCollection(newsQuery);

  const allPosts = dbPosts ? [...dbPosts, ...STATIC_POSTS] : STATIC_POSTS;

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubscribing(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    try {
      const id = Date.now().toString();
      await setDoc(doc(db, 'subscribers', id), {
        id,
        email,
        timestamp: serverTimestamp(),
        source: 'news_page'
      });
      setSubscribed(true);
      toast({ title: "Welcome!", description: "You've been successfully subscribed." });
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Error", description: error.message });
    } finally {
      setIsSubscribing(false);
    }
  };

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
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Loading latest news...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post: any) => (
                <Card key={post.id} className="group overflow-hidden rounded-2xl border-muted hover:shadow-xl transition-all duration-300">
                  <div className="relative h-56 w-full bg-secondary/50">
                    <Image 
                      src={post.imageUrl || 'https://picsum.photos/seed/news/800/600'}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
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
                        <Calendar className="h-3 w-3" /> 
                        {post.date?.toDate ? post.date.toDate().toLocaleDateString() : post.date}
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
          )}

          {!loading && allPosts.length === 0 && (
            <div className="py-20 text-center">
              <Newspaper className="w-16 h-16 mx-auto opacity-10 mb-4" />
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">No blog posts available yet</p>
            </div>
          )}
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
              
              {subscribed ? (
                <div className="flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold">You're on the list!</h4>
                  <p className="text-white/60">Thank you for subscribing to our newsletter.</p>
                </div>
              ) : (
                <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleNewsletterSubmit}>
                  <input 
                    name="email"
                    type="email" 
                    placeholder="Enter your email address" 
                    className="h-14 w-full rounded-full bg-white text-foreground px-8 border-none focus:outline-none"
                    required
                  />
                  <Button variant="secondary" size="lg" disabled={isSubscribing} className="h-14 rounded-full px-12 text-lg font-bold" type="submit">
                    {isSubscribing ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Detail Popup */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-0">
          {selectedPost && (
            <div className="flex flex-col gap-0">
              <div className="relative h-64 md:h-80 w-full">
                <Image 
                  src={selectedPost.imageUrl || 'https://picsum.photos/seed/news/800/600'}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              <div className="p-8 md:p-12 -mt-12 relative bg-background rounded-t-[3rem] space-y-6">
                <DialogHeader>
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    <span className="text-primary flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {selectedPost.category}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> 
                      {selectedPost.date?.toDate ? selectedPost.date.toDate().toLocaleDateString() : selectedPost.date}
                    </span>
                  </div>
                  <DialogTitle className="text-2xl md:text-4xl font-bold leading-tight text-foreground">
                    {selectedPost.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
                  <p className="font-bold text-foreground italic border-l-4 border-primary pl-4 py-2 bg-secondary/20 rounded-r-xl">
                    {selectedPost.description}
                  </p>
                  <div className="prose prose-slate max-w-none whitespace-pre-wrap">
                    {selectedPost.content}
                  </div>
                </div>

                <div className="pt-8 border-t flex justify-end">
                  <Button onClick={() => setSelectedPost(null)} variant="secondary" className="rounded-full px-8 h-12 font-bold">
                    Close Article
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
