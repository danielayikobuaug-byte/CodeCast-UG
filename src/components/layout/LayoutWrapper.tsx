'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { NewsletterPopup } from "../NewsletterPopup";

/**
 * @fileOverview Conditional wrapper for the root layout.
 * Detects if the user is in the admin section and hides public-facing 
 * UI elements like the main Navbar and Footer.
 */
export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 lg:pt-[117px] pb-20 lg:pb-0">
        {children}
      </div>
      <Footer />
      <BottomNav />
      <NewsletterPopup />
    </>
  );
}
