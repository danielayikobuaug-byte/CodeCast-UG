'use client';

import { useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, Save, Loader2, Mail, Key } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';

const ASSET_KEYS = [
  { key: 'main-logo', label: 'Primary Site Logo', description: 'Used in Navbar and Footer', category: 'General', type: 'image' },
  { key: 'hero-bg', label: 'Home Hero Background', description: 'Industrial background image', category: 'Home', type: 'image' },
  { key: 'resend-api-key', label: 'Resend API Key', description: 'API Key from resend.com dashboard', category: 'Email', type: 'text' },
  { key: 'contact-recipient', label: 'Notification Recipient', description: 'Email where inquiries are sent', category: 'Email', type: 'text' },
];

export function SiteAssetsPage() {
  const db = useFirestore();
  const assetsQuery = useMemoFirebase(() => collection(db, 'site-assets'), [db]);
  const { data: assets, loading } = useCollection(assetsQuery);
  const [saving, setSaving] = useState<string | null>(null);

  const handleUpdateAsset = async (key: string, value: string, type: string) => {
    setSaving(key);
    try {
      const assetRef = doc(db, 'site-assets', key);
      await setDoc(assetRef, {
        key,
        value,
        type,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      toast({ title: 'Setting Saved', description: `${key} has been updated.` });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
    } finally {
      setSaving(null);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold">Settings & Assets</h1>
        <p className="text-muted-foreground">Manage global image assets and system configurations like Email API keys.</p>
      </div>

      <div className="grid gap-6">
        {ASSET_KEYS.map((assetDef) => {
          const existing = assets?.find(a => a.key === assetDef.key);
          const isImage = assetDef.type === 'image';

          return (
            <Card key={assetDef.key} className="rounded-3xl border-muted overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-3">
                  <div className="p-8 bg-secondary/10 border-r border-muted">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {isImage ? <ImageIcon className="w-5 h-5" /> : assetDef.category === 'Email' ? <Mail className="w-5 h-5" /> : <Key className="w-5 h-5" />}
                      </div>
                      <h3 className="font-bold">{assetDef.label}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{assetDef.description}</p>
                    <Badge variant="outline" className="uppercase text-[10px] font-bold tracking-widest">{assetDef.category}</Badge>
                  </div>
                  <div className="p-8 md:col-span-2 flex flex-col gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{isImage ? 'Image URL' : 'Configuration Value'}</label>
                      <div className="flex gap-2">
                        <Input 
                          defaultValue={existing?.value || ''} 
                          id={`input-${assetDef.key}`}
                          type={assetDef.key.includes('key') ? 'password' : 'text'}
                          placeholder={isImage ? "https://..." : "Enter value..."} 
                          className="rounded-xl bg-secondary/50"
                        />
                        <Button 
                          onClick={() => {
                            const val = (document.getElementById(`input-${assetDef.key}`) as HTMLInputElement).value;
                            handleUpdateAsset(assetDef.key, val, assetDef.type);
                          }}
                          disabled={saving === assetDef.key}
                          className="rounded-xl px-6"
                        >
                          {saving === assetDef.key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                          Save
                        </Button>
                      </div>
                    </div>

                    {isImage && existing?.value && (
                      <div className="relative h-32 w-full max-w-sm rounded-xl overflow-hidden border border-muted bg-white">
                        <Image 
                          src={existing.value} 
                          alt="Preview" 
                          fill 
                          className="object-contain p-2" 
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default SiteAssetsPage;
