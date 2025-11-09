import { motion } from 'motion/react';
import { RotateCcw, Trophy, Award, Github, Linkedin, Star } from 'lucide-react';
import { useEffect } from 'react';
import { soundManager } from '../utils/sounds';

interface ThankYouScreenProps {
  playerName: string;
  score: number;
  totalQuestions: number;
  bestScore: number;
  onRestart: () => void;
}

export function ThankYouScreen({ playerName, score, totalQuestions, bestScore, onRestart }: ThankYouScreenProps) {
  const percentage = (score / totalQuestions) * 100;
  const isNewBest = score === bestScore && score > 0;

  useEffect(() => {
    soundManager.playComplete();
  }, []);

  const getScoreMessage = () => {
    if (percentage === 100) return "Perfect Score! You're a legend! 🏆";
    if (percentage >= 80) return "Excellent! You really know your apps! 🌟";
    if (percentage >= 60) return "Great job! Keep it up! 👏";
    if (percentage >= 40) return "Good effort! Try again! 💪";
    return "Keep practicing! You'll get better! 🚀";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 overflow-y-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="text-center mt-8 mb-6 w-full"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-7xl mb-4"
        >
          {percentage === 100 ? '🏆' : percentage >= 70 ? '🎉' : '💜'}
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white mb-2"
        >
          Well done, {playerName}!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/90 mb-6"
        >
          {getScoreMessage()}
        </motion.p>

        {/* Score Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <div className="bg-white/10 backdrop-blur rounded-[20px] p-6 border-2 border-white/20">
            <Trophy className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
            <p className="text-white/70 text-sm mb-1">Your Score</p>
            <p className="text-white text-3xl">{score}/{totalQuestions}</p>
            <p className="text-white/60 text-sm mt-1">{percentage.toFixed(0)}%</p>
          </div>

          <div className={`bg-white/10 backdrop-blur rounded-[20px] p-6 border-2 ${
            isNewBest ? 'border-yellow-400 animate-pulse' : 'border-white/20'
          }`}>
            <Award className={`w-8 h-8 mx-auto mb-2 ${
              isNewBest ? 'text-yellow-300' : 'text-purple-300'
            }`} />
            <p className="text-white/70 text-sm mb-1">Best Score</p>
            <p className="text-white text-3xl">{bestScore}/{totalQuestions}</p>
            {isNewBest && <p className="text-yellow-300 text-sm mt-1">🎊 New Record!</p>}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur rounded-[20px] p-4 mb-6"
        >
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.round((percentage / 100) * 5) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-white/20'
                    }`} 
                  />
                ))}
              </div>
              <p className="text-white/60 text-xs">Rating</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-sm space-y-4 mb-6"
      >
        <button
          onClick={() => {
            soundManager.playClick();
            onRestart();
          }}
          className="w-full bg-white text-purple-600 py-4 rounded-[20px] shadow-xl flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Play Again</span>
        </button>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-white/5 backdrop-blur rounded-[20px] p-4 border border-white/10"
        >
          <p className="text-white/90 text-center mb-3 text-sm">Created by Vivek Bhurke</p>
          <div className="flex gap-3 justify-center">
            <a
              href="https://github.com/VivekBhurke"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/vivek-bhurke"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all"
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-center text-white/60 text-sm"
        >
          <p className="mb-2">Share this game with your friends!</p>
          <div className="flex justify-center gap-4">
            {['🎮', '📱', '✨'].map((emoji, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="text-2xl"
              >
                {emoji}
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-white/40 text-xs">Made with ❤️ using React & Tailwind</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
