"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/shared/animated-text";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/language-provider";

const defaultText = {
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

export default function HeroSection() {
  const { language } = useLanguage();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [heroText, setHeroText] = useState(defaultText);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('hero_video_url, hero_h1_en, hero_p_en, hero_button1_en, hero_button2_en, hero_h1_mr, hero_p_mr, hero_button1_mr, hero_button2_mr')
          .eq('id', 1)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.warn("Could not fetch hero data:", error.message);
          return;
        }

        if (data) {
          setVideoUrl(data.hero_video_url || null);
          setHeroText({
            en: {
              h1: data.hero_h1_en || defaultText.en.h1,
              p: data.hero_p_en || defaultText.en.p,
              ourServices: data.hero_button1_en || defaultText.en.ourServices,
              contactUs: data.hero_button2_en || defaultText.en.contactUs,
            },
            mr: {
              h1: data.hero_h1_mr || defaultText.mr.h1,
              p: data.hero_p_mr || defaultText.mr.p,
              ourServices: data.hero_button1_mr || defaultText.mr.ourServices,
              contactUs: data.hero_button2_mr || defaultText.mr.contactUs,
            },
          });
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
              className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50"
            >
            </div>
          )}
        </>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

      <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
        <AnimatedText
          text={heroText[language].h1}
          el="h1"
          className="font-headline text-6xl font-bold tracking-tighter sm:text-7xl"
          spanClassName="py-4"
        />
        <AnimatedText
          text={heroText[language].p}
          className="mt-4 max-w-2xl text-foreground/80 text-base"
          stagger={0.01}
        />
        <div className="mt-8 flex gap-4">
          <Button size="lg" asChild>
            <Link href="#services">{heroText[language].ourServices}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#contact">{heroText[language].contactUs}</Link>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <Link href="#stats">
          <ArrowDown className="h-8 w-8 text-foreground/50 animate-bounce" />
          <span className="sr-only">Scroll down</span>
        </Link>
      </div>
    </section>
  );
}
