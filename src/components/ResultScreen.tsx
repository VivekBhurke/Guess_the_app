import { motion } from 'motion/react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

interface ResultScreenProps {
  isCorrect: boolean;
  onNext?: () => void;
  onRetry?: () => void;
}

export function ResultScreen({ isCorrect, onNext, onRetry }: ResultScreenProps) {
  useEffect(() => {
    if (isCorrect) {
      // Create confetti effect
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio: number, opts: any) {
        const confetti = (window as any).confetti;
        if (confetti) {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
          });
        }
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });

      fire(0.2, {
        spread: 60,
      });

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [isCorrect]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${
      isCorrect 
        ? 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500' 
        : 'bg-gradient-to-br from-red-500 via-pink-500 to-rose-500'
    }`}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={isCorrect ? {
            rotate: [0, 10, -10, 10, 0],
          } : {
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="text-9xl mb-4"
        >
          {isCorrect ? '🎉' : '❌'}
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white mb-3"
        >
          {isCorrect ? 'You guessed right!' : 'Oops! Try Again'}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/90 mb-2"
        >
          {isCorrect 
            ? 'Great job! Ready for the next challenge?' 
            : "Time's up or wrong answer!"}
        </motion.p>

        {!isCorrect && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/70 text-sm"
          >
            These apps look similar! Focus on the details 🔍
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm"
      >
        {isCorrect ? (
          <button
            onClick={onNext}
            className="w-full bg-white text-green-600 py-4 rounded-[20px] shadow-xl flex items-center justify-center gap-2"
          >
            <span>Next Challenge</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onRetry}
            className="w-full bg-white text-red-600 py-4 rounded-[20px] shadow-xl flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
        )}
      </motion.div>
    </div>
  );
}
