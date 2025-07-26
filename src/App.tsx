import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EnchantedGarden from './components/EnchantedGarden';
import MusicPlayer from './components/MusicPlayer';
import CelebrationButtons from './components/CelebrationButtons';
import PersonalMessage from './components/PersonalMessage';
import VideoSection from './components/VideoSection';
import MemoriesSlideshow from './components/MemoriesSlideshow';
import PersonalSlideshow from './components/PersonalSlideshow';
import PetalAnimation from './components/PetalAnimation';
import WishAnimation from './components/WishAnimation';
import BottomNavbar from './components/BottomNavbar';
import DateChecker from './components/DateChecker';

/**
 * Main App component for Miss Av's Birthday Garden
 * An enchanted garden themed birthday celebration with interactive elements
 */
function App() {
  // State management for interactive features
  const [isPetalsActive, setIsPetalsActive] = useState(false);
  const [wishEmojis, setWishEmojis] = useState<Array<{id: number, emoji: string, x: number, y: number}>>([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Check if today is August 8th (Miss Av's birthday)
  const today = new Date();
  const isBirthday = today.getMonth() === 7 && today.getDate() === 8; // Month is 0-indexed (7 = August)
  // const isBirthday = true; // For testing purposes, always true
  // Nature-themed emojis for wish button
  const natureEmojis = ['🌸', '🌿', '🌳', '☀️', '💧', '🦋', '🌺', '🌻', '🌷', '🍃', '🌙', '⭐'];

  // If it's not her birthday, show the DateChecker component
  if (!isBirthday) {
    return <DateChecker />;
  }

  /**
   * Handles the "Celebrate with Petals" button click
   * Triggers a beautiful petal shower animation
   */
  const handleCelebratePetals = () => {
    setIsPetalsActive(true);
    // Auto-stop petals after 10 seconds for performance
    setTimeout(() => setIsPetalsActive(false), 10000);
  };

  /**
   * Handles the birthday button click from navbar
   * Triggers a flower shower across the entire page
   */
  const handleBirthdayClick = () => {
    setIsPetalsActive(true);
    // Auto-stop petals after 12 seconds for a longer celebration
    setTimeout(() => setIsPetalsActive(false), 12000);
  };

  /**
   * Handles the "Wish" button click
   * Creates random nature emojis that appear and fade away
   */
  const handleWish = () => {
    const randomEmoji = natureEmojis[Math.floor(Math.random() * natureEmojis.length)];
    const newWish = {
      id: Date.now(),
      emoji: randomEmoji,
      x: Math.random() * window.innerWidth,
      y: Math.random() * 100 + 100, // Keep emojis in upper portion
    };
    
    setWishEmojis(prev => [...prev, newWish]);
    
    // Remove emoji after animation completes
    setTimeout(() => {
      setWishEmojis(prev => prev.filter(wish => wish.id !== newWish.id));
    }, 3000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-amber-900">
      {/* Enchanted Garden Background */}
      <EnchantedGarden />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
      
      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen">
        {/* Header with Music Player and Celebration Buttons */}
        <header className="absolute top-4 left-4 right-4 z-50 flex justify-between items-start">
          <MusicPlayer 
            isPlaying={isMusicPlaying} 
            setIsPlaying={setIsMusicPlaying} 
          />
          <CelebrationButtons 
            onCelebratePetals={handleCelebratePetals}
            onWish={handleWish}
          />
        </header>

        {/* Main Content Layout */}
        <main className="pt-20 pb-20 px-4">
          {/* Personal Birthday Message */}
          <PersonalMessage />
          
          {/* Portrait Video Section with Jungle Frame */}
          <VideoSection />
          
          {/* Slideshows Container - Stacked Vertically */}
          <div className="max-w-7xl mx-auto mt-12 space-y-8">
            {/* Personal Slideshow - Top (slides RIGHT) */}
            <PersonalSlideshow />
            
            {/* Memories Slideshow - Bottom (slides LEFT) */}
            <MemoriesSlideshow />
          </div>
        </main>
      </div>

      {/* Interactive Animations */}
      {isPetalsActive && <PetalAnimation />}
      <WishAnimation emojis={wishEmojis} />
      
      {/* Flower Shower - Left Side */}
      <div className="fixed left-0 top-0 h-screen w-48 overflow-hidden pointer-events-none z-20">
        {/* Falling flowers on the left */}
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0 }}
          className="absolute left-4 text-2xl"
        >
          🌸
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute left-12 text-xl"
        >
          🌺
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute left-2 text-lg"
        >
          🌼
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 3 }}
          className="absolute left-16 text-xl"
        >
          🌻
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
          className="absolute left-8 text-lg"
        >
          🌷
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 2.5 }}
          className="absolute left-14 text-sm"
        >
          🌹
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "linear", delay: 1.8 }}
          className="absolute left-6 text-xl"
        >
          🌾
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "linear", delay: 3.2 }}
          className="absolute left-18 text-lg"
        >
          🏵️
        </motion.div>
      </div>

      {/* Flower Shower - Right Side */}
      <div className="fixed right-0 top-0 h-screen w-48 overflow-hidden pointer-events-none z-20">
        {/* Falling flowers on the right */}
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "linear", delay: 1.5 }}
          className="absolute right-4 text-2xl"
        >
          🌸
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 5.3, repeat: Infinity, ease: "linear", delay: 0.8 }}
          className="absolute right-12 text-xl"
        >
          🌺
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "linear", delay: 2.2 }}
          className="absolute right-2 text-lg"
        >
          🌼
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "linear", delay: 1.2 }}
          className="absolute right-16 text-xl"
        >
          🌻
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "linear", delay: 3.5 }}
          className="absolute right-8 text-lg"
        >
          🌷
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 4.3, repeat: Infinity, ease: "linear", delay: 0.3 }}
          className="absolute right-14 text-sm"
        >
          🌹
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 3.9, repeat: Infinity, ease: "linear", delay: 2.8 }}
          className="absolute right-6 text-xl"
        >
          🌾
        </motion.div>
        <motion.div
          animate={{ y: [-100, 1200] }}
          transition={{ duration: 5.1, repeat: Infinity, ease: "linear", delay: 1.9 }}
          className="absolute right-18 text-lg"
        >
          �️
        </motion.div>
      </div>
      
      {/* Bottom Navbar */}
      <BottomNavbar onBirthdayClick={handleBirthdayClick} />
    </div>
  );
}

export default App;