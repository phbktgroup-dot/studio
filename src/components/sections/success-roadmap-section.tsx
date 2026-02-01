'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Milestone as MilestoneIcon, Rocket, Flag, Award, ClipboardCheck } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';

const text = {
  mr: {
    subheading: "यशाचा मार्ग",
    h2: "तुमच्या यशाची प्रत्येक पायरी, आमची साथ.",
    milestones: [
      { title: "कल्पना आणि नोंदणी", icon: MilestoneIcon, description: "एक मजबूत पाया तयार करण्यासाठी तुमची संकल्पना मजबूत करा आणि सर्व कायदेशीर नोंदणी हाताळा." },
      { title: "प्रमाणीकरण आणि धोरण", icon: ClipboardCheck, description: "कोडची एक ओळ लिहिण्यापूर्वी उत्पादन-बाजार योग्यतेची खात्री करण्यासाठी बाजार संशोधन, वापरकर्ता मुलाखती आणि प्रोटोटाइपिंग करा." },
      { title: "निर्मिती आणि विकास", icon: Rocket, description: "जास्तीत जास्त कार्यक्षमतेसाठी चपळ कार्यपद्धती वापरून, आमच्या तज्ञ विकास टीमसोबत तुमच्या दूरदृष्टीला जीवंत करा." },
      { title: "प्रक्षेपण आणि विपणन", icon: Flag, description: "तुमचे उत्पादन एका धोरणात्मक प्रक्षेपणासह आणि लक्ष्यित संपादन मोहिमांसह जगासमोर सादर करा." },
      { title: "विस्तार आणि वाढ", icon: Award, description: "तुमची पोहोच वाढवा, तुमच्या रूपांतरण फनेलला ऑप्टिमाइझ करा आणि तुमचे कार्य जागतिक स्तरावर मोजा." },
    ]
  },
  en: {
    subheading: "The Success Roadmap",
    h2: "We are with you at every step of your success.",
    milestones: [
      { title: "Idea & Registration", icon: MilestoneIcon, description: "Solidify your concept and handle all legal registration to create a firm foundation." },
      { title: "Validate & Strategize", icon: ClipboardCheck, description: "Conduct market research, user interviews, and prototyping to ensure product-market fit before writing a single line of code." },
      { title: "Build & Develop", icon: Rocket, description: "Bring your vision to life with our expert development team, using agile methodology for maximum efficiency." },
      { title: "Launch & Market", icon: Flag, description: "Introduce your product to the world with a strategic launch and targeted acquisition campaigns." },
      { title: "Scale & Grow", icon: Award, description: "Expand your reach, optimize your conversion funnels, and scale your operations globally." },
    ]
  },
};


function Milestone({ title, description, icon: Icon, isActive }: {title: string, description: string, icon: React.ElementType, isActive: boolean}) {
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
                    "font-semibold font-headline text-base transition-colors",
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
    const { language } = useLanguage();
    const [activeMilestone, setActiveMilestone] = useState(-1);
    const roadmapRef = useRef<HTMLDivElement>(null);
    const milestones = text[language].milestones;

    useEffect(() => {
        setActiveMilestone(-1); // Reset animation on change

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
    }, [milestones]);

  return (
    <section className="py-6 md:py-8 bg-background overflow-x-hidden">
      <div className="container text-center">
        <h3 className="text-xl font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            {text[language].subheading}
        </h3>
        <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl text-primary">
            {text[language].h2}
        </h2>
        <div ref={roadmapRef} className="mt-12 relative">
            <div className="absolute top-6 left-0 w-full h-0.5 bg-border"></div>
            <div className="absolute top-6 left-0 h-0.5 bg-primary transition-all duration-1000 ease-out" style={{ width: `${(Math.max(0, activeMilestone) / (milestones.length - 1)) * 100}%` }}></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
                {milestones.map((item, index) => (
                    <Milestone key={index} {...item} isActive={index <= activeMilestone} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
