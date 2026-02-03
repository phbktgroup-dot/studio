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
    getInTouchDirectly: "थेट संपर्कात रहा",
  },
  en: {
    p_large: "Let's build the next peak together.",
    p_small: "Let's turn your vision into a reality. Get in touch to start your digital journey.",
    contactUs: "Contact Us",
    footerDescription: "Empowering your business with innovative financial and technological solutions.",
    getInTouchDirectly: "Get in Touch Directly",
  },
  hi: {
    p_large: "आइए, मिलकर सफलता का नया शिखर छुएँ।",
    p_small: "आइए आपकी दृष्टि को वास्तविकता में बदलें। अपनी डिजिटल यात्रा शुरू करने के लिए संपर्क करें।",
    contactUs: "संपर्क करें",
    footerDescription: "नवोन्मेषी वित्तीय और तकनीकी समाधानों के साथ आपके व्यवसाय को सशक्त बनाना।",
    getInTouchDirectly: "सीधे संपर्क में रहें",
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
      <div className="container py-12 md:py-16">
        <div className="flex flex-col items-center text-center gap-12">
            <div className="flex flex-col justify-center items-center text-center">
                <div className="mb-4">
                    <Link href="/" className="inline-block mb-4">
                        {logoLoading ? (
                        <div className="h-[78px] w-[280px]" />
                        ) : logoUrl ? (
                        <img src={logoUrl} alt="PHBKT Group" className="h-[78px] w-auto max-w-[280px] object-contain" />
                        ) : (
                        <Logo className="h-[78px] w-[280px]" />
                        )}
                    </Link>
                    <p className="max-w-md mx-auto text-muted-foreground">
                        {t.footerDescription}
                    </p>
                </div>
                
                <div className="mt-4">
                    <h3 className="font-semibold text-lg">{t.getInTouchDirectly}</h3>
                     <a href="mailto:info@phbkt.com" className="text-sm text-muted-foreground hover:text-foreground">
                        info@phbkt.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">+91 9552256325</p>
                </div>
            </div>
            
            <div className="flex flex-col justify-center items-center text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-primary max-w-md">
                    {t.p_large}
                </h2>
                <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
                    {t.p_small}
                </p>
                <Button asChild size="lg" className="mt-8">
                    <Link href="/contact">{t.contactUs}</Link>
                </Button>
            </div>
        </div>
      </div>
      <div className="border-t bg-muted/50">
        <div className="container flex flex-col sm:flex-row items-center justify-between py-4 text-sm text-muted-foreground gap-4">
          <p>&copy; {new Date().getFullYear()} PHBKT Group Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
              <Link href="#" aria-label="Facebook" className="text-blue-600 transition-colors hover:opacity-80" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-sky-500 transition-colors hover:opacity-80" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/phbkt.it.tech?igsh=MThtOGZpdTVnYW4waw==&utm_source=ig_contact_invite" aria-label="Instagram" className="text-pink-600 transition-colors hover:opacity-80" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://www.linkedin.com/company/phbkt-consultancy-services-limited/about/?viewAsMember=true" aria-label="LinkedIn" className="text-blue-700 transition-colors hover:opacity-80" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
