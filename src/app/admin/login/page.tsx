'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, Lock, Mail, Loader2, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ALLOWED_ADMINS = ['info@codecastug.com', 'joelhitech111@gmail.com'];

export default function AdminLoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Enforce allowed admin emails
    if (!ALLOWED_ADMINS.includes(email.toLowerCase())) {
      const msg = "Access Denied: This email is not authorized for administrative access.";
      setError(msg);
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: msg,
      });
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.toLowerCase().trim(), password);
      toast({
        title: "Login Successful",
        description: "Welcome to the CodeCast UG admin dashboard.",
      });
      router.push('/admin');
    } catch (firebaseError: any) {
      // We remove console.error to prevent the Next.js error overlay during development.
      // The user is notified via the UI alerts and toasts instead.
      
      let msg = "Invalid credentials. Please ensure you have created this user in the Firebase Console.";
      
      if (firebaseError.code === 'auth/invalid-credential' || firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password') {
        msg = "Login failed. You must manually add this user in the Firebase Console under Authentication > Users and enable the Email/Password sign-in method.";
      } else if (firebaseError.code === 'auth/too-many-requests') {
        msg = "Access temporarily disabled due to many failed attempts. Please try again later.";
      }
      
      setError(msg);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-secondary/20 gap-8">
      <Image
        src="/logo.png"
        alt="CodeCast UG Logo"
        width={1628}
        height={252}
        className="h-10 w-auto object-contain"
        priority
        unoptimized
      />
      <Card className="w-full max-w-md rounded-3xl shadow-2xl border-muted overflow-hidden">
        <div className="h-2 bg-primary" />
        <CardHeader className="text-center space-y-4 pt-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
            <CardDescription>Secure access for CodeCast UG administrators</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-8 pb-12">
          {error ? (
            <Alert variant="destructive" className="mb-6 rounded-xl bg-destructive/10 border-destructive/20 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-bold text-xs uppercase tracking-widest">Login Failed</AlertTitle>
              <AlertDescription className="text-xs font-medium leading-relaxed">
                {error}
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-tighter rounded-lg" asChild>
                    <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">
                      Open Firebase Console <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="mb-6 rounded-xl bg-primary/5 border-primary/20 text-primary">
              <Info className="h-4 w-4" />
              <AlertTitle className="font-bold text-xs uppercase tracking-widest">Setup Required</AlertTitle>
              <AlertDescription className="text-[10px] leading-relaxed">
                Ensure <strong>Email/Password</strong> is enabled in your Firebase Console and the admin users (info@codecastug.com or joelhitech111@gmail.com) are added to the <strong>Users</strong> list.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="email" 
                  placeholder="info@codecastug.com" 
                  className="h-12 pl-12 rounded-xl bg-secondary/50 border-muted"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="h-12 pl-12 rounded-xl bg-secondary/50 border-muted"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Sign In to Dashboard"}
            </Button>
          </form>
          
          <p className="mt-8 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">
            Authorized Personnel Only
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
