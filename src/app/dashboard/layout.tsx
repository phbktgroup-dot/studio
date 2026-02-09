
'use client';

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import {
  Home,
  LineChart,
  Users,
  Briefcase,
  FileText,
  LogOut,
  Mail,
  Settings,
  ArrowLeft,
  Lightbulb,
  GalleryVertical,
  BookOpen,
  Phone,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  useSidebar,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/shared/logo";
import { Loader2 } from "lucide-react";

function DashboardUI({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoLoading, setLogoLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile, toggleSidebar } = useSidebar();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

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
          console.warn("Could not fetch site logo for dashboard:", error.message);
        } finally {
            setLogoLoading(false);
        }
      };
    fetchLogoUrl();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (loading) return; 

    if (!user) {
      router.push('/login');
      return;
    }

    if (!user.phone && pathname !== '/complete-profile') {
      router.push('/complete-profile');
      return;
    }

    if (user.phone && pathname === '/complete-profile') {
        router.push('/dashboard');
        return;
    }

    const isAdmin = user.user_metadata?.role === 'admin' || user.email === 'hari.garad@phbkt.com';
    const isAdminRoute = pathname.startsWith('/dashboard/users') || pathname.startsWith('/dashboard/hero-section') || pathname.startsWith('/dashboard/inquiries') || pathname.startsWith('/dashboard/settings') || pathname.startsWith('/dashboard/msme-startup-section');
    if (isAdminRoute && !isAdmin) {
      router.push('/dashboard');
    }
  }, [user, loading, pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || (!user.phone && pathname !== '/complete-profile')) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }
  
  const UserAvatarButton = () => (
      <Avatar>
        <AvatarImage src={user.user_metadata?.avatar_url} />
        <AvatarFallback>{user.user_metadata?.full_name?.[0] || user.email?.[0].toUpperCase()}</AvatarFallback>
      </Avatar>
  );
  
  const isAdmin = user?.user_metadata?.role === 'admin' || user?.email === 'hari.garad@phbkt.com';

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background pr-4 lg:h-[60px] lg:pr-6 z-[51] fixed top-0 left-0 right-0">
        <div className="flex items-center gap-2">
          <Link href="/">
            {logoLoading ? (
              <div className="h-[58px] w-[180px]" />
            ) : logoUrl ? (
              <img src={logoUrl} alt="PHBKT Group" className="h-[58px] w-auto object-contain" />
            ) : (
              <Logo className="h-[58px]" />
            )}
          </Link>
        </div>
        
        {isMobile ? (
          <Button variant="secondary" size="icon" className="rounded-full" onClick={toggleSidebar}>
            <UserAvatarButton />
            <span className="sr-only">Toggle sidebar menu</span>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <UserAvatarButton />
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
        )}
      </header>

      <div className="flex-1 overflow-hidden pt-16 lg:pt-[60px]">
          <Sidebar collapsible="icon" side="right">
              <SidebarContent>
              <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/dashboard'} tooltip="Dashboard">
                        <Link href="/dashboard">
                        <Home />
                        <span className="text-xs">Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {isAdmin && (
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/inquiries')} tooltip="All Inquiries">
                            <Link href="/dashboard/inquiries">
                            <Mail />
                            <span className="text-xs">All Inquiries</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  <SidebarSeparator className="my-2" />

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Services">
                        <Link href="/#services">
                        <Briefcase />
                        <span className="text-xs">Services</span>
                        </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Solutions">
                        <Link href="/#solutions">
                        <Lightbulb />
                        <span className="text-xs">Solutions</span>
                        </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Our Work">
                        <Link href="/#work">
                        <GalleryVertical />
                        <span className="text-xs">Our Work</span>
                        </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Insights">
                        <Link href="/#insights">
                        <BookOpen />
                        <span className="text-xs">Insights</span>
                        </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Careers">
                        <Link href="/#careers">
                        <Users />
                        <span className="text-xs">Careers</span>
                        </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Contact">
                        <Link href="/#contact">
                        <Phone />
                        <span className="text-xs">Contact</span>
                        </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {isAdmin && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/settings')} tooltip="Settings">
                        <Link href="/dashboard/settings">
                          <Settings />
                          <span className="text-xs">Settings</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
              </SidebarMenu>
               {isMobile && (
                <SidebarMenu className="mt-auto">
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout}>
                      <LogOut />
                      <span className="text-xs">Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              )}
              </SidebarContent>
          </Sidebar>

          <SidebarInset className="h-full overflow-y-auto no-scrollbar">
            {children}
          </SidebarInset>
      </div>
    </>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardUI>{children}</DashboardUI>
    </SidebarProvider>
  );
}
