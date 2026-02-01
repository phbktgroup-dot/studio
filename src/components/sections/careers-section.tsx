'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/language-provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sectionText = {
  en: {
    eyebrow: "Join Our Team",
    heading: "Grow with us.",
    description: "We're a team of passionate innovators dedicated to making an impact. If you're driven, creative, and ready to take on new challenges, we'd love to hear from you.",
    button: "View Open Positions"
  },
  mr: {
    eyebrow: "आमच्या टीममध्ये सामील व्हा",
    heading: "आमच्यासोबत प्रगती करा.",
    description: "आम्ही एक उत्साही आणि नाविन्यपूर्ण संघ आहोत, जे बदल घडवण्यासाठी समर्पित आहेत. जर तुम्ही प्रेरित, सर्जनशील आणि नवीन आव्हाने स्वीकारण्यास तयार असाल, तर आम्हाला तुमच्याकडून ऐकायला आवडेल.",
    button: "रिक्त पदे पहा"
  }
};

export default function CareersSection() {
  const { language } = useLanguage();
  const text = sectionText[language];
  const careerImage = PlaceHolderImages.find(p => p.id === 'careers_marathon');

  return (
    <section className="bg-background text-foreground py-20 md:py-32">
      <div className="container grid md:grid-cols-2 gap-16 items-center">
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
        <div>
          <p className="font-semibold uppercase tracking-widest text-primary mb-4">{text.eyebrow}</p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
            {text.heading}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            {text.description}
          </p>
          
          <Button asChild size="lg" className="mt-8">
            <Link href="#">
              {text.button}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

        </div>
      </div>
    </section>
  );
}
