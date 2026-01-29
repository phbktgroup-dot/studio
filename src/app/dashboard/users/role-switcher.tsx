'use client';

import { useState } from 'react';
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
import { updateUserRole } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

type Role = 'admin' | 'user';

export function RoleSwitcher({ userId, currentRole }: { userId: string, currentRole: Role }) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const effectiveRole = currentRole || 'user';

    const handleRoleChange = async (newRole: Role) => {
        if (newRole === effectiveRole) return;
        setLoading(true);

        const result = await updateUserRole(userId, newRole);

        setLoading(false);

        if (result?.error) {
            toast({
                variant: 'destructive',
                title: 'Update failed',
                description: result.error,
            });
        } else {
            toast({
                title: 'Role updated',
                description: `User is now an ${newRole}.`,
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="capitalize w-32 justify-between" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <span>{effectiveRole}</span>}
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleRoleChange('admin')} disabled={effectiveRole === 'admin' || loading}>
                    Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange('user')} disabled={effectiveRole === 'user' || loading}>
                    User
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
