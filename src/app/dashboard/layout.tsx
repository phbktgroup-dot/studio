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
  Film,
  UserCog,
  Settings,
  ChevronRight,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInset,
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

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    const handleFocus = async () => {
      // When the window regains focus, refresh the session to get the latest user data.
      // This will trigger the onAuthStateChange listener if data has changed.
      await supabase.auth.refreshSession();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  useEffect(() => {
    if (user) {
      const userRole = user.user_metadata?.role;
      const isAdminRoute = pathname === '/dashboard/users' || pathname === '/dashboard/hero-section';
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
  const isSettingsActive = pathname === '/dashboard/hero-section' || pathname === '/dashboard/users';

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarHeader className="flex-row items-center justify-between border-b">
            <Link href="/" className="flex items-center gap-2 font-semibold overflow-hidden">
              <Logo />
            </Link>
            <SidebarTrigger className="hidden md:flex" />
          </SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
                <Link href="/dashboard">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton asChild isActive={pathname === '/dashboard/services'}>
                <Link href="#">
                  <Briefcase />
                  <span>Services</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/dashboard/clients'}>
                <Link href="#">
                  <Users />
                  <span>Clients</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/dashboard/invoices'}>
                <Link href="#">
                  <FileText />
                  <span>Invoices</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/dashboard/analytics'}>
                <Link href="#">
                  <LineChart />
                  <span>Analytics</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {userRole === 'admin' && (
              <Collapsible asChild defaultOpen={isSettingsActive}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={isSettingsActive} className="justify-between">
                      <div className="flex items-center gap-2">
                        <Settings />
                        <span>Settings</span>
                      </div>
                      <ChevronRight className="h-4 w-4 transition-transform data-[state=open]:rotate-90 group-data-[state=collapsed]:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === '/dashboard/hero-section'}>
                          <Link href="/dashboard/hero-section">
                            Hero Section
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === '/dashboard/users'}>
                          <Link href="/dashboard/users">
                            Manage Users
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
            {/* Can add breadcrumbs or search here */}
          </div>
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
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
