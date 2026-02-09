
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Download, Loader2, AlertTriangle, Filter } from 'lucide-react';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateUserReport } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';


export default function UserReportsPage() {
    const { toast } = useToast();
    const [generating, setGenerating] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Filters state
    const [roleFilter, setRoleFilter] = useState('all');

    useEffect(() => {
        const fetchUsers = async () => {
            setFetching(true);
            setError(null);
            
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

            if (!supabaseUrl || !serviceRoleKey || serviceRoleKey === 'YOUR_SERVICE_ROLE_KEY_HERE') {
                setError("Supabase admin credentials are not configured correctly.");
                setFetching(false);
                return;
            }

            const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
                auth: { autoRefreshToken: false, persistSession: false }
            });

            const { data, error: queryError } = await supabaseAdmin.auth.admin.listUsers();

            if (queryError) {
                setError(queryError.message);
            } else {
                let filteredUsers = data.users;
                if (roleFilter !== 'all') {
                    filteredUsers = data.users.filter(u => (u.user_metadata?.role || 'user') === roleFilter);
                }
                setUsers(filteredUsers || []);
            }

            setFetching(false);
        };
        fetchUsers();
    }, [roleFilter]);


    const handleGenerateReport = async () => {
        setGenerating(true);
        const result = await generateUserReport({ role: roleFilter });

        setGenerating(false);

        if (result?.error) {
            toast({ variant: 'destructive', title: 'Error generating report', description: result.error });
        } else if (result?.success && result.data) {
            try {
                const byteCharacters = atob(result.data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `users_report_${new Date().toISOString().split('T')[0]}.xlsx`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                toast({ title: 'Report generated successfully!', description: 'Your download has started.' });
            } catch (e) {
                toast({ variant: 'destructive', title: 'Download failed', description: 'There was an issue preparing the file for download.' });
            }
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="relative flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild size="icon" className="h-8 w-8">
                        <Link href="/dashboard/reports">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to Reports</span>
                        </Link>
                    </Button>
                    <h1 className="text-lg font-bold font-headline">User Reports</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <Filter className="h-4 w-4" />
                                <span className="sr-only">Open filters</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-4" align="end">
                           <div className="flex flex-col gap-4">
                                <h4 className="font-medium leading-none">Filters</h4>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                                        <SelectTrigger id="role" className="h-8 w-[180px]">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Roles</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="user">User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Button onClick={handleGenerateReport} disabled={generating || fetching || users.length === 0}>
                        {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                        Generate Report
                    </Button>
                </div>
            </div>
            
            <Card>
                <CardContent className="p-0">
                    {fetching ? (
                        <div className="p-8 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <div className="p-8">
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error Fetching Users</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        </div>
                    ) : users.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Full Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Mobile</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Created At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-semibold">{user.user_metadata?.full_name || 'N/A'}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="capitalize">
                                            {user.user_metadata?.role || 'user'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">
                            No users found for the selected filters.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
