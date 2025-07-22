import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { handleImageError } from '../utils/imageUtils';

const PersonalSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideWidth = 215; // 200px width + 15px gap

  const personalImages = [
    { src: "/src/assets/images/personal/av1.jpg", label: "Av #1" },
    { src: "/src/assets/images/personal/av2.jpg", label: "Av #2" },
    { src: "/src/assets/images/personal/av3.jpg", label: "Av #3" },
    { src: "/src/assets/images/personal/av4.jpg", label: "Av #4" },
    { src: "/src/assets/images/personal/av5.jpg", label: "Av #5" },
    { src: "/src/assets/images/personal/av6.jpg", label: "Av #6" },
    { src: "/src/assets/images/personal/av7.jpg", label: "Av #7" },
    { src: "/src/assets/images/personal/av8.jpg", label: "Av #8" },
    { src: "/src/assets/images/personal/av9.jpg", label: "Av #9" },
    { src: "/src/assets/images/personal/av10.jpg", label: "Av #10" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

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
          💖 Miss Av 💖
        </h3>
        <p className="text-pink-200 text-center text-sm mt-1">Diary Friend</p>
      </div>

      {/* Image Container */}
      <div className="absolute inset-0 pt-16 flex items-center justify-center overflow-hidden">
        <motion.div
          className="flex gap-4 px-8"
          animate={{ x: -(currentIndex * slideWidth) }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {[...personalImages, ...personalImages, ...personalImages].map((image, index) => {
            return (
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
                  onError={(e) => handleImageError(e, 'pink')}
                />

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium bg-pink-500/60 rounded-full px-3 py-2 text-center">
                    {image.label}
                  </p>
                </div>

                {/* Floating Hearts */}
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
                  className="absolute top-4 right-4 text-pink-300"
                >
                  💖
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Direction Indicator */}
      <motion.div
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60"
        animate={{ x: [5, -5, 5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-2xl">→</div>
        <div className="text-xs mt-1 font-medium">Sliding</div>
      </motion.div>
    </motion.div>
  );
};

export default PersonalSlideshow;
