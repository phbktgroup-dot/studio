'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Milestone as MilestoneIcon, Rocket, Flag, ClipboardCheck, Award } from 'lucide-react';

const milestones = [
  { title: "Idea & Registration", icon: MilestoneIcon, description: "Solidify your concept and handle all legal registration." },
  { title: "Build & Develop", icon: Rocket, description: "Bring your vision to life with our expert development team." },
  { title: "Launch & Market", icon: Flag, description: "Introduce your product to the world with a strategic launch." },
  { title: "Scale & Grow", icon: Award, description: "Expand your reach and scale your operations globally." },
];

function Milestone({ title, description, icon: Icon, isActive }) {
    return (
        <div className="flex items-start gap-6 relative pl-12">
            <div className={cn(
                "absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500",
                isActive ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted text-muted-foreground"
            )}>
                <Icon className="w-5 h-5" />
            </div>
             <div className={cn("absolute left-[19px] top-10 h-full w-0.5 transition-colors", isActive ? 'bg-primary' : 'bg-border')}></div>
            <div className="flex-1 pb-16">
                <h4 className={cn(
                    "font-semibold font-headline text-lg transition-colors",
                    isActive ? "text-primary" : "text-foreground"
                )}>
                    {title}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}


export default function SuccessRoadmapSection() {
    const [activeMilestone, setActiveMilestone] = useState(-1);
    const roadmapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!roadmapRef.current) return;
            const milestonesElements = Array.from(roadmapRef.current.children);
            const scrollPosition = window.innerHeight * 0.5; // 50% from top

            let newActiveIndex = -1;
            for (let i = 0; i < milestonesElements.length; i++) {
                const milestoneTop = milestonesElements[i].getBoundingClientRect().top;
                if (milestoneTop < scrollPosition) {
                    newActiveIndex = i;
                }
            }
            setActiveMilestone(newActiveIndex);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container max-w-3xl text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
            तुमच्या यशाची प्रत्येक पायरी, आमची साथ.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Guided growth from day one to the global stage.
        </p>
        <div ref={roadmapRef} className="mt-16 text-left relative">
            {milestones.map((item, index) => (
                <Milestone key={index} {...item} isActive={index <= activeMilestone} />
            ))}
        </div>
      </div>
    </section>
  );
}
