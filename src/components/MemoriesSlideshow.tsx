import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MemoriesSlideshow Component
 * Smooth continuous sliding animation moving LEFT with 5 images visible
 * Center image gets spotlight effect
 */
const MemoriesSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Placeholder memory images from Pexels - portrait orientation
  const memoryImages = [
    'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
  ];

  // Auto-advance with smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % memoryImages.length);
        setIsAnimating(false);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, [memoryImages.length]);

  // Get 7 images for smooth sliding (2 before, center, 2 after, 2 extra for smooth transition)
  const getVisibleImages = () => {
    const images = [];
    for (let i = -2; i <= 4; i++) {
      const index = (currentIndex + i + memoryImages.length) % memoryImages.length;
      images.push({
        src: memoryImages[index],
        index: index,
        position: i + 2, // 0=far-left, 1=left, 2=center, 3=right, 4=far-right
        key: `${index}-${currentIndex}-${i}`,
      });
    }
    return images;
  };

  const visibleImages = getVisibleImages();

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
          animate={{
            x: isAnimating ? -50 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut"
          }}
        >
          <AnimatePresence mode="wait">
            {visibleImages.map((image) => {
              const isCenter = image.position === 2;
              const isAdjacent = image.position === 1 || image.position === 3;
              const isVisible = image.position >= 0 && image.position <= 4;
              
              if (!isVisible) return null;
              
              return (
                <motion.div
                  key={image.key}
                  layout
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                    x: image.position > 2 ? 100 : -100
                  }}
                  animate={{ 
                    opacity: isCenter ? 1 : isAdjacent ? 0.8 : 0.5,
                    scale: isCenter ? 1.1 : isAdjacent ? 0.95 : 0.8,
                    x: 0,
                    y: isCenter ? -10 : isAdjacent ? 5 : 15,
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.7,
                    x: image.position > 2 ? 100 : -100
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    layout: { duration: 0.6 }
                  }}
                  className={`relative rounded-2xl overflow-hidden ${
                    isCenter ? 'shadow-2xl z-20' : 'shadow-lg z-10'
                  }`}
                  style={{ 
                    width: isCenter ? '240px' : isAdjacent ? '200px' : '160px',
                    height: isCenter ? '320px' : isAdjacent ? '280px' : '240px',
                    minWidth: isCenter ? '240px' : isAdjacent ? '200px' : '160px',
                  }}
                >
                  {/* Spotlight Border for Center Image */}
                  {isCenter && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 rounded-2xl blur-sm"
                    />
                  )}
                  
                  {/* Image Container */}
                  <div className={`relative w-full h-full rounded-2xl overflow-hidden ${
                    isCenter ? 'border-2 border-emerald-300' : ''
                  }`}>
                    <motion.img
                      src={image.src}
                      alt={`Memory ${image.index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        filter: isCenter 
                          ? 'brightness(1.1) saturate(1.2) contrast(1.1)' 
                          : isAdjacent 
                          ? 'brightness(0.8) saturate(0.9)' 
                          : 'brightness(0.6) saturate(0.7)',
                      }}
                    />
                    
                    {/* Overlay */}
                    <motion.div 
                      className="absolute inset-0"
                      animate={{
                        background: isCenter 
                          ? 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)' 
                          : isAdjacent
                          ? 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.2))'
                          : 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.4))'
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Caption - Only show on center and adjacent images */}
                    {(isCenter || isAdjacent) && (
                      <motion.div 
                        className="absolute bottom-4 left-4 right-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.p
                          animate={{
                            scale: isCenter ? 1.1 : 1,
                            opacity: isCenter ? 1 : 0.8,
                          }}
                          className={`text-white text-sm font-medium backdrop-blur-sm rounded-full px-3 py-2 text-center transition-all duration-600 ${
                            isCenter 
                              ? 'bg-emerald-500/70 border border-emerald-300' 
                              : 'bg-black/40'
                          }`}
                        >
                          Memory {image.index + 1}
                        </motion.p>
                      </motion.div>
                    )}

                    {/* Floating Elements */}
                    <motion.div
                      animate={{ 
                        y: [-5, 5, -5],
                        opacity: isCenter ? [0.8, 1, 0.8] : [0.3, 0.5, 0.3],
                        scale: isCenter ? [1, 1.3, 1] : [0.7, 0.9, 0.7],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        delay: image.position * 0.2
                      }}
                      className="absolute top-4 right-4 text-emerald-300"
                    >
                      🌿
                    </motion.div>

                    {/* Center Spotlight Glow Effect */}
                    {isCenter && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        className="absolute inset-0 bg-gradient-radial from-emerald-300/40 via-transparent to-transparent"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
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

      {/* Progress Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {memoryImages.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-emerald-300' : 'bg-white/30'
            }`}
            animate={{
              scale: index === currentIndex ? 1.2 : 1,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default MemoriesSlideshow;