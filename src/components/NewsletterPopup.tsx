
"use client"

import { useState, useEffect } from "react"
import { X, Check, Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useFirestore } from "@/firebase"
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore"
import { toast } from "@/hooks/use-toast"

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const db = useFirestore()

  useEffect(() => {
    const hasHandled = localStorage.getItem('newsletter-handled')
    if (!hasHandled) {
      const timer = setTimeout(() => setIsVisible(true), 7000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('newsletter-handled', 'true')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string

    try {
      const id = Date.now().toString()
      await setDoc(doc(db, 'subscribers', id), {
        id,
        name,
        email,
        phone,
        timestamp: serverTimestamp()
      })
      
      setIsSubmitted(true)
      setTimeout(() => handleClose(), 3000)
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Signup failed', description: error.message })
    } finally {
      setLoading(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-[760px] overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-[#0E1D30] to-primary p-10 text-white">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="mb-4 text-2xl font-bold">Stay Updated!</h3>
            <p className="mb-6 text-sm text-white/80">
              Join our community and never miss an update on technology, entertainment & innovations from CodeCast UG LTD.
            </p>
            <ul className="space-y-3">
              {['Latest project updates', 'New service announcements', 'Tech & entertainment tips', 'Exclusive subscriber offers'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-xs font-medium">
                  <Check className="h-4 w-4 text-accent" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-10">
            {isSubmitted ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-10">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 animate-bounce">
                  <Check className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-[#0E1D30]">You're Subscribed!</h4>
                <p className="text-sm text-gray-500">Thanks for joining our newsletter. We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-gray-400">Full Name *</label>
                  <Input name="name" placeholder="John Doe" required className="rounded-xl border-gray-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-gray-400">Email Address *</label>
                  <Input name="email" type="email" placeholder="john@example.com" required className="rounded-xl border-gray-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-gray-400">Phone Number</label>
                  <Input name="phone" type="tel" placeholder="+256 7XX XXX XXX" className="rounded-xl border-gray-200" />
                </div>
                <Button type="submit" disabled={loading} className="mt-2 h-12 w-full rounded-xl bg-primary text-white font-bold">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Subscribe Now
                </Button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-2 text-xs font-medium text-gray-400 underline hover:text-primary"
                >
                  No thanks, maybe later
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
