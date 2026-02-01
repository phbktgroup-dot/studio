'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useLanguage } from '@/context/language-provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const insights = [
  {
    enTitle: "The Future of FinTech",
    mrTitle: "फिनटेकचे भविष्य",
    imageId: "perspective_1",
  },
  {
    enTitle: "AI in Business Strategy",
    mrTitle: "व्यवसाय धोरणातील AI",
    imageId: "perspective_2",
  },
  {
    enTitle: "Global Market Trends",
    mrTitle: "जागतिक बाजारातील ट्रेंड",
    imageId: "perspective_3",
  },
  {
    enTitle: "The Startup Ecosystem",
    mrTitle: "स्टार्टअप इकोसिस्टम",
    imageId: "perspective_4",
  },
  {
    enTitle: "Sustainable Growth Models",
    mrTitle: "शाश्वत वाढीचे मॉडेल",
    imageId: "perspective_5",
  },
];

const sectionText = {
  en: {
    heading: "Perspectives & Insights",
  },
  mr: {
    heading: "दृष्टिकोन आणि अंतर्दृष्टी",
  },
};

export default function PerspectivesSection() {
  const { language } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on('select', handleSelect);
    handleSelect();

    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);

  return (
    <section className="py-6 md:py-8 bg-background">
      <div className="container">
        <h2 className="mb-8 font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
          {sectionText[language].heading}
        </h2>
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {insights.map((insight, index) => {
              const image = PlaceHolderImages.find(p => p.id === insight.imageId);
              const isActive = index === activeIndex;

              return (
                <CarouselItem key={index} className="pl-4 basis-[90%] md:basis-1/2 lg:basis-[calc(100%/3.5)] group">
                  <Card className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        data-ai-hint={image.imageHint}
                        className={cn(
                          'object-cover transition-transform duration-700 ease-in-out',
                          isActive ? 'scale-105' : 'scale-100 group-hover:scale-105'
                        )}
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-black/20 backdrop-blur-md" style={{
                      maskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)'
                    }} />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="overflow-hidden">
                          <h3
                            className={cn(
                              'font-headline text-2xl font-bold text-white transition-all duration-500 ease-out',
                              isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                            )}
                            style={{ transitionDelay: isActive ? '150ms' : '0ms' }}
                            >
                            {insight.enTitle}
                          </h3>
                        </div>
                        <div className="overflow-hidden">
                          <p
                            className={cn(
                              'font-body font-medium text-white/80 mt-1 transition-all duration-500 ease-out',
                              isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                            )}
                            style={{ transitionDelay: isActive ? '250ms' : '0ms' }}
                            >
                            {insight.mrTitle}
                          </p>
                        </div>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
