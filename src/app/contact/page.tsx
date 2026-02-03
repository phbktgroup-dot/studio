
'use client';

import { useState, useEffect, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import Link from "next/link";
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { Send, Loader2, ArrowLeft } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/context/language-provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { handleInquiry, type InquiryState } from '@/lib/actions';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const text = {
  mr: {
    pageTitle: "एका तज्ञाशी बोला",
    pageDescription: "आम्ही तुम्हाला योग्य व्यक्तीशी संपर्क साधून देण्यासाठी काही तपशील आवश्यक आहेत.",
    firstNameLabel: "पहिले नाव",
    lastNameLabel: "आडनाव",
    emailLabel: "तुमचा ईमेल",
    industryLabel: "उद्योग",
    industryPlaceholder: "एक उद्योग निवडा",
    industryOptions: {
      tech: "तंत्रज्ञान",
      finance: "वित्त",
      healthcare: "आरोग्यसेवा",
      retail: "किरकोळ",
      other: "इतर"
    },
    helpLabel: "आम्ही कशी मदत करू शकतो?",
    submitButton: "चौकशी सबमिट करा",
    submitting: "सबमिट करत आहे..."
  },
  en: {
    pageTitle: "Talk to an expert",
    pageDescription: "To get you in touch with the right person, we just need a few details from you first.",
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    emailLabel: "Your Email",
    industryLabel: "Industry",
    industryPlaceholder: "Select an industry",
    industryOptions: {
      tech: "Technology",
      finance: "Finance",
      healthcare: "Healthcare",
      retail: "Retail",
      other: "Other"
    },
    helpLabel: "How can we help you?",
    submitButton: "Submit Inquiry",
    submitting: "Submitting..."
  },
  hi: {
    pageTitle: "एक विशेषज्ञ से बात करें",
    pageDescription: "आपको सही व्यक्ति से संपर्क कराने के लिए, हमें पहले आपसे कुछ जानकारी चाहिए।",
    firstNameLabel: "पहला नाम",
    lastNameLabel: "उपनाम",
    emailLabel: "आपका ईमेल",
    industryLabel: "उद्योग",
    industryPlaceholder: "एक उद्योग चुनें",
    industryOptions: {
      tech: "प्रौद्योगिकी",
      finance: "वित्त",
      healthcare: "स्वास्थ्य सेवा",
      retail: "खुदरा",
      other: "अन्य"
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
    <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={pending}>
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
  const [industry, setIndustry] = useState('');
  const { language } = useLanguage();
  const t = text[language];
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const contactImage = PlaceHolderImages.find(p => p.id === 'contact_form_image');

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
      setIndustry('');
    } else if (state.message || state.errors?._form) {
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: state.message || state.errors?._form?.[0],
        });
    }
  }, [state, toast]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-body">
      <div className="absolute top-4 left-4 z-20">
          <Button variant="ghost" asChild className="text-white hover:bg-gray-800 hover:text-white">
              <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
              </Link>
          </Button>
      </div>
      <div className="grid md:grid-cols-2 min-h-screen">
          <div className="p-8 md:p-12 lg:p-24 flex flex-col justify-center">
              <header className="mb-8">
                  <p className="text-sm font-bold uppercase tracking-wider text-primary">{t.pageTitle}</p>
                  <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl mt-2 leading-tight">
                      {t.pageDescription}
                  </h1>
              </header>
              <form ref={formRef} action={dispatch} className="space-y-6">
                  <input type="hidden" name="userId" value={user?.id || ''} />
                  <input type="hidden" name="industry" value={industry} />
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                          <Label htmlFor="first-name">{t.firstNameLabel}</Label>
                          <Input id="first-name" name="firstName" required className="bg-gray-800 border-gray-700 focus:ring-primary text-white" />
                          {state.errors?.firstName && <p className="text-sm text-red-400 mt-1">{state.errors.firstName[0]}</p>}
                      </div>
                      <div className="space-y-1.5">
                          <Label htmlFor="last-name">{t.lastNameLabel}</Label>
                          <Input id="last-name" name="lastName" required className="bg-gray-800 border-gray-700 focus:ring-primary text-white" />
                          {state.errors?.lastName && <p className="text-sm text-red-400 mt-1">{state.errors.lastName[0]}</p>}
                      </div>
                  </div>

                  <div className="space-y-1.5">
                      <Label htmlFor="contact-email">{t.emailLabel}</Label>
                      <Input id="contact-email" name="email" type="email" required className="bg-gray-800 border-gray-700 focus:ring-primary text-white" />
                      {state.errors?.email && <p className="text-sm text-red-400 mt-1">{state.errors.email[0]}</p>}
                  </div>
                  
                  <div className="space-y-1.5">
                      <Label htmlFor="contact-industry">{t.industryLabel}</Label>
                      <Select onValueChange={setIndustry} required>
                          <SelectTrigger id="contact-industry" className="bg-gray-800 border-gray-700 focus:ring-primary text-white">
                              <SelectValue placeholder={t.industryPlaceholder} />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="tech">{t.industryOptions.tech}</SelectItem>
                              <SelectItem value="finance">{t.industryOptions.finance}</SelectItem>
                              <SelectItem value="healthcare">{t.industryOptions.healthcare}</SelectItem>
                              <SelectItem value="retail">{t.industryOptions.retail}</SelectItem>
                              <SelectItem value="other">{t.industryOptions.other}</SelectItem>
                          </SelectContent>
                      </Select>
                      {state.errors?.industry && <p className="text-sm text-red-400 mt-1">{state.errors.industry[0]}</p>}
                  </div>

                  <div className="space-y-1.5">
                      <Label htmlFor="contact-message">{t.helpLabel}</Label>
                      <Textarea id="contact-message" name="help" required className="min-h-[100px] bg-gray-800 border-gray-700 focus:ring-primary text-white" />
                      {state.errors?.help && <p className="text-sm text-red-400 mt-1">{state.errors.help[0]}</p>}
                  </div>

                  <div>
                      <SubmitButton />
                  </div>
              </form>
          </div>
          <div className="hidden md:block relative">
              {contactImage && (
                    <Image
                      src={contactImage.imageUrl}
                      alt={contactImage.description}
                      fill
                      data-ai-hint={contactImage.imageHint}
                      className="object-cover"
                  />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent"></div>
          </div>
      </div>
    </div>
  );
}
