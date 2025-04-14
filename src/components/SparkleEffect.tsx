import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  lifespan: number;
  createdAt: number;
}

const SparkleEffect: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const particleIdRef = useRef(0);
  const lastParticleTimeRef = useRef(0);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const movementTimeoutRef = useRef<NodeJS.Timeout>();

  // Colors for sparkle particles
  const colors = ['#FFFFFF', '#FFD700', '#87CEEB', '#ADD8E6', '#B0E0E6'];

  // Track mouse position and movement
  useEffect(() => {
    // Skip event listeners if we detect touch capability
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Prevent handling touch events disguised as mouse events
      if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) {
        return;
      }

      const currentPosition = { x: e.clientX, y: e.clientY };
      const lastPosition = lastMousePositionRef.current;
      
      // Calculate distance moved
      const distance = Math.hypot(
        currentPosition.x - lastPosition.x,
        currentPosition.y - lastPosition.y
      );
      
      // Only create sparkles if there's significant movement
      if (distance > 5) {
        setIsMoving(true);
        setMousePosition(currentPosition);
        
        // Store last position for next comparison
        lastMousePositionRef.current = currentPosition;
        
        // Reset movement timeout
        if (movementTimeoutRef.current) {
          clearTimeout(movementTimeoutRef.current);
        }
        
        // Set a timeout to stop creating particles after movement stops
        movementTimeoutRef.current = setTimeout(() => {
          setIsMoving(false);
        }, 100); // Short timeout for responsive feel
      }
    };

    // Use passive event listener to improve performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current);
      }
    };
  }, []);

  // Create and animate particles
  useEffect(() => {
    // Skip animation on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const animate = (time: number) => {
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }

      // Create new particles only when mouse is moving
      if (isMoving && time - lastParticleTimeRef.current > 30) { // Create a particle every 30ms
        // Create 2-4 particles for a burst effect
        const particleCount = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < particleCount; i++) {
          // Add some randomness to particle position
          const jitterX = (Math.random() - 0.5) * 10;
          const jitterY = (Math.random() - 0.5) * 10;
          
          const newParticle: Particle = {
            id: particleIdRef.current++,
            x: mousePosition.x + jitterX,
            y: mousePosition.y + jitterY,
            size: Math.random() * 4 + 2, // 2-6px
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: 0.8,
            lifespan: Math.random() * 500 + 300, // 300-800ms - short lifespan for non-persistent effect
            createdAt: time,
          };

          setParticles(prevParticles => [...prevParticles, newParticle]);
        }
        
        lastParticleTimeRef.current = time;
      }

      // Update existing particles
      setParticles(prevParticles =>
        prevParticles
          .map(particle => {
            const age = time - particle.createdAt;
            const lifeProgress = age / particle.lifespan;

            // Remove particles that have exceeded their lifespan
            if (lifeProgress >= 1) {
              return null;
            }

            // Update particle properties based on age - fade out quickly
            return {
              ...particle,
              opacity: 0.8 * (1 - lifeProgress),
              size: particle.size * (1 - lifeProgress * 0.3),
            };
          })
          .filter(Boolean) as Particle[]
      );

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mousePosition, isMoving]);

  return (
    <>
      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'fixed',
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: '50%',
            opacity: particle.opacity,
            pointerEvents: 'none',
            zIndex: 9998,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
          }}
        />
      ))}
    </>
  );
};

export default SparkleEffect;
