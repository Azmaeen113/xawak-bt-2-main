import React, { useState, useEffect } from 'react';
import StarBackground from './components/StarBackground';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TokenomicsSection from './components/TokenomicsSection';
import RoadmapSection from './components/RoadmapSection';
import NftSection from './components/NftSection';
import TeamSection from './components/TeamSection';
import CommunitySection from './components/CommunitySection';
import WhitepaperSection from './components/WhitepaperSection';
import BundlesSection from './components/BundlesSection';

import Footer from './components/Footer';
import SparkleEffect from './components/SparkleEffect';

function App() {
  // State to track if we're on a mobile device
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // No cursor effect toggle needed - using normal cursor

  // Use normal cursor for all devices
  useEffect(() => {
    document.body.style.cursor = 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Render sparkle effect for mouse movement
  const renderSparkleEffect = () => {
    // Only show sparkle effect on desktop
    if (isMobile) return null;

    return <SparkleEffect />;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sparkle effect for mouse movement - only on desktop */}
      {renderSparkleEffect()}

      <StarBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <TokenomicsSection />
      <RoadmapSection />
      <TeamSection />

      <CommunitySection />
      <WhitepaperSection />
      <Footer />
    </div>
  );
}

export default App;