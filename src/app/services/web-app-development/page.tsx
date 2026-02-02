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
    title: "Website & App Development",
    heading: "Build Digital Products That Perform, Scale, and Convert",
    subheading: "We design and develop high-performance websites and applications that are aligned with your business goals. Our focus is not just on design or code, but on building digital products that drive real business outcomes.",
    whatWeDoTitle: "What We Do",
    whatWeDo: [
      "Custom Website Development (Corporate, Portfolio, E-commerce, Landing Pages)",
      "Web Applications & Admin Dashboards",
      "Android & iOS Mobile App Development",
      "API & Third-party Integrations",
      "Payment Gateway Integration",
      "Performance Optimization & Security Hardening",
    ],
    howWeWorkTitle: "How We Work",
    howWeWork: [
        "Requirement discovery & planning",
        "UI/UX design focused on conversions",
        "Clean, scalable development",
        "Rigorous testing & optimization",
        "Deployment & post-launch support",
    ],
    whoItIsForTitle: "Who It’s For",
    whoItIsFor: [
        "Startups building MVPs or full-scale products",
        "MSMEs going digital",
        "Enterprises modernizing legacy systems",
    ],
    businessImpactTitle: "Business Impact",
    businessImpact: [
        "Faster load times",
        "Better user engagement",
        "Higher lead generation and sales",
        "Technology ready for future growth",
    ],
  },
  hi: {
    title: "वेबसाइट और ऐप डेवलपमेंट",
    heading: "ऐसे डिजिटल प्लेटफॉर्म जो सिर्फ दिखें नहीं, परिणाम भी दें",
    subheading: "हम आपके व्यवसाय के उद्देश्यों के अनुसार वेबसाइट और मोबाइल ऐप विकसित करते हैं, जो तेज़, सुरक्षित और भविष्य के लिए तैयार होते हैं।",
    whatWeDoTitle: "हम क्या करते हैं",
    whatWeDo: [
      "कस्टम वेबसाइट डेवलपमेंट (कॉर्पोरेट, ई-कॉमर्स, लैंडिंग पेज)",
      "वेब एप्लिकेशन और एडमिन डैशबोर्ड",
      "Android और iOS मोबाइल ऐप्स",
      "API और थर्ड-पार्टी इंटीग्रेशन",
      "पेमेंट गेटवे इंटीग्रेशन",
      "स्पीड, सिक्योरिटी और स्केलेबिलिटी ऑप्टिमाइज़ेशन",
    ],
    howWeWorkTitle: "हमारी कार्यप्रणाली",
    howWeWork: [
        "बिज़नेस आवश्यकताओं की समझ",
        "यूज़र-केंद्रित UI/UX डिज़ाइन",
        "क्लीन और स्केलेबल डेवलपमेंट",
        "टेस्टिंग और परफॉर्मेंस ट्यूनिंग",
        "लॉन्च और सपोर्ट",
    ],
    whoItIsForTitle: "किनके लिए उपयुक्त",
    whoItIsFor: [
        "स्टार्टअप्स",
        "छोटे और मध्यम व्यवसाय",
        "एंटरप्राइज़ कंपनियाँ",
    ],
    businessImpactTitle: "आपको क्या लाभ मिलेगा",
    businessImpact: [
        "तेज़ वेबसाइट और ऐप",
        "बेहतर यूज़र अनुभव",
        "ज़्यादा लीड्स और बिक्री",
        "भविष्य के लिए तैयार टेक्नोलॉजी",
    ],
  },
  mr: {
    title: "वेबसाइट आणि ॲप डेव्हलपमेंट",
    heading: "परिणाम देणारे, वाढीसाठी तयार डिजिटल प्लॅटफॉर्म",
    subheading: "आम्ही तुमच्या व्यवसायाच्या उद्दिष्टांनुसार वेगवान, सुरक्षित आणि स्केलेबल वेबसाइट्स व मोबाइल ॲप्स विकसित करतो.",
    whatWeDoTitle: "आम्ही काय करतो",
    whatWeDo: [
      "कस्टम वेबसाइट डेव्हलपमेंट (कॉर्पोरेट, ई-कॉमर्स, लँडिंग पेजेस)",
      "वेब ॲप्लिकेशन्स आणि अ‍ॅडमिन डॅशबोर्ड",
      "Android आणि iOS मोबाइल ॲप डेव्हलपमेंट",
      "API आणि थर्ड-पार्टी इंटिग्रेशन",
      "पेमेंट गेटवे इंटिग्रेशन",
      "परफॉर्मन्स आणि सिक्युरिटी ऑप्टिमायझेशन",
    ],
    howWeWorkTitle: "आमची कार्यपद्धती",
    howWeWork: [
        "गरजांचे विश्लेषण",
        "युजर-केंद्रित UI/UX डिझाइन",
        "स्वच्छ आणि स्केलेबल डेव्हलपमेंट",
        "टेस्टिंग आणि ऑप्टिमायझेशन",
        "लॉन्च आणि सपोर्ट",
    ],
    whoItIsForTitle: "कोणासाठी योग्य",
    whoItIsFor: [
        "स्टार्टअप्स",
        "MSMEs",
        "मोठे उद्योग",
    ],
    businessImpactTitle: "व्यवसायाला होणारे फायदे",
    businessImpact: [
        "जलद लोड होणारे प्लॅटफॉर्म",
        "उत्तम ग्राहक अनुभव",
        "जास्त लीड्स आणि विक्री",
        "भविष्यातील वाढीसाठी सज्ज तंत्रज्ञान",
    ],
  }
};

const SectionCard = ({ title, items }: { title: string, items: string[] }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span>{item}</span>
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
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/#services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-headline text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
                {t.title}
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">{t.heading}</p>
            </div>
            
            <p className="text-lg text-center text-muted-foreground mb-12">{t.subheading}</p>

            <div className="grid md:grid-cols-2 gap-8">
                <SectionCard title={t.whatWeDoTitle} items={t.whatWeDo} />
                <SectionCard title={t.howWeWorkTitle} items={t.howWeWork} />
                <SectionCard title={t.whoItIsForTitle} items={t.whoItIsFor} />
                <SectionCard title={t.businessImpactTitle} items={t.businessImpact} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
