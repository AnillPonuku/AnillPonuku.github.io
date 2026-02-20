import { useState } from "react";
import TopToolbar from "@/components/TopToolbar";
import LeftToolbar from "@/components/LeftToolbar";
import LayersPanel from "@/components/LayersPanel";
import StatusBar from "@/components/StatusBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  const [zoom, setZoom] = useState(100);
  const [name, setName] = useState("");

  const handleZoomIn = () => setZoom((z) => Math.min(z + 25, 200));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 25, 25));

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <TopToolbar titleText={name ? `${name}'s File` : "portfolio.ai"} />
      <LeftToolbar />
      <LayersPanel />
      <StatusBar zoom={zoom} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />

      {/* Main canvas area */}
      <main
        className="pt-8 pb-6 md:pl-10 lg:pr-48"
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
      >
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
