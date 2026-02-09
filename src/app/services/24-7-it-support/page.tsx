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
    title: "24/7 IT Support",
    heading: "Reliable Technical Support That Keeps Your Business Running Without Interruptions",
    intro: [
      "In a technology-driven business environment, even a small technical issue can cause major disruptions, revenue loss, and customer dissatisfaction. Systems need to be monitored, issues must be resolved quickly, and support should be available whenever problems arise — not just during office hours.",
      "Our 24/7 IT Support services ensure your digital systems, applications, and infrastructure run smoothly at all times. We act as your extended IT team, providing proactive monitoring, rapid issue resolution, and continuous technical assistance to minimize downtime and maintain business continuity.",
      "Our goal is simple: keep your business operational, secure, and productive — day and night.",
    ],
    businessImpactTitle: "What This Means for Your Business",
    alwaysOnSupport: {
      title: "Always-On Support",
      items: [
        "Round-the-clock technical assistance",
        "Immediate response to critical issues",
        "Support beyond regular business hours",
        "No dependency on internal availability",
        "Peace of mind knowing help is always available",
      ],
    },
    systemStability: {
      title: "System Stability & Uptime",
      items: [
        "Continuous monitoring of systems and servers",
        "Early detection of potential issues",
        "Faster issue resolution and recovery",
        "Reduced downtime and service interruptions",
        "Stable and reliable IT environment",
      ],
    },
    businessContinuity: {
      title: "Business Continuity",
      items: [
        "Minimal impact of technical failures",
        "Backup and recovery readiness",
        "Incident handling and escalation",
        "Reduced operational risks",
        "Uninterrupted customer experience",
      ],
    },
    servicesTitle: "24/7 IT Support Services We Provide",
    services: {
      technicalSupport: {
        title: "Technical Support & Troubleshooting",
        items: [
          "Application and software support",
          "Server and infrastructure issue resolution",
          "Website and system uptime monitoring",
          "Bug fixing and performance issues",
          "User-level technical assistance",
        ],
      },
      monitoring: {
        title: "Monitoring & Maintenance",
        items: [
          "24/7 system health monitoring",
          "Log monitoring and alerts",
          "Preventive maintenance activities",
          "Performance optimization",
          "Regular system checks",
        ],
      },
      security: {
        title: "Security & Incident Response",
        items: [
          "Security incident detection and response",
          "Malware and threat handling",
          "Access and permission management",
          "Backup verification and recovery support",
          "Emergency response for critical failures",
        ],
      },
    },
    whoForTitle: "Who This Service Is For",
    whoForItems: [
      "Businesses requiring uninterrupted operations",
      "Startups running live digital platforms",
      "MSMEs with limited internal IT resources",
      "Enterprises needing continuous system availability",
    ],
    resultTitle: "The Result",
    resultItems: [
      "Near-zero downtime operations",
      "Faster issue resolution",
      "Stable and secure systems",
      "Reduced operational stress",
      "Confidence to focus on core business",
    ],
  },
  hi: {
    title: "24/7 आईटी सपोर्ट",
    heading: "ऐसी तकनीकी सहायता जो आपके व्यवसाय को बिना रुके चलने दे",
    intro: [
      "आज के तकनीक-आधारित व्यवसाय वातावरण में एक छोटी-सी तकनीकी समस्या भी बड़े व्यवधान और नुकसान का कारण बन सकती है। सिस्टम की निगरानी, तेज़ समाधान और हर समय उपलब्ध सपोर्ट व्यवसाय की निरंतरता के लिए आवश्यक है।",
      "हमारी 24/7 आईटी सपोर्ट सेवाएँ सुनिश्चित करती हैं कि आपके सिस्टम, एप्लिकेशन और इंफ्रास्ट्रक्चर हर समय सुचारू रूप से काम करें। हम आपकी एक्सटेंडेड आईटी टीम की तरह काम करते हैं, ताकि डाउनटाइम कम से कम हो और समस्याओं का तुरंत समाधान हो सके।",
    ],
    businessImpactTitle: "इसका आपके व्यवसाय के लिए क्या अर्थ है",
    alwaysOnSupport: {
      title: "हमेशा उपलब्ध सहायता",
      items: [
        "24x7 तकनीकी सपोर्ट",
        "गंभीर समस्याओं पर तुरंत प्रतिक्रिया",
        "ऑफिस समय से बाहर भी सहायता",
        "आंतरिक टीम पर निर्भरता में कमी",
        "मानसिक शांति और भरोसा",
      ],
    },
    systemStability: {
      title: "सिस्टम स्थिरता और अपटाइम",
      items: [
        "सिस्टम और सर्वर की निरंतर निगरानी",
        "समस्याओं की शुरुआती पहचान",
        "तेज़ रिकवरी और समाधान",
        "डाउनटाइम और रुकावट में कमी",
        "स्थिर और भरोसेमंद IT वातावरण",
      ],
    },
    businessContinuity: {
      title: "व्यवसाय निरंतरता",
      items: [
        "तकनीकी विफलताओं का न्यूनतम प्रभाव",
        "बैकअप और रिकवरी की तैयारी",
        "इन्सिडेंट हैंडलिंग",
        "ऑपरेशनल जोखिमों में कमी",
        "ग्राहकों के अनुभव में बाधा नहीं",
      ],
    },
    servicesTitle: "हमारी 24/7 आईटी सपोर्ट सेवाएँ",
    services: {
      technicalSupport: {
        title: "टेक्निकल सपोर्ट और ट्रबलशूटिंग",
        items: [
          "सॉफ्टवेयर और एप्लिकेशन सपोर्ट",
          "सर्वर और इंफ्रास्ट्रक्चर समस्याएँ",
          "वेबसाइट अपटाइम मॉनिटरिंग",
          "बग फिक्स और परफॉर्मेंस सुधार",
          "यूज़र-लेवल सपोर्ट",
        ],
      },
      monitoring: {
        title: "मॉनिटरिंग और मेंटेनेंस",
        items: [
          "24/7 सिस्टम हेल्थ मॉनिटरिंग",
          "लॉग और अलर्ट मैनेजमेंट",
          "प्रिवेंटिव मेंटेनेंस",
          "परफॉर्मेंस ऑप्टिमाइज़ेशन",
          "नियमित सिस्टम चेक",
        ],
      },
      security: {
        title: "सिक्योरिटी और इमरजेंसी रिस्पॉन्स",
        items: [
          "सिक्योरिटी घटनाओं की पहचान",
          "मैलवेयर और थ्रेट रिस्पॉन्स",
          "एक्सेस और परमिशन मैनेजमेंट",
          "बैकअप और रिकवरी सपोर्ट",
          "क्रिटिकल फेल्योर पर त्वरित सहायता",
        ],
      },
    },
    whoForTitle: "किनके लिए उपयुक्त",
    whoForItems: [
        "निरंतर संचालन की आवश्यकता वाले व्यवसाय",
        "लाइव डिजिटल प्लेटफॉर्म चलाने वाले स्टार्टअप",
        "सीमित आंतरिक आईटी संसाधनों वाले एमएसएमई",
        "निरंतर सिस्टम उपलब्धता की आवश्यकता वाले उद्यम",
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "लगभग शून्य डाउनटाइम",
      "तेज़ समस्या समाधान",
      "सुरक्षित और स्थिर सिस्टम",
      "कम ऑपरेशनल तनाव",
      "व्यवसाय पर पूरा फोकस",
    ],
  },
  mr: {
    title: "24/7 आयटी सपोर्ट",
    heading: "तुमचा व्यवसाय अखंड चालू ठेवणारी तांत्रिक मदत",
    intro: [
      "आजच्या तंत्रज्ञानावर आधारित व्यवसाय वातावरणात लहानशी तांत्रिक अडचणसुद्धा मोठे नुकसान करू शकते। सिस्टीमची सतत देखरेख, वेगवान समस्या निवारण आणि कोणत्याही वेळी उपलब्ध असलेला सपोर्ट व्यवसाय सातत्यासाठी अत्यावश्यक आहे।",
      "आमची 24/7 आयटी सपोर्ट सेवा तुमच्या सिस्टीम्स, ॲप्लिकेशन्स आणि इन्फ्रास्ट्रक्चरला सदैव सुरळीत ठेवते। आम्ही तुमच्या एक्सटेंडेड आयटी टीमप्रमाणे काम करून डाउनटाइम कमी करतो आणि समस्या त्वरित सोडवतो।",
    ],
    businessImpactTitle: "याचा तुमच्या व्यवसायासाठी अर्थ",
    alwaysOnSupport: {
      title: "सतत उपलब्ध मदत",
      items: [
        "24x7 तांत्रिक सहाय्य",
        "गंभीर समस्यांवर त्वरित प्रतिसाद",
        "ऑफिस वेळेच्या बाहेरही सपोर्ट",
        "इन-हाऊस टीमवरील अवलंबित्व कमी",
        "मानसिक शांतता आणि विश्वास",
      ],
    },
    systemStability: {
      title: "सिस्टीम स्थिरता आणि अपटाइम",
      items: [
        "सिस्टीम व सर्व्हरची सतत देखरेख",
        "समस्यांची लवकर ओळख",
        "जलद रिकव्हरी आणि निराकरण",
        "डाउनटाइम आणि अडथळे कमी",
        "विश्वासार्ह आयटी वातावरण",
      ],
    },
    businessContinuity: {
      title: "व्यवसाय सातत्य",
      items: [
        "तांत्रिक बिघाडांचा कमी परिणाम",
        "बॅकअप आणि रिकव्हरीची तयारी",
        "इन्सिडेंट हँडलिंग",
        "ऑपरेशनल धोके कमी",
        "ग्राहक अनुभवात खंड न पडणे",
      ],
    },
    servicesTitle: "आमच्या 24/7 आयटी सपोर्ट सेवा",
    services: {
      technicalSupport: {
        title: "तांत्रिक सहाय्य आणि ट्रबलशूटिंग",
        items: [
          "सॉफ्टवेअर आणि ॲप्लिकेशन सपोर्ट",
          "सर्व्हर आणि इन्फ्रास्ट्रक्चर समस्या",
          "वेबसाइट अपटाइम मॉनिटरिंग",
          "बग फिक्स आणि परफॉर्मन्स सुधारणा",
          "युजर-लेव्हल सपोर्ट",
        ],
      },
      monitoring: {
        title: "मॉनिटरिंग आणि मेंटेनन्स",
        items: [
          "24/7 सिस्टीम हेल्थ मॉनिटरिंग",
          "लॉग्स आणि अलर्ट व्यवस्थापन",
          "प्रिव्हेंटिव मेंटेनन्स",
          "परफॉर्मन्स ऑप्टिमायझेशन",
          "नियमित सिस्टीम तपासणी",
        ],
      },
      security: {
        title: "सिक्युरिटी आणि इमरजन्सी रिस्पॉन्स",
        items: [
          "सिक्युरिटी इन्सिडेंट ओळख",
          "मॅलवेअर व थ्रेट रिस्पॉन्स",
          "अ‍ॅक्सेस आणि परमिशन मॅनेजमेंट",
          "बॅकअप व रिकव्हरी सपोर्ट",
          "क्रिटिकल फेल्युअरवर त्वरित मदत",
        ],
      },
    },
    whoForTitle: "कोणासाठी योग्य",
    whoForItems: [
        "अखंडित ऑपरेशन्स आवश्यक असलेले व्यवसाय",
        "लाइव्ह डिजिटल प्लॅटफॉर्म चालवणारे स्टार्टअप",
        "मर्यादित अंतर्गत आयटी संसाधने असलेले एमएसएमई",
        "सतत सिस्टम उपलब्धतेची आवश्यकता असलेले उद्योग",
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "जवळपास शून्य डाउनटाइम",
      "जलद समस्या निराकरण",
      "सुरक्षित आणि स्थिर सिस्टीम्स",
      "कमी ऑपरेशनल ताण",
      "व्यवसाय वाढीवर पूर्ण लक्ष",
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
            <DetailSection title={services.technicalSupport.title} items={services.technicalSupport.items} />
            <DetailSection title={services.monitoring.title} items={services.monitoring.items} />
            <DetailSection title={services.security.title} items={services.security.items} />
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

export default function ITSupportPage() {
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
                    <DetailSection title={t.alwaysOnSupport.title} items={t.alwaysOnSupport.items} />
                    <DetailSection title={t.systemStability.title} items={t.systemStability.items} />
                    <DetailSection title={t.businessContinuity.title} items={t.businessContinuity.items} />
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
