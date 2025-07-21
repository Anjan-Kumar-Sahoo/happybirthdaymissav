import React from 'react';
import { motion } from 'framer-motion';

interface WishAnimationProps {
  emojis: Array<{
    id: number;
    emoji: string;
    x: number;
    y: number;
  }>;
}

/**
 * WishAnimation Component
 * Displays nature emojis that appear and fade away
 * Triggered by the "Wish" button
 */
const WishAnimation: React.FC<WishAnimationProps> = ({ emojis }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {emojis.map((wish) => (
        <motion.div
          key={wish.id}
          className="absolute text-4xl md:text-5xl"
          style={{
            left: wish.x,
            top: wish.y,
          }}
          initial={{
            opacity: 0,
            scale: 0.5,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.2, 1, 0.8],
            y: -50,
            rotate: [0, 10, -5, 0],
          }}
          transition={{
            duration: 3,
            ease: "easeOut",
            times: [0, 0.2, 0.8, 1],
          }}
        >
          {wish.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default WishAnimation;