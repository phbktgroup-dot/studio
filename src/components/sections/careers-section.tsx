'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/language-provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sectionText = {
  en: {
    heading: "Shape the Future With Us",
    description: "We are a collective of thinkers, builders, and dreamers dedicated to pushing boundaries. Your unique skills and perspective could be the missing piece of our next big breakthrough. Join us and let's create what's next, together.",
    button: "See Open Roles"
  },
  mr: {
    heading: "आमच्यासोबत भविष्य घडवा",
    description: "आम्ही विचारवंत, निर्माते आणि स्वप्न पाहणाऱ्यांचा एक समूह आहोत, जे सीमा ओलांडण्यासाठी समर्पित आहेत. तुमची अद्वितीय कौशल्ये आणि दृष्टीकोन आमच्या पुढील मोठ्या प्रगतीचा एक महत्त्वाचा भाग असू शकतो. आमच्यात सामील व्हा आणि चला एकत्र मिळून काहीतरी नवीन निर्माण करूया.",
    button: "रिक्त पदे पहा"
  }
};

export default function CareersSection() {
  const { language } = useLanguage();
  const text = sectionText[language];
  const careerImage = PlaceHolderImages.find(p => p.id === 'careers_marathon');

  return (
    <section className="bg-background text-foreground py-20 md:py-24">
      <div className="container grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
            {text.heading}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            {text.description}
          </p>
          
          <Button asChild size="lg" className="mt-8">
            <Link href="#">
              {text.button}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="rounded-lg overflow-hidden aspect-[4/3] relative">
          {careerImage && (
            <Image
              src={careerImage.imageUrl}
              alt={careerImage.description}
              fill
              data-ai-hint={careerImage.imageHint}
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          )}
        </div>
      </div>
    </section>
  );
}
