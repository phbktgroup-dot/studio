'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-provider';
import { Lightbulb, TrendingUp, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const sectionText = {
  en: {
    heading: "Shape the Future with Us",
    subheading: "We're more than just a company; we're a community of innovators, thinkers, and doers. Find where you fit in.",
    button: "Explore Open Roles",
    cards: [
      {
        icon: Lightbulb,
        title: "Innovate",
        description: "Work on cutting-edge projects that redefine industries. Your ideas have the power to create real-world impact."
      },
      {
        icon: TrendingUp,
        title: "Grow",
        description: "We invest in your development with continuous learning opportunities, mentorship, and clear career paths."
      },
      {
        icon: Users,
        title: "Belong",
        description: "Join a diverse and inclusive culture where every voice is heard, valued, and respected."
      }
    ]
  },
  mr: {
    heading: "आमच्यासोबत भविष्य घडवा",
    subheading: "आम्ही फक्त एक कंपनी नाही; आम्ही नवनवीन शोध लावणाऱ्या, विचारवंतांची आणि कार्य करणाऱ्यांची एकजूट आहोत. तुम्ही कुठे योग्य आहात ते शोधा.",
    button: "नोकरीच्या संधी एक्सप्लोर करा",
    cards: [
      {
        icon: Lightbulb,
        title: "नवीन कल्पना",
        description: "उद्योग पुन्हा परिभाषित करणाऱ्या अत्याधुनिक प्रकल्पांवर काम करा. तुमच्या कल्पनांमध्ये वास्तविक-जगावर प्रभाव टाकण्याची शक्ती आहे."
      },
      {
        icon: TrendingUp,
        title: "विकास",
        description: "आम्ही सतत शिकण्याच्या संधी, मार्गदर्शन आणि स्पष्ट करिअर मार्गांसह तुमच्या विकासात गुंतवणूक करतो."
      },
      {
        icon: Users,
        title: "सामील व्हा",
        description: "एका वैविध्यपूर्ण आणि सर्वसमावेशक संस्कृतीत सामील व्हा जिथे प्रत्येक आवाज ऐकला जातो, मूल्य दिले जाते आणि आदर केला जातो."
      }
    ]
  }
};

export default function CareersSection() {
  const { language } = useLanguage();
  const text = sectionText[language];

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-primary">
                {text.heading}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
                {text.subheading}
            </p>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {text.cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card key={index} className="text-center group transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-2">
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <CardTitle className="pt-4 font-headline text-2xl">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
            <Button size="lg" asChild>
                <Link href="#">
                    {text.button}
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
