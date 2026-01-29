import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Magnetic } from "@/components/shared/magnetic";

const services = [
  "Custom App Development",
  "Financial Technology Integration",
  "UI/UX Design & Prototyping",
  "Cloud Solutions & Migration",
];

export default function ServicesSection() {
  const mobileAppImage = PlaceHolderImages.find(p => p.id === 'mobile_app_mockup');

  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-md">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Next-Generation Tech Services
          </h2>
          <p className="mt-4 text-muted-foreground">
            We build scalable, secure, and user-centric applications that drive business value and innovation.
          </p>
          <ul className="mt-6 space-y-4">
            {services.map((service, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-medium">{service}</span>
              </li>
            ))}
          </ul>
          <Button size="lg" className="mt-8">
            Explore Tech Solutions
          </Button>
        </div>
        <div className="flex justify-center items-center">
            <Magnetic strength={20}>
                <Card className="rounded-2xl overflow-hidden shadow-2xl w-[300px] group relative perspective-1000">
                    <CardContent className="p-0">
                    {mobileAppImage && (
                        <Image
                        src={mobileAppImage.imageUrl}
                        alt={mobileAppImage.description}
                        width={600}
                        height={800}
                        data-ai-hint={mobileAppImage.imageHint}
                        className="object-cover transition-transform duration-500 group-hover:scale-105 transform-style-3d group-hover:rotate-x-2 group-hover:rotate-y-3"
                        />
                    )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </CardContent>
                </Card>
            </Magnetic>
        </div>
      </div>
    </section>
  );
}
