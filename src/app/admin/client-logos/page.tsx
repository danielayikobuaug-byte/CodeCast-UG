
'use client';

import { useState } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Plus, Trash2, Loader2, GripVertical, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function PartnerLogosPage() {
  const db = useFirestore();
  const { data: logos, loading } = useCollection(query(collection(db, 'client-logos'), orderBy('order', 'asc')));
  const [adding, setAdding] = useState(false);

  const handleAddLogo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdding(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const imageUrl = formData.get('imageUrl') as string;

    try {
      const id = Date.now().toString();
      await setDoc(doc(db, 'client-logos', id), {
        id,
        name,
        imageUrl,
        order: (logos?.length || 0) + 1
      });
      toast({ title: 'Logo Added' });
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, 'client-logos', id));
      toast({ title: 'Logo Removed' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Partner Logos</h1>
          <p className="text-muted-foreground">Manage the logos displayed in the "Trusted By" scrolling marquee.</p>
        </div>
      </div>

      <Card className="rounded-3xl border-muted bg-primary/5 border-dashed border-2">
        <CardContent className="p-8">
          <form onSubmit={handleAddLogo} className="grid md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Client Name</label>
              <Input name="name" placeholder="Acme Corp" className="h-12 rounded-xl bg-white border-muted" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Logo Image URL</label>
              <Input name="imageUrl" placeholder="https://..." className="h-12 rounded-xl bg-white border-muted" required />
            </div>
            <Button type="submit" className="h-12 rounded-xl font-bold" disabled={adding}>
              {adding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              Add Partner Logo
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {logos?.map((logo: any) => (
          <Card key={logo.id} className="rounded-3xl border-muted group overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="relative h-20 w-full mb-6 bg-secondary/30 rounded-2xl flex items-center justify-center p-4">
                <Image src={logo.imageUrl} alt={logo.name} fill className="object-contain p-3" unoptimized />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-foreground">{logo.name}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Order: {logo.order}</p>
                </div>
                <div className="flex gap-2">
                   <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(logo.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!logos || logos.length === 0) && (
        <div className="py-20 text-center bg-white rounded-3xl border-dashed border-2 border-muted">
          <ShieldCheck className="w-16 h-16 mx-auto opacity-10 mb-4" />
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">No partner logos uploaded</p>
        </div>
      )}
    </div>
  );
}
