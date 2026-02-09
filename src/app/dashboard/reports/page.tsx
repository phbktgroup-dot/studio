
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportsPage() {
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
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/dashboard/reports/inquiries" className="block">
          <Card className="hover:border-primary transition-colors h-full">
            <CardHeader className="flex flex-row items-center gap-4">
              <FileText className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <CardTitle className="text-sm">Request Reports</CardTitle>
                <CardDescription className="mt-1 text-xs">Generate reports for all user inquiries with filters.</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/dashboard/reports/users" className="block">
          <Card className="hover:border-primary transition-colors h-full">
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <CardTitle className="text-sm">User Reports</CardTitle>
                <CardDescription className="mt-1 text-xs">Generate reports for all registered users with filters.</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
