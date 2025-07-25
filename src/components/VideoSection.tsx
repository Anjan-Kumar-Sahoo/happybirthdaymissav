import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * VideoSection Component
 * Portrait video container with jungle-themed decorative margins
 * Creates an immersive, nature-framed viewing experience
 */
const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [customPoster, setCustomPoster] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Generate poster from first frame if custom thumbnail fails to load
  const generatePosterFromFirstFrame = () => {
    const video = videoRef.current;
    if (video && video.videoWidth > 0) {
      video.currentTime = 0.1; // Seek to 0.1 seconds to ensure we get a good frame
      
      const handleSeeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          const posterDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setCustomPoster(posterDataUrl);
        }
        
        video.removeEventListener('seeked', handleSeeked);
        video.currentTime = 0; // Reset to beginning
      };
      
      video.addEventListener('seeked', handleSeeked);
    }
  };
  return (
    <section className="max-w-6xl mx-auto mt-16 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl md:text-3xl font-light text-white mb-2">
          🎥 Happy Birthday Miss Av! 🎂
        </h3>
        <p className="text-emerald-200 text-lg">
          A special birthday video message framed by nature's beauty 🌿
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
              {/* Video element */}
              <video 
                ref={videoRef}
                className="w-full h-full object-contain rounded-2xl"
                controls
                autoPlay={false}
                poster={customPoster || "/images/thumbnails/Av_videothumbnail.jpg"} // Use generated poster or custom thumbnail
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadedMetadata={generatePosterFromFirstFrame} // Generate poster when video metadata loads
                style={{
                  aspectRatio: '9/16', // Ensure portrait aspect ratio is maintained
                }}
                onError={(e) => {
                  // If custom thumbnail fails to load, generate from first frame
                  const target = e.target as HTMLVideoElement;
                  if (target.poster.includes('thumbnails') && !customPoster) {
                    generatePosterFromFirstFrame();
                  }
                }}
                preload="metadata" // Load video metadata to get first frame if poster fails
              >
                <source src="/videos/Av_bdayvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Simple Play Button Overlay */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="bg-white/90 rounded-full p-4 shadow-lg hover:bg-white transition-colors">
                    <div className="text-gray-800 text-3xl">▶</div>
                  </div>
                </div>
              )}
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