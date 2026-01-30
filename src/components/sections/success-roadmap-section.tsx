'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Milestone as MilestoneIcon, Rocket, Flag, Award } from 'lucide-react';

const milestones = [
  { title: "Idea & Registration", icon: MilestoneIcon, description: "Solidify your concept and handle all legal registration." },
  { title: "Build & Develop", icon: Rocket, description: "Bring your vision to life with our expert development team." },
  { title: "Launch & Market", icon: Flag, description: "Introduce your product to the world with a strategic launch." },
  { title: "Scale & Grow", icon: Award, description: "Expand your reach and scale your operations globally." },
];

function Milestone({ title, description, icon: Icon, isActive }) {
    return (
        <div className="flex flex-col items-center text-center relative z-10">
             <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 bg-background",
                isActive ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted text-muted-foreground"
            )}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="mt-4">
                <h4 className={cn(
                    "font-semibold font-headline text-md transition-colors",
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
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    milestones.forEach((_, index) => {
                        setTimeout(() => {
                            setActiveMilestone(index);
                        }, index * 400); // Stagger the animation
                    });
                    if (roadmapRef.current) {
                        observer.unobserve(roadmapRef.current);
                    }
                }
            },
            {
                threshold: 0.2,
            }
        );

        if (roadmapRef.current) {
            observer.observe(roadmapRef.current);
        }

        return () => {
            if (roadmapRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(roadmapRef.current);
            }
        };
    }, []);

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container max-w-6xl text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
            तुमच्या यशाची प्रत्येक पायरी, आमची साथ.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Guided growth from day one to the global stage.
        </p>
        <div ref={roadmapRef} className="mt-20 relative">
            <div className="absolute top-6 left-0 w-full h-0.5 bg-border"></div>
            <div className="absolute top-6 left-0 h-0.5 bg-primary transition-all duration-1000 ease-out" style={{ width: `${(Math.max(0, activeMilestone) / (milestones.length - 1)) * 100}%` }}></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                {milestones.map((item, index) => (
                    <Milestone key={index} {...item} isActive={index <= activeMilestone} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
