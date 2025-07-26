import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * DateChecker Component
 * Checks if today is August 8th (Miss Av's birthday)
 * Shows different content based on the date with countdown timer
 */
const DateChecker: React.FC = () => {
  // Get current date
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11, so add 1
  const currentDay = today.getDate();
  
  // Check if today is August 8th (month 8, day 8)
  const isBirthday = currentMonth === 8 && currentDay === 8;

  // State for countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate time until next August 8th
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Set target date to August 8th of current year
      let targetDate = new Date(currentYear, 7, 8); // Month is 0-indexed (7 = August)
      
      // If August 8th has already passed this year, target next year
      if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 7, 8);
      }
      
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // If it's not her birthday, show the waiting message
  if (!isBirthday) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 flex items-center justify-center p-4">
        {/* Forest Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated forest elements */}
          <motion.div
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full opacity-20"
          >
            {/* Tree silhouettes */}
            <div className="absolute bottom-0 left-10 w-20 h-40 bg-green-900 rounded-t-full opacity-60" />
            <div className="absolute bottom-0 left-32 w-16 h-32 bg-green-800 rounded-t-full opacity-70" />
            <div className="absolute bottom-0 right-20 w-24 h-48 bg-green-900 rounded-t-full opacity-50" />
            <div className="absolute bottom-0 right-48 w-18 h-36 bg-green-800 rounded-t-full opacity-65" />
          </motion.div>

          {/* Floating leaves */}
          <motion.div
            animate={{ y: [-20, 20, -20], rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-1/4 text-green-300 text-2xl opacity-60"
          >
            🍃
          </motion.div>
          <motion.div
            animate={{ y: [20, -20, 20], rotate: [360, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-32 right-1/3 text-green-400 text-xl opacity-50"
          >
            🌿
          </motion.div>
          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [0, -360] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute bottom-40 left-1/3 text-emerald-300 text-lg opacity-70"
          >
            🍂
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          {/* Decorative Frame */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            {/* Animated Forest Crown */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-2 text-4xl md:text-5xl">
                <span>🌲</span>
                <span>🦋</span>
                <span>🌲</span>
              </div>
            </motion.div>

            {/* Main Message */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Hii Miss Av! 👋
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="space-y-4"
            >
              <p className="text-lg md:text-xl text-emerald-100 leading-relaxed">
                I guess today's just a simple ordinary day, not your special day.
              </p>
              
              <motion.p
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                className="text-xl md:text-2xl text-yellow-200 font-medium"
              >
                Let's wait till <span className="text-pink-300 font-bold">8th of August!</span> 🎂
              </motion.p>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-8 p-6 bg-gradient-to-r from-emerald-800/40 to-teal-800/40 rounded-2xl border border-emerald-400/30 backdrop-blur-sm"
            >
              <h3 className="text-lg md:text-xl font-medium text-yellow-200 mb-4 flex items-center justify-center gap-2">
                <span>⏰</span>
                Countdown to Your Special Day
                <span>🎂</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Days */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="bg-pink-500/20 rounded-xl p-3 border border-pink-400/30"
                >
                  <div className="text-2xl md:text-3xl font-bold text-pink-200">
                    {timeLeft.days}
                  </div>
                  <div className="text-xs md:text-sm text-pink-300">
                    {timeLeft.days === 1 ? 'Day' : 'Days'}
                  </div>
                </motion.div>

                {/* Hours */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="bg-blue-500/20 rounded-xl p-3 border border-blue-400/30"
                >
                  <div className="text-2xl md:text-3xl font-bold text-blue-200">
                    {timeLeft.hours}
                  </div>
                  <div className="text-xs md:text-sm text-blue-300">
                    {timeLeft.hours === 1 ? 'Hour' : 'Hours'}
                  </div>
                </motion.div>

                {/* Minutes */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="bg-green-500/20 rounded-xl p-3 border border-green-400/30"
                >
                  <div className="text-2xl md:text-3xl font-bold text-green-200">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-xs md:text-sm text-green-300">
                    {timeLeft.minutes === 1 ? 'Minute' : 'Minutes'}
                  </div>
                </motion.div>

                {/* Seconds */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="bg-yellow-500/20 rounded-xl p-3 border border-yellow-400/30"
                >
                  <div className="text-2xl md:text-3xl font-bold text-yellow-200">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-xs md:text-sm text-yellow-300">
                    {timeLeft.seconds === 1 ? 'Second' : 'Seconds'}
                  </div>
                </motion.div>
              </div>

              {/* Motivational text */}
              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-center text-emerald-200 text-sm md:text-base mt-4"
              >
                ✨ Every moment brings us closer to your celebration! ✨
              </motion.p>
            </motion.div>

            {/* Current Date Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-6 p-4 bg-emerald-800/30 rounded-2xl border border-emerald-500/30"
            >
              <p className="text-emerald-200 text-sm md:text-base">
                Today is: <span className="font-medium text-white">
                  {today.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </p>
              <p className="text-emerald-300 text-xs md:text-sm mt-1">
                Your special day is still coming! 🎉
              </p>
            </motion.div>

            {/* Decorative Elements */}
            <div className="mt-6 flex justify-center gap-4 text-2xl">
              <span>🌸</span>
              <span>🦋</span>
              <span>🌺</span>
            </div>
          </div>
        </motion.div>

        {/* Flower Shower - Left Side */}
        <div className="absolute left-0 top-0 h-full w-32 overflow-hidden pointer-events-none">
          {/* Falling flowers on the left */}
          <motion.div
            animate={{ y: [-100, 1000] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0 }}
            className="absolute left-4 text-2xl"
          >
            🌸
          </motion.div>
          <motion.div
            animate={{ y: [-100, 1000] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
            className="absolute left-8 text-xl"
          >
            🌺
          </motion.div>
          <motion.div
            animate={{ y: [-100, 1000] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute left-2 text-lg"
          >
            🌼
          </motion.div>
          <motion.div
            animate={{ y: [-100, 1000] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 3 }}
            className="absolute left-12 text-xl"
          >
            🌻
          </motion.div>
          <motion.div
            animate={{ y: [-100, 1000] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
            className="absolute left-6 text-lg"
          >
            🌷
          </motion.div>
          <motion.div
            animate={{ y: [-100, 1000] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 2.5 }}
            className="absolute left-10 text-sm"
          >
            🌹
          </motion.div>
        </div>

        {/* Flower Shower - Right Side */}
        <div className="absolute right-0 top-0 h-full w-32 overflow-hidden pointer-events-none">
          {/* Falling flowers on the right */}
          <motion.div
            animate={{ y: [-100, 1000] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "linear", delay: 1.5 }}
            className="absolute right-4 text-2xl"
          >
            🌸
          </motion.div>
          <motion.div
            animate={{ y: [-100, 1000] }}
            transition={{ duration: 5.3, repeat: Infinity, ease: "linear", delay: 0.8 }}
            className="absolute right-8 text-xl"
          >
            🌺
          </motion.div>
          <motion.div
            animate={{ y: [-100, 1000] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "linear", delay: 2.2 }}
            className="absolute right-2 text-lg"
          >
            🌼
          </motion.div>
          <motion.div
            animate={{ y: [-100, 1000] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "linear", delay: 1.2 }}
            className="absolute right-12 text-xl"
          >
            🌻
          </motion.div>
          <motion.div
            animate={{ y: [-100, 1000] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "linear", delay: 3.5 }}
            className="absolute right-6 text-lg"
          >
            🌷
          </motion.div>
          <motion.div
            animate={{ y: [-100, 1000] }}
            transition={{ duration: 4.3, repeat: Infinity, ease: "linear", delay: 0.3 }}
            className="absolute right-10 text-sm"
          >
            🌹
          </motion.div>
        </div>

        {/* Additional Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent pointer-events-none" />
      </div>
    );
  }

  // If it is her birthday, return null (the main birthday page will show)
  return null;
};

export default DateChecker;
