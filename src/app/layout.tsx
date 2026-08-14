import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: 'CodeCast UG LTD | Technology & Entertainment Solutions',
  description: 'CodeCast UG LTD delivers web & mobile development, custom systems and Smart Homes alongside Smart TV and IPTV solutions in Kampala, Uganda.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CodeCast UG',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0E1D30',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-primary/20">
        <Navbar />
        <div className="pt-24 md:pt-32 pb-20 md:pb-0">
          {children}
        </div>
        <Footer />
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}