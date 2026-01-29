"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Sphere from "@/components/three/sphere";
import { AnimatedText } from "@/components/shared/animated-text";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const [blurAmount, setBlurAmount] = useState(16);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newBlur = Math.max(0, 16 - scrollY / 20);
      setBlurAmount(newBlur);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[700px] w-full overflow-hidden">
      <div
        className="absolute inset-0 z-0 transition-all duration-300 ease-out"
        style={{ filter: `blur(${blurAmount}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50"></div>
        <div className="w-full h-full opacity-30">
          <Sphere />
        </div>
      </div>
      
      <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px]"></div>

      <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
        <AnimatedText
          text="Innovative Solutions for Modern Business"
          el="h1"
          className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
        />
        <AnimatedText
          text="We provide expert financial, compliance, and technological services to propel your growth."
          className="mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl"
          stagger={0.01}
        />
        <div className="mt-8 flex gap-4">
          <Button size="lg" asChild>
            <Link href="#services">Our Services</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#contact">Contact Us</Link>
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
