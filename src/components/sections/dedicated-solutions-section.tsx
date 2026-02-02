'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Store, Rocket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from '@/context/language-provider';

const sectionText = {
  en: {
    heading: "Dedicated Solutions for MSMEs & Startups",
    subheading: "Tailored strategies for every stage of your business journey.",
    shopsTab: "For Local Shops",
    startupsTab: "For Startups",
    shops: {
      title: "Empowering Neighborhood Businesses",
      description: "Digitize your operations, expand your reach, and simplify compliance with our custom solutions designed for the heart of our communities.",
      features: [
        "Inventory & Billing Apps",
        "Local SEO & Google Maps Presence",
        "GST & Tax Automation",
        "Easy Online Store Setup",
      ],
      cta: "Grow Your Shop"
    },
    startups: {
      title: "From Idea to Unicorn",
      description: "We partner with ambitious founders to build, launch, and scale disruptive products. Your vision, accelerated by our expertise.",
      features: [
        "Rapid MVP Development",
        "Scalable Cloud Architecture",
        "Go-to-Market Branding",
        "Investor Pitch Decks & De-Risking",
      ],
      cta: "Scale Your Startup"
    }
  },
  mr: {
    heading: "MSMEs आणि स्टार्टअप्ससाठी समर्पित उपाय",
    subheading: "तुमच्या व्यवसायाच्या प्रवासाच्या प्रत्येक टप्प्यासाठी तयार केलेल्या रणनीती.",
    shopsTab: "स्थानिक दुकानांसाठी",
    startupsTab: "स्टार्टअपसाठी",
    shops: {
      title: "स्थानिक व्यवसायांचे सक्षमीकरण",
      description: "तुमचे कार्य डिजिटल करा, तुमची पोहोच वाढवा आणि आमच्या समुदायाच्या हृदयासाठी डिझाइन केलेल्या आमच्या सानुकूल उपायांसह अनुपालन सुलभ करा.",
      features: [
        "इन्व्हेंटरी आणि बिलिंग ॲप्स",
        "स्थानिक एसइओ आणि गुगल मॅप्सवर उपस्थिती",
        "जीएसटी आणि कर ऑटोमेशन",
        "सुलभ ऑनलाइन स्टोअर सेटअप",
      ],
      cta: "तुमचे दुकान वाढवा"
    },
    startups: {
      title: "कल्पनेपासून युनिकॉर्नपर्यंत",
      description: "आम्ही महत्त्वाकांक्षी संस्थापकांसोबत विघटनकारी उत्पादने तयार करण्यासाठी, लॉन्च करण्यासाठी आणि मोजण्यासाठी भागीदारी करतो. तुमची दृष्टी, आमच्या कौशल्याने वेगवान.",
      features: [
        "जलद MVP विकास",
        "स्केलेबल क्लाउड आर्किटेक्चर",
        "गो-टू-मार्केट ब्रँडिंग",
        "गुंतवणूकदार पिच डेक आणि डी-रिस्किंग",
      ],
      cta: "तुमचा स्टार्टअप वाढवा"
    }
  },
  hi: {
    heading: "MSMEs और स्टार्टअप्स के लिए समर्पित समाधान",
    subheading: "आपके व्यापार यात्रा के हर चरण के लिए विशेष रणनीतियाँ।",
    shopsTab: "स्थानीय व्यवसायों के लिए",
    startupsTab: "स्टार्टअप के लिए",
    shops: {
      title: "स्थानीय व्यवसायों को सशक्त बनाना",
      description: "अपने ऑपरेशन्स को डिजिटल बनाएँ और स्थानीय बाज़ार में मज़बूत पहचान बनाएँ।",
      features: [
        "इन्वेंटरी और बिलिंग ऐप्स",
        "स्थानीय एसईओ और गूगल मैप्स दृश्यता",
        "जीएसटी और कर स्वचालन",
        "आसान ऑनलाइन स्टोर सेटअप",
      ],
      cta: "अपनी दुकान बढ़ाएँ"
    },
    startups: {
      title: "विचार से यूनिकॉर्न तक",
      description: "हम संस्थापकों के साथ मिलकर प्रोडक्ट बनाते हैं, लॉन्च करते हैं और स्केल करते हैं।",
      features: [
        "रैपिड एमवीपी विकास",
        "स्केलेबल क्लाउड आर्किटेक्चर",
        "गो-टू-मार्केट ब्रांडिंग",
        "निवेशक पिच डेक और जोखिम में कमी",
      ],
      cta: "अपना स्टार्टअप बढ़ाएँ"
    }
  }
};

const shopImage = PlaceHolderImages.find(p => p.id === 'work_ecommerce_platform');
const startupImage = PlaceHolderImages.find(p => p.id === 'service_advisory');

export default function DedicatedSolutionsSection() {
  const { language } = useLanguage();
  const text = sectionText[language];

  return (
    <section id="solutions" className="py-6 md:py-8 bg-muted/30">
      <div className="container">
        <div className="text-center mb-8">
            <h3 className="text-base font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {text.heading}
            </h3>
            <h2 className="font-headline text-xl font-bold tracking-tighter sm:text-2xl text-primary">
                {text.subheading}
            </h2>
        </div>

        <Tabs defaultValue="shops" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto mb-4">
            <TabsTrigger value="shops">
              <Store className="mr-2" /> {text.shopsTab}
            </TabsTrigger>
            <TabsTrigger value="startups">
              <Rocket className="mr-2" /> {text.startupsTab}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="shops">
            <Card className="mt-6 border-0 shadow-none bg-transparent">
              <CardContent className="p-0 md:p-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="font-headline text-2xl font-bold text-primary">{text.shops.title}</h3>
                  <p className="mt-3 text-lg text-muted-foreground">{text.shops.description}</p>
                  <ul className="mt-6 space-y-3">
                    {text.shops.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span className="text-lg font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button size="lg" className="mt-8">{text.shops.cta}</Button>
                </div>
                <div className="order-1 md:order-2 aspect-video rounded-lg overflow-hidden">
                  {shopImage && (
                    <Image
                      src={shopImage.imageUrl}
                      alt={shopImage.description}
                      width={600}
                      height={450}
                      data-ai-hint={shopImage.imageHint}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="startups">
            <Card className="mt-6 border-0 shadow-none bg-transparent">
              <CardContent className="p-0 md:p-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                 <div className="aspect-video rounded-lg overflow-hidden">
                   {startupImage && (
                    <Image
                      src={startupImage.imageUrl}
                      alt={startupImage.description}
                      width={600}
                      height={450}
                      data-ai-hint={startupImage.imageHint}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-bold text-primary">{text.startups.title}</h3>
                  <p className="mt-3 text-lg text-muted-foreground">{text.startups.description}</p>
                  <ul className="mt-6 space-y-3">
                    {text.startups.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span className="text-lg font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button size="lg" className="mt-8">{text.startups.cta}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
