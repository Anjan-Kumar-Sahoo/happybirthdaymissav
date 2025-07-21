import React from 'react';
import { motion } from 'framer-motion';

/**
 * VideoSection Component
 * Portrait video container with jungle-themed decorative margins
 * Creates an immersive, nature-framed viewing experience
 */
const VideoSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto mt-16 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl md:text-3xl font-light text-white mb-2">
          A Special Message for You
        </h3>
        <p className="text-emerald-200 text-lg">
          Framed by the beauty of nature, just like your wonderful spirit 🌿
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="relative"
      >
        {/* Jungle Frame Container */}
        <div className="relative bg-gradient-to-br from-emerald-800 to-green-900 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
          
          {/* Left Jungle Margin */}
          <div className="absolute left-0 top-0 h-full w-16 md:w-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-emerald-800 to-transparent">
              {/* Tropical leaves and vines */}
              <motion.div
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-full"
              >
                {/* Large tropical leaves */}
                <div className="absolute top-4 left-2 w-8 h-12 bg-green-600 rounded-full transform -rotate-12 opacity-80" />
                <div className="absolute top-16 left-1 w-6 h-10 bg-emerald-500 rounded-full transform rotate-45 opacity-70" />
                <div className="absolute top-32 left-3 w-10 h-8 bg-green-700 rounded-full transform -rotate-25 opacity-75" />
                
                {/* Hanging vines */}
                <div className="absolute top-0 left-4 w-1 h-20 bg-green-600 rounded-full opacity-60" />
                <div className="absolute top-0 left-8 w-0.5 h-32 bg-emerald-600 rounded-full opacity-50" />
              </motion.div>
            </div>
          </div>

          {/* Right Jungle Margin */}
          <div className="absolute right-0 top-0 h-full w-16 md:w-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-l from-green-900 via-emerald-800 to-transparent">
              <motion.div
                animate={{ x: [5, -5, 5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-full h-full"
              >
                {/* Large tropical leaves */}
                <div className="absolute top-8 right-2 w-8 h-12 bg-green-600 rounded-full transform rotate-12 opacity-80" />
                <div className="absolute top-20 right-1 w-6 h-10 bg-emerald-500 rounded-full transform -rotate-45 opacity-70" />
                <div className="absolute top-40 right-3 w-10 h-8 bg-green-700 rounded-full transform rotate-25 opacity-75" />
                
                {/* Hanging vines */}
                <div className="absolute top-0 right-6 w-1 h-24 bg-green-600 rounded-full opacity-60" />
                <div className="absolute top-0 right-2 w-0.5 h-36 bg-emerald-600 rounded-full opacity-50" />
              </motion.div>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative mx-8 md:mx-12 bg-black/20 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10">
            <div className="aspect-[9/16] max-w-md mx-auto relative">
              {/* Placeholder for Miss Av's portrait video */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-400/20 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    🎬
                  </motion.div>
                  <p className="text-lg font-medium mb-2">Portrait Video of Miss Av</p>
                  <p className="text-sm opacity-80">
                    Upload your special video here
                  </p>
                </div>
              </div>
              
              {/* Video element (replace with actual video) */}
              {/* <video 
                className="w-full h-full object-cover"
                controls
                muted
                poster="path-to-video-poster.jpg"
              >
                <source src="path-to-miss-av-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
            </div>
          </div>

          {/* Additional Jungle Elements */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="flex gap-2"
            >
              <span className="text-2xl">🦋</span>
              <span className="text-xl">🌿</span>
            </motion.div>
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ y: [2, -2, 2] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="flex gap-1"
            >
              <span className="text-lg">🌺</span>
              <span className="text-sm">🍃</span>
              <span className="text-lg">🌸</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoSection;