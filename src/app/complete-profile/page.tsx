
'use client'

import { useRouter } from 'next/navigation';
import { useState, type FormEvent, useEffect } from 'react';
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
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

export default function CompleteProfilePage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoLoading, setLogoLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserAndLogo = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/login');
            return;
        }
        if (user.phone) {
            router.push('/dashboard');
            return;
        }
        setUser(user);

        setLogoLoading(true);
        try {
          const { data, error } = await supabase
              .from('settings')
              .select('logo_url')
              .eq('id', 1)
              .single();
          
          if (error && error.code !== 'PGRST116') throw error;
          if (data?.logo_url) setLogoUrl(data.logo_url);
        } catch (error: any) {
          console.warn("Could not fetch site logo:", error.message);
        } finally {
            setLogoLoading(false);
        }
      };
    fetchUserAndLogo();
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!/^\d{10}$/.test(mobileNumber)) {
        toast({
            variant: "destructive",
            title: "Invalid mobile number",
            description: "Please enter a valid 10-digit mobile number.",
        });
        return;
    }
    
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      phone: mobileNumber,
    });

    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Profile updated!",
        description: "Your mobile number has been saved.",
      });
      router.push('/dashboard');
      router.refresh();
    }
  };

  if (!user) {
      return (
           <div className="min-h-screen w-full flex items-center justify-center bg-background">
               <Loader2 className="h-8 w-8 animate-spin" />
           </div>
      )
  }

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-background pt-8 sm:pt-4">
      <Card className="relative mx-auto w-full max-w-lg shadow-2xl">
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
          <CardTitle className="text-2xl font-headline">Complete Your Profile</CardTitle>
          <CardDescription>
            Please provide your mobile number to continue to the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                type="tel"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                disabled={loading}
                maxLength={10}
                pattern="[0-9]{10}"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Save and Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
