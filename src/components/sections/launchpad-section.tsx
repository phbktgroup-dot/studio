import { Button } from "@/components/ui/button";

const BuildingBlocksIcon = () => (
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <filter id="blockShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
            <feOffset dx="3" dy="3" result="offsetBlur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform="rotate(-15 50 50) translate(0, 5)" filter="url(#blockShadow)">
          {/* Base block */}
          <path d="M 20 70 l 30 -15 l 30 15 l -30 15 z" fill="hsl(var(--primary), 0.6)" />
          <path d="M 20 70 v -20 l 30 -15 v 20 z" fill="hsl(var(--primary), 0.8)" />
          <path d="M 50 55 v 20 l 30 -15 v -20 z" fill="hsl(var(--primary), 1)" />

          {/* Top block */}
          <path d="M 35 48 l 20 -10 l 20 10 l -20 10 z" fill="hsl(var(--accent), 0.6)" />
          <path d="M 35 48 v -15 l 20 -10 v 15 z" fill="hsl(var(--accent), 0.8)" />
          <path d="M 55 33 v 15 l 20 -10 v -15 z" fill="hsl(var(--accent), 1)" />
        </g>
      </svg>
    </div>
  );


export default function LaunchpadSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center items-center">
            <BuildingBlocksIcon />
        </div>
        <div className="max-w-md">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Your Business Launchpad
          </h2>
          <p className="mt-4 text-muted-foreground">
            Starting a new venture? We provide end-to-end support for business registration, from name reservation to incorporation and initial compliance setup. Let us build your foundation for success.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg">Start Your Business</Button>
            <Button size="lg" variant="ghost">Consult an Expert</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
