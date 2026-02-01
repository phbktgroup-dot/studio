'use client';

import { useState, useEffect, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { Facebook, Twitter, Instagram, Linkedin, Send, Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/context/language-provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { handleInquiry, type InquiryState } from '@/lib/actions';

const text = {
  mr: {
    h2: "चला, सोबत मिळून यशाचे नवीन शिखर गाठूया.",
    p: "तुमची दृष्टी प्रत्यक्षात आणूया. तुमचा डिजिटल प्रवास सुरू करण्यासाठी तुमची चौकशी सबमिट करा.",
    cardTitle: "तुमची दृष्टी शेअर करा",
    cardDescription: "आम्ही तुमच्या कल्पनेला प्रत्यक्षात आणण्यासाठी उत्सुक आहोत.",
    nameLabel: "तुमचे नाव",
    emailLabel: "तुमचा ईमेल",
    mobileLabel: "मोबाईल नंबर",
    purposeLabel: "उद्देश",
    purposePlaceholder: "सेवा निवडा",
    purposeOptions: {
      web: "वेबसाइट डेव्हलपमेंट",
      app: "ॲप डेव्हलपमेंट",
      marketing: "मार्केटिंग आणि ब्रँडिंग",
      consulting: "सल्लामसलत",
      other: "इतर"
    },
    visionLabel: "तुमची दृष्टी",
    submitButton: "चौकशी सबमिट करा",
    footerDescription: "तुमच्या व्यवसायाला नाविन्यपूर्ण आर्थिक आणि तांत्रिक उपायांनी सक्षम करणे.",
    getInTouchDirectly: "थेट संपर्कात रहा",
    submitting: "सबमिट करत आहे..."
  },
  en: {
    h2: "Let's Reach New Peaks of Success Together.",
    p: "Let's turn your vision into a reality. Submit your inquiry to start your digital journey.",
    cardTitle: "Share Your Vision",
    cardDescription: "We're excited to hear about what you want to build.",
    nameLabel: "Your Name",
    emailLabel: "Your Email",
    mobileLabel: "Mobile Number",
    purposeLabel: "Purpose",
    purposePlaceholder: "Select a service",
    purposeOptions: {
      web: "Web Development",
      app: "App Development",
      marketing: "Marketing & Branding",
      consulting: "Consulting",
      other: "Other"
    },
    visionLabel: "Your Vision",
    submitButton: "Submit Inquiry",
    footerDescription: "Empowering your business with innovative financial and technological solutions.",
    getInTouchDirectly: "Get in Touch Directly",
    submitting: "Submitting..."
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { language } = useLanguage();
  const t = text[language];

  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t.submitting}
        </>
      ) : (
        <>
          <Send className="mr-2" />
          {t.submitButton}
        </>
      )}
    </Button>
  );
}


export default function Footer() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoLoading, setLogoLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [purpose, setPurpose] = useState('');
  const { language } = useLanguage();
  const t = text[language];
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const initialState: InquiryState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(handleInquiry, initialState);

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
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (state.isSuccess) {
      toast({
        title: "Inquiry Submitted!",
        description: state.message,
      });
      formRef.current?.reset();
      setPurpose('');
    } else if (state.message || state.errors?._form) {
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: state.message || state.errors?._form?.[0],
        });
    }
  }, [state, toast]);

  return (
    <footer id="contact" className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="flex flex-col justify-center items-center text-center">
                <div className="mb-8">
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
                
                <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-primary">
                    {t.h2}
                </h2>
                <p className="mt-4 max-w-md mx-auto text-muted-foreground md:text-lg">
                    {t.p}
                </p>

                <div className="mt-6">
                    <h3 className="font-semibold text-lg">{t.getInTouchDirectly}</h3>
                     <a href="mailto:info@phbkt.com" className="text-sm text-muted-foreground hover:text-foreground">
                        info@phbkt.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">+91 9552256325</p>
                </div>
            </div>
            
            <Card>
                <form ref={formRef} action={dispatch}>
                    <CardHeader>
                        <CardTitle className="text-center">{t.cardTitle}</CardTitle>
                        <CardDescription className="text-center">{t.cardDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <input type="hidden" name="userId" value={user?.id || ''} />
                       <input type="hidden" name="purpose" value={purpose} />

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5 text-left">
                                <Label htmlFor="footer-name">{t.nameLabel}</Label>
                                <Input id="footer-name" name="name" required />
                                {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
                            </div>
                            <div className="space-y-1.5 text-left">
                                <Label htmlFor="footer-email">{t.emailLabel}</Label>
                                <Input id="footer-email" name="email" type="email" required />
                                {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
                            </div>
                             <div className="space-y-1.5 text-left">
                                <Label htmlFor="footer-mobile">{t.mobileLabel}</Label>
                                <Input id="footer-mobile" name="mobile" type="tel" />
                                {state.errors?.mobile && <p className="text-sm text-destructive mt-1">{state.errors.mobile[0]}</p>}
                            </div>
                            <div className="space-y-1.5 text-left">
                                <Label htmlFor="footer-purpose">{t.purposeLabel}</Label>
                                <Select onValueChange={setPurpose} required>
                                    <SelectTrigger id="footer-purpose">
                                        <SelectValue placeholder={t.purposePlaceholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="web">{t.purposeOptions.web}</SelectItem>
                                        <SelectItem value="app">{t.purposeOptions.app}</SelectItem>
                                        <SelectItem value="marketing">{t.purposeOptions.marketing}</SelectItem>
                                        <SelectItem value="consulting">{t.purposeOptions.consulting}</SelectItem>
                                        <SelectItem value="other">{t.purposeOptions.other}</SelectItem>
                                    </SelectContent>
                                </Select>
                                {state.errors?.purpose && <p className="text-sm text-destructive mt-1">{state.errors.purpose[0]}</p>}
                            </div>
                        </div>
                        <div className="space-y-1.5 text-left">
                            <Label htmlFor="footer-message">{t.visionLabel}</Label>
                            <Textarea id="footer-message" name="vision" required className="min-h-[60px]" />
                            {state.errors?.vision && <p className="text-sm text-destructive mt-1">{state.errors.vision[0]}</p>}
                        </div>
                    </CardContent>
                    <CardFooter>
                       <SubmitButton />
                    </CardFooter>
                </form>
            </Card>
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
