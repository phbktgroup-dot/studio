'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/language-provider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";

const text = {
  mr: {
    h2: "चला, सोबत मिळून यशाचे नवीन शिखर गाठूया.",
    p: "तुमची दृष्टी प्रत्यक्षात आणूया. तुमचा डिजिटल प्रवास सुरू करण्यासाठी तुमची चौकशी सबमिट करा.",
    cardTitle: "तुमची दृष्टी शेअर करा",
    cardDescription: "आम्ही तुमच्या कल्पनेला प्रत्यक्षात आणण्यासाठी उत्सुक आहोत.",
    nameLabel: "तुमचे नाव",
    namePlaceholder: "उदा. जॉन डो",
    emailLabel: "तुमचा ईमेल",
    emailPlaceholder: "john@example.com",
    visionLabel: "तुमची दृष्टी",
    visionPlaceholder: "तुमच्या प्रोजेक्टबद्दल आम्हाला सांगा...",
    submitButton: "चौकशी सबमिट करा"
  },
  en: {
    h2: "Let's Reach New Peaks of Success Together.",
    p: "Let's turn your vision into a reality. Submit your inquiry to start your digital journey.",
    cardTitle: "Share Your Vision",
    cardDescription: "We're excited to hear about what you want to build.",
    nameLabel: "Your Name",
    namePlaceholder: "e.g., John Doe",
    emailLabel: "Your Email",
    emailPlaceholder: "john@example.com",
    visionLabel: "Your Vision",
    visionPlaceholder: "Tell us about your project...",
    submitButton: "Submit Inquiry"
  },
};


export default function ContactActionSection() {
  const { language } = useLanguage();
  const t = text[language];

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="text-center md:text-left">
                <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
                    {t.h2}
                </h2>
                <p className="mt-4 max-w-md mx-auto md:mx-0 text-muted-foreground md:text-xl">
                    {t.p}
                </p>
            </div>
            <Card className="shadow-2xl">
                <form>
                    <CardHeader>
                        <CardTitle>{t.cardTitle}</CardTitle>
                        <CardDescription>{t.cardDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t.nameLabel}</Label>
                                <Input id="name" placeholder={t.namePlaceholder} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">{t.emailLabel}</Label>
                                <Input id="email" type="email" placeholder={t.emailPlaceholder} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">{t.visionLabel}</Label>
                            <Textarea id="message" placeholder={t.visionPlaceholder} className="min-h-[120px]" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" size="lg" className="w-full">
                            <Send className="mr-2" />
                            {t.submitButton}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
          </div>
      </div>
    </section>
  );
}
