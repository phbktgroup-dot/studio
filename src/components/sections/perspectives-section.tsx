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
    imageId: "work_analytics_dashboard",
    enDescription: "From AI-driven lending to blockchain and decentralized finance, we explore the technologies and trends shaping a more inclusive and efficient financial future.",
    mrDescription: "AI-आधारित कर्जप्रणालीपासून ते ब्लॉकचेन आणि विकेंद्रित वित्तपुरवठ्यापर्यंत, आम्ही अधिक समावेशक आणि कार्यक्षम आर्थिक भविष्याला आकार देणाऱ्या तंत्रज्ञान आणि ट्रेंड्सचे विश्लेषण करतो.",
    hiDescription: "एआई-संचालित ऋण से लेकर ब्लॉकचेन और विकेन्द्रीकृत वित्त तक, हम एक अधिक समावेशी और कुशल वित्तीय भविष्य को आकार देने वाली प्रौद्योगिकियों और प्रवृत्तियों का अन्वेषण करते हैं।",
  },
  {
    enTitle: "AI in Business Strategy",
    mrTitle: "व्यवसाय धोरणातील AI",
    hiTitle: "व्यापार रणनीति में एआई",
    imageId: "service_ai",
    enDescription: "Discover how artificial intelligence is moving beyond automation to become a core driver of strategic decision-making, operational efficiency, and competitive advantage.",
    mrDescription: "कृत्रिम बुद्धिमत्ता केवळ ऑटोमेशनच्या पलीकडे जाऊन, धोरणात्मक निर्णय, कार्यान्वयन क्षमता आणि स्पर्धात्मक फायद्यासाठी कशी एक मुख्य शक्ती बनत आहे ते जाणून घ्या.",
    hiDescription: "जानें कि कैसे कृत्रिम बुद्धिमत्ता स्वचालन से आगे बढ़कर रणनीतिक निर्णय लेने, परिचालन दक्षता और प्रतिस्पर्धात्मक लाभ का एक मुख्य चालक बन रही है।",
  },
  {
    enTitle: "Global Market Trends",
    mrTitle: "जागतिक बाजारातील ट्रेंड",
    hiTitle: "वैश्विक बाजार के रुझान",
    imageId: "network_graph",
    enDescription: "A deep dive into navigating the complexities of the global market, identifying emerging opportunities, and building resilient strategies for international business growth.",
    mrDescription: "जागतिक बाजाराची गुंतागुंत समजून घेणे, नवीन संधी ओळखणे आणि आंतरराष्ट्रीय व्यवसाय वाढीसाठी लवचिक धोरणे तयार करणे यावर सखोल माहिती.",
    hiDescription: "वैश्विक बाजार की जटिलताओं को समझने, उभरते अवसरों की पहचान करने और अंतरराष्ट्रीय व्यापार वृद्धि के लिए लचीली रणनीतियों का निर्माण करने पर एक गहरी नज़र।",
  },
  {
    enTitle: "The Startup Ecosystem",
    mrTitle: "स्टार्टअप इकोसिस्टम",
    hiTitle: "स्टार्टअप पारिस्थितिकी तंत्र",
    imageId: "startup_build_product",
    enDescription: "Key insights into what it takes to build and scale a successful startup today, from securing funding to fostering a culture of innovation and rapid execution.",
    mrDescription: "आजच्या काळात यशस्वी स्टार्टअप तयार करण्यासाठी आणि वाढवण्यासाठी काय आवश्यक आहे, निधी सुरक्षित करण्यापासून ते नवनिर्मिती आणि जलद अंमलबजावणीची संस्कृती जोपासण्यापर्यंतची माहिती.",
    hiDescription: "आज एक सफल स्टार्टअप बनाने और उसे बढ़ाने के लिए क्या आवश्यक है, इस पर महत्वपूर्ण अंतर्दृष्टि, जिसमें धन सुरक्षित करने से लेकर नवाचार और तेजी से निष्पादन की संस्कृति को बढ़ावा देना शामिल है।",
  },
  {
    enTitle: "Sustainable Growth Models",
    mrTitle: "शाश्वत वाढीचे मॉडेल",
    hiTitle: "सतत विकास मॉडल",
    imageId: "building_blocks",
    enDescription: "Explore modern strategies for building businesses that are not only profitable and scalable but also environmentally and socially responsible for long-term impact.",
    mrDescription: "केवळ फायदेशीर आणि वाढीसाठी सक्षमच नव्हे, तर दीर्घकालीन परिणामासाठी पर्यावरण आणि सामाजिकदृष्ट्या जबाबदार असणारे व्यवसाय तयार करण्यासाठीच्या आधुनिक धोरणांचे अन्वेषण.",
    hiDescription: "ऐसे व्यवसायों के निर्माण के लिए आधुनिक रणनीतियों का अन्वेषण करें जो न केवल लाभदायक और स्केलेबल हों, बल्कि दीर्घकालिक प्रभाव के लिए पर्यावरणीय और सामाजिक रूप से भी जिम्मेदार हों।",
  },
  {
    enTitle: "Digital Transformation",
    mrTitle: "डिजिटल परिवर्तन",
    hiTitle: "डिजिटल परिवर्तन",
    imageId: "service_web_dev",
    enDescription: "A practical roadmap for integrating digital technology into every area of a business, fundamentally changing how you operate and deliver value to customers.",
    mrDescription: "व्यवसायाच्या प्रत्येक क्षेत्रात डिजिटल तंत्रज्ञान समाविष्ट करण्यासाठी एक व्यावहारिक रोडमॅप, ज्यामुळे तुमची कार्यपद्धती आणि ग्राहकांना मिळणारे मूल्य यामध्ये मोठे बदल घडतात.",
    hiDescription: "किसी व्यवसाय के हर क्षेत्र में डिजिटल प्रौद्योगिकी को एकीकृत करने के लिए एक व्यावहारिक रोडमैप, जो आपके संचालन और ग्राहकों को मूल्य प्रदान करने के तरीके को मौलिक रूप से बदल देता है।",
  },
  {
    enTitle: "Cybersecurity in 2024",
    mrTitle: "२०२४ मध्ये सायबर सुरक्षा",
    hiTitle: "2024 में साइबर सुरक्षा",
    imageId: "service_cloud",
    enDescription: "An overview of the latest cybersecurity threats facing businesses and the essential strategies for mitigating risks and protecting your digital assets effectively.",
    mrDescription: "व्यवसायांना सामोरे जावे लागणाऱ्या नवीनतम सायबरसुरक्षा धोक्यांचे अवलोकन आणि जोखीम कमी करून आपल्या डिजिटल मालमत्तेचे प्रभावीपणे संरक्षण करण्यासाठीच्या आवश्यक रणनीती.",
    hiDescription: "व्यवसायों के सामने नवीनतम साइबर सुरक्षा खतरों का एक सिंहावलोकन और जोखिमों को कम करने और आपकी डिजिटल संपत्ति की प्रभावी ढंग से सुरक्षा के लिए आवश्यक रणनीतियाँ।",
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

  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }
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

              return (
                <CarouselItem key={index} className="pl-4 basis-1/2 lg:basis-1/5 group">
                  <Card className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        data-ai-hint={image.imageHint}
                        className='object-cover transition-transform duration-700 ease-in-out group-hover:scale-105'
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className='font-headline text-lg font-bold text-white'>
                          {getTitle(insight)}
                        </h3>
                        <p className='font-body text-xs font-medium text-white/80 mt-1'>
                          {getDescription(insight)}
                        </p>
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
