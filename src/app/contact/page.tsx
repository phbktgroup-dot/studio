
'use client';

import { useState, useEffect, useActionState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { Send, Loader2 } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const text = {
  mr: {
    pageTitle: "विनंती सबमिट करा",
    pageDescription: "आम्ही तुम्हाला योग्य व्यक्तीशी संपर्क साधून देण्यासाठी काही तपशील आवश्यक आहेत.",
    firstNameLabel: "पहिले नाव",
    lastNameLabel: "आडनाव",
    emailLabel: "तुमचा ईमेल",
    mobileNumberLabel: "फोन नंबर",
    purposeLabel: "चौकशीचा उद्देश",
    purposePlaceholder: "एक उद्देश निवडा",
    purposeOptions: {
      'web-app-development': "वेबसाइट आणि ॲप डेव्हलपमेंट",
      'marketing-branding': "मार्केटिंग आणि ब्रँडिंग",
      'tax-compliance': "कर आणि अनुपालन",
      'business-setup': "व्यवसाय सेटअप",
      'ui-ux-design': "UI/UX डिझाइन",
      'ai-automation': "AI आणि ऑटोमेशन",
      'cloud-security': "क्लाउड आणि सुरक्षा",
      'startup-advisory': "स्टार्टअप सल्लागार",
      'content-social-media': "कंटेंट आणि सोशल मीडिया",
      'other': "इतर"
    },
    helpLabel: "आम्ही कशी मदत करू शकतो?",
    submitButton: "चौकशी सबमिट करा",
    submitting: "सबमिट करत आहे..."
  },
  en: {
    pageTitle: "Submit the Request",
    pageDescription: "To get you in touch with the right person, we just need a few details from you first.",
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    emailLabel: "Your Email",
    mobileNumberLabel: "Phone Number",
    purposeLabel: "Purpose of Inquiry",
    purposePlaceholder: "Select a purpose",
    purposeOptions: {
      'web-app-development': "Website and App Development",
      'marketing-branding': "Marketing & Branding",
      'tax-compliance': "Tax & Compliance",
      'business-setup': "Business Setup",
      'ui-ux-design': "UI/UX Design",
      'ai-automation': "AI & Automation",
      'cloud-security': "Cloud & Security",
      'startup-advisory': "Start-up Advisory",
      'content-social-media': "Content & Social Media",
      'other': "Other"
    },
    helpLabel: "How can we help you?",
    submitButton: "Submit Inquiry",
    submitting: "Submitting..."
  },
  hi: {
    pageTitle: "अनुरोध सबमिट करें",
    pageDescription: "आपको सही व्यक्ति से संपर्क कराने के लिए, हमें पहले आपसे कुछ जानकारी चाहिए।",
    firstNameLabel: "पहला नाम",
    lastNameLabel: "उपनाम",
    emailLabel: "आपका ईमेल",
    mobileNumberLabel: "फ़ोन नंबर",
    purposeLabel: "पूछताछ का उद्देश्य",
    purposePlaceholder: "एक उद्देश्य चुनें",
    purposeOptions: {
      'web-app-development': "वेबसाइट और ऐप डेवलपमेंट",
      'marketing-branding': "मार्केटिंग और ब्रांडिंग",
      'tax-compliance': "टैक्स और कंप्लायंस",
      'business-setup': "बिजनेस सेटअप",
      'ui-ux-design': "UI/UX डिज़ाइन",
      'ai-automation': "AI और ऑटोमेशन",
      'cloud-security': "क्लाउड और सुरक्षा",
      'startup-advisory': "स्टार्ट-अप सलाहकार",
      'content-social-media': "कंटेंट और सोशल मीडिया",
      'other': "अन्य"
    },
    helpLabel: "हम कैसे मदद कर सकते हैं?",
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
  const router = useRouter();

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
      router.push('/');
    } else if (state.message || state.errors?._form) {
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: state.message || state.errors?._form?.[0],
        });
    }
  }, [state, toast, router]);
  
  const contactImage = PlaceHolderImages.find(p => p.id === 'contact_form_image');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow relative py-12 md:py-16 flex items-center">
        {contactImage && (
            <div className="absolute inset-0 z-0">
                <Image
                    src={contactImage.imageUrl}
                    alt="Contact background"
                    fill
                    data-ai-hint={contactImage.imageHint}
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>
        )}
        <div className="container px-4 sm:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
              <header className="text-center mb-8">
                  <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                      {t.pageTitle}
                  </h1>
                  <p className="mt-2 text-white/80">
                      {t.pageDescription}
                  </p>
              </header>
            <Card className="bg-background/80 backdrop-blur-sm">
                <CardContent className="p-6 sm:p-8">
                  <form ref={formRef} action={dispatch} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input type="hidden" name="userId" value={user?.id || ''} />
                      <input type="hidden" name="industry" value={purpose} />
                      
                      <div className="space-y-1.5">
                          <Label htmlFor="first-name">{t.firstNameLabel}</Label>
                          <Input id="first-name" name="firstName" required />
                          {state.errors?.firstName && <p className="text-sm text-destructive mt-1">{state.errors.firstName[0]}</p>}
                      </div>
                      <div className="space-y-1.5">
                          <Label htmlFor="last-name">{t.lastNameLabel}</Label>
                          <Input id="last-name" name="lastName" required />
                          {state.errors?.lastName && <p className="text-sm text-destructive mt-1">{state.errors.lastName[0]}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="contact-email">{t.emailLabel}</Label>
                        <Input id="contact-email" name="email" type="email" required />
                        {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-mobile">{t.mobileNumberLabel}</Label>
                        <Input id="contact-mobile" name="mobileNumber" type="tel" maxLength={10} pattern="[0-9]{10}" />
                        {state.errors?.mobileNumber && <p className="text-sm text-destructive mt-1">{state.errors.mobileNumber[0]}</p>}
                      </div>
                      
                      <div className="space-y-1.5 md:col-span-2">
                          <Label htmlFor="contact-purpose">{t.purposeLabel}</Label>
                          <Select onValueChange={setPurpose} required>
                              <SelectTrigger id="contact-purpose">
                                  <SelectValue placeholder={t.purposePlaceholder} />
                              </SelectTrigger>
                              <SelectContent>
                                  {Object.entries(t.purposeOptions).map(([value, label]) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                  ))}
                              </SelectContent>
                          </Select>
                          {state.errors?.industry && <p className="text-sm text-destructive mt-1">{state.errors.industry[0]}</p>}
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                          <Label htmlFor="contact-message">{t.helpLabel}</Label>
                          <Textarea id="contact-message" name="help" required className="min-h-[100px]" />
                          {state.errors?.help && <p className="text-sm text-destructive mt-1">{state.errors.help[0]}</p>}
                      </div>

                      <div className="md:col-span-2">
                          <SubmitButton />
                      </div>
                  </form>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
