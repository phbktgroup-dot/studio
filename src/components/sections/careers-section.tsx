'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-provider';
import { ArrowRight } from 'lucide-react';
import { AnimatedText } from '@/components/shared/animated-text';

const sectionText = {
  en: {
    eyebrow: "Careers",
    heading: "Seize the future",
    subheading: "Our teams are leading change on every front. From deploying the most advanced and complex technologies for the world's most iconic companies, to building a greener, more inclusive and healthier world for our communities.",
    button: "Come join us"
  },
  mr: {
    eyebrow: "करिअर",
    heading: "भविष्याची संधी साधा",
    subheading: "आमची टीम्स प्रत्येक आघाडीवर बदल घडवत आहेत. जगातील सर्वात प्रतिष्ठित कंपन्यांसाठी सर्वात प्रगत आणि जटिल तंत्रज्ञान तैनात करण्यापासून, आमच्या समुदायांसाठी एक हरित, अधिक समावेशक आणि निरोगी जग तयार करण्यापर्यंत.",
    button: "आमच्यात सामील व्हा"
  }
};

const careerImage = PlaceHolderImages.find(img => img.id === 'careers_marathon');

export default function CareersSection() {
  const { language } = useLanguage();
  const text = sectionText[language];

  return (
    <section className="py-20 md:py-32 bg-gray-900 text-white">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                {text.eyebrow}
            </p>
            <AnimatedText
                el="h2"
                text={text.heading}
                className="font-headline text-4xl md:text-5xl font-bold tracking-tighter"
            />
            <AnimatedText
                text={text.subheading}
                className="mt-6 text-lg text-gray-300 max-w-lg"
                stagger={0.01}
            />
            <div className="mt-8">
                <Button variant="link" className="p-0 text-white text-lg group">
                    <Link href="#" className="flex items-center gap-4">
                        <span>{text.button}</span>
                        <div className="flex items-center justify-center h-10 w-10 rounded-full border border-white transition-all duration-300 group-hover:bg-white group-hover:text-gray-900">
                            <ArrowRight className="h-5 w-5" />
                        </div>
                    </Link>
                </Button>
            </div>
        </div>
        <div className="flex items-center justify-center">
            {careerImage && (
                 <Image
                    src={careerImage.imageUrl}
                    alt={careerImage.description}
                    width={600}
                    height={400}
                    data-ai-hint={careerImage.imageHint}
                    className="rounded-lg shadow-2xl object-cover aspect-[3/2]"
                />
            )}
        </div>
      </div>
    </section>
  );
}
