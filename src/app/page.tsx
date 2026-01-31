
import Header from "@/components/shared/header";
import HeroSection from "@/components/sections/hero-section";
import StatsSection from "@/components/sections/stats-section";
import SuccessRoadmapSection from "@/components/sections/success-roadmap-section";
import PremiumServicesSection from "@/components/sections/premium-services-section";
import ContactActionSection from "@/components/sections/contact-action-section";
import Footer from "@/components/shared/footer";
import PerspectivesSection from "@/components/sections/perspectives-section";
import ESGSection from "@/components/sections/esg-section";
import CareersSection from "@/components/sections/careers-section";
import OurWorkSection from "@/components/sections/our-work-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <PremiumServicesSection />
        <SuccessRoadmapSection />
        <PerspectivesSection />
        <OurWorkSection />
        <ESGSection />
        <CareersSection />
        <StatsSection />
        <ContactActionSection />
      </main>
      <Footer />
    </div>
  );
}
