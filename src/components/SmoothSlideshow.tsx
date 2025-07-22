import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { handleImageError } from '../utils/imageUtils';

const SmoothSlideshow: React.FC<{ 
  images: Array<{src: string, label: string}>,
  direction: 'left' | 'right',
  theme: 'pink' | 'green',
  title: string,
  subtitle: string,
  emoji: string,
  floatingEmoji: string
}> = ({ images, direction, theme, title, subtitle, emoji, floatingEmoji }) => {
  const [translateX, setTranslateX] = useState(0);
  const slideWidth = 215;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX(prev => {
        const newValue = prev + (direction === 'right' ? -slideWidth : slideWidth);
        // Reset when we've moved one full set
        const resetPoint = direction === 'right' ? -images.length * slideWidth : images.length * slideWidth;
        return newValue === resetPoint ? 0 : newValue;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length, direction, slideWidth]);

  const themeColors = {
    pink: {
      header: 'from-pink-900/80',
      subtitle: 'text-pink-200',
      label: 'bg-pink-500/60',
      floating: 'text-pink-300'
    },
    green: {
      header: 'from-emerald-900/80',
      subtitle: 'text-emerald-200', 
      label: 'bg-emerald-500/60',
      floating: 'text-emerald-300'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'right' ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5, duration: 1 }}
      className="relative h-[400px] md:h-[450px] overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
    >
      {/* Header */}
      <div className={`absolute top-0 left-0 right-0 z-10 bg-gradient-to-b ${themeColors[theme].header} to-transparent p-4`}>
        <h3 className="text-lg md:text-xl font-light text-white text-center">
          {emoji} {title} {emoji}
        </h3>
        <p className={`${themeColors[theme].subtitle} text-center text-sm mt-1`}>{subtitle}</p>
      </div>

      {/* Image Container */}
      <div className="absolute inset-0 pt-16 flex items-center justify-center overflow-hidden">
        <div
          className="flex gap-4 px-8 transition-transform duration-[800ms] ease-in-out"
          style={{
            transform: `translateX(${translateX}px)`,
            width: `${images.length * slideWidth * 3}px`
          }}
        >
          {/* Triple the images for seamless loop */}
          {[...images, ...images, ...images].map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="relative rounded-2xl overflow-hidden shadow-lg"
              style={{
                width: '200px',
                height: '300px',
                minWidth: '200px',
              }}
            >
              <img
                src={image.src}
                alt={image.label}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => handleImageError(e, theme)}
              />

              <div className="absolute bottom-4 left-4 right-4">
                <p className={`text-white text-sm font-medium ${themeColors[theme].label} rounded-full px-3 py-2 text-center`}>
                  {image.label}
                </p>
              </div>

              {/* Floating Animation */}
              <motion.div
                animate={{ 
                  y: [-5, 5, -5],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [0.8, 1.1, 0.8],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
                className={`absolute top-4 right-4 ${themeColors[theme].floating}`}
              >
                {floatingEmoji}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Direction Indicator */}
      <motion.div
        className={`absolute ${direction === 'right' ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-white/60`}
        animate={{ x: direction === 'right' ? [5, -5, 5] : [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-2xl">{direction === 'right' ? '→' : '←'}</div>
        <div className="text-xs mt-1 font-medium">Sliding</div>
      </motion.div>
    </motion.div>
  );
};

export default SmoothSlideshow;
