'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Briefcase, Lightbulb, Users } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';

const content = {
  en: {
    heading: 'Find Your Future Here',
    subheading:
      "We're a team of innovators, thinkers, and builders dedicated to making a difference. Your unique skills can help us shape what's next. Join us.",
    cta: 'Explore Open Positions',
    pillars: [
      {
        icon: Lightbulb,
        title: 'Innovate with Purpose',
        description:
          'Tackle meaningful challenges and work on projects that redefine industries. Your ideas have a home here.',
      },
      {
        icon: Briefcase,
        title: 'Grow Your Career',
        description:
          'We invest in your development with mentorship, continuous learning opportunities, and clear paths for advancement.',
      },
      {
        icon: Users,
        title: 'Belong to a Community',
        description:
          'Join a diverse, inclusive, and collaborative environment where every voice is heard and valued.',
      },
    ],
  },
  mr: {
    heading: 'तुमचे भविष्य येथे शोधा',
    subheading:
      'आम्ही नवनवीन शोध लावणारे, विचारवंत आणि निर्माते आहोत जे बदल घडवण्यासाठी समर्पित आहेत. तुमची अद्वितीय कौशल्ये आम्हाला पुढील गोष्टींना आकार देण्यास मदत करू शकतात. आमच्यात सामील व्हा.',
    cta: 'रिक्त पदे एक्सप्लोर करा',
    pillars: [
      {
        icon: Lightbulb,
        title: 'उद्देशाने नवनवीन शोध घ्या',
        description:
          'अर्थपूर्ण आव्हाने हाताळा आणि उद्योगांना पुन्हा परिभाषित करणाऱ्या प्रकल्पांवर काम करा. तुमच्या कल्पनांना येथे घर आहे.',
      },
      {
        icon: Briefcase,
        title: 'तुमचे करिअर वाढवा',
        description:
          'आम्ही तुमच्या विकासात मार्गदर्शन, सतत शिकण्याच्या संधी आणि प्रगतीसाठी स्पष्ट मार्गांनी गुंतवणूक करतो.',
      },
      {
        icon: Users,
        title: 'एका समुदायाशी संबंधित रहा',
        description:
          'एका विविध, सर्वसमावेशक आणि सहयोगी वातावरणात सामील व्हा जिथे प्रत्येक आवाज ऐकला जातो आणि त्याला महत्त्व दिले जाते.',
      },
    ],
  },
};

export default function CareersSection() {
    const { language } = useLanguage();
    const t = content[language];

    return (
      <section id="careers" className="bg-background py-6 md:py-8 text-foreground">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
              {t.heading}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              {t.subheading}
            </p>
          </div>
  
          <div className="grid md:grid-cols-3 gap-8">
            {t.pillars.map((pillar, index) => (
              <Card key={index} className="bg-muted/30 border-0 text-center shadow-lg transition-transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary text-primary-foreground rounded-full">
                      <pillar.icon className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-headline">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
  
          <div className="text-center mt-12">
            <Button size="lg">
              {t.cta}
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    );
  }
