import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LegalSealIcon = () => (
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="sealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary), 0.8)" />
            <stop offset="100%" stopColor="hsl(var(--primary), 1)" />
          </linearGradient>
        </defs>
        <g filter="url(#dropShadow)">
          <circle cx="50" cy="50" r="48" fill="url(#sealGradient)" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary-foreground), 0.5)" strokeWidth="1"/>
          <path d="M50 30 L35 60 L65 60 Z" fill="hsl(var(--primary-foreground), 0.8)" transform="rotate(180, 50, 50)"/>
          <path d="M50 70 L35 40 L65 40 Z" fill="hsl(var(--primary-foreground), 0.8)" />
        </g>
      </svg>
    </div>
  );

export default function ComplianceSection() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-md">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Expert Tax & Compliance Services
          </h2>
          <p className="mt-4 text-muted-foreground">
            Navigate the complexities of tax and regulatory compliance with our expert guidance. We ensure your business stays compliant, optimized, and prepared for the future.
          </p>
          <Card className="mt-6 bg-muted/30">
            <CardContent className="p-6">
              <p className="font-medium">Our compliance services include:</p>
              <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
                <li>Corporate Tax Planning</li>
                <li>GST/HST Filings and Advisory</li>
                <li>Regulatory Compliance Audits</li>
                <li>International Tax Strategy</li>
              </ul>
            </CardContent>
          </Card>
          <Button size="lg" variant="outline" className="mt-8">
            Learn More About Compliance
          </Button>
        </div>
        <div className="flex justify-center items-center">
            <LegalSealIcon />
        </div>
      </div>
    </section>
  );
}
