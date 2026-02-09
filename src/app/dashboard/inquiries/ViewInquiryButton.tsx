
'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function ViewInquiryButton({ inquiry }: { inquiry: any }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Eye className="h-3.5 w-3.5" />
                    <span className="sr-only">View Inquiry</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Inquiry Details</DialogTitle>
                    <DialogDescription>
                        Request ID: <span className="font-mono">{inquiry.id}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right text-muted-foreground">Date</Label>
                        <div className="col-span-3 font-medium text-sm">{format(new Date(inquiry.created_at), 'PPP p')}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right text-muted-foreground">Name</Label>
                        <div className="col-span-3 font-medium text-sm">{inquiry.name}</div>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right text-muted-foreground">Email</Label>
                        <div className="col-span-3 font-medium text-sm">{inquiry.email}</div>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right text-muted-foreground">Mobile</Label>
                        <div className="col-span-3 font-medium text-sm">{inquiry.mobile || 'N/A'}</div>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right text-muted-foreground">Purpose</Label>
                        <div className="col-span-3 font-medium capitalize text-sm">{inquiry.purpose.replace(/-/g, ' ')}</div>
                    </div>
                     <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right text-muted-foreground mt-1">Vision</Label>
                        <div className="col-span-3 rounded-md border bg-muted/50 p-3 text-sm whitespace-pre-wrap break-words">
                            {inquiry.vision}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right text-muted-foreground">Status</Label>
                        <div className="col-span-3">
                            <Badge variant={inquiry.status === 'completed' ? 'outline' : inquiry.status === 'in_process' ? 'default' : 'secondary'} className="font-normal capitalize">
                                {inquiry.status?.replace('_', ' ') || 'Pending'}
                            </Badge>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
