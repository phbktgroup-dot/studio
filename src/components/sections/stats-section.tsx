"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { Briefcase, Smile, TrendingUp, Users } from "lucide-react";

const stats = [
  { value: 500, label: "Happy Clients", icon: Smile },
  { value: 1200, label: "Projects Completed", icon: Briefcase },
  { value: 99, label: "Success Rate (%)", icon: TrendingUp },
  { value: 15, label: "Years of Experience", icon: Users },
];

function StatItem({ end, label, Icon }: { end: number; label: string; Icon: React.ElementType }) {
  const { count, ref } = useCountUp(end);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center">
      <Icon className="h-8 w-8 text-primary" />
      <p className="text-3xl font-bold font-headline tracking-tighter">{count}{label.includes('%') ? '%' : '+'}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section id="stats" className="py-8 md:py-12 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.label} end={stat.value} label={stat.label} Icon={stat.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
