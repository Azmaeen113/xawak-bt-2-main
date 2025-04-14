import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

const HeroSection: React.FC = () => {
  // Function to handle smooth scrolling to a section
  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('nav')?.getBoundingClientRect().height || 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight - 20;

      // Use custom smooth scrolling for better performance
      const startPosition = window.scrollY;
      const distance = offsetPosition - startPosition;
      const duration = 800; // ms - longer duration for smoother feel
      let startTime: number | null = null;

      // Easing function for natural motion
      const easeInOutCubic = (t: number): number => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo({
          top: startPosition + distance * easedProgress,
          behavior: 'auto' // Use our custom animation instead of browser's smooth scroll
        });

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          // Ensure we're exactly at the right position when animation ends
          window.scrollTo({
            top: offsetPosition,
            behavior: 'auto'
          });
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/20 via-[#6A0DAD]/20 to-transparent" />

        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Star className="w-12 h-12 text-[#FFD700]/20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed">
          <Star className="w-8 h-8 text-[#FFD700]/30" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float-slow">
          <Star className="w-16 h-16 text-[#FFD700]/10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          {/* Logo with entrance animation and orbiting planets */}
          <div className="flex justify-center mb-12 overflow-visible">
            <div className="relative animate-logo-entrance">
              {/* Main Logo */}
              <img
                src="/logooo2.jpg"
                alt="XAWAK Logo"
                className="w-40 h-40 md:w-56 md:h-56 object-contain rounded-full shadow-xl shadow-[#FFD700]/40 z-20 relative"
              />
              <div className="absolute inset-0 bg-[#FFD700]/30 blur-xl rounded-full z-10" />

              {/* Orbiting Planets with pulse effects */}
              <div className="absolute inset-0 -m-4 md:-m-6 animate-planet-orbit-1 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#FFD700] shadow-lg shadow-[#FFD700]/50 animate-planet-pulse-1"></div>
              </div>

              <div className="absolute inset-0 -m-8 md:-m-12 animate-planet-orbit-2 z-0">
                <div className="absolute top-1/4 right-0 translate-x-1/2 w-3 h-3 md:w-5 md:h-5 rounded-full bg-[#1E90FF] shadow-lg shadow-[#1E90FF]/50 animate-planet-pulse-2"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-5 h-5 md:w-7 md:h-7 rounded-full bg-[#FF4500] shadow-lg shadow-[#FF4500]/50 animate-planet-pulse-3"></div>
              </div>

              <div className="absolute inset-0 -m-16 md:-m-24 animate-planet-orbit-3 z-0">
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#9370DB] shadow-lg shadow-[#9370DB]/50 animate-planet-pulse-1"></div>
              </div>

              {/* Orbit Paths */}
              <div className="absolute inset-0 -m-4 md:-m-6 rounded-full border border-[#FFD700]/20 z-0"></div>
              <div className="absolute inset-0 -m-8 md:-m-12 rounded-full border border-[#1E90FF]/15 z-0"></div>
              <div className="absolute inset-0 -m-16 md:-m-24 rounded-full border border-[#9370DB]/10 z-0"></div>
            </div>
          </div>

          {/* Headline with Letter Glow Effect */}
          <div className="relative mb-6">
            {/* Headline text with letter glow */}
            <h1 className="relative z-10 text-4xl sm:text-6xl lg:text-7xl font-bold font-['Orbitron'] animate-fade-in text-center whitespace-pre-wrap">
              {/* First part of headline with word-by-word glow to prevent splitting */}
              <div className="inline">
                {/* Split text into words for glow effect */}
                {'Transcend the Speed of Light with '.split(' ').map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em] mb-1">
                    {/* Split each word into letters */}
                    {word.split('').map((letter, letterIndex) => (
                      <span key={letterIndex} className="relative inline-block">
                        {/* Letter glow effect */}
                        <span
                          className="absolute inset-0 text-[#FFD700] blur-[2px] opacity-70 animate-pulse-glow z-0"
                          style={{ animationDuration: `${3 + Math.random()}s` }}
                          aria-hidden="true"
                        >
                          {letter}
                        </span>
                        {/* Actual letter */}
                        <span className="relative z-10 text-white">{letter}</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>

              {/* XAWAK with enhanced glow */}
              <span className="relative inline-block whitespace-nowrap">
                {/* Split XAWAK into individual letters */}
                {'XAWAK'.split('').map((letter, index) => (
                  <span key={index} className="relative inline-block">
                    {/* Multiple glow layers for XAWAK */}
                    <span
                      className="absolute inset-0 text-[#FFD700] blur-[4px] opacity-80 animate-pulse-glow z-0"
                      style={{ animationDuration: `${2 + Math.random()}s` }}
                      aria-hidden="true"
                    >
                      {letter}
                    </span>
                    <span
                      className="absolute inset-0 text-[#FFA500] blur-[2px] opacity-90 animate-pulse-glow z-0"
                      style={{ animationDuration: `${2.5 + Math.random()}s`, animationDelay: '0.5s' }}
                      aria-hidden="true"
                    >
                      {letter}
                    </span>
                    {/* Actual letter with gradient */}
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
                      {letter}
                    </span>
                  </span>
                ))}
              </span>
            </h1>

            {/* Subtle light particles around letters */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => {
                const size = Math.random() * 2 + 0.5; // 0.5-2.5px
                const x = Math.random() * 100; // 0-100%
                const y = Math.random() * 100; // 0-100%
                const delay = Math.random() * 5; // 0-5s delay
                const duration = Math.random() * 3 + 2; // 2-5s duration
                const color = i % 3 === 0 ? '#FFD700' : (i % 3 === 1 ? '#FFFFFF' : '#FFA500');

                return (
                  <span
                    key={i}
                    className="absolute rounded-full animate-pulse-glow"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 ${size * 2}px ${color}`,
                      left: `${x}%`,
                      top: `${y}%`,
                      opacity: Math.random() * 0.5 + 0.2, // 0.2-0.7 opacity
                      animationDuration: `${duration}s`,
                      animationDelay: `${delay}s`
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Subtitle - Centered taglines with enhanced styling and animations */}
          <div className="text-xl sm:text-2xl text-gray-300 mb-12 w-full px-4 mx-auto font-light leading-relaxed space-y-4 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-full text-center animate-tagline">
              <span className="text-[#FFD700] mr-2 opacity-80">-</span>
              <span>Beyond Light, Beyond Time <span className="text-[#FFD700]/80 font-medium">The Mind Travels First.</span></span>
            </div>
            <div className="flex items-center justify-center w-full text-center animate-tagline-delayed">
              <span className="text-[#FFD700] mr-2 opacity-80">-</span>
              <span>Light is Fast. <span className="text-[#FFD700]/80 font-medium">The Mind? Infinite.</span></span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#community"
              className="group px-8 py-4 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFE44D] transform hover:scale-105 transition-all duration-200 font-semibold flex items-center gap-2 shadow-lg shadow-[#FFD700]/20"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#community');
              }}
            >
              Join the Odyssey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#about"
              className="group px-8 py-4 border-2 border-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/20 transition-all duration-200 font-semibold flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#about');
              }}
            >
              Explore XAWAK
              <Star className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;