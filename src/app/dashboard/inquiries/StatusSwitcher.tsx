
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { updateInquiryStatus } from '@/lib/actions';

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


export function StatusSwitcher({ inquiryId, currentStatus }: { inquiryId: string, currentStatus?: Status | null }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const effectiveStatus = currentStatus || 'pending';

    const handleStatusChange = async (newStatus: Status) => {
        if (newStatus === effectiveStatus) return;
        setLoading(true);

        const result = await updateInquiryStatus(inquiryId, newStatus);

        setLoading(false);

        if (result?.error) {
            toast({
                variant: 'destructive',
                title: 'Update failed',
                description: result.error,
            });
        } else {
            toast({
                title: 'Status updated',
                description: `Inquiry status set to ${statusText[newStatus]}.`,
            });
            router.refresh();
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-32 justify-between text-xs h-7 px-2" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                         <Badge variant={statusBadgeVariant[effectiveStatus]} className="font-normal capitalize">{statusText[effectiveStatus]}</Badge>
                    )}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleStatusChange('pending')} disabled={effectiveStatus === 'pending' || loading}>
                    Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange('in_process')} disabled={effectiveStatus === 'in_process' || loading}>
                    In Process
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange('completed')} disabled={effectiveStatus === 'completed' || loading}>
                    Completed
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
