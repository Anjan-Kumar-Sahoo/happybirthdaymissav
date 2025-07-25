import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, ChevronDown } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

/**
 * MusicPlayer Component
 * Plays background music from an MP3 file on loop with song selection
 * Features a beautiful, garden-themed control interface
 */
const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSong, setCurrentSong] = useState(0);
  const [showSongList, setShowSongList] = useState(false);

  // Available songs
  const songs = [
    { title: "Tum Ho Toh", file: "/audio/Tum Ho Toh.mp3" },
    { title: "Happy Birthday", file: "/audio/Happy-Birthday-Instrumental.mp3" }
  ];

  useEffect(() => {
    // Initialize audio element
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3; // Set gentle volume (0-1)
      audioRef.current.src = songs[currentSong].file;
      
      // Handle play/pause events
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleError = (e: Event) => {
        console.error('Audio error:', e);
        setIsPlaying(false);
      };
      const handleCanPlay = () => {
        console.log('Audio can play:', songs[currentSong].title);
      };
      
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
      audioRef.current.addEventListener('error', handleError);
      audioRef.current.addEventListener('canplay', handleCanPlay);
      
      // Load the audio
      audioRef.current.load();
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('play', handlePlay);
          audioRef.current.removeEventListener('pause', handlePause);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.removeEventListener('canplay', handleCanPlay);
        }
      };
    }
  }, [currentSong, songs, setIsPlaying]);

  /**
   * Changes the current song
   */
  const changeSong = async (songIndex: number) => {
    if (!audioRef.current) return;
    
    const wasPlaying = isPlaying;
    
    // Pause current song
    audioRef.current.pause();
    
    // Change song
    setCurrentSong(songIndex);
    audioRef.current.src = songs[songIndex].file;
    audioRef.current.load();
    
    // Resume playing if it was playing before
    if (wasPlaying) {
      try {
        // Wait for the new audio to be ready
        audioRef.current.addEventListener('canplay', async () => {
          try {
            await audioRef.current!.play();
          } catch (error) {
            console.error('Error playing new song:', error);
            alert(`Could not play "${songs[songIndex].title}". Please check if the file exists.`);
          }
        }, { once: true });
      } catch (error) {
        console.error('Error setting up new song:', error);
      }
    }
    
    setShowSongList(false);
  };

  /**
   * Toggles music playback
   */
  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Check if audio is ready to play
        if (audioRef.current.readyState >= 2) {
          await audioRef.current.play();
        } else {
          // Wait for audio to load
          audioRef.current.addEventListener('canplay', async () => {
            try {
              await audioRef.current!.play();
            } catch (error) {
              console.error('Error playing audio after load:', error);
              alert('Could not play audio. Please check if the file exists and try again.');
            }
          }, { once: true });
          
          audioRef.current.load();
        }
      }
    } catch (error) {
      console.error('Error toggling music:', error);
      alert(`Could not play "${songs[currentSong].title}". Please check if the file exists and try again.`);
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        preload="metadata"
        crossOrigin="anonymous"
        onError={(e) => {
          console.error('Audio element error:', e);
          console.error('Failed to load:', songs[currentSong].file);
        }}
        onLoadStart={() => console.log('Loading:', songs[currentSong].title)}
        onCanPlay={() => console.log('Can play:', songs[currentSong].title)}
      >
        <source src={songs[currentSong].file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white/30"
      >
        {/* Music Icon with Song Selector */}
        <button
          onClick={() => setShowSongList(!showSongList)}
          className="flex items-center gap-1 text-emerald-200 hover:text-emerald-100 transition-colors"
          aria-label="Select song"
        >
          <Music className="w-4 h-4" />
          <ChevronDown className="w-3 h-3" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 text-white hover:text-emerald-200 transition-colors duration-300"
          aria-label={isPlaying ? 'Mute music' : 'Play music'}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">
            {isPlaying ? songs[currentSong].title : 'Play Music'}
          </span>
        </button>
        
        {/* Animated Music Indicator */}
        {isPlaying && (
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-emerald-300 rounded-full"
                animate={{
                  height: [4, 12, 4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Song Selection Dropdown */}
      <AnimatePresence>
        {showSongList && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 right-0 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/30 overflow-hidden z-10"
          >
            {songs.map((song, index) => (
              <button
                key={index}
                onClick={() => changeSong(index)}
                className={`w-full px-4 py-3 text-left transition-colors ${
                  currentSong === index
                    ? 'bg-emerald-500/20 text-emerald-800 font-medium'
                    : 'text-gray-700 hover:bg-emerald-500/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Music className="w-3 h-3" />
                  <span className="text-sm">{song.title}</span>
                  {currentSong === index && (
                    <span className="text-xs text-emerald-600 ml-auto">Playing</span>
                  )}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer;