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
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  imageId: string;
}

const services: Service[] = [
  {
    title: "Web & App Development",
    description: "High-performance digital products tailored to your goals.",
    icon: Code,
    imageId: "service_web_dev",
  },
  {
    title: "Marketing & Branding",
    description: "Data-driven strategies to elevate your brand presence.",
    icon: Megaphone,
    imageId: "service_marketing",
  },
  {
    title: "Tax & Compliance",
    description: "Navigate complex regulations with expert guidance.",
    icon: Landmark,
    imageId: "service_tax",
  },
  {
    title: "Business Setup",
    description: "End-to-end support for a seamless business launch.",
    icon: ToyBrick,
    imageId: "service_biz_setup",
  },
  {
    title: "UI/UX Design",
    description: "Human-centric interfaces that turn visitors into loyal customers.",
    icon: PenTool,
    imageId: "service_ui_ux",
  },
  {
    title: "AI & Automation",
    description: "Streamlining operations with smart, automated workflows.",
    icon: Bot,
    imageId: "service_ai",
  },
  {
    title: "Cloud & Security",
    description: "Robust infrastructure to keep your data safe and always online.",
    icon: Cloud,
    imageId: "service_cloud",
  },
  {
    title: "Startup Advisory",
    description: "Strategic consulting for business scaling and investment.",
    icon: Lightbulb,
    imageId: "service_advisory",
  },
  {
    title: "Content & Social",
    description: "Narrative-driven content that builds authority and engagement.",
    icon: MessageSquare,
    imageId: "service_social",
  },
  {
    title: "24/7 IT Support",
    description: "Dedicated technical assistance to ensure zero downtime.",
    icon: Wrench,
    imageId: "service_support",
  },
];

const ServiceCard = ({ service }: { service: Service }) => {
  const { title, description, icon: Icon, imageId } = service;
  const image = PlaceHolderImages.find(p => p.id === imageId);

  return (
    <Card className="group flex h-full transform flex-col bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center">
          <Icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 h-10">{description}</p>
      </div>
      <div className="mt-auto">
        {image && (
            <Image
                src={image.imageUrl}
                alt={description}
                width={400}
                height={300}
                data-ai-hint={image.imageHint}
                className="object-cover w-full aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
            />
        )}
      </div>
    </Card>
  );
};


export default function PremiumServicesSection() {
  return (
    <section id="services" className="bg-[#F8F9FA] py-20 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
            ))}
        </div>
      </div>
    </section>
  );
}
