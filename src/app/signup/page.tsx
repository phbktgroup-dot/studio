
'use client'

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/shared/logo";
import { ArrowLeft, Loader2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleSignup, type SignupState } from "@/lib/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" {...props}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
      <path fill="none" d="M0 0h48v48H0z"></path>
    </svg>
);

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : "Create Account"}
    </Button>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const initialState: SignupState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(handleSignup, initialState);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoLoading, setLogoLoading] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (state.isSuccess) {
      toast({
        title: "Signup successful!",
        description: state.message || "Please log in to continue.",
        duration: 5000,
      });
      router.push('/login');
    }
  }, [state, router, toast]);

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
          console.warn("Could not fetch site logo for signup page:", error.message);
        } finally {
            setLogoLoading(false);
        }
      };
    fetchLogoUrl();
  }, []);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Google sign up failed",
        description: error.message,
      });
      setGoogleLoading(false);
    }
  };
  
  const isLoading = googleLoading;


  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-background pt-8 sm:pt-4">
      <Card className="relative mx-auto w-full max-w-lg shadow-2xl">
        <div className="absolute top-4 left-4">
            <Button variant="ghost" size="icon" asChild>
            <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Home</span>
            </Link>
            </Button>
        </div>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {logoLoading ? (
              <div className="h-[58px] w-[180px]" />
            ) : logoUrl ? (
              <img src={logoUrl} alt="Company Logo" className="h-[58px] w-auto object-contain" />
            ) : (
              <Logo className="h-[58px]" />
            )}
          </div>
          <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
          <CardDescription>
            Create an account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="grid gap-3">
            {state.errors?._form && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Signup Failed</AlertTitle>
                    <AlertDescription>{state.errors._form[0]}</AlertDescription>
                </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                aria-describedby="fullName-error"
                disabled={isLoading}
              />
               {state.errors?.fullName && (
                    <p id="fullName-error" className="text-sm text-destructive mt-1">
                        {state.errors.fullName[0]}
                    </p>
                )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                required
                maxLength={10}
                pattern="[0-9]{10}"
                aria-describedby="mobileNumber-error"
                disabled={isLoading}
              />
              {state.errors?.mobileNumber && (
                    <p id="mobileNumber-error" className="text-sm text-destructive mt-1">
                        {state.errors.mobileNumber[0]}
                    </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                aria-describedby="email-error"
                disabled={isLoading}
              />
              {state.errors?.email && (
                    <p id="email-error" className="text-sm text-destructive mt-1">
                        {state.errors.email[0]}
                    </p>
                )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password"
                type="password" 
                required 
                minLength={6}
                aria-describedby="password-error"
                disabled={isLoading}
              />
              {state.errors?.password && (
                    <p id="password-error" className="text-sm text-destructive mt-1">
                        {state.errors.password[0]}
                    </p>
                )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword"
                type="password" 
                required 
                minLength={6}
                aria-describedby="confirmPassword-error"
                disabled={isLoading}
              />
              {state.errors?.confirmPassword && (
                    <p id="confirmPassword-error" className="text-sm text-destructive mt-1">
                        {state.errors.confirmPassword[0]}
                    </p>
                )}
            </div>
            <SubmitButton />
          </form>

           <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                Or sign up with
                </span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading}>
            {googleLoading ? (
                <Loader2 className="animate-spin" />
            ) : (
                <>
                <GoogleIcon className="mr-2 h-4 w-4" />
                Sign up with Google
                </>
            )}
          </Button>

            <div className="mt-3 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
    
