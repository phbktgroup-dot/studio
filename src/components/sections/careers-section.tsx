'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-provider';
import { Magnetic } from '@/components/shared/magnetic';

const sectionText = {
  en: {
    heading: "Join the PHBKT Force",
    button: "Apply Now"
  },
  mr: {
    heading: "PHBKT फोर्समध्ये सामील व्हा",
    button: "आत्ताच अर्ज करा"
  }
};

const teamImageIds = [
  "team_1", "team_2", "team_3", "team_4", "team_5", "team_6"
];

const teamImages = PlaceHolderImages.filter(img => teamImageIds.includes(img.id));
const marquee1 = [...teamImages, ...teamImages.slice(0, 2)];
const marquee2 = [...teamImages.slice(3), ...teamImages.slice(0, 3), ...teamImages.slice(3, 5)];


export default function CareersSection() {
  const { language } = useLanguage();
  const text = sectionText[language];

  const ImageMarquee = ({ images, reverse = false }: { images: typeof teamImages; reverse?: boolean }) => (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className={`flex items-center justify-center md:justify-start [&_li]:mx-4 ${reverse ? 'animate-scroll-reverse' : 'animate-scroll'}`}>
        {images.map((image, index) => (
          <li key={`marquee-${index}-${image.id}`}>
            <div className="relative h-24 w-24 rounded-full overflow-hidden shadow-lg">
                <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    data-ai-hint={image.imageHint}
                    className="object-cover"
                />
            </div>
          </li>
        ))}
      </ul>
       <ul className={`flex items-center justify-center md:justify-start [&_li]:mx-4 ${reverse ? 'animate-scroll-reverse' : 'animate-scroll'}`} aria-hidden="true">
        {images.map((image, index) => (
          <li key={`marquee-clone-${index}-${image.id}`}>
             <div className="relative h-24 w-24 rounded-full overflow-hidden shadow-lg">
                <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    data-ai-hint={image.imageHint}
                    className="object-cover"
                />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="relative py-12 md:py-16 bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center gap-8 opacity-10 dark:opacity-[0.07]">
            <ImageMarquee images={marquee1} />
            <ImageMarquee images={marquee2} reverse />
        </div>
        <div className="container relative z-10 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                {text.heading}
            </h2>
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
