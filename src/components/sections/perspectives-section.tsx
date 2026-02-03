'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useLanguage } from '@/context/language-provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const insights = [
  {
    enTitle: "The Future of FinTech",
    mrTitle: "फिनटेकचे भविष्य",
    hiTitle: "फिनटेक का भविष्य",
    imageId: "perspective_1",
  },
  {
    enTitle: "AI in Business Strategy",
    mrTitle: "व्यवसाय धोरणातील AI",
    hiTitle: "व्यापार रणनीति में एआई",
    imageId: "perspective_2",
  },
  {
    enTitle: "Global Market Trends",
    mrTitle: "जागतिक बाजारातील ट्रेंड",
    hiTitle: "वैश्विक बाजार के रुझान",
    imageId: "perspective_3",
  },
  {
    enTitle: "The Startup Ecosystem",
    mrTitle: "स्टार्टअप इकोसिस्टम",
    hiTitle: "स्टार्टअप पारिस्थितिकी तंत्र",
    imageId: "perspective_4",
  },
  {
    enTitle: "Sustainable Growth Models",
    mrTitle: "शाश्वत वाढीचे मॉडेल",
    hiTitle: "सतत विकास मॉडल",
    imageId: "perspective_5",
  },
  {
    enTitle: "Digital Transformation",
    mrTitle: "डिजिटल परिवर्तन",
    hiTitle: "डिजिटल परिवर्तन",
    imageId: "service_web_dev",
  },
  {
    enTitle: "Cybersecurity in 2024",
    mrTitle: "२०२४ मध्ये सायबर सुरक्षा",
    hiTitle: "2024 में साइबर सुरक्षा",
    imageId: "service_cloud",
  },
];

const sectionText = {
  en: {
    heading: "Perspectives & Insights",
    subheading: "Exploring tomorrow's trends, today."
  },
  mr: {
    heading: "दृष्टिकोन आणि अंतर्दृष्टी",
    subheading: "भविष्यातील झलक"
  },
  hi: {
    heading: "भविष्य की सोच",
    subheading: "कल के रुझानों की खोज, आज।"
  },
};

export default function PerspectivesSection() {
  const { language } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

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

  const getTitle = (insight: (typeof insights)[0]) => {
    if (language === 'hi') return insight.hiTitle;
    if (language === 'mr') return insight.mrTitle;
    return insight.enTitle;
  }
  
  const getSubtitle = (insight: (typeof insights)[0]) => {
    if (language === 'hi') return insight.enTitle;
    if (language === 'mr') return insight.enTitle;
    return insight.mrTitle;
  }


  return (
    <section id="insights" className="py-6 md:py-8 bg-background">
      <div className="container">
        <div className="text-center mb-8">
            <h3 className="text-xl font-semibold uppercase tracking-wider text-black mb-2">
              {sectionText[language].heading}
            </h3>
            <h2 className="font-headline text-xl md:text-2xl font-bold tracking-tighter text-primary">
              {sectionText[language].subheading}
            </h2>
        </div>
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{
            align: 'start',
            loop: true,
          }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-4">
            {insights.map((insight, index) => {
              const image = PlaceHolderImages.find(p => p.id === insight.imageId);
              const isActive = index === activeIndex;

              return (
                <CarouselItem key={index} className="pl-4 basis-[90%] md:basis-1/2 lg:basis-1/5 group">
                  <Card className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
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
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="overflow-hidden">
                          <h3
                            className={cn(
                              'font-headline text-lg font-bold text-white transition-all duration-500 ease-out',
                              isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                            )}
                            style={{ transitionDelay: isActive ? '150ms' : '0ms' }}
                            >
                            {getTitle(insight)}
                          </h3>
                        </div>
                        <div className="overflow-hidden">
                          <p
                            className={cn(
                              'font-body text-xs font-medium text-white/80 mt-1 transition-all duration-500 ease-out',
                              isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                            )}
                            style={{ transitionDelay: isActive ? '250ms' : '0ms' }}
                            >
                            {getSubtitle(insight)}
                          </p>
                        </div>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex left-[-20px] bg-primary text-primary-foreground hover:bg-primary/90" />
          <CarouselNext className="hidden md:flex right-[-20px] bg-primary text-primary-foreground hover:bg-primary/90" />
        </Carousel>
      </div>
    </section>
  );
}
