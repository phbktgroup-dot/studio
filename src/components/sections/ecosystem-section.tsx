'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Megaphone, Landmark, ToyBrick } from "lucide-react";
import { Magnetic } from "@/components/shared/magnetic";
import { AnimatedText } from "@/components/shared/animated-text";

const services = [
  {
    title: "Web/App Development",
    description: "Cutting-edge digital solutions tailored to your needs.",
    icon: Globe,
  },
  {
    title: "Marketing & Branding",
    description: "Data-driven strategies to elevate your brand presence.",
    icon: Megaphone,
  },
  {
    title: "Tax & Compliance",
    description: "Navigate complex regulations with our expert guidance.",
    icon: Landmark,
  },
  {
    title: "Business Setup",
    description: "End-to-end support for a seamless business launch.",
    icon: ToyBrick,
  },
];

export default function EcosystemSection() {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
          एकाच छताखाली पूर्ण व्यावसायिक समाधान.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          The only partner you need to go from 'Idea' to 'Empire'.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Magnetic key={index} strength={15}>
                <Card className="h-full text-left group overflow-hidden relative transition-all duration-300 hover:border-primary hover:shadow-2xl">
                   <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <service.icon className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                        <CardTitle className="font-headline text-lg">{service.title}</CardTitle>
                   </CardHeader>
                   <CardContent>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                   </CardContent>
                </Card>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  );
}
