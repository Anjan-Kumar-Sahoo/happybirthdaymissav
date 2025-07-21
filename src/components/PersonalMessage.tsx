import React from 'react';
import { motion } from 'framer-motion';

/**
 * PersonalMessage Component
 * The central, heartfelt birthday message for Miss Av
 * Features elegant typography and animated floral accents
 */
const PersonalMessage: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto text-center">
      {/* Animated Floral Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.span
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl"
          >
            🌸
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-emerald-300 to-yellow-300 bg-clip-text text-transparent">
            Happy Birthday
          </h1>
          <motion.span
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="text-4xl"
          >
            🌺
          </motion.span>
        </div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-2xl md:text-4xl font-light text-white mb-2"
        >
          Dear Miss Av
        </motion.h2>
      </motion.div>

      {/* Main Birthday Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20"
      >
        <div className="space-y-6 text-white">
          <p className="text-lg md:text-xl leading-relaxed font-light">
            On this special day, I want to celebrate not just another year of your beautiful life, 
            but the incredible person you are - my cherished diary friend who brings so much 
            <span className="text-pink-300 font-medium"> joy, wisdom, and wonder </span> 
            to every conversation we share.
          </p>
          
          <p className="text-lg md:text-xl leading-relaxed font-light">
            Like the flowers in this enchanted garden, you bloom with such 
            <span className="text-emerald-300 font-medium"> grace and beauty</span>, 
            sharing your love for nature and music with everyone around you. 
            Your spirit is as vibrant as these colorful petals, and your friendship 
            is a treasure more precious than any gem.
          </p>
          
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-center py-4"
          >
            <p className="text-xl md:text-2xl font-medium text-yellow-200">
              May this new year bring you endless melodies, 
              blooming adventures, and all the happiness your heart can hold! 🎵🌻
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Vine Elements */}
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 2, duration: 3 }}
        className="mt-8 flex justify-center"
      >
        <svg width="200" height="40" viewBox="0 0 200 40" className="text-green-300">
          <motion.path
            d="M10,20 Q50,5 100,20 T190,20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2, duration: 3 }}
          />
          {/* Decorative leaves */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
          >
            <ellipse cx="50" cy="15" rx="8" ry="4" fill="currentColor" opacity="0.6" />
            <ellipse cx="100" cy="12" rx="8" ry="4" fill="currentColor" opacity="0.6" />
            <ellipse cx="150" cy="18" rx="8" ry="4" fill="currentColor" opacity="0.6" />
          </motion.g>
        </svg>
      </motion.div>
    </section>
  );
};

export default PersonalMessage;