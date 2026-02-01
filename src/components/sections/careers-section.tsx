'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/language-provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const sectionText = {
  en: {
    eyebrow: "Careers",
    heading: "Seize the Future",
    description: "Our teams are leading change on every front. From deploying the most advanced technologies for iconic companies, to building a greener, more inclusive world for our communities.",
    button: "Come join us"
  },
  mr: {
    eyebrow: "करिअर",
    heading: "भविष्य काबीज करा",
    description: "आमची टीम प्रत्येक आघाडीवर बदल घडवत आहे. प्रतिष्ठित कंपन्यांसाठी सर्वात प्रगत तंत्रज्ञान तैनात करण्यापासून, आमच्या समुदायांसाठी अधिक हरित, अधिक समावेशक जग तयार करण्यापर्यंत.",
    button: "आमच्यात सामील व्हा"
  }
};

export default function CareersSection() {
  const { language } = useLanguage();
  const text = sectionText[language];
  const careerImage = PlaceHolderImages.find(p => p.id === 'careers_marathon');

  return (
    <section className="bg-gray-900 text-white py-20 md:py-32">
      <div className="container grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-semibold uppercase tracking-widest text-primary mb-4">{text.eyebrow}</p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
            {text.heading}
          </h2>
          <p className="mt-6 text-lg text-gray-300 max-w-lg">
            {text.description}
          </p>
          
          <Link href="#" className="mt-8 inline-flex items-center text-lg font-medium text-white group">
            <span>{text.button}</span>
            <div className="ml-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-transparent transition-colors group-hover:bg-white group-hover:text-gray-900">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

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
