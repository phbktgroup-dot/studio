import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LegalSealIcon = () => (
    <div className="relative w-48 h-48 group">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-[.in-view]:translate-y-0 translate-y-[-100vh] group-[.in-view]:animate-bounce">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                <defs>
                <linearGradient id="sealGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary), 0.8)" />
                    <stop offset="100%" stopColor="hsl(var(--primary), 1)" />
                </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#sealGradient2)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary-foreground), 0.5)" strokeWidth="1"/>
                <path d="M50 30 L35 60 L65 60 Z" fill="hsl(var(--primary-foreground), 0.8)" transform="rotate(180, 50, 50)"/>
                <path d="M50 70 L35 40 L65 40 Z" fill="hsl(var(--primary-foreground), 0.8)" />
            </svg>
        </div>
    </div>
  );

export default function ComplianceShieldSection() {
  return (
    <section className="py-8 md:py-12 bg-background overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-md">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
            क्लिष्ट कायदे आणि कर आमची जबाबदारी, तुमचा वेळ फक्त तुमच्या प्रगतीसाठी.
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Complexity managed. Growth secured. Compliance simplified.
          </p>
          <Button size="lg" variant="outline" className="mt-8">
            Simplify Your Compliance
          </Button>
        </div>
        <div className="flex justify-center items-center h-48">
            <LegalSealIcon />
        </div>
      </div>
    </section>
  );
}
