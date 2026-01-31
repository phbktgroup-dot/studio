'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-provider';

interface Service {
  title: string;
  description: string;
  imageId: string;
}

const servicesData = {
  en: [
    { title: "Web & App Development", description: "High-performance digital products tailored to your goals.", imageId: "service_web_dev" },
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
    { title: "वेब आणि अ‍ॅप डेव्हलपमेंट", description: "तुमच्या ध्येयानुसार तयार केलेली उच्च-गुणवत्तेची डिजिटल उत्पादने.", imageId: "service_web_dev" },
    { title: "मार्केटिंग आणि ब्रँडिंग", description: "तुमच्या ब्रँडची ओळख वाढवण्यासाठी डेटा-आधारित रणनीती.", imageId: "service_marketing" },
    { title: "टॅक्स आणि कंप्लायन्स", description: "तज्ञांच्या मार्गदर्शनासह क्लिष्ट सरकारी नियमांचे सुलभ पालन.", imageId: "service_tax" },
    { title: "बिझनेस सेटअप", description: "व्यवसाय सुरळीतपणे सुरू करण्यासाठी सुरुवातीपासून शेवटपर्यंत पूर्ण सहकार्य.", imageId: "service_biz_setup" },
    { title: "UI/UX डिझाइन", description: "अभ्यागत ग्राहकांना आकर्षित करतील अशी मानवी गरजांवर आधारित डिझाइन्स.", imageId: "service_ui_ux" },
    { title: "AI आणि ऑटोमेशन", description: "स्मार्ट ऑटोमेशनद्वारे तुमच्या व्यवसायाचे कामकाज अधिक वेगवान बनवा.", imageId: "service_ai" },
    { title: "क्लाउड आणि सिक्युरिटी", description: "तुमचा डेटा सुरक्षित आणि नेहमी ऑनलाइन ठेवण्यासाठी मजबूत इन्फ्रास्ट्रक्चर.", imageId: "service_cloud" },
    { title: "स्टार्टअप सल्लागार", description: "व्यवसाय वाढवण्यासाठी आणि गुंतवणुकीसाठी धोरणात्मक सल्ला.", imageId: "service_advisory" },
    { title: "कंटेंट आणि सोशल मीडिया", description: "ब्रँडची विश्वासार्हता आणि लोकांचा सहभाग वाढवणारा प्रभावी कंटेंट.", imageId: "service_social" },
    { title: "24/7 आयटी सपोर्ट", description: "तांत्रिक बिघाड टाळण्यासाठी आणि सतत मदतीसाठी समर्पित टीम.", imageId: "service_support" },
  ]
};

const headingText = {
  en: "Igniting startup growth with unstoppable tech and elite strategy.",
  mr: "शक्तिशाली तंत्रज्ञान आणि अजेय रणनीतीसह तुमच्या स्टार्टअपला देऊया यशाची नवी भरारी!",
};

const sectionTitleText = {
    en: "Empowerment Tools",
    mr: "सक्षमीकरण साधने"
};


const ServiceCard = ({ service }: { service: Service }) => {
  const { title, description, imageId } = service;
  const image = PlaceHolderImages.find(p => p.id === imageId);

  return (
    <Card className="group flex h-full w-72 flex-shrink-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {image && (
          <Image
              src={image.imageUrl}
              alt={description}
              width={400}
              height={300}
              data-ai-hint={image.imageHint}
              className="w-full object-cover aspect-[16/9] transition-transform duration-500 group-hover:scale-105"
          />
      )}
      <div className="p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-2 h-10 text-sm text-gray-600">{description}</p>
      </div>
    </Card>
  );
};


export default function PremiumServicesSection() {
  const { language } = useLanguage();
  const services = servicesData[language];

  return (
    <section id="services" className="bg-[#F8F9FA] pt-4 md:pt-6">
        <div className="container text-center mb-8">
            <h3 className="text-xl font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {sectionTitleText[language]}
            </h3>
            <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl text-primary mt-2">
                {headingText[language]}
            </h2>
        </div>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 animate-scroll">
                {services.map((service, index) => (
                    <li key={index}>
                        <ServiceCard service={service} />
                    </li>
                ))}
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 animate-scroll" aria-hidden="true">
                {services.map((service, index) => (
                    <li key={index}>
                        <ServiceCard service={service} />
                    </li>
                ))}
            </ul>
        </div>
    </section>
  );
}
