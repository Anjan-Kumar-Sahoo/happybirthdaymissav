import React from 'react';
import { motion } from 'framer-motion';

/**
 * EnchantedGarden Component
 * Provides the magical background landscape with animated elements
 * Uses a stunning valley of flowers as the primary background
 */
const EnchantedGarden: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main Background - Valley of Flowers */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      />
      
      {/* Animated Light Rays */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent"
            style={{
              width: '2px',
              height: '100%',
              left: `${20 + i * 15}%`,
              transform: 'rotate(15deg)',
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -120, -20],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Garden Atmosphere Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-amber-200/20" />
    </div>
  );
};

export default EnchantedGarden;