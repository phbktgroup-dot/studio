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
    heading: 'तुमचे भविष्य येथे घडवा',
    subheading: 'आम्ही नवकल्पनांना चालना देणारी, सहयोगी आणि सर्वसमावेशक टीम आहोत.',
    cta: 'रिक्त पदे एक्सप्लोर करा',
    pillars: [
      {
        icon: Lightbulb,
        title: 'उद्देशाने नवकल्पना',
        description:
          'अर्थपूर्ण आव्हाने हाताळा आणि उद्योगांना पुन्हा परिभाषित करणाऱ्या प्रकल्पांवर काम करा. तुमच्या कल्पनांना येथे घर आहे.',
      },
      {
        icon: Briefcase,
        title: 'सतत शिकण्याच्या संधी',
        description:
          'आम्ही तुमच्या विकासात मार्गदर्शन, सतत शिकण्याच्या संधी आणि प्रगतीसाठी स्पष्ट मार्गांनी गुंतवणूक करतो.',
      },
      {
        icon: Users,
        title: 'स्पष्ट करिअर वाढीचे मार्ग',
        description:
          'एका विविध, सर्वसमावेशक आणि सहयोगी वातावरणात सामील व्हा जिथे प्रत्येक आवाज ऐकला जातो आणि त्याला महत्त्व दिले जाते.',
      },
    ],
  },
  hi: {
    heading: 'अपना भविष्य यहीं बनाएँ।',
    subheading:
      'हम इनोवेटर्स और बिल्डर्स की टीम हैं जो बदलाव लाने के लिए काम करती है।',
    cta: 'खुली पोज़िशन देखें',
    pillars: [
      {
        icon: Lightbulb,
        title: 'उद्देश्य के साथ नवाचार',
        description:
          'सार्थक चुनौतियों का सामना करें और उन परियोजनाओं पर काम करें जो उद्योगों को फिर से परिभाषित करती हैं। आपके विचारों का यहाँ स्वागत है।',
      },
      {
        icon: Briefcase,
        title: 'निरंतर सीखने और ग्रोथ के अवसर',
        description:
          'हम आपके विकास में मेंटरशिप, निरंतर सीखने के अवसरों और उन्नति के लिए स्पष्ट मार्गों के साथ निवेश करते हैं।',
      },
      {
        icon: Users,
        title: 'सहयोगी और समावेशी संस्कृति',
        description:
          'एक विविध, समावेशी और सहयोगी वातावरण में शामिल हों जहाँ हर आवाज़ सुनी और मूल्यवान मानी जाती है।',
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
            <h3 className="text-base font-semibold uppercase tracking-wider text-black mb-2">
              {t.heading}
            </h3>
            <h2 className="font-headline text-xl md:text-2xl font-bold tracking-tighter text-primary">
              {t.subheading}
            </h2>
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
