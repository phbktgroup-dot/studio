
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

  return (
    <div className="min-h-screen w-full flex items-start sm:items-center justify-center bg-background p-4 pt-20 sm:pt-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <Card className="mx-auto w-full max-w-sm shadow-2xl">
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
            Create an account to get started. The first user will become an admin.
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
                placeholder="John Doe"
                required
                aria-describedby="fullName-error"
              />
               {state.errors?.fullName && (
                    <p id="fullName-error" className="text-sm text-destructive mt-1">
                        {state.errors.fullName[0]}
                    </p>
                )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                aria-describedby="email-error"
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
              />
              {state.errors?.password && (
                    <p id="password-error" className="text-sm text-destructive mt-1">
                        {state.errors.password[0]}
                    </p>
                )}
            </div>
            <SubmitButton />
            <div className="mt-3 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
