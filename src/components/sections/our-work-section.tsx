'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-provider';

const sectionText = {
  en: {
    heading: "Our Recent Work",
    quote: "We build digital experiences that drive results.",
    all: "All",
    apps: "Apps",
    automation: "Automation",
    websites: "Websites",
    viewDemo: "View Demo",
  },
  mr: {
    heading: "आमचे अलीकडील काम",
    quote: "आम्ही असे डिजिटल अनुभव तयार करतो जे परिणाम देतात.",
    all: "सर्व",
    apps: "अ‍ॅप्स",
    automation: "ऑटोमेशन",
    websites: "वेबसाइट्स",
    viewDemo: "डेमो पहा",
  },
  hi: {
    heading: "हमारे हाल के काम",
    quote: "हम डिजिटल अनुभव बनाते हैं जो परिणाम देते हैं।",
    all: "सभी",
    apps: "ऐप्स",
    automation: "स्वचालन",
    websites: "वेबसाइटें",
    viewDemo: "डेमो देखें",
  }
};

const projects = [
  {
    category: 'apps',
    titleEn: "Fitness Tracker App",
    titleMr: "फिटनेस ट्रॅकर ॲप",
    titleHi: "फिटनेस ट्रैकर ऐप",
    descriptionEn: "A mobile app to track workouts, set goals, and monitor progress with social features.",
    descriptionMr: "वर्कआउट्सचा मागोवा घेण्यासाठी, ध्येय निश्चित करण्यासाठी आणि सामाजिक वैशिष्ट्यांसह प्रगतीचे निरीक्षण करण्यासाठी एक मोबाइल अॅप.",
    descriptionHi: "वर्कआउट को ट्रैक करने, लक्ष्य निर्धारित करने और सामाजिक सुविधाओं के साथ प्रगति की निगरानी के लिए एक मोबाइल ऐप।",
    imageId: 'work_fitness_app'
  },
  {
    category: 'automation',
    titleEn: "Data Analytics Dashboard",
    titleMr: "डेटा ॲनालिटिक्स डॅशबोर्ड",
    titleHi: "डेटा एनालिटिक्स डैशबोर्ड",
    descriptionEn: "A real-time dashboard for visualizing sales data and customer behavior.",
    descriptionMr: "विक्री डेटा आणि ग्राहक वर्तनाचे व्हिज्युअलायझेशन करण्यासाठी एक रिअल-टाइम डॅशबोर्ड.",
    descriptionHi: "बिक्री डेटा और ग्राहक व्यवहार की कल्पना करने के लिए एक वास्तविक समय का डैशबोर्ड।",
    imageId: 'work_analytics_dashboard'
  },
  {
    category: 'websites',
    titleEn: "E-commerce Platform",
    titleMr: "ई-कॉमर्स प्लॅटफॉर्म",
    titleHi: "ई-कॉमर्स प्लेटफॉर्म",
    descriptionEn: "A full-featured online store with a custom CMS and payment gateway integration.",
    descriptionMr: "एक सानुकूल सीएमएस आणि पेमेंट गेटवे एकत्रीकरणासह एक संपूर्ण-वैशिष्ट्यीकृत ऑनलाइन स्टोअर.",
    descriptionHi: "एक कस्टम सीएमएस और भुगतान गेटवे एकीकरण के साथ एक पूर्ण विशेषताओं वाला ऑनलाइन स्टोर।",
    imageId: 'work_ecommerce_platform'
  },
  {
    category: 'apps',
    titleEn: "Branding for 'Company'",
    titleMr: "'कंपनी' साठी ब्रँडिंग",
    titleHi: "'कंपनी' के लिए ब्रांडिंग",
    descriptionEn: "Complete branding package for a new tech startup, including logo, and style guide.",
    descriptionMr: "नवीन टेक स्टार्टअपसाठी लोगो आणि स्टाईल गाईडसह संपूर्ण ब्रँडिंग पॅकेज.",
    descriptionHi: "एक नए टेक स्टार्टअप के लिए लोगो और स्टाइल गाइड सहित पूरा ब्रांडिंग पैकेज।",
    imageId: 'work_branding_logo'
  }
];

export default function OurWorkSection() {
  const { language } = useLanguage();
  const text = sectionText[language];
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = projects.filter(p => activeFilter === 'all' || p.category === activeFilter);

  const getTitle = (project: (typeof projects)[0]) => {
    if (language === 'hi') return project.titleHi;
    if (language === 'mr') return project.titleMr;
    return project.titleEn;
  }

  const getDescription = (project: (typeof projects)[0]) => {
    if (language === 'hi') return project.descriptionHi;
    if (language === 'mr') return project.descriptionMr;
    return project.descriptionEn;
  }

  return (
    <section id="work" className="py-6 md:py-8 bg-muted/30">
      <div className="container">
        <div className="text-center mb-4">
            <h3 className="text-xl font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {text.heading}
            </h3>
            <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl text-primary">
                {text.quote}
            </h2>
        </div>

        <div className="flex justify-center gap-2 md:gap-4 mb-8">
          <Button variant={activeFilter === 'all' ? 'default' : 'outline'} onClick={() => setActiveFilter('all')}>{text.all}</Button>
          <Button variant={activeFilter === 'apps' ? 'default' : 'outline'} onClick={() => setActiveFilter('apps')}>{text.apps}</Button>
          <Button variant={activeFilter === 'automation' ? 'default' : 'outline'} onClick={() => setActiveFilter('automation')}>{text.automation}</Button>
          <Button variant={activeFilter === 'websites' ? 'default' : 'outline'} onClick={() => setActiveFilter('websites')}>{text.websites}</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProjects.map((project, index) => {
            const image = PlaceHolderImages.find(p => p.id === project.imageId);
            return (
              <Card key={index} className="overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={getTitle(project)}
                    width={400}
                    height={225}
                    data-ai-hint={image.imageHint}
                    className="w-full object-cover aspect-video"
                  />
                )}
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div>
                    <h3 className="text-lg font-bold font-headline">{getTitle(project)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{getDescription(project)}</p>
                  </div>
                  <div className="flex-grow" />
                  <Button variant="outline" size="sm" className="mt-auto self-start">{text.viewDemo}</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
