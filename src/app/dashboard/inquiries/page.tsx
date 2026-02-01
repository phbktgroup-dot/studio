import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
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
import { AlertTriangle, Mail } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ViewInquiryButton } from './ViewInquiryButton';

async function getLoggedInUser(supabase: any) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    return session.user;
}

export default async function InquiriesPage() {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      storage: {
        getItem: (key) => cookieStore.get(key)?.value,
        setItem: () => {},
        removeItem: () => {},
      },
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const user = await getLoggedInUser(supabase);
  const userRole = user?.user_metadata?.role;

  let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false });

  if (userRole !== 'admin' && user) {
    query = query.eq('user_id', user.id);
  } else if (userRole !== 'admin' && !user) {
    // Non-admin who is not logged in sees nothing
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold font-headline">Inquiries</h1>
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
    );
  }

  const { data: inquiries, error } = await query;

  if (error) {
     return (
      <div className="flex flex-col gap-2 pt-2">
        <h1 className="text-lg font-bold font-headline">Inquiries</h1>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Fetching Inquiries</AlertTitle>
          <AlertDescription>
            {(error.message.includes('inquiries') && (error.message.includes('does not exist') || error.message.includes('schema cache')))
            ? "The 'inquiries' table does not seem to exist in the database. An administrator needs to create it."
            : error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold font-headline">Inquiries</h1>
       <Card>
        <CardHeader>
          <CardTitle>Received Inquiries</CardTitle>
          <CardDescription>
            {userRole === 'admin' ? 'All inquiries submitted through the contact form.' : 'Your submitted inquiries.'}
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
                        {userRole === 'admin' ? 'There are no inquiries yet.' : 'You have not submitted any inquiries.'}
                    </p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
