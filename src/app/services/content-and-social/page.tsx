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
    title: "Content & Social",
    heading: "Storytelling That Builds Authority, Trust, and Engagement",
    intro: [
      "In the digital age, content is not just communication — it is how brands educate, influence, and build lasting relationships with their audience. Strong content and social presence help businesses stay visible, credible, and relevant in a highly competitive market.",
      "We create strategic, narrative-driven content and social media campaigns that align with your brand voice, business goals, and audience expectations. Our focus is on delivering consistent value, building authority, and driving meaningful engagement across platforms.",
      "Every piece of content we create is designed to tell your story, strengthen your brand identity, and support long-term growth.",
    ],
    businessImpactTitle: "What This Means for Your Business",
    brandAuthority: {
      title: "Brand Authority & Trust",
      items: [
        "Consistent brand voice and messaging",
        "Educational and value-driven content",
        "Thought leadership positioning",
        "Trust-building storytelling",
        "Long-term brand recall",
      ],
    },
    audienceEngagement: {
      title: "Audience Engagement",
      items: [
        "Platform-specific content strategies",
        "Interactive and shareable content formats",
        "Community building and conversations",
        "Higher engagement rates",
        "Stronger audience relationships",
      ],
    },
    visibilityGrowth: {
      title: "Visibility & Growth",
      items: [
        "Increased organic reach",
        "Improved brand awareness",
        "SEO-friendly content creation",
        "Social media growth and consistency",
        "Support for marketing and sales funnels",
      ],
    },
    servicesTitle: "Content & Social Services We Provide",
    services: {
      strategy: {
        title: "Content Strategy & Creation",
        items: [
          "Content planning and editorial calendars",
          "Website and blog content",
          "Copywriting for marketing campaigns",
          "Visual content coordination",
          "Brand tone and messaging alignment",
        ],
      },
      management: {
        title: "Social Media Management",
        items: [
          "Social media strategy and planning",
          "Platform-specific posting (Instagram, Facebook, LinkedIn, X)",
          "Content scheduling and publishing",
          "Community management and responses",
          "Performance tracking and insights",
        ],
      },
      campaigns: {
        title: "Campaigns & Optimization",
        items: [
          "Content-driven marketing campaigns",
          "Social media growth campaigns",
          "Analytics and performance reporting",
          "Continuous optimization and improvement",
          "Trend-based content execution",
        ],
      },
    },
    whoForTitle: "Who This Service Is For",
    whoForItems: [
      "Startups building brand presence",
      "MSMEs increasing digital visibility",
      "Growing businesses engaging their audience",
      "Brands looking for consistent storytelling",
    ],
    resultTitle: "The Result",
    resultItems: [
      "Strong and recognizable brand voice",
      "Higher engagement and interaction",
      "Increased trust and credibility",
      "Better organic reach and visibility",
      "Content that supports long-term growth",
    ],
  },
  hi: {
    title: "कंटेंट और सोशल",
    heading: "ऐसी कहानी जो भरोसा, पहचान और जुड़ाव बनाए",
    intro: [
      "डिजिटल युग में कंटेंट केवल जानकारी साझा करने का माध्यम नहीं है — यह वह तरीका है जिससे ब्रांड अपने दर्शकों को शिक्षित करते हैं, प्रभावित करते हैं और लंबे समय तक जुड़ाव बनाते हैं। प्रभावी कंटेंट और सोशल मीडिया उपस्थिति व्यवसाय को भरोसेमंद और प्रासंगिक बनाती है।",
      "हम रणनीतिक और कहानी-आधारित कंटेंट तैयार करते हैं जो आपके ब्रांड की आवाज़, बिज़नेस लक्ष्यों और ऑडियंस की अपेक्षाओं के अनुरूप होता है।",
    ],
    businessImpactTitle: "इसका आपके व्यवसाय के लिए क्या अर्थ है",
    brandAuthority: {
      title: "ब्रांड अथॉरिटी और भरोसा",
      items: [
        "एकसमान ब्रांड वॉयस",
        "ज्ञानवर्धक और वैल्यू-ड्रिवन कंटेंट",
        "थॉट लीडरशिप पोज़िशनिंग",
        "भरोसा बनाने वाली स्टोरीटेलिंग",
        "लंबे समय तक ब्रांड पहचान",
      ],
    },
    audienceEngagement: {
      title: "ऑडियंस एंगेजमेंट",
      items: [
        "प्लेटफ़ॉर्म-विशेष कंटेंट रणनीति",
        "इंटरएक्टिव और शेयर करने योग्य कंटेंट",
        "कम्युनिटी बिल्डिंग",
        "बेहतर एंगेजमेंट रेट",
        "मज़बूत ग्राहक संबंध",
      ],
    },
    visibilityGrowth: {
      title: "विज़िबिलिटी और ग्रोथ",
      items: [
        "ऑर्गेनिक रीच में वृद्धि",
        "बेहतर ब्रांड अवेयरनेस",
        "SEO-फ्रेंडली कंटेंट",
        "सोशल मीडिया ग्रोथ",
        "मार्केटिंग और सेल्स फ़नल सपोर्ट",
      ],
    },
    servicesTitle: "हमारी कंटेंट और सोशल सेवाएँ",
    services: {
      strategy: {
        title: "कंटेंट रणनीति और निर्माण",
        items: [
          "कंटेंट प्लानिंग और कैलेंडर",
          "वेबसाइट और ब्लॉग कंटेंट",
          "मार्केटिंग कॉपीराइटिंग",
          "विज़ुअल कंटेंट समन्वय",
          "ब्रांड टोन और मैसेजिंग",
        ],
      },
      management: {
        title: "सोशल मीडिया मैनेजमेंट",
        items: [
          "सोशल मीडिया रणनीति",
          "प्लेटफ़ॉर्म-विशेष पोस्टिंग",
          "कंटेंट शेड्यूलिंग",
          "कम्युनिटी मैनेजमेंट",
          "परफॉर्मेंस रिपोर्टिंग",
        ],
      },
      campaigns: {
        title: "कैंपेन और ऑप्टिमाइज़ेशन",
        items: [
          "कंटेंट-ड्रिवन कैंपेन",
          "सोशल मीडिया ग्रोथ कैंपेन",
          "एनालिटिक्स और इनसाइट्स",
          "निरंतर सुधार",
          "ट्रेंड-आधारित कंटेंट",
        ],
      },
    },
    whoForTitle: "Who This Service Is For",
    whoForItems: [
      "Startups building brand presence",
      "MSMEs increasing digital visibility",
      "Growing businesses engaging their audience",
      "Brands looking for consistent storytelling",
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "मज़बूत और स्पष्ट ब्रांड आवाज़",
      "ज़्यादा एंगेजमेंट और बातचीत",
      "बढ़ा हुआ भरोसा और विश्वसनीयता",
      "बेहतर ऑर्गेनिक रीच",
      "दीर्घकालिक बिज़नेस ग्रोथ",
    ],
  },
  mr: {
    title: "कंटेंट आणि सोशल",
    heading: "विश्वास, ओळख आणि एंगेजमेंट निर्माण करणारी कथा",
    intro: [
      "डिजिटल युगात कंटेंट म्हणजे फक्त माहिती देणं नाही — तो ब्रँड आणि ग्राहक यांच्यात नातं निर्माण करण्याचा सर्वात प्रभावी मार्ग आहे। मजबूत कंटेंट आणि सोशल मीडिया उपस्थितीमुळे ब्रँड दृश्यमान, विश्वासार्ह आणि लक्षात राहणारा बनतो।",
      "आम्ही ब्रँडच्या आवाजाशी आणि व्यवसायाच्या उद्दिष्टांशी सुसंगत अशी कथा-आधारित कंटेंट आणि सोशल मीडिया रणनीती तयार करतो।",
    ],
    businessImpactTitle: "याचा तुमच्या व्यवसायासाठी अर्थ",
    brandAuthority: {
      title: "ब्रँड विश्वासार्हता आणि ओळख",
      items: [
        "सातत्यपूर्ण ब्रँड वॉईस",
        "माहितीपूर्ण आणि मूल्यवान कंटेंट",
        "थॉट लीडरशिप पोझिशनिंग",
        "विश्वास निर्माण करणारी स्टोरीटेलिंग",
        "दीर्घकालीन ब्रँड स्मरण",
      ],
    },
    audienceEngagement: {
      title: "प्रेक्षक एंगेजमेंट",
      items: [
        "प्लॅटफॉर्म-निहाय कंटेंट रणनीती",
        "इंटरॅक्टिव्ह आणि शेअर करण्याजोगा कंटेंट",
        "कम्युनिटी बिल्डिंग",
        "वाढलेले एंगेजमेंट रेट",
        "मजबूत ग्राहक नातेसंबंध",
      ],
    },
    visibilityGrowth: {
      title: "दृश्यमानता आणि वाढ",
      items: [
        "ऑर्गेनिक रीचमध्ये वाढ",
        "ब्रँड अवेअरनेस सुधारणा",
        "SEO-अनुकूल कंटेंट",
        "सोशल मीडिया ग्रोथ",
        "मार्केटिंग आणि सेल्स फनेल सपोर्ट",
      ],
    },
    servicesTitle: "आमच्या कंटेंट आणि सोशल सेवा",
    services: {
      strategy: {
        title: "कंटेंट रणनीती आणि निर्मिती",
        items: [
          "कंटेंट नियोजन आणि कॅलेंडर",
          "वेबसाइट आणि ब्लॉग कंटेंट",
          "मार्केटिंग कॉपीरायटिंग",
          "व्हिज्युअल कंटेंट समन्वय",
          "ब्रँड टोन आणि मेसेजिंग",
        ],
      },
      management: {
        title: "सोशल मीडिया व्यवस्थापन",
        items: [
          "सोशल मीडिया रणनीती",
          "प्लॅटफॉर्मनुसार पोस्टिंग",
          "कंटेंट शेड्यूलिंग",
          "कम्युनिटी मॅनेजमेंट",
          "परफॉर्मन्स रिपोर्टिंग",
        ],
      },
      campaigns: {
        title: "कॅम्पेन आणि ऑप्टिमायझेशन",
        items: [
          "कंटेंट-ड्रिव्हन कॅम्पेन्स",
          "सोशल मीडिया ग्रोथ कॅम्पेन्स",
          "अ‍ॅनालिटिक्स आणि इनसाइट्स",
          "सतत सुधारणा",
          "ट्रेंड-आधारित कंटेंट",
        ],
      },
    },
    whoForTitle: "Who This Service Is For",
    whoForItems: [
        "Startups building brand presence",
        "MSMEs increasing digital visibility",
        "Growing businesses engaging their audience",
        "Brands looking for consistent storytelling",
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "मजबूत आणि ओळखण्याजोगा ब्रँड आवाज",
      "जास्त एंगेजमेंट आणि संवाद",
      "वाढलेला विश्वास आणि विश्वासार्हता",
      "चांगली ऑर्गेनिक पोहोच",
      "दीर्घकालीन आणि टिकाऊ वाढ",
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
            <DetailSection title={services.strategy.title} items={services.strategy.items} />
            <DetailSection title={services.management.title} items={services.management.items} />
            <DetailSection title={services.campaigns.title} items={services.campaigns.items} />
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

export default function ContentAndSocialPage() {
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
                    <DetailSection title={t.brandAuthority.title} items={t.brandAuthority.items} />
                    <DetailSection title={t.audienceEngagement.title} items={t.audienceEngagement.items} />
                    <DetailSection title={t.visibilityGrowth.title} items={t.visibilityGrowth.items} />
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
