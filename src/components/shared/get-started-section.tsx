
'use client';

import { useState, useEffect, useTransition } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/language-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogIn, Mail, Loader2, Send } from 'lucide-react';
import { handleInquiry, type InquiryState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const content = {
  en: {
    title: "Let's Get Started",
    description: "Ready to turn your vision into reality? Choose how you'd like to connect with us.",
    google: "Sign in with Google",
    email: "Sign in with Email",
    form: "Fill The Inquiry Form",
    requestService: "Request This Service",
    submitting: "Submitting..."
  },
  hi: {
    title: "चलिए शुरू करते हैं",
    description: "अपने दृष्टिकोण को वास्तविकता में बदलने के लिए तैयार हैं? चुनें कि आप हमसे कैसे जुड़ना चाहेंगे।",
    google: "Google से साइन इन करें",
    email: "ईमेल से साइन इन करें",
    form: "पूछताछ फ़ॉर्म भरें",
    requestService: "इस सेवा का अनुरोध करें",
    submitting: "सबमिट हो रहा है..."
  },
  mr: {
    title: "चला, सुरुवात करूया",
    description: "तुमची दृष्टी प्रत्यक्षात आणण्यास तयार आहात? तुम्ही आमच्याशी कसे संपर्क साधू इच्छिता ते निवडा.",
    google: "Google ने साइन इन करा",
    email: "ईमेलने साइन इन करा",
    form: "चौकशी अर्ज भरा",
    requestService: "या सेवेसाठी विनंती करा",
    submitting: "सबमिट करत आहे..."
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


export function GetStartedSection({ serviceTitle }: { serviceTitle?: string }) {
    const { language } = useLanguage();
    const t = content[language];
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const [isMobileDialogOpen, setIsMobileDialogOpen] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [isSubmittingMobile, setIsSubmittingMobile] = useState(false);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        });
    
        return () => {
          authListener.subscription.unsubscribe();
        };
      }, []);
    
    const handleRequest = () => {
        if (!user) {
            toast({ variant: "destructive", title: "Authentication Error", description: "You must be logged in to make a request." });
            return;
        }
        if (!serviceTitle) {
            toast({ variant: "destructive", title: "Service Not Specified", description: "Could not determine which service to request." });
            return;
        }

        if (!user.phone) {
            setIsMobileDialogOpen(true);
            return;
        }

        startTransition(async () => {
            const fullName = user.user_metadata?.full_name || 'User';
            const [firstName, ...lastNameParts] = fullName.split(' ');
            const lastName = lastNameParts.join(' ') || '(No last name)';

            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', user.email!);
            formData.append('mobileNumber', user.phone || '');
            formData.append('industry', serviceTitle);
            formData.append('help', `Automated service request for: ${serviceTitle}`);
            formData.append('userId', user.id);

            const result = await handleInquiry({} as InquiryState, formData);

            if (result.isSuccess) {
                toast({
                    title: "Request Submitted!",
                    description: result.message,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Submission Failed",
                    description: result.errors?._form?.[0] || "An unknown error occurred.",
                });
            }
        });
    };

    const handleDialogSubmit = async () => {
        if (!user || !serviceTitle) return;

        setIsSubmittingMobile(true);

        if (mobileNumber) {
            if (!/^\d{10}$/.test(mobileNumber)) {
                toast({
                    variant: "destructive",
                    title: "Invalid Mobile Number",
                    description: "Please enter a valid 10-digit mobile number.",
                });
                setIsSubmittingMobile(false);
                return;
            }
            const { error: updateError } = await supabase.auth.updateUser({ phone: mobileNumber });
            if (updateError) {
                toast({
                    variant: "destructive",
                    title: "Update Failed",
                    description: `Could not save mobile number: ${updateError.message}`,
                });
            } else {
                 toast({
                    title: "Profile Updated",
                    description: "Your mobile number has been saved.",
                });
            }
        }

        const fullName = user.user_metadata?.full_name || 'User';
        const [firstName, ...lastNameParts] = fullName.split(' ');
        const lastName = lastNameParts.join(' ') || '(No last name)';

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', user.email!);
        formData.append('mobileNumber', mobileNumber || user.phone || '');
        formData.append('industry', serviceTitle);
        formData.append('help', `Automated service request for: ${serviceTitle}`);
        formData.append('userId', user.id);

        const result = await handleInquiry({} as InquiryState, formData);

        if (result.isSuccess) {
            toast({
                title: "Request Submitted!",
                description: result.message,
            });
        } else {
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: result.errors?._form?.[0] || "An unknown error occurred.",
            });
        }

        setIsSubmittingMobile(false);
        setIsMobileDialogOpen(false);
        setMobileNumber('');
    };

    return (
        <div className="py-16 bg-muted/30">
            <div className="container">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-3xl">{t.title}</CardTitle>
                        <CardDescription className="max-w-xl mx-auto">{t.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {loading ? (
                            <Loader2 className="h-8 w-8 animate-spin" />
                        ) : user ? (
                            <Button onClick={handleRequest} disabled={isPending} size="lg" className="w-full sm:w-auto">
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        {t.submitting}
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-5 w-5" />
                                        {t.requestService}
                                    </>
                                )}
                            </Button>
                        ) : (
                            <>
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
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Dialog open={isMobileDialogOpen} onOpenChange={setIsMobileDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Complete Your Request</DialogTitle>
                        <DialogDescription>
                            Please provide your mobile number. You can submit the request without it if you prefer.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="mobile" className="text-right">
                                Mobile
                            </Label>
                            <Input
                                id="mobile"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="col-span-3"
                                placeholder="10-digit number"
                                maxLength={10}
                                pattern="[0-9]{10}"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleDialogSubmit} disabled={isSubmittingMobile}>
                            {isSubmittingMobile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Request
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
