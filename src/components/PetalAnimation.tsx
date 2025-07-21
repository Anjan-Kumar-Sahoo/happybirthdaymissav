import React from 'react';
import { motion } from 'framer-motion';

/**
 * PetalAnimation Component
 * Creates a beautiful shower of falling rose petals
 * Triggered by the "Celebrate with Petals" button
 */
const PetalAnimation: React.FC = () => {
  // Create 50 petals for a lush effect
  const petals = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    // Random colors for variety
    color: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff91a4', '#ff6b9d'][Math.floor(Math.random() * 6)],
    // Random starting positions
    startX: Math.random() * 100,
    // Slightly different animation delays
    delay: Math.random() * 2,
    // Varying fall durations
    duration: 3 + Math.random() * 2,
    // Random rotation
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute w-3 h-3 rounded-full shadow-lg"
          style={{
            backgroundColor: petal.color,
            left: `${petal.startX}%`,
            top: '-20px',
          }}
          initial={{
            y: -20,
            x: 0,
            rotate: petal.rotation,
            opacity: 0.8,
          }}
          animate={{
            y: window.innerHeight + 20,
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: petal.rotation + 360,
            opacity: [0.8, 1, 0.6, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: "easeOut",
            times: [0, 0.2, 0.8, 1],
          }}
        >
          {/* Petal shape using CSS */}
          <div className="relative w-full h-full">
            <div 
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: petal.color }}
            />
            <div 
              className="absolute top-0 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: petal.color, opacity: 0.8 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PetalAnimation;