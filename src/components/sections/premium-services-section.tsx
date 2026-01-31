'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface Service {
  title: string;
  description: string;
  imageId: string;
}

const services: Service[] = [
  {
    title: "Web & App Development",
    description: "High-performance digital products tailored to your goals.",
    imageId: "service_web_dev",
  },
  {
    title: "Marketing & Branding",
    description: "Data-driven strategies to elevate your brand presence.",
    imageId: "service_marketing",
  },
  {
    title: "Tax & Compliance",
    description: "Navigate complex regulations with expert guidance.",
    imageId: "service_tax",
  },
  {
    title: "Business Setup",
    description: "End-to-end support for a seamless business launch.",
    imageId: "service_biz_setup",
  },
  {
    title: "UI/UX Design",
    description: "Human-centric interfaces that turn visitors into loyal customers.",
    imageId: "service_ui_ux",
  },
  {
    title: "AI & Automation",
    description: "Streamlining operations with smart, automated workflows.",
    imageId: "service_ai",
  },
  {
    title: "Cloud & Security",
    description: "Robust infrastructure to keep your data safe and always online.",
    imageId: "service_cloud",
  },
  {
    title: "Startup Advisory",
    description: "Strategic consulting for business scaling and investment.",
    imageId: "service_advisory",
  },
  {
    title: "Content & Social",
    description: "Narrative-driven content that builds authority and engagement.",
    imageId: "service_social",
  },
  {
    title: "24/7 IT Support",
    description: "Dedicated technical assistance to ensure zero downtime.",
    imageId: "service_support",
  },
];

const ServiceCard = ({ service }: { service: Service }) => {
  const { title, description, imageId } = service;
  const image = PlaceHolderImages.find(p => p.id === imageId);

  return (
    <Card className="group flex h-full w-72 flex-shrink-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {image && (
          <Image
              src={image.imageUrl}
              alt={description}
              width={400}
              height={300}
              data-ai-hint={image.imageHint}
              className="w-full object-cover aspect-[16/9] transition-transform duration-500 group-hover:scale-105"
          />
      )}
      <div className="p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-2 h-10 text-sm text-gray-600">{description}</p>
      </div>
    </Card>
  );
};


export default function PremiumServicesSection() {
  return (
    <section id="services" className="bg-[#F8F9FA] py-20 md:py-32">
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 animate-scroll">
                {services.map((service, index) => (
                    <li key={index}>
                        <ServiceCard service={service} />
                    </li>
                ))}
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 animate-scroll" aria-hidden="true">
                {services.map((service, index) => (
                    <li key={index}>
                        <ServiceCard service={service} />
                    </li>
                ))}
            </ul>
        </div>
    </section>
  );
}
