
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-provider';
import Link from 'next/link';
import { projects } from '@/lib/projects-data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from 'react';

const sectionText = {
  en: {
    heading: "Our Recent Work",
    quote: "We build digital experiences that drive results.",
    viewDemo: "View Demo",
  },
  mr: {
    heading: "आमचे अलीकडील काम",
    quote: "आम्ही असे डिजिटल अनुभव तयार करतो जे प्रत्यक्ष व्यवसाय परिणाम देतात.",
    viewDemo: "डेमो पहा",
  },
  hi: {
    heading: "हमारे हाल के काम",
    quote: "हम ऐसे डिजिटल अनुभव बनाते हैं जो वास्तविक बिज़नेस परिणाम देते हैं।",
    viewDemo: "डेमो देखें",
  }
};

export default function OurWorkSection() {
  const { language } = useLanguage();
  const text = sectionText[language];
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const getTitle = (project: (typeof projects)[0]) => {
    if (language === 'hi') return project.titleHi;
    if (language === 'mr') return project.titleMr;
    return project.titleEn;
  }

  const getDescription = (project: (typeof projects)[0]) => {
    if (language === 'hi') return project.descriptionHi;
    if (language === 'mr') return project.descriptionMr;
    return project.descriptionEn;
  }

  return (
    <section id="work" className="py-6 md:py-8 bg-muted/30">
      <div className="container px-0">
        <div className="text-center mb-8 px-8 sm:px-0">
            <h3 className="text-base font-semibold uppercase tracking-wider text-black mb-2">
                {text.heading}
            </h3>
            <h2 className="font-headline text-lg md:text-xl font-bold tracking-tighter text-primary">
                {text.quote}
            </h2>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            {projects.map((project, index) => {
              const image = PlaceHolderImages.find(p => p.id === project.imageId);
              return (
                <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5 group aspect-[9/18] sm:aspect-[9/16] md:aspect-[4/5]">
                  <div className="p-px h-full">
                    <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full">
                      {image && (
                         <Link href={`/work/${project.slug}`}>
                          <div className="overflow-hidden">
                            <Image
                                src={image.imageUrl}
                                alt={getTitle(project)}
                                width={400}
                                height={225}
                                data-ai-hint={image.imageHint}
                                className="w-full object-cover aspect-[5/7] transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </Link>
                      )}
                      <CardContent className="p-2 pt-1 flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="font-bold font-headline text-base">{getTitle(project)}</h3>
                          <p className="mt-1 text-sm text-muted-foreground overflow-hidden">{getDescription(project)}</p>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 self-start text-sm">
                          <Link href={`/work/${project.slug}`}>{text.viewDemo}</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="flex left-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90" />
          <CarouselNext className="flex right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90" />
        </Carousel>
      </div>
    </section>
  );
}
