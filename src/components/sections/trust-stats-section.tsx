"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { Users } from "lucide-react";

function StatItem({ end, label, Icon }: { end: number; label: string; Icon: React.ElementType }) {
  const { count, ref } = useCountUp(end);
  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      <Icon className="h-16 w-16 text-primary" />
      <p className="text-6xl font-bold font-headline tracking-tighter">{count}+</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export default function TrustStatsSection() {
  return (
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="container text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
            तज्ञांचे मार्गदर्शन, ५००+ उद्योजकांचा विश्वास.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Join a community of successful founders backed by technical and legal expertise.
        </p>
        <div className="mt-12 flex justify-center">
            <StatItem end={500} label="Successful Founders" Icon={Users} />
        </div>
      </div>
    </section>
  );
}
