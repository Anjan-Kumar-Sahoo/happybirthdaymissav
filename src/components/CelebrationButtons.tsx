import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface CelebrationButtonsProps {
  onCelebratePetals: () => void;
  onWish: () => void;
}

/**
 * CelebrationButtons Component
 * Interactive buttons for triggering magical animations
 * Features beautiful hover effects and garden-themed styling
 */
const CelebrationButtons: React.FC<CelebrationButtonsProps> = ({
  onCelebratePetals,
  onWish,
}) => {
  return (
    <div className="flex gap-3">
      {/* Celebrate with Petals Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onCelebratePetals}
        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
        aria-label="Celebrate with falling rose petals"
      >
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">
          Celebrate with Petals
        </span>
        <span className="text-sm font-medium sm:hidden">
          Petals
        </span>
      </motion.button>

      {/* Wish Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onWish}
        className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
        aria-label="Make a wish with nature emojis"
      >
        <Heart className="w-4 h-4" />
        <span className="text-sm font-medium">
          Wish
        </span>
      </motion.button>
    </div>
  );
};

export default CelebrationButtons;