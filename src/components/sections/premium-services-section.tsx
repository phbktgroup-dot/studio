'use client';

import {
  Code,
  Megaphone,
  Landmark,
  ToyBrick,
  PenTool,
  Bot,
  Cloud,
  Lightbulb,
  MessageSquare,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

const services: Service[] = [
  {
    title: "Web & App Development",
    description: "High-performance digital products tailored to your goals.",
    icon: Code,
  },
  {
    title: "Marketing & Branding",
    description: "Data-driven strategies to elevate your brand presence.",
    icon: Megaphone,
  },
  {
    title: "Tax & Compliance",
    description: "Navigate complex regulations with expert guidance.",
    icon: Landmark,
  },
  {
    title: "Business Setup",
    description: "End-to-end support for a seamless business launch.",
    icon: ToyBrick,
  },
  {
    title: "UI/UX Design",
    description: "Human-centric interfaces that turn visitors into loyal customers.",
    icon: PenTool,
  },
  {
    title: "AI & Automation",
    description: "Streamlining operations with smart, automated workflows.",
    icon: Bot,
  },
  {
    title: "Cloud & Security",
    description: "Robust infrastructure to keep your data safe and always online.",
    icon: Cloud,
  },
  {
    title: "Startup Advisory",
    description: "Strategic consulting for business scaling and investment.",
    icon: Lightbulb,
  },
  {
    title: "Content & Social",
    description: "Narrative-driven content that builds authority and engagement.",
    icon: MessageSquare,
  },
  {
    title: "24/7 IT Support",
    description: "Dedicated technical assistance to ensure zero downtime.",
    icon: Wrench,
  },
];

const ServiceCard = ({ service }: { service: Service }) => {
  const { title, description, icon: Icon } = service;
  return (
    <Card className="group flex h-full transform flex-col bg-white p-12 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-200">
      <div className="flex flex-grow flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center">
          <Icon className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
    </Card>
  );
};


export default function PremiumServicesSection() {
  return (
    <section id="services" className="bg-[#F8F9FA] py-20 md:py-32">
      <div
        className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
      >
        <ul className="flex items-center justify-center animate-scroll hover:[animation-play-state:paused] md:justify-start [&_li]:mx-4">
          {services.map((service, index) => (
            <li key={index} className="flex-shrink-0 w-80">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
        <ul className="flex items-center justify-center animate-scroll hover:[animation-play-state:paused] md:justify-start [&_li]:mx-4" aria-hidden="true">
          {services.map((service, index) => (
            <li key={index} className="flex-shrink-0 w-80">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
