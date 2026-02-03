
'use client';

import { useState, useEffect, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import Link from "next/link";
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/context/language-provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { handleInquiry, type InquiryState } from '@/lib/actions';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { ArrowLeft } from 'lucide-react';

const text = {
  mr: {
    pageTitle: "संपर्क साधा",
    pageDescription: "आमच्या टीमशी संपर्क साधा. आम्ही तुमच्या प्रश्नांची उत्तरे देण्यासाठी आणि तुमच्या डिजिटल गरजा पूर्ण करण्यासाठी येथे आहोत.",
    cardTitle: "तुमची दृष्टी शेअर करा",
    cardDescription: "आम्ही तुमची कल्पना प्रत्यक्षात आणण्यासाठी उत्सुक आहोत.",
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
    submitting: "सबमिट करत आहे..."
  },
  en: {
    pageTitle: "Get in Touch",
    pageDescription: "Contact our team. We're here to answer your questions and help you with your digital needs.",
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
    submitting: "Submitting..."
  },
  hi: {
    pageTitle: "संपर्क करें",
    pageDescription: "हमारी टीम से संपर्क करें। हम आपके सवालों का जवाब देने और आपकी डिजिटल जरूरतों में मदद करने के लिए यहां हैं।",
    cardTitle: "अपनी दृष्टि साझा करें",
    cardDescription: "हम यह सुनने के लिए उत्साहित हैं कि आप क्या बनाना चाहते हैं।",
    nameLabel: "आपका नाम",
    emailLabel: "आपका ईमेल",
    mobileLabel: "मोबाइल नंबर",
    purposeLabel: "उद्देश्य",
    purposePlaceholder: "एक सेवा चुनें",
    purposeOptions: {
      web: "वेबसाइट विकास",
      app: "ऐप विकास",
      marketing: "विपणन और ब्रांडिंग",
      consulting: "परामर्श",
      other: "अन्य"
    },
    visionLabel: "आपकी दृष्टि",
    submitButton: "पूछताछ सबमिट करें",
    submitting: "सबमिट हो रहा है..."
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


export default function ContactPage() {
  const [user, setUser] = useState<User | null>(null);
  const [purpose, setPurpose] = useState('');
  const { language } = useLanguage();
  const t = text[language];
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const initialState: InquiryState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(handleInquiry, initialState);

  useEffect(() => {
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
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-8 md:py-16">
        <div className="container max-w-4xl">
           <Button variant="ghost" asChild className="mb-8">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <header className="text-center mb-12">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-2 leading-tight text-primary">
              {t.pageTitle}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                {t.pageDescription}
            </p>
          </header>

          <Card className="max-w-2xl mx-auto">
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
                            <Label htmlFor="contact-name">{t.nameLabel}</Label>
                            <Input id="contact-name" name="name" required />
                            {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
                        </div>
                        <div className="space-y-1.5 text-left">
                            <Label htmlFor="contact-email">{t.emailLabel}</Label>
                            <Input id="contact-email" name="email" type="email" required />
                            {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
                        </div>
                         <div className="space-y-1.5 text-left">
                            <Label htmlFor="contact-mobile">{t.mobileLabel}</Label>
                            <Input id="contact-mobile" name="mobile" type="tel" />
                            {state.errors?.mobile && <p className="text-sm text-destructive mt-1">{state.errors.mobile[0]}</p>}
                        </div>
                        <div className="space-y-1.5 text-left">
                            <Label htmlFor="contact-purpose">{t.purposeLabel}</Label>
                            <Select onValueChange={setPurpose} required>
                                <SelectTrigger id="contact-purpose">
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
                        <Label htmlFor="contact-message">{t.visionLabel}</Label>
                        <Textarea id="contact-message" name="vision" required className="min-h-[100px]" />
                        {state.errors?.vision && <p className="text-sm text-destructive mt-1">{state.errors.vision[0]}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                   <SubmitButton />
                </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
