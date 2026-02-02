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
    title: "Marketing & Branding",
    heading: "Building Visibility, Trust, and Sustainable Growth",
    intro: [
      "In today’s crowded digital marketplace, having a good product is not enough — your brand must be visible, credible, and memorable. Marketing and branding define how your audience perceives you, trusts you, and chooses you over competitors.",
      "We help businesses build strong brand identities and execute data-driven marketing strategies that do more than generate attention. Our focus is on attracting the right audience, communicating clear value, and converting interest into long-term customer relationships.",
      "Our marketing approach is rooted in strategy, creativity, and analytics. Every campaign, message, and design decision is aligned with your business goals and continuously optimized for performance.",
    ],
    businessImpactTitle: "What This Means for Your Business",
    brandIdentity: {
      title: "Brand Identity & Positioning",
      items: [
        "Clear brand messaging and value proposition",
        "Consistent visual and verbal brand identity",
        "Strong differentiation from competitors",
        "Brand positioning aligned with target audience",
        "Trust-building communication across channels",
      ],
    },
    dataDriven: {
        title: "Data-Driven Marketing",
        items: [
            "Strategy based on market research and insights",
            "Performance tracking using analytics and metrics",
            "Continuous optimization based on real data",
            "ROI-focused marketing execution",
            "Scalable campaigns as your business grows",
        ]
    },
    customerAcquisition: {
        title: "Customer Acquisition & Engagement",
        items: [
            "Targeted campaigns for the right audience",
            "Multi-channel marketing approach",
            "Social media and content-driven engagement",
            "Lead nurturing and conversion strategies",
            "Long-term customer retention focus",
        ]
    },
    channelsTitle: "Marketing Channels We Work With",
    channels: [
      "Social Media Marketing",
      "Search Engine Optimization (SEO)",
      "Paid Advertising (Google, Meta, LinkedIn)",
      "Content Marketing & Copywriting",
      "Email & WhatsApp Marketing",
      "Brand Design & Visual Identity",
    ],
    resultTitle: "The Result",
    resultItems: [
        "Strong and recognizable brand presence",
        "Higher quality leads and conversions",
        "Better customer trust and loyalty",
        "Improved marketing ROI",
        "Sustainable and scalable business growth",
    ],
  },
  hi: {
    title: "मार्केटिंग और ब्रांडिंग",
    heading: "पहचान, भरोसा और सतत विकास का निर्माण",
    intro: [
      "आज के प्रतिस्पर्धी डिजिटल बाज़ार में केवल अच्छा उत्पाद होना पर्याप्त नहीं है — आपके ब्रांड को दिखना, समझा जाना और याद रखा जाना ज़रूरी है। मार्केटिंग और ब्रांडिंग यह तय करती है कि ग्राहक आपको कैसे देखते हैं, आप पर कितना भरोसा करते हैं और आपको क्यों चुनते हैं।",
      "हम व्यवसायों को मजबूत ब्रांड पहचान बनाने और डेटा-आधारित मार्केटिंग रणनीतियाँ लागू करने में मदद करते हैं। हमारा उद्देश्य केवल ध्यान आकर्षित करना नहीं, बल्कि सही ऑडियंस को आकर्षित करना और उन्हें दीर्घकालिक ग्राहकों में बदलना है।",
      "हमारी मार्केटिंग प्रक्रिया रणनीति, क्रिएटिविटी और डेटा पर आधारित होती है, जिससे हर प्रयास आपके बिज़नेस लक्ष्यों से जुड़ा रहता है।",
    ],
    businessImpactTitle: "इसका आपके व्यवसाय के लिए क्या अर्थ है",
    brandIdentity: {
      title: "ब्रांड पहचान और पोज़िशनिंग",
      items: [
        "स्पष्ट ब्रांड मैसेजिंग और वैल्यू प्रपोज़िशन",
        "सभी चैनलों पर एकसमान ब्रांड पहचान",
        "प्रतिस्पर्धियों से अलग पहचान",
        "लक्षित ग्राहकों के अनुरूप ब्रांड पोज़िशनिंग",
        "भरोसा बनाने वाला कम्युनिकेशन",
      ],
    },
    dataDriven: {
        title: "डेटा-आधारित मार्केटिंग",
        items: [
            "मार्केट रिसर्च पर आधारित रणनीति",
            "एनालिटिक्स और परफॉर्मेंस ट्रैकिंग",
            "डेटा के आधार पर निरंतर सुधार",
            "ROI-केंद्रित मार्केटिंग",
            "व्यवसाय के साथ स्केलेबल कैंपेन",
        ]
    },
    customerAcquisition: {
        title: "ग्राहक अधिग्रहण और जुड़ाव",
        items: [
            "सही ऑडियंस के लिए टार्गेटेड कैंपेन",
            "मल्टी-चैनल मार्केटिंग अप्रोच",
            "सोशल मीडिया और कंटेंट एंगेजमेंट",
            "लीड नर्चरिंग और कन्वर्ज़न रणनीतियाँ",
            "ग्राहक रिटेंशन पर फोकस",
        ]
    },
    channelsTitle: "हम जिन मार्केटिंग चैनलों पर काम करते हैं",
    channels: [
      "सोशल मीडिया मार्केटिंग",
      "सर्च इंजन ऑप्टिमाइज़ेशन (SEO)",
      "पेड एडवरटाइजिंग (Google, Meta, LinkedIn)",
      "कंटेंट मार्केटिंग और कॉपीराइटिंग",
      "ईमेल और WhatsApp मार्केटिंग",
      "ब्रांड डिज़ाइन और विज़ुअल आइडेंटिटी",
    ],
    resultTitle: "परिणाम",
    resultItems: [
        "मजबूत और भरोसेमंद ब्रांड पहचान",
        "बेहतर क्वालिटी लीड्स",
        "अधिक कन्वर्ज़न और बिक्री",
        "बेहतर मार्केटिंग ROI",
        "स्थायी और स्केलेबल बिज़नेस ग्रोथ",
    ],
  },
  mr: {
    title: "मार्केटिंग आणि ब्रँडिंग",
    heading: "ओळख, विश्वास आणि शाश्वत वाढ निर्माण करणे",
    intro: [
      "आजच्या स्पर्धात्मक डिजिटल बाजारात केवळ चांगलं उत्पादन असणं पुरेसं नाही — तुमचा ब्रँड दिसला पाहिजे, समजला गेला पाहिजे आणि लक्षात राहिला पाहिजे. मार्केटिंग आणि ब्रँडिंग हे ठरवते की ग्राहक तुमच्याकडे कसे पाहतात, तुमच्यावर किती विश्वास ठेवतात आणि तुम्हालाच का निवडतात.",
      "आम्ही व्यवसायांना मजबूत ब्रँड ओळख निर्माण करण्यात आणि डेटा-आधारित मार्केटिंग रणनीती राबवण्यात मदत करतो. आमचा उद्देश फक्त लोकांचं लक्ष वेधणं नसून योग्य ग्राहकांपर्यंत पोहोचून त्यांना दीर्घकालीन नात्यात रूपांतरित करणं आहे.",
      "रणनीती, क्रिएटिव्हिटी आणि डेटा यांच्या साहाय्याने आमची मार्केटिंग प्रक्रिया व्यवसायाच्या उद्दिष्टांशी पूर्णपणे जुळलेली असते.",
    ],
    businessImpactTitle: "याचा तुमच्या व्यवसायासाठी अर्थ",
    brandIdentity: {
      title: "ब्रँड ओळख आणि पोझिशनिंग",
      items: [
        "स्पष्ट ब्रँड मेसेजिंग आणि व्हॅल्यू प्रपोजिशन",
        "सर्व चॅनेल्सवर एकसंध ब्रँड ओळख",
        "स्पर्धकांपेक्षा वेगळी ओळख",
        "लक्षित ग्राहकांनुसार ब्रँड पोझिशनिंग",
        "विश्वास निर्माण करणारे कम्युनिकेशन",
      ],
    },
    dataDriven: {
        title: "डेटा-आधारित मार्केटिंग",
        items: [
            "मार्केट रिसर्चवर आधारित रणनीती",
            "अ‍ॅनालिटिक्स आणि परफॉर्मन्स ट्रॅकिंग",
            "डेटावर आधारित सतत सुधारणा",
            "ROI-केंद्रित मार्केटिंग अंमलबजावणी",
            "व्यवसायासोबत स्केल होणारे कॅम्पेन्स",
        ]
    },
    customerAcquisition: {
        title: "ग्राहक मिळवणे आणि एंगेजमेंट",
        items: [
            "योग्य ग्राहकांसाठी टार्गेटेड कॅम्पेन्स",
            "मल्टी-चॅनेल मार्केटिंग अप्रोच",
            "सोशल मीडिया आणि कंटेंटद्वारे एंगेजमेंट",
            "लीड नर्चरिंग आणि कन्वर्ज़न रणनीती",
            "ग्राहक टिकवून ठेवण्यावर लक्ष",
        ]
    },
    channelsTitle: "आम्ही वापरणारे मार्केटिंग चॅनेल्स",
    channels: [
      "सोशल मीडिया मार्केटिंग",
      "सर्च इंजिन ऑप्टिमायझेशन (SEO)",
      "पेड जाहिराती (Google, Meta, LinkedIn)",
      "कंटेंट मार्केटिंग आणि कॉपीरायटिंग",
      "ईमेल आणि WhatsApp मार्केटिंग",
      "ब्रँड डिझाइन आणि व्हिज्युअल आयडेंटिटी",
    ],
    resultTitle: "परिणाम",
    resultItems: [
        "मजबूत आणि ओळखण्याजोगा ब्रँड",
        "दर्जेदार लीड्स आणि जास्त कन्वर्ज़न",
        "ग्राहकांचा वाढलेला विश्वास",
        "सुधारलेला मार्केटिंग ROI",
        "शाश्वत आणि स्केलेबल व्यवसाय वाढ",
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

const ChannelsSection = ({ title, items }: { title: string, items: string[] }) => (
    <Card className="shadow-lg mt-12">
        <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-headline text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
             <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
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

export default function MarketingAndBrandingPage() {
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
                    <DetailSection title={t.brandIdentity.title} items={t.brandIdentity.items} />
                    <DetailSection title={t.dataDriven.title} items={t.dataDriven.items} />
                    <DetailSection title={t.customerAcquisition.title} items={t.customerAcquisition.items} />
                </CardContent>
            </Card>

            <ChannelsSection title={t.channelsTitle} items={t.channels} />
            <ResultSection title={t.resultTitle} items={t.resultItems} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
