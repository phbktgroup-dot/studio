
'use client';

import { useLanguage } from '@/context/language-provider';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, Code, Eye, BarChart, Rocket } from 'lucide-react';
import { projects } from '@/lib/projects-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const { language } = useLanguage();
  const project = projects.find(p => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const getTitle = (p: typeof project) => {
    if (language === 'hi') return p.titleHi;
    if (language === 'mr') return p.titleMr;
    return p.titleEn;
  }

  const getDescription = (p: typeof project) => {
    if (language === 'hi') return p.descriptionHi;
    if (language === 'mr') return p.descriptionMr;
    return p.descriptionEn;
  }
  
  const image = PlaceHolderImages.find(p => p.id === project.imageId);

  const t = {
      back: language === 'mr' ? "आमच्या कामावर परत जा" : language === 'hi' ? "हमारे काम पर वापस जाएं" : "Back to Our Work",
      overview: language === 'mr' ? "प्रकल्प आढावा" : language === 'hi' ? "परियोजना अवलोकन" : "Project Overview",
      challenge: language === 'mr' ? "आव्हान" : language === 'hi' ? "चुनौती" : "The Challenge",
      solution: language === 'mr' ? "समाधान" : language === 'hi' ? "हमारा समाधान" : "Our Solution",
      techStack: language === 'mr' ? "तंत्रज्ञान स्टॅक" : language === 'hi' ? "प्रौद्योगिकी स्टैक" : "Tech Stack",
      results: language === 'mr' ? "परिणाम" : language === 'hi' ? "परिणाम" : "Results & Impact",
      liveDemo: language === 'mr' ? "थेट डेमो पहा" : language === 'hi' ? "लाइव डेमो देखें" : "View Live Demo",
      viewCode: language === 'mr' ? "कोड पहा" : language === 'hi' ? "कोड देखें" : "View Code",
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <div className="container py-8 md:py-12">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/#work">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.back}
            </Link>
          </Button>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div>
                     <header className="mb-8">
                        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-2 leading-tight text-primary">
                        {getTitle(project)}
                        </h1>
                        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
                        {getDescription(project)}
                        </p>
                    </header>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <p>This case study provides a detailed look at the {getTitle(project)} project, outlining the challenges, our strategic approach, and the impactful results we delivered.</p>
                        <p>Our goal was to create a best-in-class digital product that not only met the client's immediate needs but also provided a scalable foundation for future growth and innovation.</p>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <Button size="lg"><Eye className="mr-2" />{t.liveDemo}</Button>
                        <Button size="lg" variant="outline"><Code className="mr-2" />{t.viewCode}</Button>
                    </div>
                </div>
                <div>
                    {image && (
                    <Image
                        src={image.imageUrl}
                        alt={getTitle(project)}
                        width={600}
                        height={600}
                        data-ai-hint={image.imageHint}
                        className="w-full h-auto object-cover rounded-lg shadow-lg aspect-square"
                    />
                    )}
                </div>
            </div>

            <div className="mt-16 md:mt-24 grid md:grid-cols-3 gap-8">
                <Card>
                    <CardHeader className="flex-row items-center gap-4">
                        <Rocket className="w-8 h-8 text-primary" />
                        <CardTitle className="font-headline">{t.challenge}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">The primary challenge was to build a highly scalable platform capable of handling over 1 million concurrent users, while ensuring a seamless and intuitive user experience across all devices.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex-row items-center gap-4">
                        <BarChart className="w-8 h-8 text-primary" />
                        <CardTitle className="font-headline">{t.results}</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" /><span>Achieved a 40% increase in user engagement.</span></li>
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" /><span>Reduced server costs by 25% through optimization.</span></li>
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" /><span>Successfully launched MVP in under 3 months.</span></li>
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex-row items-center gap-4">
                        <Code className="w-8 h-8 text-primary" />
                        <CardTitle className="font-headline">{t.techStack}</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-sm text-muted-foreground">React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Docker, AWS.</p>
                    </CardContent>
                </Card>
            </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
