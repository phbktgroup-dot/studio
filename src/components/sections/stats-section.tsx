"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { Briefcase, Smile, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "@/context/language-provider";

const text = {
  mr: {
    happyClients: "आनंदी ग्राहक",
    projectsCompleted: "पूर्ण झालेले प्रकल्प",
    successRate: "यशाचा दर (%)",
    yearsOfExperience: "वर्षांचा अनुभव",
  },
  en: {
    happyClients: "Happy Clients",
    projectsCompleted: "Projects Completed",
    successRate: "Success Rate (%)",
    yearsOfExperience: "Years of Experience",
  },
};

type Stat = {
  value: number;
  labelKey: keyof typeof text["en"];
  icon: React.ElementType;
};

const stats: Stat[] = [
  { value: 500, labelKey: "happyClients", icon: Smile },
  { value: 1200, labelKey: "projectsCompleted", icon: Briefcase },
  { value: 99, labelKey: "successRate", icon: TrendingUp },
  { value: 15, labelKey: "yearsOfExperience", icon: Users },
];

function StatItem({ end, label, Icon }: { end: number; label: string; Icon: React.ElementType }) {
  const { count, ref } = useCountUp(end);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center">
      <Icon className="h-6 w-6 text-primary" />
      <p className="text-2xl font-bold font-headline tracking-tighter">{count}{label.includes('%') ? '%' : '+'}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const { language } = useLanguage();
  return (
    <section id="stats" className="py-20 md:py-24 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <StatItem 
              key={stat.labelKey} 
              end={stat.value} 
              label={text[language][stat.labelKey]} 
              Icon={stat.icon} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
