import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/shared/animated-text";

const NetworkGraphIcon = () => (
    <div className="relative w-full max-w-md h-64">
        {[...Array(15)].map((_, i) => (
            <div
                key={i}
                className="absolute rounded-full bg-primary/80 animate-glow"
                style={{
                    width: `${Math.random() * 10 + 4}px`,
                    height: `${Math.random() * 10 + 4}px`,
                    top: `${Math.random() * 90 + 5}%`,
                    left: `${Math.random() * 90 + 5}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${Math.random() * 2 + 3}s`,
                }}
            />
        ))}
        <svg className="absolute inset-0 w-full h-full" fill="none">
            <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsla(var(--primary), 0.1)" />
                    <stop offset="100%" stopColor="hsla(var(--primary), 0.5)" />
                </linearGradient>
            </defs>
            {/* Generate random lines */}
            {[...Array(10)].map((_, i) => (
                 <line 
                    key={i} 
                    x1={`${Math.random() * 100}%`} 
                    y1={`${Math.random() * 100}%`} 
                    x2={`${Math.random() * 100}%`} 
                    y2={`${Math.random() * 100}%`} 
                    stroke="url(#line-gradient)" 
                    strokeWidth="1" 
                 />
            ))}
        </svg>
    </div>
);


export default function MarketingSection() {
  return (
    <section id="marketing" className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center items-center h-full">
            <NetworkGraphIcon />
        </div>
        <div className="max-w-md">
          <AnimatedText
            el="h2"
            text="Strategic Marketing & Branding"
            className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl"
          />
          <AnimatedText
            text="We craft compelling brand narratives and execute data-driven marketing campaigns that resonate with your target audience and drive measurable results."
            className="mt-4 text-muted-foreground"
            stagger={0.01}
          />
          <div className="overflow-hidden mt-8">
            <Button size="lg" className="text-reveal">
              Elevate Your Brand
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
