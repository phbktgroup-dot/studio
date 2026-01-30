import Header from "@/components/shared/header";
import HeroSection from "@/components/sections/hero-section";
import StatsSection from "@/components/sections/stats-section";
import EcosystemSection from "@/components/sections/ecosystem-section";
import SuccessRoadmapSection from "@/components/sections/success-roadmap-section";
import ComplianceShieldSection from "@/components/sections/compliance-shield-section";
import TrustStatsSection from "@/components/sections/trust-stats-section";
import ContactActionSection from "@/components/sections/contact-action-section";
import Footer from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <EcosystemSection />
        <SuccessRoadmapSection />
        <ComplianceShieldSection />
        <TrustStatsSection />
        <ContactActionSection />
      </main>
      <Footer />
    </div>
  );
}
