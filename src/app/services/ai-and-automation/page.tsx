
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
    title: "AI & Automation",
    heading: "Smarter Systems That Reduce Effort, Increase Efficiency, and Scale Operations",
    intro: [
      "In a fast-moving digital economy, manual processes slow businesses down, increase costs, and limit scalability. AI and automation transform how businesses operate by reducing repetitive work, improving decision-making, and enabling teams to focus on high-value tasks.",
      "We design and implement intelligent automation systems that streamline workflows, optimize operations, and unlock new efficiencies across your organization. From simple task automation to advanced AI-driven systems, our solutions are practical, scalable, and aligned with real business needs.",
      "Our approach focuses on measurable outcomes — saving time, reducing errors, improving productivity, and creating systems that grow with your business.",
    ],
    businessImpactTitle: "What This Means for Your Business",
    operationalEfficiency: {
      title: "Operational Efficiency",
      items: [
        "Elimination of repetitive manual tasks",
        "Faster execution of day-to-day operations",
        "Reduced human error and rework",
        "Consistent and predictable workflows",
        "Lower operational costs over time",
      ],
    },
    intelligentDecisionMaking: {
      title: "Intelligent Decision-Making",
      items: [
        "Data-driven insights using AI models",
        "Automated reports and dashboards",
        "Real-time monitoring of key metrics",
        "Faster and more accurate decisions",
        "Improved forecasting and planning",
      ],
    },
    scalabilityAutomation: {
      title: "Scalability & Automation",
      items: [
        "Systems that work 24/7 without fatigue",
        "Ability to handle growing data and workloads",
        "Automation that scales with business growth",
        "Reduced dependency on manual resources",
        "Future-ready operational infrastructure",
      ],
    },
    servicesTitle: "AI & Automation Services We Provide",
    services: {
      workflow: {
        title: "Workflow & Process Automation",
        items: [
          "Business process automation (BPA)",
          "Approval flows and task automation",
          "Document processing and data extraction",
          "Automated notifications and alerts",
        ],
      },
      aiPowered: {
        title: "AI-Powered Solutions",
        items: [
          "AI chatbots for customer support and sales",
          "Intelligent recommendation systems",
          "AI-based data analysis and insights",
          "Natural language processing (NLP) use cases",
        ],
      },
      systemAutomation: {
        title: "Business System Automation",
        items: [
          "CRM and sales automation",
          "Marketing automation",
          "HR and payroll automation",
          "Finance and reporting automation",
        ],
      },
      integration: {
        title: "Integration & Optimization",
        items: [
          "Integration between multiple tools and platforms",
          "API-based automation",
          "Cloud-based automation workflows",
          "Continuous optimization and monitoring",
        ],
      },
    },
    whoForTitle: "Who This Service Is For",
    whoForItems: [
      "Startups looking to operate lean",
      "MSMEs reducing operational overhead",
      "Growing businesses scaling processes",
      "Enterprises modernizing operations",
    ],
    resultTitle: "The Result",
    resultItems: [
      "Faster operations with fewer resources",
      "Reduced costs and manual errors",
      "Improved productivity and efficiency",
      "Smarter decision-making",
      "Scalable systems ready for future growth",
    ],
  },
  hi: {
    title: "AI और ऑटोमेशन",
    heading: "कम मेहनत में ज़्यादा परिणाम देने वाले स्मार्ट सिस्टम",
    intro: [
      "आज की तेज़ रफ्तार डिजिटल अर्थव्यवस्था में मैन्युअल प्रक्रियाएँ व्यवसाय को धीमा कर देती हैं, लागत बढ़ाती हैं और स्केलेबिलिटी को सीमित करती हैं। AI और ऑटोमेशन व्यवसाय के काम करने के तरीके को पूरी तरह बदल देते हैं।",
      "हम ऐसे स्मार्ट ऑटोमेशन सिस्टम डिज़ाइन और लागू करते हैं जो वर्कफ़्लो को सरल बनाते हैं, ऑपरेशन्स को बेहतर करते हैं और टीम को महत्वपूर्ण कार्यों पर ध्यान देने की आज़ादी देते हैं।",
    ],
    businessImpactTitle: "इसका आपके व्यवसाय के लिए क्या अर्थ है",
    operationalEfficiency: {
      title: "ऑपरेशनल दक्षता",
      items: [
        "दोहराए जाने वाले मैन्युअल कार्यों का उन्मूलन",
        "रोज़मर्रा के कार्यों में तेज़ी",
        "मानवीय त्रुटियों में कमी",
        "एकसमान और भरोसेमंद वर्कफ़्लो",
        "समय के साथ कम ऑपरेशनल लागत",
      ],
    },
    intelligentDecisionMaking: {
      title: "स्मार्ट निर्णय क्षमता",
      items: [
        "AI के माध्यम से डेटा-आधारित इनसाइट्स",
        "ऑटोमेटेड रिपोर्ट्स और डैशबोर्ड",
        "रियल-टाइम परफॉर्मेंस मॉनिटरिंग",
        "तेज़ और सटीक निर्णय",
        "बेहतर प्लानिंग और फ़ोरकास्टिंग",
      ],
    },
    scalabilityAutomation: {
      title: "स्केलेबिलिटी और ऑटोमेशन",
      items: [
        "24/7 काम करने वाले सिस्टम",
        "बढ़ते डेटा और कार्यभार को संभालने की क्षमता",
        "व्यवसाय के साथ स्केल होने वाली ऑटोमेशन",
        "मैन्युअल संसाधनों पर निर्भरता में कमी",
        "भविष्य के लिए तैयार ऑपरेशनल ढांचा",
      ],
    },
    servicesTitle: "हमारी AI और ऑटोमेशन सेवाएँ",
    services: {
      workflow: {
        title: "वर्कफ़्लो और प्रोसेस ऑटोमेशन",
        items: [
          "बिज़नेस प्रोसेस ऑटोमेशन",
          "अप्रूवल और टास्क ऑटोमेशन",
          "डॉक्युमेंट प्रोसेसिंग और डेटा एक्सट्रैक्शन",
          "ऑटोमेटेड नोटिफिकेशन",
        ],
      },
      aiPowered: {
        title: "AI-आधारित समाधान",
        items: [
          "कस्टमर सपोर्ट और सेल्स के लिए AI चैटबॉट",
          "स्मार्ट रिकमेंडेशन सिस्टम",
          "AI-आधारित डेटा एनालिसिस",
          "NLP आधारित समाधान",
        ],
      },
      systemAutomation: {
        title: "बिज़नेस सिस्टम ऑटोमेशन",
        items: [
          "CRM और सेल्स ऑटोमेशन",
          "मार्केटिंग ऑटोमेशन",
          "HR और पेरोल ऑटोमेशन",
          "फाइनेंस और रिपोर्टिंग ऑटोमेशन",
        ],
      },
       integration: {
        title: "इंटीग्रेशन और ऑप्टिमाइज़ेशन",
        items: [
          "विभिन्न टूल्स और प्लेटफ़ॉर्म का इंटीग्रेशन",
          "API आधारित ऑटोमेशन",
          "क्लाउड ऑटोमेशन वर्कफ़्लो",
          "निरंतर मॉनिटरिंग और सुधार",
        ],
      },
    },
    whoForTitle: "किनके लिए उपयुक्त",
    whoForItems: [
      "लीन संचालन चाहने वाले स्टार्टअप",
      "परिचालन ओवरहेड कम करने वाले MSMEs",
      "बढ़ते व्यवसाय जो प्रक्रियाओं को बढ़ा रहे हैं",
      "संचालन का आधुनिकीकरण करने वाले उद्यम",
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "कम संसाधनों में तेज़ ऑपरेशन्स",
      "लागत और त्रुटियों में कमी",
      "बेहतर उत्पादकता",
      "स्मार्ट और तेज़ निर्णय",
      "भविष्य के लिए तैयार स्केलेबल सिस्टम",
    ],
  },
  mr: {
    title: "AI आणि ऑटोमेशन",
    heading: "कमी मेहनतीत अधिक परिणाम देणाऱ्या स्मार्ट प्रणाली",
    intro: [
      "आजच्या वेगवान डिजिटल युगात मॅन्युअल प्रक्रिया व्यवसायाला संथ करतात, खर्च वाढवतात आणि वाढीवर मर्यादा आणतात. AI आणि ऑटोमेशनमुळे व्यवसायाची कार्यपद्धती अधिक स्मार्ट आणि कार्यक्षम बनते।",
      "आम्ही अशी बुद्धिमान ऑटोमेशन सिस्टीम्स डिझाइन आणि अंमलात आणतो ज्या वर्कफ्लो सुलभ करतात, ऑपरेशन्स ऑप्टिमाइझ करतात आणि टीमला अधिक मूल्यवान कामांवर लक्ष केंद्रित करण्याची संधी देतात।",
    ],
    businessImpactTitle: "याचा तुमच्या व्यवसायासाठी अर्थ",
    operationalEfficiency: {
      title: "ऑपरेशनल कार्यक्षमता",
      items: [
        "पुनरावृत्ती होणारी मॅन्युअल कामे कमी",
        "दैनंदिन प्रक्रियांमध्ये वेग",
        "मानवी चुका आणि रीवर्क कमी",
        "सातत्यपूर्ण आणि विश्वासार्ह वर्कफ्लो",
        "दीर्घकाळात खर्चात बचत",
      ],
    },
    intelligentDecisionMaking: {
      title: "स्मार्ट निर्णयक्षमता",
      items: [
        "AI आधारित डेटा इनसाइट्स",
        "ऑटोमेटेड रिपोर्ट्स आणि डॅशबोर्ड",
        "रिअल-टाइम परफॉर्मन्स मॉनिटरिंग",
        "जलद आणि अचूक निर्णय",
        "उत्तम नियोजन आणि अंदाज",
      ],
    },
    scalabilityAutomation: {
      title: "स्केल आणि ऑटोमेशन",
      items: [
        "24/7 काम करणाऱ्या प्रणाली",
        "वाढता डेटा आणि वर्कलोड हाताळण्याची क्षमता",
        "व्यवसायासोबत स्केल होणारी ऑटोमेशन",
        "मॅन्युअल संसाधनांवरील अवलंबित्व कमी",
        "भविष्यासाठी तयार ऑपरेशनल इन्फ्रास्ट्रक्चर",
      ],
    },
    servicesTitle: "आमच्या AI आणि ऑटोमेशन सेवा",
    services: {
      workflow: {
        title: "वर्कफ्लो आणि प्रोसेस ऑटोमेशन",
        items: [
          "बिझनेस प्रोसेस ऑटोमेशन",
          "अप्रूवल आणि टास्क ऑटोमेशन",
          "डॉक्युमेंट प्रोसेसिंग आणि डेटा एक्सट्रॅक्शन",
          "ऑटोमेटेड अलर्ट्स आणि नोटिफिकेशन्स",
        ],
      },
      aiPowered: {
        title: "AI-आधारित सोल्युशन्स",
        items: [
          "कस्टमर सपोर्ट व सेल्ससाठी AI चॅटबॉट्स",
          "स्मार्ट रिकमेंडेशन सिस्टीम्स",
          "AI-आधारित डेटा विश्लेषण",
          "NLP आधारित युज केसेस",
        ],
      },
      systemAutomation: {
        title: "बिझनेस सिस्टीम ऑटोमेशन",
        items: [
          "CRM आणि सेल्स ऑटोमेशन",
          "मार्केटिंग ऑटोमेशन",
          "HR आणि पेरोल ऑटोमेशन",
          "फायनान्स आणि रिपोर्टिंग ऑटोमेशन",
        ],
      },
       integration: {
        title: "इंटिग्रेशन आणि ऑप्टिमायझेशन",
        items: [
          "विविध टूल्स आणि प्लॅटफॉर्मचे इंटिग्रेशन",
          "API आधारित ऑटोमेशन",
          "क्लाउड-आधारित वर्कफ्लो",
          "सतत मॉनिटरिंग आणि सुधारणा",
        ],
      },
    },
    whoForTitle: "कोणासाठी योग्य",
    whoForItems: [
        "कमी खर्चात काम करू पाहणारे स्टार्टअप्स",
        "ऑपरेशनल ओव्हरहेड कमी करणारे MSMEs",
        "प्रक्रिया वाढवणारे व्यवसाय",
        "ऑपरेशन्स आधुनिक करणारे एंटरप्राइज",
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "कमी संसाधनांत जलद ऑपरेशन्स",
      "खर्च व चुका कमी",
      "वाढलेली उत्पादकता",
      "स्मार्ट निर्णयक्षमता",
      "भविष्यासाठी तयार स्केलेबल सिस्टीम्स",
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
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 p-6 md:p-8">
            <DetailSection title={services.workflow.title} items={services.workflow.items} />
            <DetailSection title={services.aiPowered.title} items={services.aiPowered.items} />
            <DetailSection title={services.systemAutomation.title} items={services.systemAutomation.items} />
            <DetailSection title={services.integration.title} items={services.integration.items} />
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

export default function AiAndAutomationPage() {
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
                    <DetailSection title={t.operationalEfficiency.title} items={t.operationalEfficiency.items} />
                    <DetailSection title={t.intelligentDecisionMaking.title} items={t.intelligentDecisionMaking.items} />
                    <DetailSection title={t.scalabilityAutomation.title} items={t.scalabilityAutomation.items} />
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
