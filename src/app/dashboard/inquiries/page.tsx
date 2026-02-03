
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Mail, Loader2 } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ViewInquiryButton } from './ViewInquiryButton';

type PageError = {
    title: string;
    message: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PageError | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        setError({ title: 'Authentication Error', message: sessionError.message });
        setLoading(false);
        return;
      }
      
      const currentUser = session?.user;
      setUser(currentUser);

      if (!currentUser) {
          setError({ title: 'Authentication Error', message: 'You must be logged in to view your inquiries.' });
          setLoading(false);
          return;
      }
      
      const { data, error: queryError } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });

      if (queryError) {
        let message = queryError.message;
        if (queryError.message.includes('inquiries') && (queryError.message.includes('does not exist') || queryError.message.includes('schema cache'))) {
          message = "The 'inquiries' table does not seem to exist in the database. An administrator needs to create it.";
        }
        setError({ title: 'Error Fetching Inquiries', message });
      } else {
        setInquiries(data || []);
      }
      setLoading(false);
    };

    fetchData();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        fetchData();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-bold font-headline">Inquiries</h1>
        <Card>
          <CardContent className="p-8 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
     return (
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-bold font-headline">Inquiries</h1>
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
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold font-headline">Inquiries</h1>
       <Card>
        <CardHeader>
          <CardTitle>All Received Inquiries</CardTitle>
          <CardDescription>
            All inquiries submitted through the contact form.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {inquiries && inquiries.length > 0 ? (
                 <Table className="text-xs">
                    <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50 h-8">
                            <TableHead className="h-8 py-0 px-2">Request ID</TableHead>
                            <TableHead className="h-8 py-0 px-2">Date</TableHead>
                            <TableHead className="h-8 py-0 px-2">Name</TableHead>
                            <TableHead className="h-8 py-0 px-2">Email</TableHead>
                            <TableHead className="h-8 py-0 px-2">Mobile</TableHead>
                            <TableHead className="h-8 py-0 px-2">Purpose</TableHead>
                            <TableHead className="h-8 py-0 px-2 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {inquiries.map((inquiry) => (
                        <TableRow key={inquiry.id} className="h-8">
                        <TableCell className="py-0 px-2 font-mono">{inquiry.id.substring(0, 8)}</TableCell>
                        <TableCell className="py-0 px-2">{format(new Date(inquiry.created_at), 'MMM d, yyyy')}</TableCell>
                        <TableCell className="py-0 px-2 font-semibold">{inquiry.name}</TableCell>
                        <TableCell className="py-0 px-2">{inquiry.email}</TableCell>
                        <TableCell className="py-0 px-2">{inquiry.mobile || 'N/A'}</TableCell>
                        <TableCell className="py-0 px-2 capitalize">
                            <Badge variant="secondary" className="font-normal">{inquiry.purpose}</Badge>
                        </TableCell>
                        <TableCell className="py-0 px-2 text-right">
                           <ViewInquiryButton inquiry={inquiry} />
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                    <Mail className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No Inquiries Found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        There are no inquiries yet.
                    </p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
