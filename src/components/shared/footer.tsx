
'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { supabase } from '@/lib/supabase';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/context/language-provider';

const text = {
  mr: {
    p_large: "चला, मिळून यशाचे नवे शिखर गाठूया.",
    p_small: "तुमची दृष्टी प्रत्यक्षात आणूया. तुमचा डिजिटल प्रवास सुरू करण्यासाठी आमच्याशी संपर्क साधा.",
    contactUs: "संपर्क साधा",
    footerDescription: "नाविन्यपूर्ण आर्थिक आणि तांत्रिक उपायांसह तुमच्या व्यवसायाला बळकटी देणारे.",
  },
  en: {
    p_large: "Let's build the next peak together.",
    p_small: "Let's turn your vision into a reality. Get in touch to start your digital journey.",
    contactUs: "Contact Us",
    footerDescription: "Empowering your business with innovative financial and technological solutions.",
  },
  hi: {
    p_large: "आइए, मिलकर सफलता का नया शिखर छुएँ।",
    p_small: "आइए आपकी दृष्टि को वास्तविकता में बदलें। अपनी डिजिटल यात्रा शुरू करने के लिए संपर्क करें।",
    contactUs: "संपर्क करें",
    footerDescription: "नवोन्मेषी वित्तीय और तकनीकी समाधानों के साथ आपके व्यवसाय को सशक्त बनाना।",
  },
};

export default function Footer() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoLoading, setLogoLoading] = useState(true);
  const { language } = useLanguage();
  const t = text[language];

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
          console.warn("Could not fetch site logo for footer:", error.message);
        } finally {
            setLogoLoading(false);
        }
      };
    fetchLogoUrl();
  }, []);


  return (
    <footer id="contact" className="border-t bg-muted/30">
      <div className="container py-2 text-center">
        <div className="flex flex-col items-center">
          <Link href="/" className="inline-block">
             {logoLoading ? (
                <div className="h-[78px] w-[280px]" />
              ) : logoUrl ? (
                <img src={logoUrl} alt="PHBKT Group" className="h-[78px] w-auto max-w-[280px] object-contain" />
              ) : (
                <Logo className="h-[78px] w-[280px]" />
              )}
          </Link>
          <p className="mt-2 max-w-2xl mx-auto text-sm text-black">
            {t.footerDescription}
          </p>
          
          <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-primary mt-2">
            {t.p_large}
          </h2>
          <p className="mt-1 max-w-2xl mx-auto text-sm text-black">
            {t.p_small}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="sm">
              <Link href="/contact">{t.contactUs}</Link>
            </Button>
            <div className="flex items-center gap-4">
              <a href="mailto:info@phbkt.com" className="text-sm font-bold text-black hover:text-primary transition-colors">
                  info@phbkt.com
              </a>
              <a href="tel:+919552256325" className="text-sm font-bold text-black hover:text-primary transition-colors">
                +91 9552256325
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t bg-muted/50">
        <div className="container flex flex-col md:flex-row items-center justify-between py-2 text-sm text-muted-foreground gap-4">
          <p className="text-black">&copy; {new Date().getFullYear()} PHBKT Group Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-4">
                    <Link href="#" aria-label="Facebook" className="text-blue-600 transition-colors hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-5 w-5" />
                    </Link>
                    <Link href="#" aria-label="Twitter" className="text-sky-500 transition-colors hover:text-sky-600" target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="https://www.instagram.com/phbkt.it.tech?igsh=MThtOGZpdTVnYW4waw==&utm_source=ig_contact_invite" aria-label="Instagram" className="text-pink-600 transition-colors hover:text-pink-700" target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-5 w-5" />
                    </Link>
                    <Link href="https://www.linkedin.com/company/phbkt-consultancy-services-limited/about/?viewAsMember=true" aria-label="LinkedIn" className="text-blue-700 transition-colors hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
