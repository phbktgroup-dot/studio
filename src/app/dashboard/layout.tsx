
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
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
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
  }, [router]);

  useEffect(() => {
    if (user) {
      const userRole = user.user_metadata?.role;
      const isAdminRoute = pathname.startsWith('/dashboard/users') || pathname.startsWith('/dashboard/hero-section') || pathname.startsWith('/dashboard/inquiries') || pathname.startsWith('/dashboard/settings');
      if (isAdminRoute && userRole !== 'admin') {
        router.push('/dashboard');
      }
    }
  }, [user, pathname, router]);

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

  if (!user) {
    return null; // Redirecting...
  }

  const userRole = user.user_metadata?.role;
  
  const UserAvatarButton = () => (
      <Avatar>
        <AvatarImage src={user.user_metadata?.avatar_url} />
        <AvatarFallback>{user.user_metadata?.full_name?.[0] || user.email?.[0].toUpperCase()}</AvatarFallback>
      </Avatar>
  )

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 z-[51] fixed top-0 left-0 right-0">
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
          <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleSidebar}>
            <UserAvatarButton />
            <span className="sr-only">Toggle sidebar</span>
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
          <Sidebar collapsible="icon">
              <SidebarContent>
              <SidebarMenu>
                  <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/dashboard'} size="sm" tooltip="Dashboard">
                      <Link href="/dashboard">
                      <Home />
                      <span>Dashboard</span>
                      </Link>
                  </SidebarMenuButton>
                  </SidebarMenuItem>
                  {userRole === 'admin' && (
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/inquiries')} size="sm" tooltip="Inquiries">
                            <Link href="/dashboard/inquiries">
                            <Mail />
                            <span>Inquiries</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  <SidebarMenuItem>
                  <SidebarMenuButton isActive={pathname === '/dashboard/services'} size="sm" tooltip="Services" disabled>
                      <Briefcase />
                      <span>Services</span>
                  </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                  <SidebarMenuButton isActive={pathname === '/dashboard/clients'} size="sm" tooltip="Clients" disabled>
                      <Users />
                      <span>Clients</span>
                  </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                  <SidebarMenuButton isActive={pathname === '/dashboard/invoices'} size="sm" tooltip="Invoices" disabled>
                      <FileText />
                      <span>Invoices</span>
                  </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                  <SidebarMenuButton isActive={pathname === '/dashboard/analytics'} size="sm" tooltip="Analytics" disabled>
                      <LineChart />
                      <span>Analytics</span>
                  </SidebarMenuButton>
                  </SidebarMenuItem>
                  {userRole === 'admin' && (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/settings')} size="sm" tooltip="Settings">
                          <Link href="/dashboard/settings">
                            <Settings />
                            <span>Settings</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
              </SidebarMenu>
              </SidebarContent>
          </Sidebar>

          <SidebarInset className="h-full overflow-y-auto no-scrollbar">
              <div className="p-4 sm:p-6">{children}</div>
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
