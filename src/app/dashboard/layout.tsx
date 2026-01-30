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
  UserCog,
  Film,
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

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    const handleFocus = async () => {
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
  
  const UserAvatarButton = () => (
      <Avatar>
        <AvatarImage src={user.user_metadata?.avatar_url} />
        <AvatarFallback>{user.user_metadata?.full_name?.[0] || user.email?.[0].toUpperCase()}</AvatarFallback>
      </Avatar>
  )

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 z-[51] fixed top-0 left-0 right-0">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Logo />
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

      <div className="flex-1 overflow-hidden pt-14 lg:pt-[60px]">
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
                  <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/dashboard/services'} size="sm" tooltip="Services">
                      <Link href="#">
                      <Briefcase />
                      <span>Services</span>
                      </Link>
                  </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/dashboard/clients'} size="sm" tooltip="Clients">
                      <Link href="#">
                      <Users />
                      <span>Clients</span>
                      </Link>
                  </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/dashboard/invoices'} size="sm" tooltip="Invoices">
                      <Link href="#">
                      <FileText />
                      <span>Invoices</span>
                      </Link>
                  </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/dashboard/analytics'} size="sm" tooltip="Analytics">
                      <Link href="#">
                      <LineChart />
                      <span>Analytics</span>
                      </Link>
                  </SidebarMenuButton>
                  </SidebarMenuItem>
                  {userRole === 'admin' && (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === '/dashboard/users'} size="sm" tooltip="Manage Users">
                          <Link href="/dashboard/users">
                            <UserCog />
                            <span>Manage Users</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                       <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === '/dashboard/hero-section'} size="sm" tooltip="Hero Section">
                          <Link href="/dashboard/hero-section">
                            <Film />
                            <span>Hero Section</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
              </SidebarMenu>
              </SidebarContent>
          </Sidebar>

          <SidebarInset className="h-full overflow-y-auto">
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
