
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
import { StatusSwitcher } from './StatusSwitcher';

export function ViewInquiryButton({ inquiry }: { inquiry: any }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Eye className="h-3.5 w-3.5" />
                    <span className="sr-only">View Inquiry</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base">Inquiry Details</DialogTitle>
                    <DialogDescription className="text-xs">
                        Submitted on {format(new Date(inquiry.created_at), 'PPP p')}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 text-xs">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right text-muted-foreground text-xs">Name</Label>
                        <div className="col-span-3">{inquiry.name}</div>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right text-muted-foreground text-xs">Email</Label>
                        <div className="col-span-3">{inquiry.email}</div>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right text-muted-foreground text-xs">Mobile</Label>
                        <div className="col-span-3">{inquiry.mobile || 'N/A'}</div>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right text-muted-foreground text-xs">Purpose</Label>
                        <div className="col-span-3 capitalize">{inquiry.purpose.replace(/-/g, ' ')}</div>
                    </div>
                     <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right text-muted-foreground mt-1 text-xs">Vision</Label>
                        <div className="col-span-3 rounded-md border bg-muted/50 p-3 whitespace-pre-wrap break-words">
                            {inquiry.vision}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right text-muted-foreground text-xs">Status</Label>
                        <div className="col-span-3">
                            <StatusSwitcher inquiryId={inquiry.id} currentStatus={inquiry.status} />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
