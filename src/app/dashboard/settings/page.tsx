import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCog, Paintbrush } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold font-headline">General Settings</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/users" className="block">
          <Card className="hover:border-primary transition-colors h-full">
            <CardHeader className="flex flex-row items-center gap-4">
                <UserCog className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                    <CardTitle className="text-sm">Manage Users</CardTitle>
                    <CardDescription className="mt-1 text-xs">View, create, and manage user accounts and roles.</CardDescription>
                </div>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/dashboard/hero-section" className="block">
           <Card className="hover:border-primary transition-colors h-full">
            <CardHeader className="flex flex-row items-center gap-4">
                <Paintbrush className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                    <CardTitle className="text-sm">Site Customization</CardTitle>
                    <CardDescription className="mt-1 text-xs">Customize your site logo and hero section.</CardDescription>
                </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
