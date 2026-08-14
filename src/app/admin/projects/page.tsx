
'use client';

import { useState } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FolderKanban, Plus, Trash2, Loader2, Edit, Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function AdminProjectsPage() {
  const db = useFirestore();
  const { data: projects, loading } = useCollection(query(collection(db, 'projects'), orderBy('order', 'desc')));
  const [editing, setEditing] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      tag: formData.get('tag') as string,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
      order: parseInt(formData.get('order') as string) || 0,
    };

    try {
      const id = editing?.id || Date.now().toString();
      await setDoc(doc(db, 'projects', id), { ...data, id }, { merge: true });
      toast({ title: editing ? 'Project Updated' : 'Project Created' });
      setEditing(null);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      toast({ title: 'Project Deleted' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold">Portfolio Projects</h1>
          <p className="text-muted-foreground">Manage the projects displayed in your work showcase.</p>
        </div>
        {!editing && (
          <Button onClick={() => setEditing({ title: '', tag: '', description: '', imageUrl: '', order: 0 })} className="rounded-xl h-12 px-6">
            <Plus className="w-4 h-4 mr-2" /> Add Project
          </Button>
        )}
      </div>

      {editing && (
        <Card className="rounded-3xl border-primary shadow-lg overflow-hidden border-2 bg-white">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Project Title</label>
                  <Input name="title" defaultValue={editing.title} required className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Tag / Category</label>
                  <Input name="tag" defaultValue={editing.tag} placeholder="Web Design" className="h-12 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Image URL</label>
                <Input name="imageUrl" defaultValue={editing.imageUrl} required placeholder="https://..." className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Description</label>
                <textarea 
                  name="description" 
                  defaultValue={editing.description} 
                  rows={3}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="w-32 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Display Order</label>
                  <Input name="order" type="number" defaultValue={editing.order} className="h-12 rounded-xl" />
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="ghost" onClick={() => setEditing(null)} className="rounded-xl h-12 px-6">
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </Button>
                  <Button type="submit" disabled={processing} className="rounded-xl h-12 px-8">
                    {processing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    {editing.id ? 'Update Project' : 'Create Project'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {projects?.map((project: any) => (
          <Card key={project.id} className="rounded-3xl border-muted overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-0">
              <div className="grid sm:grid-cols-5 h-full">
                <div className="sm:col-span-2 relative h-48 sm:h-full min-h-[200px] bg-secondary/50">
                  <Image src={project.imageUrl} alt={project.title} fill className="object-cover" unoptimized />
                </div>
                <div className="sm:col-span-3 p-6 flex flex-col justify-between">
                  <div>
                    <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest mb-2">
                      {project.tag || 'Work'}
                    </Badge>
                    <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl text-primary hover:bg-primary/10"
                      onClick={() => {
                        setEditing(project);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(project.id)}
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

      {(!projects || projects.length === 0) && !editing && (
        <div className="py-20 text-center bg-white rounded-3xl border-dashed border-2 border-muted">
          <FolderKanban className="w-16 h-16 mx-auto opacity-10 mb-4" />
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">No projects found</p>
        </div>
      )}
    </div>
  );
}
