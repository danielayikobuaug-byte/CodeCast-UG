'use client';

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Trash2, Mail, Phone, Calendar, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export default function AdminMessagesPage() {
  const db = useFirestore();
  const messagesQuery = useMemoFirebase(() => {
    return query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
  }, [db]);

  const { data: messages, loading } = useCollection(messagesQuery);

  const handleDelete = (id: string) => {
    const docRef = doc(db, 'messages', id);
    deleteDoc(docRef).catch(async (err) => {
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });
    toast({ title: "Message Deleted" });
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold">Inquiries & Leads</h1>
        <p className="text-muted-foreground">Manage all contact form submissions from your website.</p>
      </div>

      <div className="grid gap-6">
        {messages?.length ? messages.map((msg: any) => (
          <Card key={msg.id} className="rounded-3xl border-muted shadow-sm overflow-hidden group">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-4">
                <div className="p-8 bg-secondary/10 border-r border-muted flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-foreground">{msg.name}</h3>
                    <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest mt-2 px-3">
                      {msg.service || 'General Inquiry'}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                      <Mail className="w-3 h-3 text-primary" /> {msg.email}
                    </div>
                    {msg.phone && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                        <Phone className="w-3 h-3 text-primary" /> {msg.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                      <Calendar className="w-3 h-3 text-primary" /> 
                      {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleString() : 'N/A'}
                    </div>
                  </div>
                </div>
                <div className="p-8 md:col-span-3 flex flex-col justify-between">
                  <div className="prose prose-slate max-w-none mb-6">
                    <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-4">
                      "{msg.message}"
                    </p>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" size="sm" className="rounded-xl font-bold h-10 px-6 border-muted hover:bg-primary hover:text-white transition-all" asChild>
                      <a href={`mailto:${msg.email}`}>Reply via Email</a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-xl h-10 w-10 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(msg.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="py-20 text-center bg-white rounded-3xl border-dashed border-2 border-muted">
            <MessageSquare className="w-16 h-16 mx-auto opacity-10 mb-4" />
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">No inquiries found</p>
          </div>
        )}
      </div>
    </div>
  );
}
