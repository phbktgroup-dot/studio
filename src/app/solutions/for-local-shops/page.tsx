'use client';

import { useLanguage } from '@/context/language-provider';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, Smartphone, MapPin, FileText, ShoppingCart, TrendingUp, Handshake, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedText } from '@/components/shared/animated-text';

const content = {
    en: {
        title: "For Local Shops",
        heading: "Empowering Neighborhood Businesses",
        intro: [
            "Local shops are not just commercial spaces — they are deeply rooted in the daily lives of communities. From early-morning kirana stores and trusted medical shops to neighborhood salons, repair centers, cafés, and family-run retail outlets, these businesses thrive on personal relationships, consistency, and trust built over years. They serve customers who return not because of discounts or ads, but because of familiarity, reliability, and human connection.",
            "However, the environment around local businesses is changing rapidly. Customers now expect faster service, digital payment options, accurate pricing, and online visibility — even from neighborhood shops. At the same time, shop owners continue to manage daily operations manually, juggling billing, inventory, suppliers, taxes, and compliance, often without dedicated staff or technical support. This creates pressure, inefficiencies, and limits growth.",
            "Our solutions are designed specifically for everyday local businesses — practical, affordable, and easy-to-use systems that strengthen how your shop operates without changing its soul. We don’t try to turn local shops into complex enterprises. Instead, we quietly modernize operations, improve visibility, and simplify compliance so shop owners can focus on what matters most: serving customers and growing sustainably."
        ],
        whyTitle: "Why Local Shops Need Digital Support Today",
        whyPoints: {
            customerBehavior: {
                title: "Changing Customer Behavior",
                items: ["Customers search on Google before visiting nearby shops", "Preference for digital payments and online ordering", "Expectation of faster billing and accurate pricing", "Demand for better service, availability, and convenience"],
                icon: Smartphone
            },
            operationalChallenges: {
                title: "Operational Challenges",
                items: ["Manual billing and inventory tracking", "Stock shortages or over-purchasing", "Time lost in paperwork and daily calculations", "Difficulty managing GST and tax records"],
                icon: TrendingUp
            },
            growingCompetition: {
                title: "Growing Competition",
                items: ["Organized retail chains and online marketplaces", "Shops with stronger digital visibility", "Businesses offering speed, convenience, and seamless service"],
                icon: Handshake
            },
        },
        challengeConclusion: "Our solutions address these challenges head-on, helping local shops stay competitive, profitable, and future-ready.",
        howTitle: "How We Empower Neighborhood Businesses",
        howPoints: [
            {
                step: "1️⃣",
                title: "Digitize Daily Operations",
                description: "We replace manual processes with simple digital systems that are easy to use and quick to adopt — even for first-time users.",
                items: ["Digital billing instead of handwritten bills", "Automated calculations and GST handling", "Real-time stock updates after every sale", "Clear daily, weekly, and monthly sales visibility", "Reduced dependency on manual work and guesswork"],
                result: "Result: fewer mistakes, faster service, and smoother daily operations — even during peak hours.",
                imageId: "local_shop_billing"
            },
            {
                step: "2️⃣",
                title: "Expand Local Reach",
                description: "Your shop doesn’t need to be online everywhere — it just needs to be visible where your customers are searching.",
                items: ["Appear on Google Maps and local search results", "Show accurate shop details, timings, and location", "Build trust through reviews and ratings", "Attract nearby customers actively searching to buy"],
                result: "Result: online searches turn into walk-in customers.",
                imageId: "local_seo_maps"
            },
            {
                step: "3️⃣",
                title: "Simplify Compliance & Records",
                description: "Compliance should never slow down your business. We make it easy, automated, and stress-free.",
                items: ["Automated GST-ready billing", "Organized sales and purchase records", "Return-ready reports for filing", "Reduced dependency on accountants for daily work", "Fewer errors, penalties, and last-minute stress"],
                result: "Result: you stay compliant without spending hours on paperwork.",
                imageId: "tax_compliance_docs"
            }
        ],
        solutionsTitle: "Solutions Built for Local Shops",
        solutions: [
            {
                icon: Smartphone,
                title: "Inventory & Billing Apps",
                description: "Inventory and billing are the heart of any shop. Manual tracking often leads to loss, confusion, and wasted time. Our apps are designed to work exactly the way local shops operate.",
                subItems: {
                    features: {
                        title: "Features",
                        items: ["Simple and fast billing process", "GST-compliant invoices", "Automatic inventory updates", "Low-stock alerts", "Supplier and product tracking", "Daily, weekly, and monthly reports"]
                    },
                    howItHelps: {
                        title: "How It Helps",
                        items: ["Faster checkout and shorter queues", "Better stock planning", "Reduced wastage and losses", "Clear understanding of profits", "Reliable records for audits and taxes"]
                    }
                }
            },
            {
                icon: MapPin,
                title: "Local SEO & Google Maps Presence",
                description: "Most customers search online before stepping out. If your shop doesn’t appear, they choose someone else.",
                subItems: {
                    whatWeSetUp: {
                        title: "What We Set Up",
                        items: ["Google Business Profile creation or optimization", "Correct address, location pin, timings, and categories", "Business photos and service details", "Local keyword optimization", "Review management guidance"]
                    },
                    businessImpact: {
                        title: "Business Impact",
                        items: ["Increased foot traffic", "More calls and direction requests", "Stronger trust with new customers", "Better visibility than nearby competitors", "Continuous local discovery"]
                    }
                }
            },
            {
                icon: FileText,
                title: "GST & Tax Automation",
                description: "GST and tax compliance can be confusing for small businesses. We simplify it using automation.",
                 subItems: {
                    whatsIncluded: {
                        title: "What’s Included",
                        items: ["GST-enabled billing", "Automatic tax calculations", "Organized sales and purchase data", "Monthly and quarterly summaries", "Compliance reminders"]
                    },
                    benefits: {
                        title: "Benefits",
                        items: ["Reduced stress during filing", "Fewer calculation errors", "Time savings every month", "Better financial clarity", "Confidence during inspections"]
                    }
                }
            },
            {
                icon: ShoppingCart,
                title: "Easy Online Store Setup",
                description: "Even local shops can sell online without becoming complicated e-commerce businesses.",
                subItems: {
                    whatWeProvide: {
                        title: "What We Provide",
                        items: ["Simple online store connected to your shop", "Product listing and pricing setup", "Digital payment options", "Order and delivery management", "Mobile-friendly customer experience"]
                    },
                    whyItMatters: {
                        title: "Why It Matters",
                        items: ["Accept orders beyond shop hours", "Sell via WhatsApp and social media", "Reach customers who prefer online ordering", "Increase overall sales without high costs", "Stay relevant in a digital-first market"]
                    }
                }
            }
        ],
        idealForTitle: "Designed for Real Local Businesses",
        idealForItems: [
            "Kirana & grocery stores", "Medical & pharmacy shops", "Clothing & footwear stores", "Electronics & mobile shops", "Salons, cafés, and service providers", "Any small or neighborhood business"
        ],
        resultTitle: "The Result for Your Shop",
        resultItems: ["Digitally enabled daily operations", "Faster service and happier customers", "Better inventory and sales control", "Simplified GST and compliance", "Increased local visibility and reach", "A modern, future-ready neighborhood business"],
    }
};

const WhySection = ({ points }: { points: any }) => {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            {Object.values(points).map((point: any, index) => (
                 <Card key={index} className="text-left bg-card">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
                                <point.icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-lg text-primary">{point.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                           {point.items.map((item: string, i: number) => (
                                <li key={i} className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">{item}</span>
                                </li>
                           ))}
                        </ul>
                    </CardContent>
                 </Card>
            ))}
        </div>
    )
};

const HowSection = ({ point, index }: { point: any, index: number }) => {
    const image = PlaceHolderImages.find(p => p.id === point.imageId);
    const isEven = index % 2 === 0;

    return (
        <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${isEven ? '' : 'md:grid-flow-row-dense'}`}>
            <div className={`aspect-square rounded-lg overflow-hidden relative ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                {image && (
                    <Image
                        src={image.imageUrl}
                        alt={point.title}
                        fill
                        data-ai-hint={image.imageHint}
                        className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                )}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
             <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                <h3 className="font-headline text-3xl font-bold">
                    <span className="text-primary mr-2">{point.step}</span>
                    {point.title}
                </h3>
                <p className="mt-4 text-lg text-muted-foreground">{point.description}</p>
                <ul className="mt-6 space-y-3">
                    {point.items.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-primary/80 mt-1" />
                            <span className="font-medium text-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 font-semibold text-primary border-l-4 border-primary pl-4">{point.result}</p>
            </div>
        </div>
    )
}

const SolutionCard = ({ solution }: { solution: any }) => {
    return (
        <Card className="p-6 h-full transition-all hover:shadow-lg hover:-translate-y-1">
             <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
                    <solution.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-bold text-primary">{solution.title}</h3>
            </div>
            <p className="text-muted-foreground mb-6">{solution.description}</p>
            <div className="grid md:grid-cols-2 gap-6">
                {Object.values(solution.subItems).map((sub: any, i) => (
                    <div key={i}>
                        <h4 className="font-semibold mb-2">{sub.title}</h4>
                        <ul className="space-y-2">
                           {sub.items.map((item: string, j: number) => (
                                <li key={j} className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">{item}</span>
                                </li>
                           ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Card>
    )
};


export default function ForLocalShopsPage() {
    // For now, only English content is provided.
    // In a real scenario, we would use 'useLanguage' hook.
    const t = content.en; 

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow">
                 <div className="container py-8 md:py-12">
                     <Button variant="ghost" asChild className="mb-8">
                        <Link href="/#solutions">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Solutions
                        </Link>
                    </Button>
                    
                    <header className="text-center mb-16">
                        <p className="font-bold text-primary tracking-wider uppercase text-sm md:text-base">
                            {t.title}
                        </p>
                        <AnimatedText
                            el="h1"
                            text={t.heading}
                            className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-2 leading-tight"
                        />
                    </header>

                    <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-muted-foreground space-y-6 mb-16 text-center">
                        {t.intro.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                 </div>

                 <section className="py-12 md:py-16 bg-muted/20">
                     <div className="container">
                        <header className="text-center mb-12">
                             <AnimatedText
                                el="h2"
                                text={t.whyTitle}
                                className="font-headline text-3xl font-bold tracking-tighter"
                             />
                        </header>
                        <WhySection points={t.whyPoints} />
                         <p className="mt-12 text-center text-lg text-muted-foreground max-w-3xl mx-auto">{t.challengeConclusion}</p>
                     </div>
                 </section>

                <section className="py-12 md:py-24">
                     <div className="container space-y-24">
                        <header className="text-center mb-12">
                             <AnimatedText
                                el="h2"
                                text={t.howTitle}
                                className="font-headline text-3xl font-bold tracking-tighter"
                             />
                        </header>
                        {t.howPoints.map((point, index) => (
                            <HowSection key={index} point={point} index={index} />
                        ))}
                     </div>
                </section>

                <section className="py-12 md:py-16 bg-muted/20">
                    <div className="container">
                        <header className="text-center mb-12">
                             <AnimatedText
                                el="h2"
                                text={t.solutionsTitle}
                                className="font-headline text-3xl font-bold tracking-tighter"
                             />
                        </header>
                        <div className="grid lg:grid-cols-2 gap-8">
                            {t.solutions.map((solution, i) => (
                                <SolutionCard key={i} solution={solution} />
                            ))}
                        </div>
                    </div>
                </section>
                
                <section className="py-12 md:py-16">
                     <div className="container text-center max-w-4xl">
                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-2xl font-headline text-primary text-center">{t.idealForTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                                    {t.idealForItems.map((item, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <Shield className="h-5 w-5 text-primary/80 mt-1 flex-shrink-0" />
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-primary/10 mt-12 border-primary/30">
                            <CardHeader>
                                <CardTitle className="text-2xl font-headline text-primary text-center">{t.resultTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                                    {t.resultItems.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-left">
                                            <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                            <span className="font-semibold">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                     </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
