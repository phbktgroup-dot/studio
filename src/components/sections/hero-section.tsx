
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/shared/animated-text";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/language-provider";

const heroText = {
  mr: {
    h1: "तुमचा व्यवसाय करा डिजिटल, तुमची प्रगती आमचे ध्येय.",
    p: "शून्यातून विश्व निर्माण करणाऱ्या जिद्दी उद्योजकांसाठी.",
    ourServices: "आमच्या सेवा",
    contactUs: "आमच्याशी संपर्क साधा",
  },
  en: {
    h1: "Digitize your business, your progress is our goal.",
    p: "For determined entrepreneurs who create a universe from nothing.",
    ourServices: "Our Services",
    contactUs: "Contact Us",
  },
};

const animatedCornerText = [
  "Website Development | वेबसाइट डेव्हलपमेंट",
  "App Development | अ‍ॅप डेव्हलपमेंट",
  "Business Operations | बिझनेस ऑपरेशन्स",
  "Tax & Compliance | टॅक्स आणि कंप्लायन्स",
];

export default function HeroSection() {
  const { language } = useLanguage();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('hero_video_url')
          .eq('id', 1)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.warn("Could not fetch hero data:", error.message);
          return;
        }

        if (data) {
          setVideoUrl(data.hero_video_url || null);
        }
      } catch (error: any) {
        console.warn("Could not fetch hero data, using defaults:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <section className="relative h-[75vh] min-h-[550px] w-full overflow-hidden bg-background">
      {loading ? (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-background" />
      ) : (
        <>
          {videoUrl ? (
            <video
              key={videoUrl}
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 z-0 h-full w-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 z-0"
            >
            </div>
          )}
        </>
      )}
      
      <div className="absolute inset-0 z-5 pointer-events-none hidden md:block">
            <div className="absolute top-8 left-8 text-white/80 text-xs font-medium animate-bob drop-shadow-lg" style={{ animationDelay: '0s' }}>
                {animatedCornerText[0]}
            </div>
            <div className="absolute top-8 right-8 text-white/80 text-xs font-medium text-right animate-bob drop-shadow-lg" style={{ animationDelay: '0.5s' }}>
                {animatedCornerText[1]}
            </div>
            <div className="absolute bottom-20 left-8 text-white/80 text-xs font-medium animate-bob drop-shadow-lg" style={{ animationDelay: '1s' }}>
                {animatedCornerText[2]}
            </div>
            <div className="absolute bottom-20 right-8 text-white/80 text-xs font-medium text-right animate-bob drop-shadow-lg" style={{ animationDelay: '1.5s' }}>
                {animatedCornerText[3]}
            </div>
        </div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
        <AnimatedText
          text={heroText[language].h1}
          el="h1"
          className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-white drop-shadow-md"
          spanClassName="py-4"
        />
        <AnimatedText
          text={heroText[language].p}
          className="mt-4 max-w-2xl text-base drop-shadow-md text-white/80"
          stagger={0.01}
        />
        <div className="mt-8 flex gap-4">
          <Button size="lg" asChild>
            <Link href="#services">{heroText[language].ourServices}</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-primary hover:border-primary hover:text-primary-foreground" asChild>
            <Link href="#contact">{heroText[language].contactUs}</Link>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <Link href="#stats">
          <ArrowDown className="h-8 w-8 text-white animate-bounce" />
          <span className="sr-only">Scroll down</span>
        </Link>
      </div>
    </section>
  );
}
