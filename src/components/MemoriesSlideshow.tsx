import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { handleImageError } from '../utils/imageUtils';

/**
 * MemoriesSlideshow Component
 * Smooth continuous sliding animation moving LEFT with 5 images visible
 * Center image gets spotlight effect
 */
const MemoriesSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Start from 0 for left sliding

  // Memory images - Local images
  const memoryImages = [
    { src: "/src/assets/images/memories/m1.jpg", label: "Memory 1" },
    { src: "/src/assets/images/memories/m2.jpg", label: "Memory 2" },
    { src: "/src/assets/images/memories/m3.jpg", label: "Memory 3" },
    { src: "/src/assets/images/memories/m4.jpg", label: "Memory 4" },
    { src: "/src/assets/images/memories/m5.jpg", label: "Memory 5" },
    { src: "/src/assets/images/memories/m6.jpg", label: "Memory 6" },
    { src: "/src/assets/images/memories/m7.jpg", label: "Memory 7" },
    { src: "/src/assets/images/memories/m8.jpg", label: "Memory 8" },
    { src: "/src/assets/images/memories/m9.jpg", label: "Memory 9" },
    { src: "/src/assets/images/memories/m10.jpg", label: "Memory 10" },
  ];

  // Auto-advance with smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1); // Simple continuous increment - no resets
    }, 3000); // Auto-advance every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5, duration: 1 }}
      className="relative h-[400px] md:h-[450px] overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-emerald-900/80 to-transparent p-4">
        <h3 className="text-lg md:text-xl font-light text-white text-center">
          🌸 Memories 🌸
        </h3>
        <p className="text-emerald-200 text-center text-sm mt-1">
          Beautiful moments to cherish
        </p>
      </div>

      {/* Sliding Images Container */}
      <div className="absolute inset-0 pt-16 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="flex gap-4 px-8"
          animate={{ x: -currentIndex * 215 }} // Sliding LEFT: 200px width + 15px gap
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
        >
          {/* Create infinite loop by duplicating images */}
          {[...memoryImages, ...memoryImages, ...memoryImages].map((image, index) => {
            return (
              <div
                key={`${image.src}-${index}`} // Unique key for each duplicate
                className="relative rounded-2xl overflow-hidden shadow-lg"
                style={{ 
                  width: '200px',
                  height: '300px',
                  minWidth: '200px',
                }}
              >
                {/* Image Container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => handleImageError(e, 'green')}
                  />
                  
                  {/* Caption */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium bg-emerald-500/60 rounded-full px-3 py-2 text-center">
                      {image.label}
                    </p>
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ 
                      y: [-5, 5, -5],
                      opacity: [0.3, 0.5, 0.3],
                      scale: [0.7, 0.9, 0.7],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: (index % memoryImages.length) * 0.2
                    }}
                    className="absolute top-4 right-4 text-emerald-300"
                  >
                    🌿
                  </motion.div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Direction Indicator with smooth animation */}
      <motion.div 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-2xl">←</div>
        <div className="text-xs mt-1 font-medium">Sliding</div>
      </motion.div>
    </motion.div>
  );
};

export default MemoriesSlideshow;