'use client';

import { useLanguage } from '@/context/language-provider';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GetStartedSection } from '@/components/shared/get-started-section';

const content = {
  en: {
    title: "UI / UX Design",
    heading: "Designing Experiences That Convert, Engage, and Retain",
    intro: [
      "Great design is not just about how a product looks — it’s about how it works, how it feels, and how effortlessly users can achieve their goals. UI/UX design directly impacts customer satisfaction, conversion rates, and long-term brand perception.",
      "We design human-centric digital experiences that are intuitive, engaging, and conversion-focused. Every screen, interaction, and flow is carefully crafted to reduce friction, guide users naturally, and turn visitors into loyal customers.",
      "Our design process blends user research, business strategy, and design psychology to ensure your product is not only beautiful, but also usable, accessible, and scalable.",
    ],
    businessImpactTitle: "What This Means for Your Business",
    userExperience: {
      title: "User Experience (UX)",
      items: [
        "Clear and logical user journeys",
        "Reduced friction and confusion",
        "Faster task completion for users",
        "Improved customer satisfaction",
        "Higher retention and repeat usage",
      ],
    },
    userInterface: {
      title: "User Interface (UI)",
      items: [
        "Clean, modern, and brand-aligned visuals",
        "Consistent design systems and components",
        "Visually guided actions and feedback",
        "Responsive design across devices",
        "Accessibility-friendly layouts",
      ],
    },
    conversionEngagement: {
      title: "Conversion & Engagement",
      items: [
        "Design optimized for lead generation and sales",
        "Clear call-to-actions (CTAs)",
        "Trust-building visual cues",
        "Behavior-driven layout decisions",
        "Measurable improvement in conversions",
      ],
    },
    servicesTitle: "Our UI / UX Design Services",
    services: {
      research: {
        title: "Research & Strategy",
        items: [
          "User research and persona creation",
          "Competitor and market analysis",
          "Information architecture planning",
          "UX strategy aligned with business goals",
        ],
      },
      prototyping: {
        title: "Design & Prototyping",
        items: [
          "Wireframing (low & high fidelity)",
          "Interactive prototypes",
          "UI design for web and mobile",
          "Design systems and style guides",
        ],
      },
      testing: {
        title: "Testing & Optimization",
        items: [
          "Usability testing",
          "User feedback analysis",
          "Iterative design improvements",
          "Conversion and experience optimization",
        ],
      },
    },
    whoForTitle: "Who This Service Is For",
    whoForItems: [
      "Startups building user-friendly products",
      "MSMEs improving digital experience",
      "Businesses redesigning existing platforms",
      "Enterprises scaling complex systems",
    ],
    resultTitle: "The Result",
    resultItems: [
      "Intuitive and user-friendly interfaces",
      "Strong brand consistency",
      "Higher engagement and conversions",
      "Reduced user drop-offs",
      "Experiences users enjoy coming back to",
    ],
  },
  hi: {
    title: "UI / UX डिज़ाइन",
    heading: "ऐसे अनुभव जो उपयोगकर्ताओं को जोड़ें और ग्राहक बनाएँ",
    intro: [
      "अच्छा डिज़ाइन केवल देखने में सुंदर होना नहीं है — यह इस बात पर निर्भर करता है कि उपयोगकर्ता किसी प्रोडक्ट को कितना आसानी से समझ और उपयोग कर पाते हैं। UI/UX डिज़ाइन सीधे तौर पर ग्राहक संतुष्टि, कन्वर्ज़न और ब्रांड छवि को प्रभावित करता है।",
      "हम मानव-केंद्रित डिजिटल अनुभव डिज़ाइन करते हैं जो सरल, आकर्षक और परिणाम-केंद्रित होते हैं। हर स्क्रीन और इंटरैक्शन उपयोगकर्ता को स्वाभाविक रूप से मार्गदर्शन करने के लिए डिज़ाइन किया जाता है।",
    ],
    businessImpactTitle: "इसका आपके व्यवसाय के लिए क्या अर्थ है",
    userExperience: {
      title: "यूज़र एक्सपीरियंस (UX)",
      items: [
        "स्पष्ट और सहज यूज़र जर्नी",
        "कम भ्रम और रुकावट",
        "कार्यों को जल्दी पूरा करने की सुविधा",
        "बेहतर ग्राहक संतुष्टि",
        "अधिक रिटेंशन",
      ],
    },
    userInterface: {
      title: "यूज़र इंटरफेस (UI)",
      items: [
        "साफ़, आधुनिक और ब्रांड-अनुरूप डिज़ाइन",
        "एकसमान डिज़ाइन सिस्टम",
        "विज़ुअल संकेतों से मार्गदर्शन",
        "सभी डिवाइस के लिए रिस्पॉन्सिव डिज़ाइन",
        "एक्सेसिबिलिटी-फ्रेंडली लेआउट",
      ],
    },
    conversionEngagement: {
      title: "कन्वर्ज़न और एंगेजमेंट",
      items: [
        "लीड और सेल्स बढ़ाने वाला डिज़ाइन",
        "स्पष्ट कॉल-टू-एक्शन (CTA)",
        "भरोसा पैदा करने वाले विज़ुअल एलिमेंट्स",
        "यूज़र बिहेवियर पर आधारित लेआउट",
        "बेहतर कन्वर्ज़न रेट",
      ],
    },
    servicesTitle: "हमारी UI / UX डिज़ाइन सेवाएँ",
    services: {
      research: {
        title: "रिसर्च और रणनीति",
        items: [
          "यूज़र रिसर्च और पर्सोना डेवलपमेंट",
          "प्रतिस्पर्धी और मार्केट विश्लेषण",
          "इंफॉर्मेशन आर्किटेक्चर",
          "बिज़नेस-फोकस्ड UX रणनीति",
        ],
      },
      prototyping: {
        title: "डिज़ाइन और प्रोटोटाइप",
        items: [
          "वायरफ्रेम (लो और हाई फिडेलिटी)",
          "इंटरएक्टिव प्रोटोटाइप",
          "वेब और मोबाइल UI डिज़ाइन",
          "डिज़ाइन सिस्टम और स्टाइल गाइड",
        ],
      },
      testing: {
        title: "टेस्टिंग और ऑप्टिमाइज़ेशन",
        items: [
          "यूज़ेबिलिटी टेस्टिंग",
          "यूज़र फीडबैक एनालिसिस",
          "निरंतर डिज़ाइन सुधार",
          "एक्सपीरियंस और कन्वर्ज़न ऑप्टिमाइज़ेशन",
        ],
      },
    },
    whoForTitle: "किनके लिए उपयुक्त",
    whoForItems: [
        "स्टार्टअप्स जो उपयोगकर्ता-अनुकूल उत्पाद बना रहे हैं",
        "MSMEs जो डिजिटल अनुभव में सुधार कर रहे हैं",
        "मौजूदा प्लेटफॉर्म को फिर से डिजाइन करने वाले व्यवसाय",
        "जटिल प्रणालियों को बढ़ाने वाले उद्यम"
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "उपयोग में आसान इंटरफेस",
      "मजबूत ब्रांड पहचान",
      "ज़्यादा एंगेजमेंट और कन्वर्ज़न",
      "कम ड्रॉप-ऑफ",
      "संतुष्ट और वफादार ग्राहक",
    ],
  },
  mr: {
    title: "UI / UX डिझाइन",
    heading: "ग्राहकांना जोडणारे आणि रूपांतर घडवणारे अनुभव",
    intro: [
      "उत्तम डिझाइन म्हणजे केवळ सुंदर दिसणं नाही — ते वापरायला किती सोपं आहे, युजरला किती सहज समजतं आणि उद्दिष्ट साध्य करण्यात किती मदत करतं, यावर ते अवलंबून असतं. UI/UX डिझाइन थेट ग्राहक समाधान, विक्री आणि ब्रँड प्रतिमेवर परिणाम करतं।",
      "आम्ही मानवी गरजांवर आधारित डिजिटल अनुभव तयार करतो जे सहज, आकर्षक आणि परिणामकारक असतात। प्रत्येक स्क्रीन आणि इंटरॅक्शन युजरला नैसर्गिकपणे पुढे नेण्यासाठी डिझाइन केलेला असतो।",
    ],
    businessImpactTitle: "याचा तुमच्या व्यवसायासाठी अर्थ",
    userExperience: {
      title: "युजर अनुभव (UX)",
      items: [
        "स्पष्ट आणि सहज युजर फ्लो",
        "कमी गोंधळ आणि अडथळे",
        "जलद टास्क पूर्ण होण्याची सुविधा",
        "वाढलेलं ग्राहक समाधान",
        "जास्त रिटेन्शन",
      ],
    },
    userInterface: {
      title: "युजर इंटरफेस (UI)",
      items: [
        "स्वच्छ, आधुनिक आणि ब्रँड-सुसंगत डिझाइन",
        "एकसंध डिझाइन सिस्टीम",
        "दृश्य संकेतांद्वारे मार्गदर्शन",
        "सर्व डिव्हाइससाठी रिस्पॉन्सिव्ह डिझाइन",
        "अ‍ॅक्सेसिबिलिटी-फ्रेंडली लेआउट",
      ],
    },
    conversionEngagement: {
      title: "कन्वर्ज़न आणि एंगेजमेंट",
      items: [
        "लीड्स आणि विक्री वाढवणारे डिझाइन",
        "स्पष्ट Call-to-Action",
        "विश्वास निर्माण करणारे व्हिज्युअल घटक",
        "युजर बिहेवियरवर आधारित लेआउट",
        "सुधारलेला कन्वर्ज़न रेट",
      ],
    },
    servicesTitle: "आमच्या UI / UX डिझाइन सेवा",
    services: {
      research: {
        title: "रिसर्च आणि रणनीती",
        items: [
          "युजर रिसर्च आणि पर्सोना तयार करणे",
          "स्पर्धक आणि बाजार विश्लेषण",
          "माहिती रचना (Information Architecture)",
          "व्यवसाय उद्दिष्टांशी सुसंगत UX रणनीती",
        ],
      },
      prototyping: {
        title: "डिझाइन आणि प्रोटोटायपिंग",
        items: [
          "वायरफ्रेम (लो आणि हाय फिडेलिटी)",
          "इंटरॅक्टिव्ह प्रोटोटाइप",
          "वेब आणि मोबाइल UI डिझाइन",
          "डिझाइन सिस्टीम आणि स्टाइल गाईड",
        ],
      },
      testing: {
        title: "टेस्टिंग आणि ऑप्टिमायझेशन",
        items: [
          "युजेबिलिटी टेस्टिंग",
          "युजर फीडबॅक विश्लेषण",
          "सतत डिझाइन सुधारणा",
          "अनुभव आणि कन्वर्ज़न ऑप्टिमायझेशन",
        ],
      },
    },
    whoForTitle: "कोणासाठी योग्य",
    whoForItems: [
        "युजर-फ्रेंडली उत्पादने बनवणारे स्टार्टअप",
        "डिजिटल अनुभव सुधारणारे MSMEs",
        "विद्यमान प्लॅटफॉर्मची पुनर्रचना करणारे व्यवसाय",
        "जटिल प्रणाली स्केल करणारे एंटरप्राइझ"
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "वापरण्यास सोपे इंटरफेस",
      "मजबूत ब्रँड ओळख",
      "जास्त एंगेजमेंट आणि विक्री",
      "कमी ड्रॉप-ऑफ",
      "समाधानी आणि निष्ठावान ग्राहक",
    ],
  }
};

const DetailSection = ({ title, items }: { title: string, items: string[] }) => (
    <div>
        <h3 className="text-xl font-headline font-semibold text-primary mb-4">{title}</h3>
        <ul className="space-y-3">
            {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const ServicesProvidedSection = ({ title, services }: { title: string, services: any }) => (
    <Card className="shadow-lg mt-12">
        <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-headline text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-8 md:gap-12 p-6 md:p-8">
            <DetailSection title={services.research.title} items={services.research.items} />
            <DetailSection title={services.prototyping.title} items={services.prototyping.items} />
            <DetailSection title={services.testing.title} items={services.testing.items} />
        </CardContent>
    </Card>
);

const TargetedAudienceSection = ({ title, items }: { title: string, items: string[] }) => (
    <Card className="bg-primary/5 mt-12 border-primary/20">
        <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
)

export default function UiUxDesignPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <div className="container py-8 md:py-12">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/#services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>

          <div>
            <header className="text-center mb-12">
              <p className="font-bold text-primary tracking-wider uppercase text-sm md:text-base">
                {t.title}
              </p>
              <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-2 leading-tight">
                {t.heading}
              </h1>
            </header>
            
            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground space-y-6 mb-16 text-left md:text-center">
                {t.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl font-headline text-center">{t.businessImpactTitle}</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-8 md:gap-12 p-6 md:p-8">
                    <DetailSection title={t.userExperience.title} items={t.userExperience.items} />
                    <DetailSection title={t.userInterface.title} items={t.userInterface.items} />
                    <DetailSection title={t.conversionEngagement.title} items={t.conversionEngagement.items} />
                </CardContent>
            </Card>

            <ServicesProvidedSection title={t.servicesTitle} services={t.services} />
            
            <TargetedAudienceSection title={t.whoForTitle} items={t.whoForItems} />

            <TargetedAudienceSection title={t.resultTitle} items={t.resultItems} />

          </div>
        </div>
        <GetStartedSection />
      </main>
      <Footer />
    </div>
  );
}
