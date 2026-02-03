'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-provider';
import Link from 'next/link';
import { projects } from '@/lib/projects-data';

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
    quote: "आम्ही असे डिजिटल अनुभव तयार करतो जे प्रत्यक्ष व्यवसाय परिणाम देतात.",
    all: "सर्व",
    apps: "अ‍ॅप्स",
    automation: "ऑटोमेशन",
    websites: "वेबसाइट्स",
    viewDemo: "डेमो पहा",
  },
  hi: {
    heading: "हमारे हाल के काम",
    quote: "हम ऐसे डिजिटल अनुभव बनाते हैं जो वास्तविक बिज़नेस परिणाम देते हैं।",
    all: "सभी",
    apps: "ऐप्स",
    automation: "स्वचालन",
    websites: "वेबसाइटें",
    viewDemo: "डेमो देखें",
  }
};

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
            <h3 className="text-lg font-semibold uppercase tracking-wider text-black mb-2">
                {text.heading}
            </h3>
            <h2 className="font-headline text-xl md:text-2xl font-bold tracking-tighter text-primary">
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
                   <Link href={`/work/${project.slug}`}>
                    <Image
                        src={image.imageUrl}
                        alt={getTitle(project)}
                        width={400}
                        height={225}
                        data-ai-hint={image.imageHint}
                        className="w-full object-cover aspect-video"
                    />
                  </Link>
                )}
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div>
                    <h3 className="text-lg font-bold font-headline">{getTitle(project)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{getDescription(project)}</p>
                  </div>
                  <div className="flex-grow" />
                  <Button variant="outline" size="sm" className="mt-auto self-start" asChild>
                    <Link href={`/work/${project.slug}`}>{text.viewDemo}</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
