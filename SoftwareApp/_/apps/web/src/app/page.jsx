"use client";
import { useHomePageData } from "@/hooks/useHomePageData";
import { Header } from "@/components/HomePage/Header";
import { SkillsShowcase } from "@/components/HomePage/SkillsShowcase";
import { NavigationTabs } from "@/components/HomePage/NavigationTabs";
import { OverviewTab } from "@/components/HomePage/tabs/OverviewTab";
import { AgileTab } from "@/components/HomePage/tabs/AgileTab";
import { TeamTab } from "@/components/HomePage/tabs/TeamTab";
import { CommunicationTab } from "@/components/HomePage/tabs/CommunicationTab";
import { Footer } from "@/components/HomePage/Footer";

export default function HomePage() {
  const { activeTab, setActiveTab } = useHomePageData();

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "agile":
        return <AgileTab />;
      case "team":
        return <TeamTab />;
      case "communication":
        return <CommunicationTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SkillsShowcase />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
