'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FolderKanban, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Newspaper, 
  Settings, 
  ChevronRight 
} from "lucide-react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { cn } from "@/lib/utils";

export default function AdminOverviewPage() {
  const db = useFirestore();
  
  const messagesQuery = useMemoFirebase(() => {
    return query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(5));
  }, [db]);

  const subscribersQuery = useMemoFirebase(() => collection(db, 'subscribers'), [db]);
  const projectsQuery = useMemoFirebase(() => collection(db, 'projects'), [db]);

  const { data: messages } = useCollection(messagesQuery);
  const { data: subscribers } = useCollection(subscribersQuery);
  const { data: projects } = useCollection(projectsQuery);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Manage your content and track business engagement.</p>
        </div>
        <Badge variant="outline" className="w-fit px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary flex items-center gap-2">
          <Clock className="w-3 h-3" />
          Real-time Updates Active
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Projects" 
          value={projects?.length || 0} 
          icon={<FolderKanban />} 
          trend="+2 this month"
          positive={true}
        />
        <StatCard 
          title="Leads / Messages" 
          value={messages?.length || 0} 
          icon={<MessageSquare />} 
          trend="+12% vs last week"
          positive={true}
        />
        <StatCard 
          title="Subscribers" 
          value={subscribers?.length || 0} 
          icon={<Users />} 
          trend="New signups today"
          positive={true}
        />
        <StatCard 
          title="Growth Rate" 
          value="24%" 
          icon={<TrendingUp />} 
          trend="Steady performance"
          positive={true}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Messages */}
        <Card className="lg:col-span-2 rounded-3xl border-muted shadow-sm overflow-hidden">
          <CardHeader className="border-b bg-secondary/10 p-6 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Recent Inquiries
            </CardTitle>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3">View All</Badge>
          </CardHeader>
          <CardContent className="p-0">
            {messages?.length ? (
              <div className="divide-y divide-muted">
                {messages.map((msg: any) => (
                  <div key={msg.id} className="p-6 hover:bg-secondary/20 transition-colors flex items-center justify-between group">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-sm">{msg.name}</span>
                      <span className="text-xs text-muted-foreground">{msg.email}</span>
                      <Badge variant="secondary" className="w-fit text-[10px] mt-1 bg-secondary text-primary font-bold uppercase tracking-wider">
                        {msg.service || 'General'}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">
                        {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleDateString() : 'Just now'}
                      </span>
                      <button className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ml-auto">
                        Reply <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No messages received yet.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions / Links */}
        <div className="space-y-6">
          <Card className="rounded-3xl border-muted shadow-sm overflow-hidden h-full">
            <CardHeader className="bg-foreground text-white p-6">
              <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <QuickActionBtn label="Add New Project" icon={<FolderKanban />} />
              <QuickActionBtn label="Create Blog Post" icon={<Newspaper />} />
              <QuickActionBtn label="Export Subscribers" icon={<Users />} />
              <QuickActionBtn label="System Settings" icon={<Settings />} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, positive }: { title: string, value: string | number, icon: React.ReactNode, trend: string, positive: boolean }) {
  return (
    <Card className="rounded-3xl border-muted shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-secondary text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            {icon}
          </div>
          <div className={cn(
            "flex items-center text-[10px] font-bold px-2 py-1 rounded-full",
            positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            {positive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {trend}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-black text-foreground">{value}</span>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">{title}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionBtn({ label, icon }: { label: string, icon: React.ReactNode }) {
  return (
    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-secondary/50 hover:bg-primary hover:text-white transition-all group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:text-primary transition-colors">
          {icon}
        </div>
        <span className="text-sm font-bold">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
    </button>
  );
}
