'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-provider';
import { Magnetic } from '@/components/shared/magnetic';

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

// To create a seamless loop for marquee
const marqueeImages1 = [...teamImages, ...teamImages];
const marqueeImages2 = [...[...teamImages].reverse(), ...[...teamImages].reverse()];

const MarqueeImage = ({ image }: { image: typeof teamImages[0] }) => (
    <div className="relative aspect-square w-24 md:w-32 rounded-2xl overflow-hidden shadow-lg">
        <Image
            src={image.imageUrl}
            alt={image.description}
            fill
            data-ai-hint={image.imageHint}
            className="object-cover"
        />
    </div>
);

const ImageMarquee = ({ images, reverse = false }: { images: (typeof teamImages); reverse?: boolean }) => (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
      <ul className={`flex items-center justify-center md:justify-start [&_li]:mx-4 ${reverse ? 'animate-scroll-reverse' : 'animate-scroll'}`}>
        {images.map((image, index) => (
          <li key={`marquee-${index}-${image.id}`}>
            <MarqueeImage image={image} />
          </li>
        ))}
      </ul>
      <ul className={`flex items-center justify-center md:justify-start [&_li]:mx-4 ${reverse ? 'animate-scroll-reverse' : 'animate-scroll'}`} aria-hidden="true">
        {images.map((image, index) => (
          <li key={`marquee-clone-${index}-${image.id}`}>
            <MarqueeImage image={image} />
          </li>
        ))}
      </ul>
    </div>
  );

export default function CareersSection() {
  const { language } = useLanguage();
  const text = sectionText[language];

  return (
    <section className="relative py-20 md:py-32 bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between py-8 opacity-10 dark:opacity-[0.07] pointer-events-none">
            <ImageMarquee images={marqueeImages1} />
            <ImageMarquee images={marqueeImages2} reverse />
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
