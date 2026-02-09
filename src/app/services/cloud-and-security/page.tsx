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
    title: "Cloud & Security",
    heading: "Reliable Infrastructure That Keeps Your Business Secure, Scalable, and Always Online",
    intro: [
      "In today’s always-on digital world, businesses depend heavily on cloud infrastructure and secure systems to operate smoothly. Downtime, data breaches, or poor infrastructure planning can directly impact revenue, reputation, and customer trust.",
      "We design, deploy, and manage secure cloud environments that ensure your applications, data, and systems remain highly available, protected, and scalable. Our cloud and security solutions are built to support modern businesses — from startups to enterprises — with a focus on reliability, performance, and risk mitigation.",
      "Our approach combines cloud engineering best practices with enterprise-grade security to create a strong, future-ready digital foundation.",
    ],
    businessImpactTitle: "What This Means for Your Business",
    cloudReliability: {
      title: "Cloud Reliability & Availability",
      items: [
        "Always-on infrastructure with high uptime",
        "Optimized cloud architecture for performance",
        "Load balancing and auto-scaling support",
        "Minimal downtime during updates and deployments",
        "Reliable access to applications and data",
      ],
    },
    dataSecurity: {
      title: "Data Security & Protection",
      items: [
        "Secure storage of sensitive business data",
        "Encryption at rest and in transit",
        "Role-based access control (RBAC)",
        "Protection against unauthorized access",
        "Regular security audits and monitoring",
      ],
    },
    scalability: {
      title: "Scalability & Cost Efficiency",
      items: [
        "Infrastructure that grows with your business",
        "Pay-as-you-use cloud cost optimization",
        "Efficient resource allocation",
        "Easy scaling during traffic spikes",
        "Reduced hardware and maintenance costs",
      ],
    },
    servicesTitle: "Cloud & Security Services We Provide",
    services: {
      cloudInfrastructure: {
        title: "Cloud Infrastructure & Management",
        items: [
          "Cloud setup (AWS, Azure, Google Cloud)",
          "Server provisioning and configuration",
          "Cloud migration and modernization",
          "Performance optimization",
          "Infrastructure monitoring and maintenance",
        ],
      },
      securityImplementation: {
        title: "Security Implementation",
        items: [
          "Application and server security hardening",
          "Firewall and network security setup",
          "Vulnerability assessment and patching",
          "Secure authentication and authorization",
          "Backup and disaster recovery planning",
        ],
      },
      devOps: {
        title: "DevOps & Automation",
        items: [
          "CI/CD pipeline setup",
          "Automated deployments",
          "Environment management",
          "Monitoring and alerting systems",
          "Continuous performance optimization",
        ],
      },
    },
    whoForTitle: "Who This Service Is For",
    whoForItems: [
      "Startups launching cloud-based products",
      "MSMEs moving to cloud infrastructure",
      "Businesses requiring high availability",
      "Enterprises modernizing legacy systems",
    ],
    resultTitle: "The Result",
    resultItems: [
      "Secure and reliable cloud infrastructure",
      "Reduced risk of data loss and breaches",
      "High application availability and performance",
      "Lower operational overhead",
      "Infrastructure ready to scale with business growth",
    ],
  },
  hi: {
    title: "क्लाउड और सिक्योरिटी",
    heading: "ऐसा इंफ्रास्ट्रक्चर जो आपके बिज़नेस को सुरक्षित, स्केलेबल और हमेशा ऑनलाइन रखे",
    intro: [
      "आज के डिजिटल युग में बिज़नेस की सफलता काफी हद तक उसके क्लाउड इंफ्रास्ट्रक्चर और डेटा सुरक्षा पर निर्भर करती है। सिस्टम डाउनटाइम, डेटा लीक या कमजोर सुरक्षा सीधे तौर पर व्यवसाय, राजस्व और ग्राहकों के भरोसे को प्रभावित कर सकते हैं।",
      "हम सुरक्षित और भरोसेमंद क्लाउड सिस्टम डिज़ाइन, डिप्लॉय और मैनेज करते हैं, जिससे आपके एप्लिकेशन और डेटा हर समय सुरक्षित और उपलब्ध रहते हैं। हमारे समाधान स्टार्टअप से लेकर एंटरप्राइज़ तक सभी के लिए बनाए गए हैं।",
    ],
    businessImpactTitle: "इसका आपके व्यवसाय के लिए क्या अर्थ है",
    cloudReliability: {
      title: "क्लाउड विश्वसनीयता और उपलब्धता",
      items: [
        "हाई अपटाइम के साथ हमेशा चालू सिस्टम",
        "बेहतर परफॉर्मेंस के लिए ऑप्टिमाइज़्ड आर्किटेक्चर",
        "लोड बैलेंसिंग और ऑटो-स्केलिंग",
        "अपडेट के दौरान न्यूनतम डाउनटाइम",
        "ऐप्स और डेटा की लगातार उपलब्धता",
      ],
    },
    dataSecurity: {
      title: "डेटा सुरक्षा और संरक्षण",
      items: [
        "संवेदनशील डेटा का सुरक्षित स्टोरेज",
        "डेटा एन्क्रिप्शन (रेस्ट और ट्रांज़िट में)",
        "रोल-बेस्ड एक्सेस कंट्रोल",
        "अनधिकृत एक्सेस से सुरक्षा",
        "नियमित सिक्योरिटी मॉनिटरिंग",
      ],
    },
    scalability: {
      title: "स्केलेबिलिटी और लागत नियंत्रण",
      items: [
        "बिज़नेस के साथ बढ़ने वाला इंफ्रास्ट्रक्चर",
        "उपयोग के अनुसार लागत मॉडल",
        "संसाधनों का कुशल उपयोग",
        "ट्रैफिक स्पाइक्स को आसानी से संभालना",
        "हार्डवेयर और मेंटेनेंस खर्च में कमी",
      ],
    },
    servicesTitle: "हमारी क्लाउड और सिक्योरिटी सेवाएँ",
    services: {
      cloudInfrastructure: {
        title: "क्लाउड इंफ्रास्ट्रक्चर",
        items: [
          "AWS / Azure / Google Cloud सेटअप",
          "सर्वर कॉन्फ़िगरेशन और मैनेजमेंट",
          "क्लाउड माइग्रेशन",
          "परफॉर्मेंस ऑप्टिमाइज़ेशन",
          "सिस्टम मॉनिटरिंग",
        ],
      },
      securityImplementation: {
        title: "सिक्योरिटी इम्प्लीमेंटेशन",
        items: [
          "एप्लिकेशन और सर्वर हार्डनिंग",
          "फ़ायरवॉल और नेटवर्क सिक्योरिटी",
          "वल्नरेबिलिटी स्कैन और पैचिंग",
          "सुरक्षित लॉगिन और ऑथेंटिकेशन",
          "बैकअप और डिज़ास्टर रिकवरी",
        ],
      },
      devOps: {
        title: "DevOps और ऑटोमेशन",
        items: [
          "CI/CD पाइपलाइन सेटअप",
          "ऑटोमेटेड डिप्लॉयमेंट",
          "एनवायरमेंट मैनेजमेंट",
          "मॉनिटरिंग और अलर्ट सिस्टम",
          "निरंतर परफॉर्मेंस सुधार",
        ],
      },
    },
    whoForTitle: "किनके लिए उपयुक्त",
    whoForItems: [
        "क्लाउड-आधारित उत्पाद लॉन्च करने वाले स्टार्टअप",
        "क्लाउड इंफ्रास्ट्रक्चर पर जाने वाले MSME",
        "उच्च उपलब्धता की आवश्यकता वाले व्यवसाय",
        "विरासत प्रणालियों का आधुनिकीकरण करने वाले उद्यम",
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "सुरक्षित और भरोसेमंद क्लाउड सिस्टम",
      "डेटा लॉस और साइबर जोखिमों में कमी",
      "बेहतर एप्लिकेशन परफॉर्मेंस",
      "कम ऑपरेशनल लागत",
      "भविष्य के लिए तैयार इंफ्रास्ट्रक्चर",
    ],
  },
  mr: {
    title: "क्लाउड आणि सिक्युरिटी",
    heading: "तुमचा व्यवसाय सुरक्षित, स्केलेबल आणि कायम ऑनलाइन ठेवणारे इन्फ्रास्ट्रक्चर",
    intro: [
      "आजच्या डिजिटल युगात व्यवसाय यशस्वी होण्यासाठी मजबूत क्लाउड इन्फ्रास्ट्रक्चर आणि डेटा सुरक्षा अत्यंत आवश्यक आहे। सिस्टीम डाउनटाइम, डेटा चोरी किंवा कमकुवत सुरक्षा याचा थेट परिणाम व्यवसाय, उत्पन्न आणि ग्राहकांच्या विश्वासावर होतो।",
      "आम्ही सुरक्षित, विश्वासार्ह आणि स्केलेबल क्लाउड सोल्युशन्स डिझाइन, अंमलात आणतो आणि व्यवस्थापित करतो, ज्यामुळे तुमची सिस्टीम सदैव उपलब्ध आणि संरक्षित राहते।",
    ],
    businessImpactTitle: "याचा तुमच्या व्यवसायासाठी अर्थ",
    cloudReliability: {
      title: "क्लाउड विश्वसनीयता आणि उपलब्धता",
      items: [
        "उच्च अपटाइमसह कायम कार्यरत सिस्टीम",
        "परफॉर्मन्ससाठी ऑप्टिमाइझ केलेली आर्किटेक्चर",
        "लोड बॅलन्सिंग आणि ऑटो-स्केलिंग",
        "अपडेट्सदरम्यान कमी डाउनटाइम",
        "ॲप्स आणि डेटाचा सातत्यपूर्ण वापर",
      ],
    },
    dataSecurity: {
      title: "डेटा सुरक्षा आणि संरक्षण",
      items: [
        "संवेदनशील डेटाचे सुरक्षित संचयन",
        "डेटा एन्क्रिप्शन (रेस्ट आणि ट्रान्झिटमध्ये)",
        "रोल-बेस्ड अ‍ॅक्सेस कंट्रोल",
        "अनधिकृत प्रवेशापासून संरक्षण",
        "सतत सिक्युरिटी मॉनिटरिंग",
      ],
    },
    scalability: {
      title: "स्केलेबिलिटी आणि खर्च नियंत्रण",
      items: [
        "व्यवसायासोबत वाढणारे इन्फ्रास्ट्रक्चर",
        "वापरानुसार खर्च नियंत्रण",
        "संसाधनांचा कार्यक्षम वापर",
        "ट्रॅफिक वाढ सहज हाताळण्याची क्षमता",
        "हार्डवेअर व मेंटेनन्स खर्चात बचत",
      ],
    },
    servicesTitle: "आमच्या क्लाउड आणि सिक्युरिटी सेवा",
    services: {
      cloudInfrastructure: {
        title: "क्लाउड इन्फ्रास्ट्रक्चर",
        items: [
          "AWS / Azure / Google Cloud सेटअप",
          "सर्व्हर कॉन्फिगरेशन आणि मॅनेजमेंट",
          "क्लाउड मायग्रेशन",
          "परफॉर्मन्स ऑप्टिमायझेशन",
          "सिस्टीम मॉनिटरिंग",
        ],
      },
      securityImplementation: {
        title: "सिक्युरिटी अंमलबजावणी",
        items: [
          "ॲप्लिकेशन आणि सर्व्हर हार्डनिंग",
          "फायरवॉल आणि नेटवर्क सिक्युरिटी",
          "वल्नरेबिलिटी स्कॅन आणि पॅचिंग",
          "सुरक्षित लॉगिन आणि ऑथेंटिकेशन",
          "बॅकअप आणि डिजास्टर रिकव्हरी",
        ],
      },
      devOps: {
        title: "DevOps आणि ऑटोमेशन",
        items: [
          "CI/CD पाइपलाइन सेटअप",
          "ऑटोमेटेड डिप्लॉयमेंट",
          "एनव्हायरमेंट मॅनेजमेंट",
          "मॉनिटरिंग आणि अलर्ट सिस्टीम",
          "सातत्यपूर्ण परफॉर्मन्स सुधारणा",
        ],
      },
    },
    whoForTitle: "कोणासाठी योग्य",
    whoForItems: [
        "क्लाउड-आधारित उत्पादने लॉन्च करणारे स्टार्टअप",
        "क्लाउड इन्फ्रास्ट्रक्चरवर जाणारे MSME",
        "उच्च उपलब्धता आवश्यक असलेले व्यवसाय",
        "लेगसी सिस्टम्सचे आधुनिकीकरण करणारे एंटरप्राइझ",
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "सुरक्षित आणि विश्वासार्ह क्लाउड इन्फ्रास्ट्रक्चर",
      "डेटा लॉस आणि सायबर धोके कमी",
      "उच्च ॲप्लिकेशन परफॉर्मन्स",
      "कमी ऑपरेशनल खर्च",
      "भविष्यासाठी तयार डिजिटल पायाभूत सुविधा",
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
            <DetailSection title={services.cloudInfrastructure.title} items={services.cloudInfrastructure.items} />
            <DetailSection title={services.securityImplementation.title} items={services.securityImplementation.items} />
            <DetailSection title={services.devOps.title} items={services.devOps.items} />
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

export default function CloudAndSecurityPage() {
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
                    <DetailSection title={t.cloudReliability.title} items={t.cloudReliability.items} />
                    <DetailSection title={t.dataSecurity.title} items={t.dataSecurity.items} />
                    <DetailSection title={t.scalability.title} items={t.scalability.items} />
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
