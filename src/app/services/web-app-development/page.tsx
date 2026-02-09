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
    title: "Website & App Development",
    heading: "Digital Products Built for Performance, Growth, and Scale",
    intro: [
      "In a competitive digital economy, your website or application is far more than a marketing tool — it is a revenue engine, an operations hub, and a primary customer engagement platform. It is where visitors become customers, transactions take place, and long-term brand relationships are formed.",
      "We build digital products that are engineered to deliver consistent real-world performance under varying conditions. Our platforms are designed to support sustainable business growth by adapting to increasing traffic, evolving customer expectations, and changing market demands — without sacrificing speed, security, or reliability.",
      "Our solutions are built with a long-term vision. Every decision — from system architecture and technology stack to UI structure and user journeys — is carefully planned to ensure performance, security, stability, and seamless future expansion.",
    ],
    businessImpactTitle: "What This Means for Your Business",
    performance: {
      title: "Performance",
      items: [
        "Fast loading speed across all devices",
        "Optimized frontend and backend architecture",
        "Smooth and reliable user interactions",
        "High availability with minimal downtime",
        "SEO-friendly structure for better visibility",
      ],
    },
    growth: {
      title: "Growth",
      items: [
        "Conversion-focused user experience",
        "Lead generation and customer acquisition support",
        "Built-in analytics and performance tracking",
        "Integration with marketing and CRM tools",
        "Platforms that actively support sales and engagement",
      ],
    },
    scale: {
      title: "Scale",
      items: [
        "Modular and scalable system architecture",
        "Cloud-ready infrastructure",
        "Ability to handle traffic spikes smoothly",
        "Easy addition of new features and services",
        "Technology that grows with your business",
      ],
    },
    resultTitle: "The Result",
    resultItems: [
      "A digital platform that works as a business engine",
      "Improved user engagement and retention",
      "Higher conversions and revenue potential",
      "Reduced technical limitations over time",
      "A future-ready product built for long-term success",
    ],
  },
  hi: {
    title: "वेबसाइट और ऐप डेवलपमेंट",
    heading: "प्रदर्शन, विकास और विस्तार के लिए बनाए गए डिजिटल उत्पाद",
    intro: [
        "प्रतिस्पर्धी डिजिटल अर्थव्यवस्था में आपकी वेबसाइट या ऐप केवल एक मार्केटिंग टूल नहीं है — यह आपके व्यवसाय का राजस्व इंजन, ऑपरेशनल आधार और ग्राहकों से जुड़ने का मुख्य प्लेटफॉर्म है। यहीं पर विज़िटर ग्राहक बनते हैं, लेन-देन होते हैं और ब्रांड के साथ दीर्घकालिक संबंध बनते हैं।",
        "हम ऐसे डिजिटल उत्पाद विकसित करते हैं जो वास्तविक परिस्थितियों में निरंतर और भरोसेमंद प्रदर्शन देने के लिए बनाए जाते हैं। हमारे प्लेटफॉर्म बढ़ते ट्रैफिक, बदलती ग्राहक अपेक्षाओं और बाज़ार की माँगों के अनुसार खुद को ढाल सकते हैं — बिना स्पीड, सुरक्षा या स्थिरता से समझौता किए।",
        "हमारे सभी समाधान दीर्घकालिक दृष्टि के साथ तैयार किए जाते हैं। सिस्टम आर्किटेक्चर, टेक्नोलॉजी स्टैक, UI स्ट्रक्चर और यूज़र जर्नी — हर निर्णय परफॉर्मेंस, सुरक्षा और भविष्य के विस्तार को ध्यान में रखकर लिया जाता है।",
    ],
    businessImpactTitle: "इसका आपके व्यवसाय के लिए क्या अर्थ है",
    performance: {
      title: "परफॉर्मेंस",
      items: [
        "सभी डिवाइस पर तेज़ लोडिंग",
        "ऑप्टिमाइज़्ड फ्रंटएंड और बैकएंड",
        "स्मूद और भरोसेमंद यूज़र अनुभव",
        "न्यूनतम डाउनटाइम के साथ उच्च उपलब्धता",
        "बेहतर SEO के लिए सर्च-फ्रेंडली संरचना",
      ],
    },
    growth: {
      title: "विकास (Growth)",
      items: [
        "कन्वर्ज़न-केंद्रित यूज़र अनुभव",
        "लीड जनरेशन और ग्राहक अधिग्रहण सपोर्ट",
        "इन-बिल्ट एनालिटिक्स और ट्रैकिंग",
        "मार्केटिंग और CRM टूल इंटीग्रेशन",
        "सेल्स और एंगेजमेंट को सपोर्ट करने वाले प्लेटफॉर्म",
      ],
    },
    scale: {
      title: "विस्तार (Scale)",
      items: [
        "स्केलेबल और मॉड्यूलर सिस्टम आर्किटेक्चर",
        "क्लाउड-रेडी इंफ्रास्ट्रक्चर",
        "ट्रैफिक स्पाइक्स को आसानी से संभालने की क्षमता",
        "नए फीचर्स और सेवाएँ जोड़ने में आसानी",
        "व्यवसाय के साथ बढ़ने वाली टेक्नोलॉजी",
      ],
    },
    resultTitle: "परिणाम",
    resultItems: [
      "व्यवसाय को आगे बढ़ाने वाला डिजिटल प्लेटफॉर्म",
      "बेहतर यूज़र एंगेजमेंट और रिटेंशन",
      "ज़्यादा कन्वर्ज़न और राजस्व संभावनाएँ",
      "समय के साथ कम तकनीकी सीमाएँ",
      "भविष्य के लिए तैयार डिजिटल समाधान",
    ],
  },
  mr: {
    title: "वेबसाइट आणि ॲप डेव्हलपमेंट",
    heading: "परफॉर्मन्स, वाढ आणि स्केलिंगसाठी तयार डिजिटल उत्पादने",
    intro: [
        "स्पर्धात्मक डिजिटल अर्थव्यवस्थेत वेबसाइट किंवा मोबाइल ॲप हे केवळ मार्केटिंगचे साधन नसून संपूर्ण व्यवसायाचे उत्पन्न निर्माण करणारे केंद्र, ऑपरेशन्सचा कणा आणि ग्राहकांशी नातं जोडणारे मुख्य व्यासपीठ आहे. याच ठिकाणी भेट देणारे लोक ग्राहक बनतात, व्यवहार होतात आणि दीर्घकालीन ब्रँड नातेसंबंध तयार होतात.",
        "आम्ही अशी डिजिटल उत्पादने विकसित करतो जी प्रत्यक्ष वापरात सातत्यपूर्ण आणि विश्वासार्ह परफॉर्मन्स देतात. वाढता ट्रॅफिक, बदलत्या ग्राहक अपेक्षा आणि बाजारातील मागणी लक्षात घेऊन ही सिस्टीम्स डिझाइन केल्या जातात — वेग, सुरक्षा आणि स्थिरता अबाधित ठेवून.",
        "आमची सोल्युशन्स दीर्घकालीन दृष्टीकोनातून तयार केली जातात. सिस्टम आर्किटेक्चर, टेक स्टॅक, UI रचना आणि युजर फ्लो — प्रत्येक निर्णय परफॉर्मन्स, सुरक्षा, स्थिरता आणि भविष्यातील विस्तार लक्षात घेऊन घेतला जातो.",
    ],
    businessImpactTitle: "याचा तुमच्या व्यवसायासाठी अर्थ",
    performance: {
      title: "परफॉर्मन्स",
      items: [
        "सर्व डिव्हाइसवर जलद लोडिंग",
        "ऑप्टिमाइझ केलेला फ्रंटएंड आणि बॅकएंड",
        "स्मूद आणि विश्वासार्ह युजर अनुभव",
        "कमी डाउनटाइमसह उच्च उपलब्धता",
        "SEO-अनुकूल रचना",
      ],
    },
    growth: {
      title: "वाढ (Growth)",
      items: [
        "कन्वर्ज़न-केंद्रित युजर अनुभव",
        "लीड जनरेशन आणि ग्राहक मिळवण्यासाठी सपोर्ट",
        "इन-बिल्ट अ‍ॅनालिटिक्स आणि ट्रॅकिंग",
        "मार्केटिंग आणि CRM टूल्सशी इंटिग्रेशन",
        "विक्री आणि एंगेजमेंट वाढवणारे प्लॅटफॉर्म",
      ],
    },
    scale: {
      title: "स्केल (Scale)",
      items: [
        "स्केलेबल आणि मॉड्यूलर सिस्टम आर्किटेक्चर",
        "क्लाउड-रेडी इन्फ्रास्ट्रक्चर",
        "ट्रॅफिक वाढ सहज हाताळण्याची क्षमता",
        "नवीन फीचर्स व सेवा सहज जोडता येणे",
        "व्यवसायासोबत वाढणारे तंत्रज्ञान",
      ],
    },
    resultTitle: "परिणाम",
    resultItems: [
      "व्यवसायासाठी कार्य करणारे डिजिटल प्लॅटफॉर्म",
      "उत्तम ग्राहक एंगेजमेंट आणि रिटेंशन",
      "अधिक कन्वर्ज़न आणि उत्पन्न संधी",
      "काळानुसार कमी तांत्रिक मर्यादा",
      "भविष्यासाठी पूर्णपणे तयार समाधान",
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

const ResultSection = ({ title, items }: { title: string, items: string[] }) => (
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

export default function WebAppDevelopmentPage() {
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
                    <DetailSection title={t.performance.title} items={t.performance.items} />
                    <DetailSection title={t.growth.title} items={t.growth.items} />
                    <DetailSection title={t.scale.title} items={t.scale.items} />
                </CardContent>
            </Card>

            <ResultSection title={t.resultTitle} items={t.resultItems} />
          </div>
        </div>
        <GetStartedSection />
      </main>
      <Footer />
    </div>
  );
}
