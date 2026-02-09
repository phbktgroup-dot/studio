
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
    title: "Startup Advisory",
    heading: "Strategic Guidance to Build, Scale, and Succeed",
    intro: [
      "Building a startup is a journey filled with uncertainty, rapid decisions, and constant change. From validating an idea to scaling operations and raising capital, founders face strategic, financial, and execution challenges at every stage.",
      "Our Startup Advisory services provide founders with clear direction, expert insights, and practical execution support. We work closely with startups to reduce risk, accelerate growth, and build businesses that are scalable, investor-ready, and sustainable.",
      "We don’t just advise — we partner with founders to turn vision into execution and strategy into measurable outcomes.",
    ],
    businessImpactTitle: "What This Means for Your Startup",
    strategicClarity: {
      title: "Strategic Clarity",
      items: [
        "Clear business vision and long-term roadmap",
        "Market validation and product-market fit analysis",
        "Competitive positioning and differentiation",
        "Data-backed decision-making",
        "Reduced guesswork and uncertainty",
      ],
    },
    growthSupport: {
      title: "Growth & Scaling Support",
      items: [
        "Scalable business and revenue models",
        "Go-to-market (GTM) strategy development",
        "Customer acquisition and growth planning",
        "Operational scaling frameworks",
        "Process optimization for rapid growth",
      ],
    },
    investorReadiness: {
      title: "Investor & Fundraising Readiness",
      items: [
        "Investor-ready business structuring",
        "Pitch deck creation and refinement",
        "Financial modeling and projections",
        "Risk identification and mitigation",
        "Due diligence preparation",
      ],
    },
    servicesTitle: "Startup Advisory Services We Provide",
    services: {
      validation: {
        title: "Idea Validation & Strategy",
        items: [
          "Idea evaluation and feasibility analysis",
          "Market research and customer validation",
          "Business model and pricing strategy",
          "MVP planning and roadmap creation",
        ],
      },
      execution: {
        title: "Growth & Execution",
        items: [
          "Go-to-market strategy",
          "Sales and marketing alignment",
          "Growth metrics and KPI definition",
          "Operational and team scaling guidance",
        ],
      },
      fundraising: {
        title: "Fundraising & Risk Management",
        items: [
          "Pitch deck and storytelling support",
          "Financial forecasting and unit economics",
          "Legal, tax, and compliance readiness",
          "Risk reduction and governance planning",
        ],
      },
    },
    whoForTitle: "Who This Service Is For",
    whoForItems: [
      "Early-stage startups and founders",
      "Growth-stage startups preparing to scale",
      "Founders seeking mentorship and direction",
      "Startups preparing for investment or expansion",
    ],
    resultTitle: "The Result",
    resultItems: [
      "Clear strategic direction",
      "Faster and more confident decision-making",
      "Reduced startup risks",
      "Strong investor readiness",
      "Scalable and sustainable business growth",
    ],
  },
  hi: {
    title: "स्टार्टअप सलाहकार",
    heading: "निर्माण, विस्तार और सफलता के लिए रणनीतिक मार्गदर्शन",
    intro: [
      "स्टार्टअप बनाना एक चुनौतीपूर्ण यात्रा होती है, जहाँ हर चरण पर सही निर्णय लेना बेहद ज़रूरी होता है। आइडिया वेलिडेशन से लेकर स्केलिंग और फंडिंग तक, संस्थापकों को कई रणनीतिक और ऑपरेशनल चुनौतियों का सामना करना पड़ता है।",
      "हमारी स्टार्टअप एडवाइजरी सेवाएँ संस्थापकों को स्पष्ट दिशा, विशेषज्ञ मार्गदर्शन और व्यावहारिक सपोर्ट प्रदान करती हैं। हमारा उद्देश्य जोखिम कम करना, विकास को तेज़ करना और निवेश के लिए तैयार व्यवसाय बनाना है।",
    ],
    businessImpactTitle: "इसका आपके स्टार्टअप के लिए क्या अर्थ है",
    strategicClarity: {
      title: "रणनीतिक स्पष्टता",
      items: [
        "स्पष्ट बिज़नेस विज़न और रोडमैप",
        "मार्केट वेलिडेशन और प्रोडक्ट-मार्केट फिट",
        "प्रतिस्पर्धी पोज़िशनिंग",
        "डेटा-आधारित निर्णय",
        "अनिश्चितता में कमी",
      ],
    },
    growthSupport: {
      title: "विकास और स्केलिंग सपोर्ट",
      items: [
        "स्केलेबल बिज़नेस मॉडल",
        "गो-टू-मार्केट रणनीति",
        "ग्राहक अधिग्रहण योजना",
        "ऑपरेशनल स्केलिंग फ्रेमवर्क",
        "प्रक्रियाओं का ऑप्टिमाइज़ेशन",
      ],
    },
    investorReadiness: {
      title: "निवेश और फंडिंग तैयारी",
      items: [
        "निवेश के लिए तैयार बिज़नेस स्ट्रक्चर",
        "पिच डेक और प्रेज़ेंटेशन सपोर्ट",
        "फाइनेंशियल मॉडल और प्रोजेक्शन",
        "जोखिम पहचान और नियंत्रण",
        "ड्यू डिलिजेंस तैयारी",
      ],
    },
    servicesTitle: "हमारी स्टार्टअप एडवाइजरी सेवाएँ",
    services: {
      validation: {
        title: "आइडिया वेलिडेशन और रणनीति",
        items: [
          "आइडिया मूल्यांकन",
          "मार्केट रिसर्च और ग्राहक सत्यापन",
          "बिज़नेस मॉडल और प्राइसिंग रणनीति",
          "MVP योजना और रोडमैप",
        ],
      },
      execution: {
        title: "ग्रोथ और एक्ज़ीक्यूशन",
        items: [
          "गो-टू-मार्केट प्लान",
          "सेल्स और मार्केटिंग संरेखण",
          "KPI और ग्रोथ मेट्रिक्स",
          "टीम और ऑपरेशनल स्केलिंग",
        ],
      },
      fundraising: {
        title: "फंडिंग और जोखिम प्रबंधन",
        items: [
          "पिच डेक और स्टोरीटेलिंग",
          "फाइनेंशियल फोरकास्टिंग",
          "कानूनी और टैक्स तैयारी",
          "जोखिम कम करने की रणनीति",
        ],
      },
    },
    whoForTitle: "किनके लिए उपयुक्त",
    whoForItems: [
        "प्रारंभिक चरण के स्टार्टअप और संस्थापक",
        "विकास-चरण के स्टार्टअप जो विस्तार की तैयारी कर रहे हैं",
        "परामर्श और दिशा की तलाश में संस्थापक",
        "निवेश या विस्तार की तैयारी कर रहे स्टार्टअप"
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "स्पष्ट रणनीतिक दिशा",
      "तेज़ और आत्मविश्वासपूर्ण निर्णय",
      "कम जोखिम",
      "निवेश के लिए तैयार स्टार्टअप",
      "दीर्घकालिक और टिकाऊ विकास",
    ],
  },
  mr: {
    title: "स्टार्टअप सल्लागार",
    heading: "उभारणी, विस्तार आणि यशासाठी धोरणात्मक मार्गदर्शन",
    intro: [
      "स्टार्टअप उभारणे म्हणजे सतत निर्णय, जोखीम आणि बदल यांचा प्रवास असतो. कल्पनेच्या पडताळणीपासून ते व्यवसाय वाढवणे आणि गुंतवणूक उभारणीपर्यंत प्रत्येक टप्प्यावर योग्य मार्गदर्शन आवश्यक असते।",
      "आमच्या स्टार्टअप सल्लागार सेवांद्वारे आम्ही उद्योजकांना स्पष्ट दिशा, तज्ज्ञ मार्गदर्शन आणि प्रत्यक्ष अंमलबजावणीसाठी मदत करतो. आमचा उद्देश जोखीम कमी करणे, वाढ जलद करणे आणि स्केलेबल व गुंतवणूक-योग्य व्यवसाय उभारणे हा आहे।",
    ],
    businessImpactTitle: "याचा तुमच्या स्टार्टअपसाठी अर्थ",
    strategicClarity: {
      title: "धोरणात्मक स्पष्टता",
      items: [
        "स्पष्ट व्यवसाय दृष्टी आणि रोडमॅप",
        "मार्केट पडताळणी आणि प्रोडक्ट-मार्केट फिट",
        "स्पर्धात्मक पोझिशनिंग",
        "डेटावर आधारित निर्णय",
        "अनिश्चितता कमी",
      ],
    },
    growthSupport: {
      title: "वाढ आणि स्केलिंग सपोर्ट",
      items: [
        "स्केलेबल व्यवसाय मॉडेल",
        "गो-टू-मार्केट रणनीती",
        "ग्राहक मिळवण्याचे नियोजन",
        "ऑपरेशनल स्केलिंग फ्रेमवर्क",
        "प्रक्रियांचे ऑप्टिमायझेशन",
      ],
    },
    investorReadiness: {
      title: "गुंतवणूक आणि फंडिंग तयारी",
      items: [
        "गुंतवणूकदारांसाठी तयार स्ट्रक्चर",
        "पिच डेक आणि स्टोरीटेलिंग",
        "आर्थिक अंदाज आणि मॉडेल्स",
        "जोखीम ओळख आणि नियंत्रण",
        "ड्यू डिलिजन्ससाठी तयारी",
      ],
    },
    servicesTitle: "आमच्या स्टार्टअप सल्लागार सेवा",
    services: {
      validation: {
        title: "कल्पना पडताळणी आणि रणनीती",
        items: [
          "कल्पना मूल्यांकन",
          "मार्केट रिसर्च आणि ग्राहक पडताळणी",
          "व्यवसाय मॉडेल आणि किंमत रणनीती",
          "MVP नियोजन आणि रोडमॅप",
        ],
      },
      execution: {
        title: "वाढ आणि अंमलबजावणी",
        items: [
          "गो-टू-मार्केट प्लॅन",
          "सेल्स व मार्केटिंग संरेखन",
          "KPI आणि ग्रोथ मेट्रिक्स",
          "टीम आणि ऑपरेशनल स्केलिंग",
        ],
      },
      fundraising: {
        title: "फंडिंग आणि जोखीम व्यवस्थापन",
        items: [
          "पिच डेक आणि प्रेझेंटेशन",
          "आर्थिक फोरकास्टिंग",
          "कायदेशीर व टॅक्स तयारी",
          "जोखीम कमी करण्याच्या रणनीती",
        ],
      },
    },
    whoForTitle: "कोणासाठी योग्य",
    whoForItems: [
        "सुरुवातीच्या टप्प्यातील स्टार्टअप्स आणि संस्थापक",
        "वाढीच्या टप्प्यातील स्टार्टअप्स जे विस्तारासाठी तयारी करत आहेत",
        "मार्गदर्शन आणि दिशा शोधणारे संस्थापक",
        "गुंतवणूक किंवा विस्तारासाठी तयारी करणारे स्टार्टअप्स",
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "स्पष्ट धोरणात्मक दिशा",
      "जलद आणि आत्मविश्वासपूर्ण निर्णय",
      "कमी जोखीम",
      "गुंतवणूक-योग्य स्टार्टअप",
      "शाश्वत आणि स्केलेबल वाढ",
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
            <DetailSection title={services.validation.title} items={services.validation.items} />
            <DetailSection title={services.execution.title} items={services.execution.items} />
            <DetailSection title={services.fundraising.title} items={services.fundraising.items} />
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

export default function StartupAdvisoryPage() {
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
              <h1 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mt-2 leading-tight">
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
                    <DetailSection title={t.strategicClarity.title} items={t.strategicClarity.items} />
                    <DetailSection title={t.growthSupport.title} items={t.growthSupport.items} />
                    <DetailSection title={t.investorReadiness.title} items={t.investorReadiness.items} />
                </CardContent>
            </Card>

            <ServicesProvidedSection title={t.servicesTitle} services={t.services} />
            
            <TargetedAudienceSection title={t.whoForTitle} items={t.whoForItems} />

            <TargetedAudienceSection title={t.resultTitle} items={t.resultItems} />

          </div>
        </div>
        <GetStartedSection serviceTitle={t.title} />
      </main>
      <Footer />
    </div>
  );
}
