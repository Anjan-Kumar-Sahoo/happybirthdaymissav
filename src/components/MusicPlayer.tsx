import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import * as Tone from 'tone';

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

/**
 * MusicPlayer Component
 * Provides ambient nature-inspired birthday music using Tone.js
 * Features a beautiful, garden-themed control interface
 */
const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, setIsPlaying }) => {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const sequenceRef = useRef<Tone.Sequence | null>(null);

  /**
   * Happy Birthday melody in a gentle, nature-inspired arrangement
   * Using soft, harp-like tones
   */
  const melody = [
    { note: 'C4', duration: '4n' },
    { note: 'C4', duration: '8n' },
    { note: 'D4', duration: '4n' },
    { note: 'C4', duration: '4n' },
    { note: 'F4', duration: '4n' },
    { note: 'E4', duration: '2n' },
    { note: 'C4', duration: '4n' },
    { note: 'C4', duration: '8n' },
    { note: 'D4', duration: '4n' },
    { note: 'C4', duration: '4n' },
    { note: 'G4', duration: '4n' },
    { note: 'F4', duration: '2n' },
    { note: 'C4', duration: '4n' },
    { note: 'C4', duration: '8n' },
    { note: 'C5', duration: '4n' },
    { note: 'A4', duration: '4n' },
    { note: 'F4', duration: '4n' },
    { note: 'E4', duration: '4n' },
    { note: 'D4', duration: '2n' },
    { note: 'A#4', duration: '4n' },
    { note: 'A#4', duration: '8n' },
    { note: 'A4', duration: '4n' },
    { note: 'F4', duration: '4n' },
    { note: 'G4', duration: '4n' },
    { note: 'F4', duration: '2n' },
  ];

  useEffect(() => {
    // Initialize Tone.js synthesizer with harp-like sound
    synthRef.current = new Tone.PolySynth({
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.1,
        decay: 0.3,
        sustain: 0.8,
        release: 2,
      },
    }).toDestination();

    // Add reverb for a magical, spacious sound
    const reverb = new Tone.Reverb({
      decay: 3,
      wet: 0.3,
    }).toDestination();
    
    synthRef.current.connect(reverb);

    // Set gentle volume
    synthRef.current.volume.value = -15;

    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.dispose();
      }
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []);

  /**
   * Toggles music playback with smooth transitions
   */
  const toggleMusic = async () => {
    if (!synthRef.current) return;

    try {
      if (!isPlaying) {
        // Start Tone.js context
        await Tone.start();
        
        // Create and start the musical sequence
        let noteIndex = 0;
        sequenceRef.current = new Tone.Sequence(
          (time) => {
            const { note, duration } = melody[noteIndex];
            synthRef.current?.triggerAttackRelease(note, duration, time);
            noteIndex = (noteIndex + 1) % melody.length;
          },
          Array(melody.length).fill(0).map((_, i) => i),
          '4n'
        );

        Tone.Transport.bpm.value = 80; // Gentle, relaxed tempo
        sequenceRef.current.start(0);
        Tone.Transport.start();
        setIsPlaying(true);
      } else {
        // Stop the music gracefully
        Tone.Transport.stop();
        if (sequenceRef.current) {
          sequenceRef.current.stop();
          sequenceRef.current.dispose();
          sequenceRef.current = null;
        }
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error toggling music:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white/30"
    >
      <Music className="w-4 h-4 text-emerald-200" />
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
          {isPlaying ? 'Playing' : 'Play Music'}
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
  );
};

export default MusicPlayer;