
'use client';

import { useState, useEffect } from 'react';
import { addDays, format } from "date-fns";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Download, Loader2, AlertTriangle, Filter } from 'lucide-react';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateInquiryReport } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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


export default function InquiryReportsPage() {
    const { toast } = useToast();
    const [generating, setGenerating] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Filters state
    const [statusFilter, setStatusFilter] = useState('all');
    const [date, setDate] = useState<{from?: string, to?: string}>({
        from: format(addDays(new Date(), -30), 'yyyy-MM-dd'),
        to: format(new Date(), 'yyyy-MM-dd'),
    });

    useEffect(() => {
        const fetchInquiries = async () => {
            setFetching(true);
            setError(null);

            let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false });
            
            if (statusFilter !== 'all') {
                query = query.eq('status', statusFilter);
            }
            if (date?.from) {
                query = query.gte('created_at', date.from);
            }
            if (date?.to) {
                const toDate = new Date(date.to);
                toDate.setDate(toDate.getDate() + 1);
                query = query.lt('created_at', toDate.toISOString());
            }

            const { data, error: queryError } = await query;

            if (queryError) {
                setError(queryError.message);
            } else {
                setInquiries(data || []);
            }

            setFetching(false);
        };
        fetchInquiries();
    }, [statusFilter, date]);


    const handleGenerateReport = async () => {
        setGenerating(true);
        const filters = { 
            status: statusFilter, 
            dateRange: {
                from: date?.from ? new Date(date.from) : undefined,
                to: date?.to ? new Date(date.to) : undefined,
            } 
        };
        
        const result = await generateInquiryReport(filters);

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
                link.download = `inquiries_report_${new Date().toISOString().split('T')[0]}.xlsx`;
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
                    <h1 className="text-lg font-bold font-headline">Request Reports</h1>
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
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger id="status" className="h-8 w-[180px]">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="in_process">In Process</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Date range</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="date"
                                            value={date?.from || ''}
                                            onChange={(e) => setDate(prev => ({...prev, from: e.target.value}))}
                                            className="h-8"
                                            aria-label="Start date"
                                        />
                                        <span className="text-muted-foreground">to</span>
                                        <Input
                                            type="date"
                                            value={date?.to || ''}
                                            onChange={(e) => setDate(prev => ({...prev, to: e.target.value}))}
                                            className="h-8"
                                            aria-label="End date"
                                        />
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Button onClick={handleGenerateReport} disabled={generating || fetching || inquiries.length === 0}>
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
                                <AlertTitle>Error Fetching Inquiries</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        </div>
                    ) : inquiries.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Request ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Purpose</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {inquiries.map((inquiry) => {
                                const effectiveStatus: Status = inquiry.status || 'pending';
                                return (
                                <TableRow key={inquiry.id}>
                                    <TableCell className="font-mono">{inquiry.id.substring(0, 8)}</TableCell>
                                    <TableCell>{format(new Date(inquiry.created_at), 'MMM d, yyyy')}</TableCell>
                                    <TableCell className="font-semibold">{inquiry.name}</TableCell>
                                    <TableCell className="capitalize">{inquiry.purpose}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusBadgeVariant[effectiveStatus]} className="capitalize">
                                            {statusText[effectiveStatus]}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            );
                            })}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">
                            No inquiries found for the selected filters.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
