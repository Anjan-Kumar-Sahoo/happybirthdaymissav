import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PersonalSlideshow Component
 * Smooth continuous sliding animation moving RIGHT with 5 images visible
 * Center image gets spotlight effect
 */
const PersonalSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Placeholder personal images from Pexels - portrait orientation
  const personalImages = [
    'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1832323/pexels-photo-1832323.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
  ];

  // Auto-advance with smooth animation (slightly different timing)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % personalImages.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [personalImages.length]);

  // Get 7 images for smooth sliding (2 before, center, 2 after, 2 extra for smooth transition)
  const getVisibleImages = () => {
    const images = [];
    for (let i = -2; i <= 4; i++) {
      const index = (currentIndex + i + personalImages.length) % personalImages.length;
      images.push({
        src: personalImages[index],
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
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5, duration: 1 }}
      className="relative h-[400px] md:h-[450px] overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-pink-900/80 to-transparent p-4">
        <h3 className="text-lg md:text-xl font-light text-white text-center">
          💖 You - Miss Av - My Diary Friend 💖
        </h3>
        <p className="text-pink-200 text-center text-sm mt-1">
          My favorite moments with you
        </p>
      </div>

      {/* Sliding Images Container */}
      <div className="absolute inset-0 pt-16 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="flex gap-4 px-8"
          animate={{
            x: isAnimating ? 50 : 0, // Opposite direction for right sliding
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
                    x: image.position > 2 ? -100 : 100 // Opposite direction
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
                    x: image.position > 2 ? -100 : 100 // Opposite direction
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
                      className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 rounded-2xl blur-sm"
                    />
                  )}
                  
                  {/* Image Container */}
                  <div className={`relative w-full h-full rounded-2xl overflow-hidden ${
                    isCenter ? 'border-2 border-pink-300' : ''
                  }`}>
                    <motion.img
                      src={image.src}
                      alt={`Personal moment ${image.index + 1}`}
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
                              ? 'bg-pink-500/70 border border-pink-300' 
                              : 'bg-pink-500/50'
                          }`}
                        >
                          Us #{image.index + 1}
                        </motion.p>
                      </motion.div>
                    )}
                    
                    {/* Heart Animation */}
                    <motion.div
                      animate={{ 
                        scale: isCenter ? [1, 1.4, 1] : [0.8, 1.1, 0.8],
                        opacity: isCenter ? [0.9, 1, 0.9] : [0.4, 0.6, 0.4],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        delay: image.position * 0.3
                      }}
                      className="absolute top-4 right-4 text-pink-300"
                    >
                      💕
                    </motion.div>

                    {/* Additional floating elements */}
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        x: [-2, 2, -2],
                        opacity: isCenter ? [0.8, 1, 0.8] : [0.3, 0.5, 0.3],
                        scale: isCenter ? [1, 1.3, 1] : [0.7, 0.9, 0.7],
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        delay: image.position * 0.5
                      }}
                      className="absolute top-4 left-4 text-yellow-300 text-sm"
                    >
                      ✨
                    </motion.div>

                    {/* Center Spotlight Glow Effect */}
                    {isCenter && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        className="absolute inset-0 bg-gradient-radial from-pink-300/40 via-transparent to-transparent"
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
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60"
        animate={{ x: [5, -5, 5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-2xl">→</div>
        <div className="text-xs mt-1 font-medium">Sliding</div>
      </motion.div>

      {/* Progress Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {personalImages.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-pink-300' : 'bg-white/30'
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

export default PersonalSlideshow;