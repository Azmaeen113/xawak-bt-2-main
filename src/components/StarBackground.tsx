import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  phase: number;
  layer: number;
  color: string;
  twinkleSpeed: number;
  twinkleDelay: number;
  lastTwinkle: number;
  twinkleDuration: number;
  twinkleIntensity: number;
}

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  // No need to track mouse position for static stars
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    const createStars = () => {
      const stars: Star[] = [];
      const layers = 3;
      const starsPerLayer = 150; // More stars for a richer night sky

      // Star colors for variety - more bluish tones
      const starColors = [
        '#FFFFFF', // White
        '#87CEEB', // Sky Blue
        '#ADD8E6', // Light Blue
        '#B0E0E6', // Powder Blue
        '#E0FFFF', // Light Cyan
        '#AFEEEE', // Pale Turquoise
        '#00BFFF', // Deep Sky Blue
        '#1E90FF', // Dodger Blue
        '#FFD700', // Gold (fewer warm colors)
      ];

      // Current time for initializing twinkle timers
      const now = Date.now();

      for (let layer = 0; layer < layers; layer++) {
        for (let i = 0; i < starsPerLayer; i++) {
          // Create stars with varying twinkle properties
          const size = Math.random() * (2.5 - 0.5) + 0.5;

          // Larger stars twinkle more noticeably
          const twinkleIntensity = size > 1.8 ? 0.8 :
                                  size > 1.2 ? 0.6 :
                                  size > 0.8 ? 0.4 : 0.2;

          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: size,
            brightness: Math.random() * 0.5 + 0.3, // Base brightness between 0.3 and 0.8
            phase: Math.random() * Math.PI * 2,
            layer: layer,
            color: starColors[Math.floor(Math.random() * starColors.length)],
            twinkleSpeed: Math.random() * 0.03 + 0.01, // How fast the star twinkles
            twinkleDelay: Math.random() * 10000 + 2000, // Random delay between 2-12 seconds
            lastTwinkle: now - (Math.random() * 5000), // Randomize initial twinkle state
            twinkleDuration: Math.random() * 1500 + 500, // How long the twinkle lasts (0.5-2s)
            twinkleIntensity: twinkleIntensity // How bright the twinkle gets
          });
        }
      }
      starsRef.current = stars;
    };

    const drawStar = (ctx: CanvasRenderingContext2D, star: Star, currentTime: number) => {
      // Calculate if the star should be twinkling
      const timeSinceLastTwinkle = currentTime - star.lastTwinkle;
      const isTwinkling = timeSinceLastTwinkle > star.twinkleDelay && timeSinceLastTwinkle < (star.twinkleDelay + star.twinkleDuration);

      // Calculate brightness based on twinkle state
      let brightness = star.brightness; // Base brightness
      let extraSparkle = false;

      if (isTwinkling) {
        // Enhanced brightness during twinkle
        const twinkleProgress = (timeSinceLastTwinkle - star.twinkleDelay) / star.twinkleDuration;
        const twinkleFactor = Math.sin(twinkleProgress * Math.PI); // Smooth rise and fall
        brightness = star.brightness + (twinkleFactor * star.twinkleIntensity); // Increase brightness during twinkle
        extraSparkle = twinkleFactor > 0.7; // Add extra sparkle at peak brightness
      }

      // If the twinkle is complete, schedule the next one
      if (timeSinceLastTwinkle > (star.twinkleDelay + star.twinkleDuration)) {
        star.lastTwinkle = currentTime;
        star.twinkleDelay = Math.random() * 8000 + 2000; // Random delay between 2-10 seconds
      }

      // Extract color components for glow effect
      let r = 255, g = 255, b = 255;
      if (star.color === '#FFD700') { r = 255; g = 215; b = 0; }
      else if (star.color === '#87CEEB') { r = 135; g = 206; b = 235; }
      else if (star.color === '#ADD8E6') { r = 173; g = 216; b = 230; }
      else if (star.color === '#B0E0E6') { r = 176; g = 224; b = 230; }
      else if (star.color === '#E0FFFF') { r = 224; g = 255; b = 255; }
      else if (star.color === '#AFEEEE') { r = 175; g = 238; b = 238; }
      else if (star.color === '#00BFFF') { r = 0; g = 191; b = 255; }
      else if (star.color === '#1E90FF') { r = 30; g = 144; b = 255; }

      // Draw the main star
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * (isTwinkling ? 1.2 : 1), 0, Math.PI * 2);

      const gradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * (isTwinkling ? 1.5 : 1)
      );

      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.3 + brightness * 0.7})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw sparkle effect for larger stars or twinkling stars
      if (star.size > 1.2 || isTwinkling) {
        const sparkleSize = star.size * (isTwinkling ? 2 : 1.2);

        // Draw sparkle rays
        ctx.beginPath();

        // More rays for twinkling stars
        const rayCount = extraSparkle ? 8 : 4;

        for (let i = 0; i < rayCount; i++) {
          const angle = (Math.PI / (rayCount/2)) * i + (star.phase / 2);
          const rayLength = sparkleSize * (1 + brightness * 0.5);

          ctx.moveTo(star.x, star.y);
          ctx.lineTo(
            star.x + Math.cos(angle) * rayLength,
            star.y + Math.sin(angle) * rayLength
          );

          // Add extra detail for twinkling stars
          if (isTwinkling) {
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(
              star.x + Math.cos(angle + Math.PI / 16) * (rayLength * 0.7),
              star.y + Math.sin(angle + Math.PI / 16) * (rayLength * 0.7)
            );
          }
        }

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${isTwinkling ? (0.2 + brightness * 0.4) : (0.1 + brightness * 0.2)})`;
        ctx.lineWidth = isTwinkling ? 0.7 : 0.5;
        ctx.stroke();
      }
    };

    // For throttling animation frames during scroll
    let isScrolling = false;
    let scrollTimeout: number | null = null;
    let lastFrameTime = 0;
    const targetFPS = 30; // Lower FPS for better scrolling performance
    const frameInterval = 1000 / targetFPS;

    const handleScroll = () => {
      isScrolling = true;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = (currentTime = 0) => {
      // Throttle frame rate for better performance
      const delta = currentTime - lastFrameTime;
      if (delta < frameInterval && !isScrolling) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      // Use more transparent fill during scrolling for better performance
      ctx.fillStyle = isScrolling ? 'rgba(0, 0, 10, 0.2)' : 'rgba(0, 0, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle bluish nebula-like background
      const time = Date.now() / 10000;
      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.5,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );

      nebulaGradient.addColorStop(0, 'rgba(0, 30, 60, 0.02)');
      nebulaGradient.addColorStop(0.5, 'rgba(30, 58, 138, 0.015)');
      nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Get current time in milliseconds for twinkling calculation
      const now = Date.now();

      starsRef.current.forEach((star) => {
        // Update twinkle phase - only for the visual effect of rays
        star.phase += star.twinkleSpeed;

        // Draw the star with current time for twinkling effect
        // Stars remain static in position but twinkle periodically
        drawStar(ctx, star, now);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize the canvas and stars
    resizeCanvas();
    createStars();
    animationFrameRef.current = requestAnimationFrame(animate);

    // Only need to handle resize events
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, #000000, #050510, #0a0a20)' }}
    />
  );
};

export default StarBackground;