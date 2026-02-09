'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Mail, Loader2, ArrowLeft } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ViewInquiryButton } from './inquiries/ViewInquiryButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type PageError = {
    title: string;
    message: string;
}

type Status = 'in_process' | 'completed' | 'pending';

const statusText: Record<Status, string> = {
    pending: 'Pending',
    in_process: 'In Process',
    completed: 'Completed'
}

const statusBadgeVariant: Record<Status, "secondary" | "default" | "outline"> = {
    pending: 'secondary',
    in_process: 'default',
    completed: 'outline'
}


export default function DashboardPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PageError | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setLoading(false);
    }
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
        const fetchInquiries = async () => {
            const { data, error: queryError } = await supabase
                .from('inquiries')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (queryError) {
                let message = queryError.message;
                if (queryError.message.includes('inquiries') && (queryError.message.includes('does not exist') || queryError.message.includes('schema cache'))) {
                    message = "The 'inquiries' table does not seem to exist in the database. An administrator needs to create it.";
                } else if (queryError.message.includes('column "mobile" of relation "inquiries" does not exist')) {
                    message = "The 'inquiries' table is missing a 'mobile' column. An administrator needs to add it.";
                }
                setError({ title: 'Error Fetching Inquiries', message });
            } else {
                setInquiries(data || []);
            }
        };

        fetchInquiries();

        const channel = supabase
            .channel('public:inquiries:user-dashboard')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'inquiries', filter: `user_id=eq.${user.id}` }, 
                () => fetchInquiries()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col">
        <div className="relative flex items-center justify-center mb-4 p-4 sm:p-6 border-b">
            <Button variant="ghost" asChild size="icon" className="absolute left-4">
                <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Home</span>
                </Link>
            </Button>
            <h1 className="text-lg font-bold font-headline">Dashboard</h1>
        </div>
        <div className="p-0">
          <Card>
            <CardContent className="p-8 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  if (!user && !loading) {
     return (
      <div className="flex flex-col">
        <div className="relative flex items-center justify-center mb-4 p-4 sm:p-6 border-b">
            <Button variant="ghost" asChild size="icon" className="absolute left-4">
                <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Home</span>
                </Link>
            </Button>
            <h1 className="text-lg font-bold font-headline">Dashboard</h1>
        </div>
        <div className="p-0">
          <Card>
            <CardContent className="p-8">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Authentication Error</AlertTitle>
                <AlertDescription>
                  You must be logged in to view your inquiries.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
     return (
      <div className="flex flex-col">
        <div className="relative flex items-center justify-center mb-4 p-4 sm:p-6 border-b">
            <Button variant="ghost" asChild size="icon" className="absolute left-4">
                <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Home</span>
                </Link>
            </Button>
            <h1 className="text-lg font-bold font-headline">Dashboard</h1>
        </div>
        <div className="p-0">
          <Card>
            <CardContent className="p-8">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{error.title}</AlertTitle>
                <AlertDescription>
                  {error.message}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
       <div className="relative flex items-center justify-center p-4 sm:p-6 border-b">
            <Button variant="ghost" asChild size="icon" className="absolute left-4">
                <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Home</span>
                </Link>
            </Button>
            <h1 className="text-lg font-bold font-headline">Dashboard</h1>
        </div>
       <Card className="border-0 shadow-none rounded-none">
        <CardHeader className="px-2 sm:px-4">
          <CardTitle className="text-xs font-semibold">My Inquiries</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            {inquiries && inquiries.length > 0 ? (
                 <Table className="text-xs">
                    <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50 h-8">
                            <TableHead className="h-8 py-0 px-2 sm:px-4">Request ID</TableHead>
                            <TableHead className="h-8 py-0 px-2 sm:px-4">Date</TableHead>
                            <TableHead className="h-8 py-0 px-2 sm:px-4">Name</TableHead>
                            <TableHead className="h-8 py-0 px-2 sm:px-4">Email</TableHead>
                            <TableHead className="h-8 py-0 px-2 sm:px-4">Mobile</TableHead>
                            <TableHead className="h-8 py-0 px-2 sm:px-4">Purpose</TableHead>
                            <TableHead className="h-8 py-0 px-2 sm:px-4">Status</TableHead>
                            <TableHead className="h-8 py-0 px-2 sm:px-4 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {inquiries.map((inquiry) => {
                        const effectiveStatus: Status = inquiry.status || 'pending';
                        return (
                        <TableRow key={inquiry.id} className="h-8 text-[10px]">
                        <TableCell className="py-0 px-2 sm:px-4 font-mono">{inquiry.id.substring(0, 8)}</TableCell>
                        <TableCell className="py-0 px-2 sm:px-4">{format(new Date(inquiry.created_at), 'MMM d, yyyy')}</TableCell>
                        <TableCell className="py-0 px-2 sm:px-4 font-semibold">{inquiry.name}</TableCell>
                        <TableCell className="py-0 px-2 sm:px-4">{inquiry.email}</TableCell>
                        <TableCell className="py-0 px-2 sm:px-4">{inquiry.mobile || 'N/A'}</TableCell>
                        <TableCell className="py-0 px-2 sm:px-4 capitalize">
                            <Badge variant="secondary" className="font-normal">{inquiry.purpose.replace(/-/g, ' ')}</Badge>
                        </TableCell>
                        <TableCell className="py-0 px-2 sm:px-4">
                            <Badge variant={statusBadgeVariant[effectiveStatus]} className="font-normal capitalize">
                                {statusText[effectiveStatus]}
                            </Badge>
                        </TableCell>
                        <TableCell className="py-0 px-2 sm:px-4 text-right">
                           <ViewInquiryButton inquiry={inquiry} />
                        </TableCell>
                        </TableRow>
                    );
                    })}
                    </TableBody>
                </Table>
            ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg m-4 sm:m-6">
                    <Mail className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No Inquiries Found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        You have not submitted any inquiries.
                    </p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
