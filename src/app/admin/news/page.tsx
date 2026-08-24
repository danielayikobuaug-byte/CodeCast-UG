
'use client';

import { useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, setDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Plus, Trash2, Loader2, Edit, Save, X, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function AdminNewsPage() {
  const db = useFirestore();
  const newsQuery = useMemoFirebase(() => {
    return query(collection(db, 'blog-posts'), orderBy('date', 'desc'));
  }, [db]);

  const { data: posts, loading } = useCollection(newsQuery);
  const [editing, setEditing] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    const formData = new FormData(e.currentTarget);
    
    const data = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      content: formData.get('content') as string,
      imageUrl: formData.get('imageUrl') as string,
      date: serverTimestamp(),
    };

    try {
      const id = editing?.id || Date.now().toString();
      await setDoc(doc(db, 'blog-posts', id), { ...data, id }, { merge: true });
      toast({ title: editing?.id ? 'Article Updated' : 'Article Published' });
      setEditing(null);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteDoc(doc(db, 'blog-posts', id));
      toast({ title: 'Article Deleted' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">News & Blog Manager</h1>
          <p className="text-muted-foreground">Publish insights, updates and tips for your audience.</p>
        </div>
        {!editing && (
          <Button onClick={() => setEditing({ title: '', category: '', description: '', content: '', imageUrl: '' })} className="rounded-xl h-12 px-6">
            <Plus className="w-4 h-4 mr-2" /> Write New Post
          </Button>
        )}
      </div>

      {editing && (
        <Card className="rounded-3xl border-primary shadow-lg overflow-hidden border-2 bg-white">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Article Title</label>
                  <Input name="title" defaultValue={editing.title} required className="h-12 rounded-xl" placeholder="5 Signs Your Website Needs A Redesign" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Category</label>
                  <Input name="category" defaultValue={editing.category} required className="h-12 rounded-xl" placeholder="Web Development" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Feature Image URL</label>
                <Input name="imageUrl" defaultValue={editing.imageUrl} required className="h-12 rounded-xl" placeholder="https://..." />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Short Description (Excerpt)</label>
                <Textarea name="description" defaultValue={editing.description} rows={2} required className="rounded-xl" placeholder="A brief summary for the feed list..." />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Main Article Content</label>
                <Textarea name="content" defaultValue={editing.content} rows={8} required className="rounded-xl" placeholder="Write your full article here..." />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="ghost" onClick={() => setEditing(null)} className="rounded-xl h-12 px-6">
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
                <Button type="submit" disabled={processing} className="rounded-xl h-12 px-8">
                  {processing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  {editing.id ? 'Update Article' : 'Publish Article'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {posts?.map((post: any) => (
          <Card key={post.id} className="rounded-3xl border-muted overflow-hidden bg-white shadow-sm hover:shadow-md transition-all group">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-5 h-full">
                <div className="md:col-span-1 relative h-48 md:h-auto bg-secondary/50">
                  <Image src={post.imageUrl || 'https://picsum.photos/seed/news/400/300'} alt={post.title} fill className="object-cover" unoptimized />
                </div>
                <div className="md:col-span-4 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest px-3">
                        {post.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
                        <Calendar className="w-3 h-3" />
                        {post.date?.toDate ? post.date.toDate().toLocaleDateString() : 'Draft'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl text-primary hover:bg-primary/10"
                      onClick={() => {
                        setEditing(post);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!posts || posts.length === 0) && !editing && (
        <div className="py-20 text-center bg-white rounded-3xl border-dashed border-2 border-muted">
          <Newspaper className="w-16 h-16 mx-auto opacity-10 mb-4" />
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">No blog posts found</p>
        </div>
      )}
    </div>
  );
}
