import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface BottomNavbarProps {
  onBirthdayClick: () => void;
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ onBirthdayClick }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 1 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-md border-t border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center">
          {/* Made with love section - now clickable for birthday celebration */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBirthdayClick}
            className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg"
            aria-label="Happy Birthday Miss Av - Click for flower celebration"
          >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2"
          >
            <span className="text-sm font-light">🎂 Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-4 h-4 text-pink-300 fill-pink-300" />
            </motion.div>
            <span className="text-sm font-light">& birthday wishes by</span>
            <motion.span
              animate={{ 
                color: ['#ffffff', '#fbbf24', '#f59e0b', '#ffffff']
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-sm font-bold bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-300 bg-clip-text text-transparent"
            >
              Mr. AKS 🌸
            </motion.span>
          </motion.div>
          </motion.button>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ 
              y: [-2, 2, -2],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex gap-2"
          >
            <span className="text-lg">🌸</span>
            <span className="text-sm">✨</span>
            <span className="text-lg">🌿</span>
          </motion.div>
        </div>
      </div>
      
      {/* Gradient Border Effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-300/50 to-transparent" />
    </motion.nav>
  );
};

export default BottomNavbar;