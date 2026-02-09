
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
    title: "Business Setup",
    heading: "From Idea to a Fully Operational Business",
    intro: [
      "Starting a business is more than registering a name — it involves strategic planning, legal structuring, compliance, financial readiness, and operational clarity. A strong setup at the beginning lays the foundation for sustainable growth, investor confidence, and long-term success.",
      "We provide end-to-end business setup services that transform your idea into a legally compliant, operational, and scalable business. From choosing the right business structure to completing registrations, documentation, and initial operational setup — we guide you at every step.",
      "Our approach ensures that your business is built correctly from day one, avoiding future legal, tax, and operational complications.",
    ],
    businessImpactTitle: "What This Means for Your Business",
    strategicFoundation: {
      title: "Strategic Foundation",
      items: [
        "Clear understanding of your business model",
        "Guidance on choosing the right business structure",
        "Alignment of legal setup with long-term goals",
        "Reduced risk of restructuring in the future",
        "Strong base for growth and investment",
      ],
    },
    legalRegulatory: {
      title: "Legal & Regulatory Readiness",
      items: [
        "Proper registrations as per business type",
        "Compliance with applicable laws and regulations",
        "Accurate documentation and filings",
        "Reduced legal risks and penalties",
        "Smooth interaction with government authorities",
      ],
    },
    operationalPreparedness: {
      title: "Operational Preparedness",
      items: [
        "Business ready to operate from day one",
        "Banking and financial setup support",
        "Digital and operational system readiness",
        "Clear roles, processes, and workflows",
        "Confidence to start operations immediately",
      ],
    },
    servicesTitle: "Services We Provide",
    services: {
      structuring: {
        title: "Business Structuring & Planning",
        items: [
          "Business model assessment",
          "Proprietorship, Partnership, LLP, or Company selection",
          "Advisory on tax and compliance implications",
          "Scalability and investment-readiness planning",
        ],
      },
      registrations: {
        title: "Registrations & Documentation",
        items: [
          "Company / LLP / Proprietorship Registration",
          "MSME (Udyam) Registration",
          "GST Registration (if applicable)",
          "PAN, TAN, and other statutory registrations",
          "Drafting of basic legal documents",
        ],
      },
      financial: {
        title: "Banking & Financial Setup",
        items: [
          "Current account opening support",
          "Coordination with banks and institutions",
          "Financial documentation assistance",
          "Initial compliance planning",
        ],
      },
       digital: {
        title: "Digital & Operational Setup",
        items: [
          "Basic digital presence guidance",
          "Operational process setup",
          "Compliance calendar creation",
          "Launch-readiness support",
        ],
      },
    },
    whoForTitle: "Who This Service Is For",
    whoForItems: [
      "First-time entrepreneurs",
      "Startups and founders with new ideas",
      "MSMEs formalizing their operations",
      "Businesses transitioning from informal to formal setup",
    ],
    resultTitle: "The Result",
    resultItems: [
      "A legally compliant and structured business",
      "Faster and smoother business launch",
      "Reduced legal and operational risks",
      "Strong foundation for scaling and funding",
      "Confidence to focus on growth from day one",
    ],
  },
  hi: {
    title: "बिज़नेस सेटअप",
    heading: "विचार से पूरी तरह संचालित व्यवसाय तक",
    intro: [
      "व्यवसाय शुरू करना केवल नाम रजिस्टर कराने तक सीमित नहीं होता — इसके लिए सही योजना, कानूनी संरचना, अनुपालन, वित्तीय तैयारी और स्पष्ट संचालन व्यवस्था की आवश्यकता होती है। एक मजबूत बिज़नेस सेटअप भविष्य की स्थिरता और सफलता की नींव रखता है।",
      "हम एंड-टू-एंड बिज़नेस सेटअप सेवाएँ प्रदान करते हैं, जो आपके विचार को एक कानूनी, संगठित और स्केलेबल व्यवसाय में बदल देती हैं। सही बिज़नेस स्ट्रक्चर चुनने से लेकर सभी रजिस्ट्रेशन और प्रारंभिक संचालन तक — हम हर कदम पर आपका मार्गदर्शन करते हैं।",
    ],
    businessImpactTitle: "इसका आपके व्यवसाय के लिए क्या अर्थ है",
    strategicFoundation: {
      title: "रणनीतिक आधार",
      items: [
        "आपके बिज़नेस मॉडल की स्पष्ट समझ",
        "सही बिज़नेस संरचना चुनने में मार्गदर्शन",
        "दीर्घकालिक लक्ष्यों के अनुरूप सेटअप",
        "भविष्य में पुनर्गठन की आवश्यकता में कमी",
        "निवेश और विस्तार के लिए मजबूत आधार",
      ],
    },
    legalRegulatory: {
      title: "कानूनी और नियामक तैयारी",
      items: [
        "व्यवसाय के प्रकार के अनुसार पंजीकरण",
        "सभी लागू कानूनों का पालन",
        "सटीक डॉक्युमेंटेशन और फाइलिंग",
        "कानूनी जोखिम और जुर्मानों में कमी",
        "सरकारी विभागों के साथ सहज प्रक्रिया",
      ],
    },
    operationalPreparedness: {
      title: "संचालन की तैयारी",
      items: [
        "पहले दिन से संचालन के लिए तैयार व्यवसाय",
        "बैंकिंग और वित्तीय सेटअप में सहायता",
        "डिजिटल और ऑपरेशनल सिस्टम की तैयारी",
        "स्पष्ट प्रक्रियाएँ और कार्यप्रवाह",
        "आत्मविश्वास के साथ लॉन्च",
      ],
    },
    servicesTitle: "हम कौन-सी सेवाएँ प्रदान करते हैं",
    services: {
      structuring: {
        title: "बिज़नेस स्ट्रक्चर और योजना",
        items: [
          "बिज़नेस मॉडल विश्लेषण",
          "प्रोप्राइटरशिप, पार्टनरशिप, LLP या कंपनी चयन",
          "टैक्स और कंप्लायंस प्रभावों पर सलाह",
          "स्केलेबिलिटी और निवेश तैयारी",
        ],
      },
      registrations: {
        title: "रजिस्ट्रेशन और डॉक्युमेंटेशन",
        items: [
          "कंपनी / LLP / प्रोप्राइटरशिप रजिस्ट्रेशन",
          "MSME (उद्यम) रजिस्ट्रेशन",
          "GST रजिस्ट्रेशन (यदि लागू हो)",
          "PAN, TAN और अन्य पंजीकरण",
          "प्रारंभिक कानूनी डॉक्युमेंट्स",
        ],
      },
      financial: {
        title: "बैंकिंग और वित्तीय सेटअप",
        items: [
          "करंट अकाउंट ओपनिंग सपोर्ट",
          "बैंकों के साथ समन्वय",
          "वित्तीय दस्तावेज़ सहायता",
          "प्रारंभिक कंप्लायंस प्लानिंग",
        ],
      },
       digital: {
        title: "डिजिटल और ऑपरेशनल सेटअप",
        items: [
          "डिजिटल उपस्थिति पर मार्गदर्शन",
          "ऑपरेशनल प्रक्रियाओं की स्थापना",
          "कंप्लायंस कैलेंडर तैयार करना",
          "लॉन्च सपोर्ट",
        ],
      },
    },
    whoForTitle: "किनके लिए उपयुक्त",
    whoForItems: [
      "नए उद्यमी",
      "स्टार्टअप फाउंडर्स",
      "MSMEs जो औपचारिक सेटअप चाहते हैं",
      "अनौपचारिक से औपचारिक व्यवसाय में परिवर्तन करने वाले",
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "पूरी तरह से रजिस्टर और अनुपालन योग्य व्यवसाय",
      "तेज़ और परेशानी-मुक्त लॉन्च",
      "कम कानूनी और ऑपरेशनल जोखिम",
      "स्केलिंग और फंडिंग के लिए मजबूत आधार",
      "पहले दिन से ग्रोथ पर फोकस",
    ],
  },
  mr: {
    title: "बिझनेस सेटअप",
    heading: "कल्पनेपासून पूर्णपणे कार्यरत व्यवसायापर्यंत",
    intro: [
      "व्यवसाय सुरू करणं म्हणजे केवळ नाव नोंदवणं नाही — त्यासाठी योग्य नियोजन, कायदेशीर रचना, अनुपालन, आर्थिक तयारी आणि स्पष्ट ऑपरेशनल व्यवस्था आवश्यक असते. सुरुवातीला मजबूत बिझनेस सेटअप केल्यास दीर्घकालीन यशाचा पाया तयार होतो।",
      "आम्ही एंड-टू-एंड बिझनेस सेटअप सेवा देतो, ज्यामुळे तुमची कल्पना कायदेशीर, सुव्यवस्थित आणि स्केलेबल व्यवसायात रूपांतरित होते। योग्य बिझनेस स्ट्रक्चर निवडण्यापासून ते सर्व नोंदणी, डॉक्युमेंटेशन आणि सुरुवातीच्या ऑपरेशन्सपर्यंत आम्ही प्रत्येक टप्प्यावर मार्गदर्शन करतो।",
    ],
    businessImpactTitle: "याचा तुमच्या व्यवसायासाठी अर्थ",
    strategicFoundation: {
      title: "धोरणात्मक पाया",
      items: [
        "व्यवसाय मॉडेलची स्पष्ट समज",
        "योग्य बिझनेस रचना निवडण्यास मार्गदर्शन",
        "दीर्घकालीन उद्दिष्टांशी सुसंगत सेटअप",
        "भविष्यातील पुनर्रचनेचा धोका कमी",
        "गुंतवणूक आणि वाढीसाठी मजबूत पाया",
      ],
    },
    legalRegulatory: {
      title: "कायदेशीर आणि नियामक तयारी",
      items: [
        "व्यवसाय प्रकारानुसार नोंदणी",
        "सर्व लागू कायद्यांचे पालन",
        "अचूक डॉक्युमेंटेशन आणि फाइलिंग",
        "दंड व कायदेशीर धोके कमी",
        "शासकीय यंत्रणांशी सुलभ प्रक्रिया",
      ],
    },
    operationalPreparedness: {
      title: "ऑपरेशनल तयारी",
      items: [
        "पहिल्या दिवसापासून व्यवसाय सुरू करण्यास तयार",
        "बँकिंग आणि आर्थिक सेटअप सहाय्य",
        "डिजिटल आणि ऑपरेशनल सिस्टीम्सची तयारी",
        "स्पष्ट प्रक्रिया आणि वर्कफ्लोज",
        "आत्मविश्वासाने व्यवसाय सुरू करण्याची क्षमता",
      ],
    },
    servicesTitle: "आम्ही पुरवणाऱ्या सेवा",
    services: {
      structuring: {
        title: "बिझनेस स्ट्रक्चर आणि नियोजन",
        items: [
          "व्यवसाय मॉडेलचे मूल्यमापन",
          "प्रोप्रायटरशिप, पार्टनरशिप, LLP किंवा कंपनी निवड",
          "टॅक्स आणि कंप्लायन्स परिणामांवर सल्ला",
          "स्केलेबिलिटी आणि इन्व्हेस्टमेंट तयारी",
        ],
      },
      registrations: {
        title: "नोंदणी आणि डॉक्युमेंटेशन",
        items: [
          "कंपनी / LLP / प्रोप्रायटरशिप नोंदणी",
          "MSME (उद्यम) नोंदणी",
          "GST नोंदणी (लागू असल्यास)",
          "PAN, TAN आणि इतर नोंदण्या",
          "प्रारंभिक कायदेशीर कागदपत्रे",
        ],
      },
      financial: {
        title: "बँकिंग आणि आर्थिक सेटअप",
        items: [
          "करंट अकाउंट उघडण्यासाठी सहाय्य",
          "बँकांशी समन्वय",
          "आर्थिक कागदपत्रांची मदत",
          "सुरुवातीचे कंप्लायन्स नियोजन",
        ],
      },
      digital: {
        title: "डिजिटल आणि ऑपरेशनल सेटअप",
        items: [
          "डिजिटल उपस्थितीसाठी मार्गदर्शन",
          "ऑपरेशनल प्रक्रिया सेटअप",
          "कंप्लायन्स कॅलेंडर तयार करणे",
          "लॉन्च सपोर्ट",
        ],
      },
    },
    whoForTitle: "कोणासाठी योग्य",
    whoForItems: [
      "पहिल्यांदा व्यवसाय सुरू करणारे उद्योजक",
      "स्टार्टअप फाउंडर्स",
      "MSMEs",
      "अनौपचारिक व्यवसाय औपचारिक करु इच्छिणारे",
    ],
    resultTitle: "परिणाम",
    resultItems: [
      "पूर्णपणे नोंदणीकृत आणि अनुपालनक्षम व्यवसाय",
      "जलद आणि सुरळीत व्यवसाय सुरूवात",
      "कायदेशीर व ऑपरेशनल धोके कमी",
      "स्केलिंग व फंडिंगसाठी मजबूत पाया",
      "पहिल्याच दिवसापासून वाढीवर लक्ष",
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
            <DetailSection title={services.structuring.title} items={services.structuring.items} />
            <DetailSection title={services.registrations.title} items={services.registrations.items} />
            <DetailSection title={services.financial.title} items={services.financial.items} />
            <DetailSection title={services.digital.title} items={services.digital.items} />
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

export default function BusinessSetupPage() {
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
                    <DetailSection title={t.strategicFoundation.title} items={t.strategicFoundation.items} />
                    <DetailSection title={t.legalRegulatory.title} items={t.legalRegulatory.items} />
                    <DetailSection title={t.operationalPreparedness.title} items={t.operationalPreparedness.items} />
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
