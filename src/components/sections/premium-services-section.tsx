'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-provider';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Service {
  title: string;
  description: string;
  imageId: string;
}

const servicesData = {
  en: [
    { title: "Website and App Development", description: "High-performance digital products tailored to your goals.", imageId: "service_web_dev" },
    { title: "Marketing & Branding", description: "Data-driven strategies to elevate your brand presence.", imageId: "service_marketing" },
    { title: "Tax & Compliance", description: "Navigate complex regulations with expert guidance.", imageId: "service_tax" },
    { title: "Business Setup", description: "End-to-end support for a seamless business launch.", imageId: "service_biz_setup" },
    { title: "UI/UX Design", description: "Human-centric interfaces that turn visitors into loyal customers.", imageId: "service_ui_ux" },
    { title: "AI & Automation", description: "Streamlining operations with smart, automated workflows.", imageId: "service_ai" },
    { title: "Cloud & Security", description: "Robust infrastructure to keep your data safe and always online.", imageId: "service_cloud" },
    { title: "Startup Advisory", description: "Strategic consulting for business scaling and investment.", imageId: "service_advisory" },
    { title: "Content & Social", description: "Narrative-driven content that builds authority and engagement.", imageId: "service_social" },
    { title: "24/7 IT Support", description: "Dedicated technical assistance to ensure zero downtime.", imageId: "service_support" },
  ],
  mr: [
    { title: "Website आणि App Development", description: "तुमच्या व्यवसायाच्या गरजेनुसार तयार केलेले वेगवान, सुरक्षित आणि स्केलेबल डिजिटल प्लॅटफॉर्म — जे ग्राहक आकर्षित करतात आणि विक्री वाढवतात.", imageId: "service_web_dev" },
    { title: "Marketing आणि Branding", description: "डेटा-आधारित मार्केटिंग रणनीती ज्यामुळे तुमच्या ब्रँडची ओळख, विश्वास आणि सातत्यपूर्ण वाढ होते.", imageId: "service_marketing" },
    { title: "Tax आणि Compliance", description: "GST, नोंदणी आणि सर्व कायदेशीर प्रक्रिया — तज्ञांच्या मार्गदर्शनाखाली, ताणतणावाशिवाय.", imageId: "service_tax" },
    { title: "Business Setup", description: "कल्पनेपासून व्यवसाय सुरू होईपर्यंत — एक मजबूत सुरुवात करण्यासाठी संपूर्ण एंड-टू-एंड सहकार्य.", imageId: "service_biz_setup" },
    { title: "UI / UX Design", description: "ग्राहकांना गुंतवून ठेवणारे, विश्वास निर्माण करणारे आणि रूपांतरण वाढवणारे डिझाइन.", imageId: "service_ui_ux" },
    { title: "AI आणि Automation", description: "स्मार्ट ऑटोमेशनद्वारे वेळ व खर्च वाचवा आणि व्यवसाय अधिक कार्यक्षम बनवा.", imageId: "service_ai" },
    { title: "Cloud आणि Security", description: "तुमचा डेटा सुरक्षित ठेवणारे आणि सिस्टम कायम ऑनलाइन ठेवणारे मजबूत इन्फ्रास्ट्रक्चर.", imageId: "service_cloud" },
    { title: "Startup Advisory", description: "व्यवसाय वाढ, गुंतवणूक आणि स्केलिंगसाठी धोरणात्मक आणि अनुभवी मार्गदर्शन.", imageId: "service_advisory" },
    { title: "Content आणि Social Media", description: "ब्रँडची विश्वासार्हता निर्माण करणारा आणि लोकांशी नातं जोडणारा प्रभावी कंटेंट.", imageId: "service_social" },
    { title: "24/7 IT Support", description: "कोणतीही तांत्रिक अडचण असो — आमची सपोर्ट टीम नेहमी तुमच्यासोबत.", imageId: "service_support" },
  ],
  hi: [
    { title: "वेबसाइट और ऐप विकास", description: "आपके बिज़नेस के अनुसार तैयार किए गए तेज़, सुरक्षित और स्केलेबल डिजिटल प्लेटफॉर्म — जो केवल दिखें नहीं, बल्कि परिणाम दें।", imageId: "service_web_dev" },
    { title: "मार्केटिंग और ब्रांडिंग", description: "डेटा-आधारित मार्केटिंग रणनीतियाँ जो आपके ब्रांड को पहचान, भरोसा और निरंतर ग्रोथ दिलाएँ।", imageId: "service_marketing" },
    { title: "कर और अनुपालन", description: "GST, रजिस्ट्रेशन और सभी कानूनी प्रक्रियाएँ — विशेषज्ञों के मार्गदर्शन में, बिना तनाव।", imageId: "service_tax" },
    { title: "बिजनेस सेटअप", description: "आइडिया से लेकर सफल लॉन्च तक — एक मजबूत शुरुआत के लिए एंड-टू-एंड सपोर्ट।", imageId: "service_biz_setup" },
    { title: "यूआई/यूएक्स डिजाइन", description: "ऐसे यूज़र-फ्रेंडली डिज़ाइन जो विज़िटर्स को ग्राहकों में बदल दें।", imageId: "service_ui_ux" },
    { title: "एआई और ऑटोमेशन", description: "स्मार्ट ऑटोमेशन से समय बचाएँ, लागत घटाएँ और ऑपरेशन्स को तेज़ करें।", imageId: "service_ai" },
    { title: "क्लाउड और सुरक्षा", description: "मजबूत क्लाउड इंफ्रास्ट्रक्चर जो आपके डेटा को सुरक्षित और सिस्टम को हमेशा ऑनलाइन रखे।", imageId: "service_cloud" },
    { title: "स्टार्टअप सलाहकार", description: "बिज़नेस स्केलिंग, फंडिंग और ग्रोथ के लिए रणनीतिक परामर्श।", imageId: "service_advisory" },
    { title: "कंटेंट और सोशल", description: "कहानी-आधारित कंटेंट जो ब्रांड अथॉरिटी बनाए और ऑडियंस से जुड़ाव बढ़ाए।", imageId: "service_social" },
    { title: "24/7 आईटी सपोर्ट", description: "बिना रुकावट काम चलता रहे — इसके लिए चौबीसों घंटे टेक्निकल सपोर्ट।", imageId: "service_support" },
  ]
};

const headingText = {
  en: "Igniting startup growth with unstoppable tech and elite strategy.",
  mr: "शक्तिशाली तंत्रज्ञान आणि अचूक रणनीती — व्यवसाय वाढीसाठी.",
  hi: "तकनीक और रणनीति का ऐसा संगम, जो स्टार्टअप को तेज़ी से आगे बढ़ाए।",
};

const descriptionText = {
    en: "We build digital solutions that lead in performance, security, and scalability.",
    mr: "आम्ही असे डिजिटल सोल्युशन्स तयार करतो जे केवळ आकर्षक नसून प्रत्यक्ष परिणाम देतात.",
    hi: "हम ऐसे डिजिटल समाधान बनाते हैं जो प्रदर्शन, सुरक्षा और स्केलेबिलिटी तीनों में आगे हों।"
}

const sectionTitleText = {
    en: "Empowerment Tools",
    mr: "आमच्या सेवा",
    hi: "सशक्तिकरण उपकरण"
};


const ServiceCard = ({ service }: { service: Service }) => {
  const { title, description, imageId } = service;
  const image = PlaceHolderImages.find(p => p.id === imageId);

  return (
    <Card className="group flex h-full w-full flex-col overflow-hidden rounded-lg border bg-card shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {image && (
          <Image
              src={image.imageUrl}
              alt={description}
              width={400}
              height={300}
              data-ai-hint={image.imageHint}
              className="w-full object-cover aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
          />
      )}
      <div className="p-2 text-center flex-grow flex flex-col justify-start">
        <h3 className="text-sm font-bold flex items-center justify-center text-center min-h-[40px]">{title}</h3>
        <p className="mt-1 text-xs leading-tight text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
};


export default function PremiumServicesSection() {
  const { language } = useLanguage();
  const services = servicesData[language];

  const renderServiceCard = (service: Service) => {
    const isWebAppDev = service.imageId === "service_web_dev";
    const isMarketing = service.imageId === "service_marketing";
    const isTax = service.imageId === "service_tax";
    const isBizSetup = service.imageId === "service_biz_setup";
    const isUiUx = service.imageId === "service_ui_ux";
    const isAi = service.imageId === "service_ai";
    const isCloud = service.imageId === "service_cloud";
    const isAdvisory = service.imageId === "service_advisory";
    const isSocial = service.imageId === "service_social";
    const isSupport = service.imageId === "service_support";
    
    let href = "#";
    if (isWebAppDev) {
        href = "/services/web-app-development";
    } else if (isMarketing) {
        href = "/services/marketing-and-branding";
    } else if (isTax) {
        href = "/services/tax-and-compliance";
    } else if (isBizSetup) {
        href = "/services/business-setup";
    } else if (isUiUx) {
        href = "/services/ui-ux-design";
    } else if (isAi) {
        href = "/services/ai-and-automation";
    } else if (isCloud) {
        href = "/services/cloud-and-security";
    } else if (isAdvisory) {
        href = "/services/startup-advisory";
    } else if (isSocial) {
        href = "/services/content-and-social";
    } else if (isSupport) {
        href = "/services/24-7-it-support";
    }
    
    return (
      <div className="h-full">
        <Link href={href} className="h-full block" onClick={(e) => href === '#' && e.preventDefault()}>
          <ServiceCard service={service} />
        </Link>
      </div>
    );
  }

  return (
    <section id="services" className="bg-muted/30 py-6 md:py-8">
        <div className="container text-center mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-black mb-2">
                {sectionTitleText[language]}
            </h3>
            <h2 className="font-headline text-lg md:text-xl font-bold tracking-tighter text-primary">
                {headingText[language]}
            </h2>
             <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                {descriptionText[language]}
            </p>
        </div>
        <div className="container px-1 sm:px-4">
          {/* Mobile View - Grid */}
          <div className="grid grid-cols-3 gap-1 sm:hidden">
            {services.map((service, index) => (
              <div key={index} className="h-[260px]">
                {renderServiceCard(service)}
              </div>
            ))}
          </div>
          
          {/* Desktop View - Carousel */}
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full hidden sm:block"
          >
            <CarouselContent className="-ml-4">
              {services.map((service, index) => (
                  <CarouselItem key={index} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                    {renderServiceCard(service)}
                  </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90" />
            <CarouselNext className="hidden md:flex right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90" />
          </Carousel>
        </div>
    </section>
  );
}
