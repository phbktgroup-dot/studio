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
    enDescription: "Exploring the technologies and trends shaping the future of finance.",
    mrDescription: "आर्थिक सेवांच्या भविष्याला आकार देणारे तंत्रज्ञान आणि ट्रेंड्सचे अन्वेषण.",
    hiDescription: "वित्त के भविष्य को आकार देने वाली प्रौद्योगिकियों और प्रवृत्तियों की खोज।",
  },
  {
    enTitle: "AI in Business Strategy",
    mrTitle: "व्यवसाय धोरणातील AI",
    hiTitle: "व्यापार रणनीति में एआई",
    imageId: "perspective_2",
    enDescription: "How artificial intelligence is revolutionizing decision-making and operations.",
    mrDescription: "कृत्रिम बुद्धिमत्ता निर्णयक्षमता आणि कार्यप्रणालीमध्ये कशी क्रांती घडवत आहे.",
    hiDescription: "कैसे कृत्रिम बुद्धिमत्ता निर्णय लेने और संचालन में क्रांति ला रही है।",
  },
  {
    enTitle: "Global Market Trends",
    mrTitle: "जागतिक बाजारातील ट्रेंड",
    hiTitle: "वैश्विक बाजार के रुझान",
    imageId: "perspective_3",
    enDescription: "Navigating the complexities of the global market for business growth.",
    mrDescription: "व्यवसाय वाढीसाठी जागतिक बाजारातील गुंतागुंत समजून घेणे.",
    hiDescription: "व्यापार वृद्धि के लिए वैश्विक बाजार की जटिलताओं को नेविगेट करना।",
  },
  {
    enTitle: "The Startup Ecosystem",
    mrTitle: "स्टार्टअप इकोसिस्टम",
    hiTitle: "स्टार्टअप पारिस्थितिकी तंत्र",
    imageId: "perspective_4",
    enDescription: "Insights into building and scaling a successful startup in today's landscape.",
    mrDescription: "आजच्या काळात यशस्वी स्टार्टअप तयार करण्यासाठी आणि वाढवण्यासाठी उपयुक्त माहिती.",
    hiDescription: "आज के परिदृश्य में एक सफल स्टार्टअप बनाने और उसे बढ़ाने की अंतर्दृष्टि।",
  },
  {
    enTitle: "Sustainable Growth Models",
    mrTitle: "शाश्वत वाढीचे मॉडेल",
    hiTitle: "सतत विकास मॉडल",
    imageId: "perspective_5",
    enDescription: "Strategies for building businesses that are both profitable and responsible.",
    mrDescription: "नफा आणि जबाबदारी यांचा समतोल साधणाऱ्या व्यवसायांसाठीच्या यशस्वी रणनीती.",
    hiDescription: "लाभदायक और जिम्मेदार दोनों तरह के व्यवसायों के निर्माण के लिए रणनीतियाँ।",
  },
  {
    enTitle: "Digital Transformation",
    mrTitle: "डिजिटल परिवर्तन",
    hiTitle: "डिजिटल परिवर्तन",
    imageId: "service_web_dev",
    enDescription: "The roadmap for integrating digital technology into all areas of a business.",
    mrDescription: "व्यवसायाच्या सर्व क्षेत्रांमध्ये डिजिटल तंत्रज्ञानाचे एकत्रीकरण करण्यासाठीचा रोडमॅप.",
    hiDescription: "व्यवसाय के सभी क्षेत्रों में डिजिटल प्रौद्योगिकी को एकीकृत करने का रोडमैप।",
  },
  {
    enTitle: "Cybersecurity in 2024",
    mrTitle: "२०२४ मध्ये सायबर सुरक्षा",
    hiTitle: "2024 में साइबर सुरक्षा",
    imageId: "service_cloud",
    enDescription: "Understanding and mitigating the latest threats in the digital world.",
    mrDescription: "डिजिटल जगातील नवीनतम धोके समजून घेणे आणि ते कमी करणे.",
    hiDescription: "डिजिटल दुनिया में नवीनतम खतरों को समझना और उन्हें कम करना।",
  },
];

const sectionText = {
  en: {
    heading: "Perspectives & Insights",
    subheading: "Understanding today’s ideas, trends, and signals to thoughtfully shape the future we build tomorrow."
  },
  mr: {
    heading: "विचार आणि विश्लेषण",
    subheading: "आजच्या कल्पना, प्रवाह आणि संकेत समजून घेऊन, आपण उद्याचे भविष्य जाणीवपूर्वक घडवतो."
  },
  hi: {
    heading: "विचार और विश्लेषण",
    subheading: "आज के विचारों, रुझानों और संकेतों को समझकर, हम कल के भविष्य को सोच-समझकर गढ़ते हैं।"
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
  
  const getDescription = (insight: (typeof insights)[0]) => {
    if (language === 'hi') return insight.hiDescription;
    if (language === 'mr') return insight.mrDescription;
    return insight.enDescription;
  }


  return (
    <section id="insights" className="py-6 md:py-8 bg-background">
      <div className="container">
        <div className="text-center mb-8">
            <h3 className="text-base font-semibold uppercase tracking-wider text-black mb-2">
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
                            {getDescription(insight)}
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
