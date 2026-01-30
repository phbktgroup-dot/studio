'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactActionSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container max-w-3xl text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
            चला, सोबत मिळून यशाचे नवीन शिखर गाठूया.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Let's turn your vision into a reality. Submit your inquiry to start your digital journey.
        </p>
        <form className="mt-12 text-left space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="message">Your Vision</Label>
                <Textarea id="message" placeholder="Tell us about your project..." />
            </div>
            <div className="text-center">
                <Button type="submit" size="lg" className="group relative overflow-hidden">
                    <span className="absolute inset-0 bg-primary/80 w-0 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative">Submit Inquiry</span>
                </Button>
            </div>
        </form>
      </div>
    </section>
  );
}
