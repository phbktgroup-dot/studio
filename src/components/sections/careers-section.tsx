'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Briefcase, Lightbulb, Users } from 'lucide-react';

const content = {
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
  };

export default function CareersSection() {
    return (
      <section className="bg-background py-12 md:py-16 text-foreground">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
              {content.heading}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              {content.subheading}
            </p>
          </div>
  
          <div className="grid md:grid-cols-3 gap-8">
            {content.pillars.map((pillar, index) => (
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
              {content.cta}
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    );
  }
