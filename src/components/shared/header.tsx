
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import { Menu, LogOut, Globe } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { useLanguage } from "@/context/language-provider";

const text = {
  mr: {
      services: "सेवा",
      solutions: "उपाय",
      work: "आमचे काम",
      insights: "विचार",
      careers: "करिअर",
      contact: "संपर्क",
      login: "लॉगिन",
  },
  en: {
      services: "Services",
      solutions: "Solutions",
      work: "Our Work",
      insights: "Insights",
      careers: "Careers",
      contact: "Contact",
      login: "Login",
  },
  hi: {
    services: "सेवाएँ",
    solutions: "समाधान",
    work: "हमारा काम",
    insights: "विचार",
    careers: "करियर",
    contact: "संपर्क",
    login: "लॉगिन",
  },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoLoading, setLogoLoading] = useState(true);
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  const navLinks = [
    { href: "#services", label: text[language].services },
    { href: "#solutions", label: text[language].solutions },
    { href: "#work", label: text[language].work },
    { href: "#insights", label: text[language].insights },
    { href: "#careers", label: text[language].careers },
    { href: "#contact", label: text[language].contact },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

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
          // It's okay if this fails, we'll just fall back to the default logo.
          console.warn("Could not fetch site logo:", error.message);
        } finally {
            setLogoLoading(false);
        }
      };
    fetchLogoUrl();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (event === 'SIGNED_OUT') {
        router.refresh();
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  
  const NavMenu = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-6 text-sm font-medium", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-foreground/80 transition-colors hover:text-foreground"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "border-b bg-background/80 backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center px-2">
        <div className="mr-auto flex items-center">
          <Link href="/" className="flex items-center">
            {logoLoading ? (
              <div className="h-[58px] w-[180px]" />
            ) : logoUrl ? (
              <img src={logoUrl} alt="PHBKT Group" className="h-[58px] w-auto object-contain" />
            ) : (
              <Logo className="h-[58px]" />
            )}
          </Link>
        </div>
        <NavMenu className="hidden md:flex" />
        <div className="ml-auto flex items-center gap-2">
          {mounted ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Globe className="mr-2 h-4 w-4" />
                    <span>{language === 'en' ? 'English' : language === 'mr' ? 'मराठी' : 'हिंदी'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage('en')} disabled={language === 'en'}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('mr')} disabled={language === 'mr'}>
                    मराठी
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('hi')} disabled={language === 'hi'}>
                    हिंदी
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {loading ? (
                <div className="w-[105px] h-[40px]" /> // Placeholder to prevent layout shift
              ) : user ? (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="rounded-full">
                        <Avatar>
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback>{user.user_metadata?.full_name?.[0] || user.email?.[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Toggle user menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{user.user_metadata?.full_name || user.email}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Support</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              ) : (
                <Button asChild>
                  <Link href="/login">{text[language].login}</Link>
                </Button>
              )}
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <div className="p-6">
                    {logoLoading ? (
                      <div className="h-[58px] w-[180px]" />
                    ) : logoUrl ? (
                      <img src={logoUrl} alt="PHBKT Group" className="h-[58px] w-auto object-contain" />
                    ) : (
                      <Logo className="h-[58px]" />
                    )}
                    <div className="flex flex-col gap-6 text-xs font-medium mt-8">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-foreground/80 transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <>
              <div className="h-9 w-[120px]" />
              <div className="h-10 w-[105px]" />
              <div className="h-10 w-10 md:hidden" />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
