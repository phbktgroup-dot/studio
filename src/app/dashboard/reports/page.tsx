'use client';

import { useState } from 'react';
import { addDays, format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Filter, Download, Loader2, Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateUserReport, generateInquiryReport } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function ReportsPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    // Filters state
    const [userRoleFilter, setUserRoleFilter] = useState('all');
    const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');
    const [date, setDate] = useState<DateRange | undefined>({
        from: addDays(new Date(), -30),
        to: new Date(),
    });

    const handleGenerateReport = async (reportType: 'users' | 'inquiries') => {
        setLoading(true);
        const filters = { 
            role: userRoleFilter, 
            status: inquiryStatusFilter, 
            dateRange: date 
        };
        
        const result = reportType === 'users' 
            ? await generateUserReport({ role: filters.role }) 
            : await generateInquiryReport({ status: filters.status, dateRange: filters.dateRange });

        setLoading(false);

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
                link.download = `${reportType}_report_${new Date().toISOString().split('T')[0]}.xlsx`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                toast({ title: 'Report generated successfully!', description: 'Your download has started.' });
            } catch (e) {
                toast({ variant: 'destructive', title: 'Download failed', description: 'There was an issue preparing the file for download.' });
            }
        }
    };

    const renderFilters = (reportType: 'users' | 'inquiries') => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Filters</h4>
                        <p className="text-sm text-muted-foreground">
                            Set filters for the report.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        {reportType === 'users' && (
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="role">Role</Label>
                                <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
                                    <SelectTrigger id="role" className="col-span-2 h-8">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Roles</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        {reportType === 'inquiries' && (
                            <>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="status">Status</Label>
                                     <Select value={inquiryStatusFilter} onValueChange={setInquiryStatusFilter}>
                                        <SelectTrigger id="status" className="col-span-2 h-8">
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
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="date-range">Date Range</Label>
                                    <div className="col-span-2">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                            <Button
                                                id="date"
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal h-8",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date?.from ? (
                                                date.to ? (
                                                    <>
                                                    {format(date.from, "LLL dd, y")} -{" "}
                                                    {format(date.to, "LLL dd, y")}
                                                    </>
                                                ) : (
                                                    format(date.from, "LLL dd, y")
                                                )
                                                ) : (
                                                <span>Pick a date</span>
                                                )}
                                            </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={date?.from}
                                                selected={date}
                                                onSelect={setDate}
                                                numberOfMonths={2}
                                            />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );

    const ReportTabContent = ({ type, title, description }: { type: 'users' | 'inquiries', title: string, description: string }) => (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                {renderFilters(type)}
                <Button onClick={() => handleGenerateReport(type)} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                    Generate Report
                </Button>
            </CardContent>
        </Card>
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="relative flex items-center justify-center mb-4">
                <Button variant="ghost" asChild size="icon" className="absolute left-0">
                    <Link href="/dashboard/settings">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Settings</span>
                    </Link>
                </Button>
                <h1 className="text-lg font-bold font-headline">Reports</h1>
            </div>
            
            <Tabs defaultValue="inquiries" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="inquiries">Request Reports</TabsTrigger>
                    <TabsTrigger value="users">User Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="inquiries">
                    <ReportTabContent 
                        type="inquiries"
                        title="Inquiry Reports"
                        description="Generate reports for all user inquiries. You can filter by status and date range."
                    />
                </TabsContent>
                <TabsContent value="users">
                    <ReportTabContent 
                        type="users"
                        title="User Reports"
                        description="Generate reports for all registered users. You can filter by user role."
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
