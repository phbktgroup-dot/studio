'use client';

import { useLanguage } from '@/context/language-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogIn, Mail } from 'lucide-react';

const content = {
  en: {
    title: "Let's Get Started",
    description: "Ready to turn your vision into reality? Choose how you'd like to connect with us.",
    google: "Sign in with Google",
    email: "Sign in with Email",
    form: "Fill The Inquiry Form"
  },
  hi: {
    title: "चलिए शुरू करते हैं",
    description: "अपने दृष्टिकोण को वास्तविकता में बदलने के लिए तैयार हैं? चुनें कि आप हमसे कैसे जुड़ना चाहेंगे।",
    google: "Google से साइन इन करें",
    email: "ईमेल से साइन इन करें",
    form: "पूछताछ फ़ॉर्म भरें"
  },
  mr: {
    title: "चला, सुरुवात करूया",
    description: "तुमची दृष्टी प्रत्यक्षात आणण्यास तयार आहात? तुम्ही आमच्याशी कसे संपर्क साधू इच्छिता ते निवडा.",
    google: "Google ने साइन इन करा",
    email: "ईमेलने साइन इन करा",
    form: "चौकशी अर्ज भरा"
  }
};

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" {...props}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
      <path fill="none" d="M0 0h48v48H0z"></path>
    </svg>
);


export function GetStartedSection() {
    const { language } = useLanguage();
    const t = content[language];

    return (
        <div className="py-16 bg-muted/30">
            <div className="container">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-3xl">{t.title}</CardTitle>
                        <CardDescription className="max-w-xl mx-auto">{t.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4">
                         <Button asChild size="lg" className="w-full sm:w-auto">
                            <Link href="/login">
                                <GoogleIcon className="mr-2 h-5 w-5" />
                                {t.google}
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                            <Link href="/login">
                                <LogIn className="mr-2 h-5 w-5" />
                                {t.email}
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                            <Link href="/contact">
                                <Mail className="mr-2 h-5 w-5" />
                                {t.form}
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
