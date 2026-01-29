import Header from "@/components/shared/header";
import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import MarketingSection from "@/components/sections/marketing-section";
import ComplianceSection from "@/components/sections/compliance-section";
import LaunchpadSection from "@/components/sections/launchpad-section";
import RoadmapSection from "@/components/sections/roadmap-section";
import StatsSection from "@/components/sections/stats-section";
import Footer from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <MarketingSection />
        <ComplianceSection />
        <LaunchpadSection />
        <RoadmapSection />
      </main>
      <Footer />
    </div>
  );
}
