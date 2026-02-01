'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-provider';
import { Magnetic } from '@/components/shared/magnetic';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const sectionText = {
  en: {
    heading: "Join the PHBKT Force",
    subheading: "We're building the future of business, and we need your talent. Explore our open roles and find your purpose with us.",
    button: "Explore Careers"
  },
  mr: {
    heading: "PHBKT फोर्समध्ये सामील व्हा",
    subheading: "आम्ही व्यवसायाचे भविष्य घडवत आहोत आणि आम्हाला तुमच्या प्रतिभेची गरज आहे. आमच्या संधी शोधा आणि तुमचा उद्देश आमच्यासोबत मिळवा.",
    button: "करिअर एक्सप्लोर करा"
  }
};

const teamImageIds = ["team_1", "team_2", "team_3", "team_4", "team_5", "team_6"];
const teamImages = PlaceHolderImages.filter(img => teamImageIds.includes(img.id));

const FloatingImage = ({ image, index }: { image: typeof teamImages[0], index: number }) => {
    const [duration, setDuration] = useState('5s');

    useEffect(() => {
        setDuration(`${Math.random() * 3 + 4}s`);
    }, []);

    const positions = [
        { top: '10%', left: '15%', size: 'w-20 h-20 md:w-24 md:h-24', delay: '0s' },
        { top: '20%', left: '80%', size: 'w-16 h-16 md:w-20 md:h-20', delay: '1s' },
        { top: '70%', left: '10%', size: 'w-24 h-24 md:w-32 md:h-32', delay: '2s' },
        { top: '80%', left: '85%', size: 'w-20 h-20 md:w-28 md:h-28', delay: '0.5s' },
        { top: '40%', left: '45%', size: 'w-12 h-12 md:w-16 md:h-16', delay: '1.5s' },
        { top: '5%', left: '50%', size: 'w-16 h-16 md:w-20 md:h-20', delay: '2.5s' },
    ];
    const pos = positions[index % positions.length];

    return (
        <div 
            className={cn("absolute rounded-2xl overflow-hidden shadow-lg animate-bob", pos.size)}
            style={{ 
                top: pos.top, 
                left: pos.left, 
                animationDelay: pos.delay, 
                animationDuration: duration 
            }}
        >
             <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                data-ai-hint={image.imageHint}
                className="object-cover"
            />
        </div>
    );
};


export default function CareersSection() {
  const { language } = useLanguage();
  const text = sectionText[language];

  return (
    <section className="relative py-20 md:py-32 bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 opacity-10 dark:opacity-[0.07] pointer-events-none">
            {teamImages.map((image, index) => (
                <FloatingImage key={image.id} image={image} index={index} />
            ))}
        </div>
        <div className="container relative z-10 text-center max-w-3xl">
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-primary">
                {text.heading}
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
                {text.subheading}
            </p>
            <div className="mt-8 flex justify-center">
                <Magnetic strength={20}>
                    <Button size="lg" className="group relative overflow-hidden text-base">
                        <span className="absolute inset-0 bg-primary/80 w-0 transition-all duration-300 ease-out group-hover:w-full"></span>
                        <span className="relative">{text.button}</span>
                    </Button>
                </Magnetic>
            </div>
        </div>
    </section>
  );
}
