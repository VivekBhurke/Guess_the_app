import { motion } from 'motion/react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/sounds';

interface StartScreenProps {
  playerName: string;
  bestScore: number;
  totalQuestions: number;
  soundEnabled: boolean;
  onStart: () => void;
  onToggleSound: () => void;
}

export function StartScreen({ playerName, bestScore, totalQuestions, soundEnabled, onStart, onToggleSound }: StartScreenProps) {
  const handleStart = () => {
    soundManager.playStart();
    onStart();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
      {/* Sound Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onToggleSound}
        className="self-end bg-white/20 backdrop-blur p-3 rounded-full"
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-white" />
        ) : (
          <VolumeX className="w-5 h-5 text-white" />
        )}
      </motion.button>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="mt-8"
      >
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-5xl">🎮</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h1 className="text-white mb-4">
          Guess the App
        </h1>
        <p className="text-white/90 max-w-xs mx-auto mb-6">
          Can you recognize your favorite apps by their UI?
        </p>

        {/* Player Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur rounded-[20px] px-6 py-4 border border-white/20"
        >
          <p className="text-white/80 text-sm mb-2">Welcome back,</p>
          <p className="text-white text-xl">{playerName}! 👋</p>
          {bestScore > 0 && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <p className="text-white/70 text-sm">
                Your Best: <span className="text-white">{bestScore}/{totalQuestions}</span> 🏆
              </p>
            </div>
          )}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-3 gap-3 mt-6"
        >
          {[
            { icon: '🎯', text: '8 Apps' },
            { icon: '⏱️', text: '15s Timer' },
            { icon: '🔥', text: 'Hard Mode' }
          ].map((feature, i) => (
            <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-3 text-center">
              <div className="text-2xl mb-1">{feature.icon}</div>
              <p className="text-white/80 text-xs">{feature.text}</p>
            </div>
          ))}
        </motion.div>
        
        {/* Challenge Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-orange-500/20 border border-orange-400/30 backdrop-blur rounded-2xl p-3 mt-4 text-center"
        >
          <p className="text-orange-200 text-sm">
            ⚡ Challenge Mode: 4 options, shuffled questions, 15s per answer!
          </p>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        onClick={handleStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-white text-purple-600 py-4 rounded-[20px] shadow-xl flex items-center justify-center gap-2 mb-8"
      >
        <span>Start Challenge</span>
        <Play className="w-5 h-5" fill="currentColor" />
      </motion.button>
    </div>
  );
}
