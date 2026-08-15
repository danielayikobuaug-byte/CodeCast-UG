
'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Newspaper, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  Loader2,
  ChevronRight,
  Image as ImageIcon,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';

const ADMIN_NAV = [
  { label: 'Overview', icon: LayoutDashboard, href: '/admin' },
  { label: 'Projects', icon: FolderKanban, href: '/admin/projects' },
  { label: 'News & Blog', icon: Newspaper, href: '/admin/news' },
  { label: 'Site Assets', icon: ImageIcon, href: '/admin/assets' },
  { label: 'Partner Logos', icon: ShieldCheck, href: '/admin/client-logos' },
  { label: 'Messages', icon: MessageSquare, href: '/admin/messages' },
  { label: 'Subscribers', icon: Users, href: '/admin/subscribers' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user && pathname !== '/admin/login') return null;
  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = () => {
    signOut(auth);
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-secondary/20 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-white border-r border-muted lg:fixed lg:inset-y-0 z-50 overflow-y-auto">
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-accent rounded-sm rotate-45" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg tracking-tighter text-foreground uppercase">CodeCast UG</span>
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Admin Dashboard</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {ADMIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                  pathname === item.href 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-bold text-sm">{item.label}</span>
                </div>
                <ChevronRight className={cn(
                  "w-4 h-4 transition-transform",
                  pathname === item.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )} />
              </Link>
            ))}
          </nav>

          <div className="pt-8 mt-8 border-t border-muted">
            <div className="flex items-center gap-3 mb-6 px-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">
                {user?.email?.[0].toUpperCase()}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold truncate">{user?.email?.split('@')[0]}</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">System Admin</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/5 px-4 h-12 rounded-xl"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-bold">Sign Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 min-h-screen p-4 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
