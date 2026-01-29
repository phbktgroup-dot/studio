import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCog, Film } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-headline">Settings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/users" className="block">
          <Card className="hover:border-primary transition-colors h-full">
            <CardHeader className="flex flex-row items-center gap-4">
                <UserCog className="h-10 w-10 text-primary flex-shrink-0" />
                <div>
                    <CardTitle className="text-lg">Manage Users</CardTitle>
                    <CardDescription className="mt-1">View, create, and manage user accounts and roles.</CardDescription>
                </div>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/dashboard/hero-section" className="block">
           <Card className="hover:border-primary transition-colors h-full">
            <CardHeader className="flex flex-row items-center gap-4">
                <Film className="h-10 w-10 text-primary flex-shrink-0" />
                <div>
                    <CardTitle className="text-lg">Hero Section</CardTitle>
                    <CardDescription className="mt-1">Customize the background video of your homepage.</CardDescription>
                </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
