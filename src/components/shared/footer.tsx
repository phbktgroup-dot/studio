'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { supabase } from '@/lib/supabase';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const MailboxIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
    <polyline points="15,9 18,9 18,11" />
    <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" />
    <line x1="6" x2="7" y1="10" y2="10" />
  </svg>
);

export default function Footer() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoLoading, setLogoLoading] = useState(true);

  useEffect(() => {
    const fetchLogoUrl = async () => {
        setLogoLoading(true);
        try {
          const { data, error } = await supabase
              .from('settings')
              .select('logo_url')
              .eq('id', 1)
              .single();
          
          if (error && error.code !== 'PGRST116') {
              throw error;
          }
  
          if (data?.logo_url) {
              setLogoUrl(data.logo_url);
          }
        } catch (error: any) {
          // It's okay if this fails, we'll just fall back to the default logo.
          console.warn("Could not fetch site logo for footer:", error.message);
        } finally {
            setLogoLoading(false);
        }
      };
    fetchLogoUrl();
  }, []);

  return (
    <footer id="contact" className="border-t bg-muted/30">
      <div className="container grid items-start gap-8 py-12 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Link href="/">
            {logoLoading ? (
              <div className="h-[48px] w-[180px]" />
            ) : logoUrl ? (
              <img src={logoUrl} alt="PHBKT Group" className="h-[48px] w-auto object-contain" />
            ) : (
              <Logo className="h-[48px]" />
            )}
          </Link>
          <p className="text-sm text-muted-foreground">
            Empowering your business with innovative financial and technological solutions.
          </p>
        </div>
        <div className="grid gap-4">
          <h3 className="font-semibold">Quick Links</h3>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
          <Link href="#services" className="text-sm text-muted-foreground hover:text-foreground">Services</Link>
          <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link>
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">Client Login</Link>
        </div>
        <div className="grid gap-4">
          <h3 className="font-semibold">Get in Touch</h3>
          <div className="flex items-start gap-4">
             <div className="animate-bob">
                <MailboxIcon className="h-10 w-10 text-primary" />
             </div>
            <div>
                <p className="font-medium">Contact Us</p>
                <a href="mailto:info@phbkt.com" className="text-sm text-muted-foreground hover:text-foreground">
                info@phbkt.com
                </a>
                <p className="text-sm text-muted-foreground mt-1">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t bg-muted/50">
        <div className="container flex items-center justify-between py-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PHBKT Group Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
              <Link href="#" aria-label="Facebook" className="text-blue-600 transition-colors hover:opacity-80">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-sky-500 transition-colors hover:opacity-80">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-pink-600 transition-colors hover:opacity-80">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-blue-700 transition-colors hover:opacity-80">
                <Linkedin className="h-5 w-5" />
              </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
