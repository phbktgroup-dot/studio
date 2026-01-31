'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Leaf, Laptop } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

const sectionText = {
  en: {
    heading: "ESG & Sustainability",
    subheading: "Building a better future, together.",
    empowering: {
      title: "Empowering Local Entrepreneurs",
      description: "Providing tools and mentorship to fuel grassroots innovation and local economies."
    },
    carbon: {
      title: "Carbon Neutral",
      description: "Our operations are 100% carbon neutral, investing in a greener planet."
    },
    literacy: {
      title: "Digital Literacy",
      description: "Bridging the digital divide with free workshops and educational programs."
    }
  },
  mr: {
    heading: "ESG आणि शाश्वतता",
    subheading: "एकत्रितपणे एक चांगले भविष्य घडवूया.",
    empowering: {
      title: "स्थानिक उद्योजकांचे सक्षमीकरण",
      description: "तळागाळातील नवनिर्मिती आणि स्थानिक अर्थव्यवस्थेला चालना देण्यासाठी साधने आणि मार्गदर्शन प्रदान करणे."
    },
    carbon: {
      title: "कार्बन न्यूट्रल",
      description: "आमचे कार्य 100% कार्बन न्यूट्रल आहे, जे एका हरित ग्रहामध्ये गुंतवणूक करते."
    },
    literacy: {
      title: "डिजिटल साक्षरता",
      description: "मोफत कार्यशाळा आणि शैक्षणिक कार्यक्रमांद्वारे डिजिटल दरी कमी करणे."
    }
  }
};

const BentoCard = ({ className, title, description, icon: Icon, delay }: { className?: string, title: string, description: string, icon: React.ElementType, delay: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if(ref.current) observer.unobserve(ref.current);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);
    
    return (
        <Card ref={ref} className={cn(
            "group relative overflow-hidden transition-all duration-500 will-change-transform",
            "bg-white hover:bg-gradient-to-br from-white to-sky-100 dark:from-background dark:to-sky-950/20",
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
            className
        )} style={{ transitionDelay: `${delay}ms` }}>
            <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-3 bg-muted rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-headline mt-1">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
            <Leaf className="absolute -bottom-4 -right-4 h-16 w-16 text-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-bob" style={{animationDelay: '0.5s'}} />
        </Card>
    );
};


export default function ESGSection() {
    const { language } = useLanguage();
    const text = sectionText[language];

    return (
        <section className="py-20 md:py-32 bg-muted/30">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                        {text.heading}
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                        {text.subheading}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                         <BentoCard 
                            className="h-full"
                            title={text.empowering.title}
                            description={text.empowering.description}
                            icon={Users}
                            delay={100}
                         />
                    </div>
                   
                    <div className="space-y-6">
                         <BentoCard 
                            title={text.carbon.title}
                            description={text.carbon.description}
                            icon={Leaf}
                            delay={200}
                         />
                         <BentoCard 
                            title={text.literacy.title}
                            description={text.literacy.description}
                            icon={Laptop}
                            delay={300}
                         />
                    </div>
                </div>
            </div>
        </section>
    );
}
