'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Megaphone, Landmark, ToyBrick } from "lucide-react";
import { Magnetic } from "@/components/shared/magnetic";
import { useLanguage } from "@/context/language-provider";

const text = {
  mr: {
    h2: "एकाच छताखाली पूर्ण व्यावसायिक समाधान.",
    p: "The only partner you need to go from 'Idea' to 'Empire'.",
  },
  en: {
    h2: "Complete business solutions under one roof.",
    p: "The only partner you need to go from 'Idea' to 'Empire'.",
  },
  hi: {
    h2: "एक ही छत के नीचे संपूर्ण व्यावसायिक समाधान।",
    p: "'आइडिया' से 'एम्पायर' तक जाने के लिए आपको एकमात्र भागीदार की आवश्यकता है।",
  },
};

const servicesData = {
  en: [
    {
      title: "Web/App Development",
      description: "Cutting-edge digital solutions tailored to your needs.",
      icon: Globe,
    },
    {
      title: "Marketing & Branding",
      description: "Data-driven strategies to elevate your brand presence.",
      icon: Megaphone,
    },
    {
      title: "Tax & Compliance",
      description: "Navigate complex regulations with our expert guidance.",
      icon: Landmark,
    },
    {
      title: "Business Setup",
      description: "End-to-end support for a seamless business launch.",
      icon: ToyBrick,
    },
  ],
  mr: [
      { title: "वेब/ॲप डेव्हलपमेंट", description: "तुमच्या गरजेनुसार अत्याधुनिक डिजिटल सोल्यूशन्स.", icon: Globe },
      { title: "मार्केटिंग आणि ब्रँडिंग", description: "तुमच्या ब्रँडची ओळख वाढवण्यासाठी डेटा-चालित धोरणे.", icon: Megaphone },
      { title: "कर आणि अनुपालन", description: "आमच्या तज्ञ मार्गदर्शनाने जटिल नियमांमधून मार्गक्रमण करा.", icon: Landmark },
      { title: "व्यवसाय सेटअप", description: "अखंड व्यवसाय सुरू करण्यासाठी एंड-टू-एंड समर्थन.", icon: ToyBrick },
  ],
  hi: [
    { title: "वेब/ऐप विकास", description: "आपकी ज़रूरतों के अनुरूप अत्याधुनिक डिजिटल समाधान।", icon: Globe },
    { title: "विपणन और ब्रांडिंग", description: "आपके ब्रांड की उपस्थिति को बढ़ाने के लिए डेटा-संचालित रणनीतियाँ।", icon: Megaphone },
    { title: "कर और अनुपालन", description: "हमारे विशेषज्ञ मार्गदर्शन के साथ जटिल नियमों को नेविगेट करें।", icon: Landmark },
    { title: "व्यापार सेटअप", description: "एक सहज व्यापार लॉन्च के लिए एंड-टू-एंड समर्थन।", icon: ToyBrick },
  ]
};

export default function EcosystemSection() {
  const { language } = useLanguage();
  const currentServices = servicesData[language];

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
          {text[language].h2}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          {text[language].p}
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentServices.map((service, index) => (
            <Magnetic key={index} strength={15}>
                <Card className="h-full text-left group overflow-hidden relative transition-all duration-300 hover:border-primary hover:shadow-2xl">
                   <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <service.icon className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                        <CardTitle className="font-headline text-lg">{service.title}</CardTitle>
                   </CardHeader>
                   <CardContent>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                   </CardContent>
                </Card>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  );
}
