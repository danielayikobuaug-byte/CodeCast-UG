
'use client';

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Trash2, Mail, Phone, Calendar, Loader2, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdminSubscribersPage() {
  const db = useFirestore();
  const subscribersQuery = useMemoFirebase(() => {
    return query(collection(db, 'subscribers'), orderBy('timestamp', 'desc'));
  }, [db]);

  const { data: subscribers, loading } = useCollection(subscribersQuery);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, 'subscribers', id));
      toast({ title: "Subscriber removed" });
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Delete failed", description: error.message });
    }
  };

  const exportCSV = () => {
    if (!subscribers?.length) return;
    const headers = ["Name", "Email", "Phone", "Date"];
    const rows = subscribers.map((s: any) => [
      s.name,
      s.email,
      s.phone,
      s.timestamp?.toDate ? s.timestamp.toDate().toLocaleString() : 'N/A'
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "codecast_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Newsletter Subscribers</h1>
          <p className="text-muted-foreground">Manage leads from the "Stay Updated" popups and footer.</p>
        </div>
        <Button onClick={exportCSV} variant="outline" className="rounded-xl h-12 px-6 border-primary text-primary hover:bg-primary hover:text-white">
          <Download className="w-4 h-4 mr-2" /> Export to CSV
        </Button>
      </div>

      <div className="grid gap-4">
        {subscribers?.length ? (
          <div className="bg-white rounded-3xl border border-muted overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-secondary/30 border-b border-muted">
                    <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Subscriber Name</th>
                    <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</th>
                    <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone Number</th>
                    <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Signup Date</th>
                    <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted">
                  {subscribers.map((sub: any) => (
                    <tr key={sub.id} className="hover:bg-secondary/10 transition-colors">
                      <td className="p-5">
                        <span className="font-bold text-foreground">{sub.name || 'Anonymous'}</span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-sm text-primary font-medium underline">
                          <Mail className="w-3 h-3" /> {sub.email}
                        </div>
                      </td>
                      <td className="p-5">
                        <span className="text-sm text-muted-foreground font-medium">{sub.phone || '--'}</span>
                      </td>
                      <td className="p-5 text-xs text-muted-foreground">
                        {sub.timestamp?.toDate ? sub.timestamp.toDate().toLocaleDateString() : 'Recently'}
                      </td>
                      <td className="p-5 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(sub.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border-dashed border-2 border-muted">
            <Users className="w-16 h-16 mx-auto opacity-10 mb-4" />
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">No subscribers yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
