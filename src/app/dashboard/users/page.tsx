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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, MoreHorizontal, FilePen, Trash2 } from "lucide-react";
import { RoleSwitcher } from './role-switcher';
import { Badge } from '@/components/ui/badge';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function UsersPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey || serviceRoleKey === 'YOUR_SERVICE_ROLE_KEY_HERE') {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold font-headline">Manage Users</h1>
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
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold font-headline">Manage Users</h1>
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
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold font-headline">Manage Users</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">User List</CardTitle>
          <CardDescription className="text-xs">A list of all registered users in your application.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="text-xs">
            <TableHeader>
              <TableRow>
                <TableHead className="p-2">User</TableHead>
                <TableHead className="p-2">Role</TableHead>
                <TableHead className="p-2">Status</TableHead>
                <TableHead className="p-2">Created At</TableHead>
                <TableHead className="p-2 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="p-2">
                     <div className="font-semibold">{user.user_metadata?.full_name || 'N/A'}</div>
                    <div className="text-muted-foreground">{user.email}</div>
                  </TableCell>
                  <TableCell className="p-2">
                    <RoleSwitcher userId={user.id} currentRole={user.user_metadata?.role || 'user'} />
                  </TableCell>
                  <TableCell className="p-2">
                     <Badge variant={user.email_confirmed_at ? "default" : "secondary"} className="text-xs font-normal">
                        {user.email_confirmed_at ? 'Active' : 'Invited'}
                     </Badge>
                  </TableCell>
                  <TableCell className="p-2">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="p-2 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <FilePen className="mr-2 h-3.5 w-3.5" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          <Trash2 className="mr-2 h-3.5 w-3.5" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
