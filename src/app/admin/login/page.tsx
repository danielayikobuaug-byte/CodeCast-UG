'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
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
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Successful",
        description: "Welcome to the CodeCast UG admin dashboard.",
      });
      router.push('/admin');
    } catch (error: any) {
      const msg = error.message || "Invalid credentials.";
      setError(msg);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-secondary/20">
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
          {error && (
            <Alert variant="destructive" className="mb-6 rounded-xl bg-destructive/10 border-destructive/20 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-bold">Error</AlertTitle>
              <AlertDescription className="text-xs">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Admin Email Address</label>
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
