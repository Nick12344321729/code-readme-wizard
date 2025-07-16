import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { ReadmeBuilder } from "@/components/ReadmeBuilder";

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "builder">("landing");

  const handleGetStarted = () => {
    setCurrentView("builder");
  };

  const handleBackToHome = () => {
    setCurrentView("landing");
  };

  if (currentView === "builder") {
    return <ReadmeBuilder onBack={handleBackToHome} />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Index;
