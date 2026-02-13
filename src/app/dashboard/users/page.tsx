
import { createClient } from '@supabase/supabase-js';
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
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { RoleSwitcher } from './role-switcher';
import { Badge } from '@/components/ui/badge';
import { DeleteUserButton } from './DeleteUserButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey || serviceRoleKey === 'YOUR_SERVICE_ROLE_KEY_HERE') {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative flex items-center justify-center mb-4">
            <Button variant="ghost" asChild size="icon" className="absolute left-0">
                <Link href="/dashboard/settings">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Settings</span>
                </Link>
            </Button>
            <h1 className="text-lg font-bold font-headline">Manage Users</h1>
        </div>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Configuration Error</AlertTitle>
          <AlertDescription>
            Supabase admin credentials are not configured correctly. Please set SUPABASE_SERVICE_ROLE_KEY in your .env file.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
     return (
      <div className="flex flex-col gap-2">
        <div className="relative flex items-center justify-center mb-4">
            <Button variant="ghost" asChild size="icon" className="absolute left-0">
                <Link href="/dashboard/settings">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Settings</span>
                </Link>
            </Button>
            <h1 className="text-lg font-bold font-headline">Manage Users</h1>
        </div>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Fetching Users</AlertTitle>
          <AlertDescription>
            {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
        <div className="relative flex items-center justify-center mb-4">
            <Button variant="ghost" asChild size="icon" className="absolute left-0">
                <Link href="/dashboard/settings">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Settings</span>
                </Link>
            </Button>
            <h1 className="text-lg font-bold font-headline">Manage Users</h1>
        </div>
      <Card>
        <CardContent className="p-0">
          <Table className="text-xs">
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 h-8">
                <TableHead className="h-8 py-0 px-2">User name</TableHead>
                <TableHead className="h-8 py-0 px-2">Email ID</TableHead>
                <TableHead className="h-8 py-0 px-2">Mobile Number</TableHead>
                <TableHead className="h-8 py-0 px-2">Status</TableHead>
                <TableHead className="h-8 py-0 px-2">Role</TableHead>
                <TableHead className="h-8 py-0 px-2">Created At</TableHead>
                <TableHead className="h-8 py-0 px-2">Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="h-8">
                  <TableCell className="py-0 px-2 font-semibold">
                    {user.user_metadata?.full_name || 'N/A'}
                  </TableCell>
                  <TableCell className="py-0 px-2">{user.email}</TableCell>
                  <TableCell className="py-0 px-2">{user.phone || 'N/A'}</TableCell>
                  <TableCell className="py-0 px-2">
                     <Badge variant={user.email_confirmed_at ? "default" : "secondary"} className="text-xs font-normal">
                        {user.email_confirmed_at ? 'Active' : 'Invited'}
                     </Badge>
                  </TableCell>
                  <TableCell className="py-0 px-2">
                    <RoleSwitcher userId={user.id} currentRole={user.user_metadata?.role || 'user'} />
                  </TableCell>
                  <TableCell className="py-0 px-2">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="py-0 px-2 flex items-center">
                    <span>{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}</span>
                    <DeleteUserButton userId={user.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
