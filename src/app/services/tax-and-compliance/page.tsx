'use client';

import { useLanguage } from '@/context/language-provider';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const content = {
  en: {
    title: "Tax & Compliance",
    heading: "Simplifying Regulations, Ensuring Compliance, Enabling Growth",
    intro: [
      "In today’s regulatory-driven business environment, compliance is not optional — it is critical to business continuity, credibility, and growth. Managing taxes, filings, and legal obligations can become complex and time-consuming, especially for startups and growing businesses.",
      "We provide end-to-end tax and compliance support that ensures your business remains legally compliant while allowing you to focus entirely on operations and growth. Our approach combines expert knowledge, structured processes, and proactive compliance management to eliminate risk and uncertainty.",
      "Our services are designed to grow with your business — from initial registration to ongoing filings, audits, and advisory.",
    ],
    businessImpactTitle: "What This Means for Your Business",
    regulatoryCompliance: {
      title: "Regulatory Compliance",
      items: [
        "Timely compliance with all statutory requirements",
        "Accurate filings as per current laws and regulations",
        "Reduced risk of penalties, notices, and legal issues",
        "Structured documentation and record maintenance",
        "Peace of mind through expert oversight",
      ],
    },
    taxManagement: {
      title: "Tax Management",
      items: [
        "Proper tax planning and optimization",
        "Accurate tax calculations and filings",
        "GST, Income Tax, and statutory returns handled professionally",
        "Avoidance of late fees and interest",
        "Compliance aligned with business cash flow",
      ],
    },
    businessContinuity: {
        title: "Business Continuity & Trust",
        items: [
            "Strong legal foundation for long-term operations",
            "Increased credibility with banks, investors, and partners",
            "Readiness for audits and due diligence",
            "Transparent and compliant financial practices",
            "Reduced compliance-related disruptions",
        ]
    },
    servicesTitle: "Services We Provide",
    services: {
        registrations: {
            title: "Registrations & Setup",
            items: ["Company, LLP, Proprietorship Registration", "GST Registration", "PAN, TAN & Statutory Registrations"]
        },
        ongoing: {
            title: "Ongoing Compliance",
            items: ["GST Return Filing", "Income Tax Return Filing", "TDS & Statutory Filings", "ROC & Annual Compliance"]
        },
        advisory: {
            title: "Advisory & Support",
            items: ["Tax Planning & Advisory", "Compliance Monitoring", "Notice Handling & Representation", "Documentation & Record Management"]
        }
    },
    whoForTitle: "Who This Service Is For",
    whoForItems: [
        "Startups and new businesses",
        "MSMEs and growing enterprises",
        "Businesses seeking compliance support",
        "Companies preparing for audits or funding",
    ],
    resultTitle: "The Result",
    resultItems: [
        "Fully compliant and legally secure business",
        "Reduced compliance risk and penalties",
        "Time and cost savings",
        "Confidence to scale without legal concerns",
        "A strong foundation for sustainable growth",
    ],
  },
  hi: {
    title: "टैक्स और कंप्लायंस",
    heading: "नियमों को सरल बनाना, अनुपालन सुनिश्चित करना, विकास को सक्षम बनाना",
    intro: [
      "आज के नियम-आधारित कारोबारी माहौल में टैक्स और कानूनी अनुपालन कोई विकल्प नहीं है — यह व्यवसाय की स्थिरता, विश्वसनीयता और विकास के लिए अनिवार्य है। जैसे-जैसे व्यवसाय बढ़ता है, टैक्स और कंप्लायंस की जटिलताएँ भी बढ़ती जाती हैं।",
      "हम संपूर्ण टैक्स और कंप्लायंस सेवाएँ प्रदान करते हैं ताकि आपका व्यवसाय हर कानूनी आवश्यकता को समय पर पूरा करे और आप बिना किसी चिंता के अपने मुख्य कार्यों पर ध्यान दे सकें।",
    ],
    businessImpactTitle: "इसका आपके व्यवसाय के लिए क्या अर्थ है",
    regulatoryCompliance: {
      title: "कानूनी अनुपालन",
      items: [
        "सभी वैधानिक नियमों का समय पर पालन",
        "वर्तमान कानूनों के अनुसार सटीक फाइलिंग",
        "जुर्माने, नोटिस और कानूनी जोखिमों में कमी",
        "सुव्यवस्थित दस्तावेज़ और रिकॉर्ड प्रबंधन",
        "विशेषज्ञों की निगरानी से मानसिक शांति",
      ],
    },
    taxManagement: {
        title: "टैक्स प्रबंधन",
        items: [
            "सही टैक्स प्लानिंग और ऑप्टिमाइज़ेशन",
            "सटीक टैक्स गणना और रिटर्न फाइलिंग",
            "GST, इनकम टैक्स और अन्य रिटर्न",
            "लेट फीस और ब्याज से बचाव",
            "कैश फ्लो के अनुरूप टैक्स स्ट्रक्चर",
        ]
    },
    businessContinuity: {
        title: "व्यवसाय की निरंतरता और भरोसा",
        items: [
            "व्यवसाय के लिए मजबूत कानूनी आधार",
            "बैंकों और निवेशकों के साथ विश्वसनीयता",
            "ऑडिट और ड्यू डिलिजेंस के लिए तैयारी",
            "पारदर्शी और अनुपालन योग्य वित्तीय प्रक्रिया",
            "अनुपालन से जुड़ी बाधाओं में कमी",
        ]
    },
    servicesTitle: "हम कौन-सी सेवाएँ प्रदान करते हैं",
    services: {
        registrations: {
            title: "रजिस्ट्रेशन और सेटअप",
            items: ["कंपनी, LLP, प्रोप्राइटरशिप रजिस्ट्रेशन", "GST रजिस्ट्रेशन", "PAN, TAN और अन्य पंजीकरण"]
        },
        ongoing: {
            title: "नियमित कंप्लायंस",
            items: ["GST रिटर्न फाइलिंग", "इनकम टैक्स रिटर्न", "TDS और वैधानिक फाइलिंग", "ROC और वार्षिक कंप्लायंस"]
        },
        advisory: {
            title: "सलाह और सहायता",
            items: ["टैक्स प्लानिंग और परामर्श", "कंप्लायंस मॉनिटरिंग", "नोटिस हैंडलिंग और रिप्रेजेंटेशन", "डॉक्युमेंटेशन और रिकॉर्ड प्रबंधन"]
        }
    },
    whoForTitle: "किनके लिए उपयुक्त",
    whoForItems: [
        "स्टार्टअप्स और नए व्यवसाय",
        "MSMEs और बढ़ते उद्योग",
        "कंप्लायंस सपोर्ट चाहने वाले व्यवसाय",
        "ऑडिट या फंडिंग की तैयारी कर रहे संगठन",
    ],
    resultTitle: "परिणाम",
    resultItems: [
        "पूरी तरह से अनुपालन योग्य व्यवसाय",
        "कानूनी जोखिम और जुर्मानों में कमी",
        "समय और लागत की बचत",
        "बिना चिंता के स्केल करने की क्षमता",
        "दीर्घकालिक और सुरक्षित व्यवसाय वृद्धि",
    ],
  },
  mr: {
    title: "टॅक्स आणि कंप्लायन्स",
    heading: "नियम सुलभ करणे, अनुपालन सुनिश्चित करणे, व्यवसाय वाढीस सक्षम बनवणे",
    intro: [
      "आजच्या नियमप्रधान व्यवसाय वातावरणात टॅक्स आणि कायदेशीर अनुपालन ही गरज आहे — ती पर्याय नाही. व्यवसाय जसजसा वाढतो तसतशा टॅक्स आणि कंप्लायन्सशी संबंधित जबाबदाऱ्या अधिक जटिल होत जातात।",
      "आम्ही एंड-टू-एंड टॅक्स आणि कंप्लायन्स सेवा पुरवतो, ज्यामुळे तुमचा व्यवसाय सर्व कायदेशीर नियमांचे वेळेत पालन करतो आणि तुम्ही निश्चिंतपणे व्यवसाय वाढीवर लक्ष केंद्रित करू शकता.",
    ],
    businessImpactTitle: "याचा तुमच्या व्यवसायासाठी अर्थ",
    regulatoryCompliance: {
      title: "कायदेशीर अनुपालन",
      items: [
        "सर्व वैधानिक नियमांचे वेळेवर पालन",
        "अद्ययावत कायद्यांनुसार अचूक फाइलिंग",
        "दंड, नोटीस आणि कायदेशीर धोके कमी",
        "व्यवस्थित डॉक्युमेंटेशन आणि रेकॉर्ड्स",
        "तज्ञांच्या देखरेखीखाली अनुपालन",
      ],
    },
     taxManagement: {
        title: "टॅक्स व्यवस्थापन",
        items: [
            "योग्य टॅक्स प्लानिंग आणि ऑप्टिमायझेशन",
            "अचूक कर गणना आणि रिटर्न फाइलिंग",
            "GST, इन्कम टॅक्स आणि इतर रिटर्न्स",
            "लेट फी व व्याज टाळणे",
            "कॅश फ्लोनुसार टॅक्स स्ट्रक्चर",
        ]
    },
    businessContinuity: {
        title: "व्यवसायाची विश्वासार्हता आणि सातत्य",
        items: [
            "व्यवसायासाठी मजबूत कायदेशीर पाया",
            "बँका, गुंतवणूकदार आणि भागीदारांचा विश्वास",
            "ऑडिट आणि ड्यू डिलिजन्ससाठी तयारी",
            "पारदर्शक व अनुपालनक्षम आर्थिक प्रक्रिया",
            "अनुपालनाशी संबंधित अडथळे कमी",
        ]
    },
    servicesTitle: "आम्ही पुरवणाऱ्या सेवा",
    services: {
        registrations: {
            title: "नोंदणी आणि सेटअप",
            items: ["कंपनी, LLP, प्रोप्रायटरशिप नोंदणी", "GST नोंदणी", "PAN, TAN आणि इतर नोंदण्या"]
        },
        ongoing: {
            title: "नियमित कंप्लायन्स",
            items: ["GST रिटर्न फाइलिंग", "इन्कम टॅक्स रिटर्न", "TDS आणि वैधानिक फाइलिंग", "ROC आणि वार्षिक अनुपालन"]
        },
        advisory: {
            title: "सल्ला आणि सहाय्य",
            items: ["टॅक्स प्लानिंग व सल्ला", "कंप्लायन्स मॉनिटरिंग", "नोटीस हँडलिंग आणि प्रतिनिधित्व", "डॉक्युमेंटेशन आणि रेकॉर्ड मॅनेजमेंट"]
        }
    },
    whoForTitle: "कोणासाठी योग्य",
    whoForItems: [
        "स्टार्टअप्स आणि नवोदित व्यवसाय",
        "MSMEs आणि वाढणारे उद्योग",
        "कंप्लायन्स सपोर्ट आवश्यक असलेले व्यवसाय",
        "ऑडिट किंवा फंडिंगसाठी तयारी करणारे संघ",
    ],
    resultTitle: "परिणाम",
    resultItems: [
        "पूर्णपणे अनुपालनक्षम आणि सुरक्षित व्यवसाय",
        "दंड व कायदेशीर धोके कमी",
        "वेळ आणि खर्चाची बचत",
        "निर्धास्तपणे व्यवसाय स्केल करण्याची क्षमता",
        "दीर्घकालीन आणि स्थिर व्यवसाय वाढ",
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
            <DetailSection title={services.registrations.title} items={services.registrations.items} />
            <DetailSection title={services.ongoing.title} items={services.ongoing.items} />
            <DetailSection title={services.advisory.title} items={services.advisory.items} />
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

export default function TaxAndCompliancePage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container">
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
                    <DetailSection title={t.regulatoryCompliance.title} items={t.regulatoryCompliance.items} />
                    <DetailSection title={t.taxManagement.title} items={t.taxManagement.items} />
                    <DetailSection title={t.businessContinuity.title} items={t.businessContinuity.items} />
                </CardContent>
            </Card>

            <ServicesProvidedSection title={t.servicesTitle} services={t.services} />
            
            <TargetedAudienceSection title={t.whoForTitle} items={t.whoForItems} />

            <TargetedAudienceSection title={t.resultTitle} items={t.resultItems} />

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
