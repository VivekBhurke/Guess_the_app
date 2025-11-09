import { useState } from 'react';
import { motion } from 'motion/react';
import { User, ArrowRight } from 'lucide-react';
import { Input } from './ui/input';

interface NameEntryProps {
  onSubmit: (name: string) => void;
}

export function NameEntry({ onSubmit }: NameEntryProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <User className="w-12 h-12 text-purple-600" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <h1 className="text-white mb-3">
          Welcome, Player!
        </h1>
        <p className="text-white/90 max-w-xs mx-auto">
          Enter your name to start the ultimate app guessing challenge
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4"
      >
        <div className="relative">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-white/10 backdrop-blur border-2 border-white/30 text-white placeholder:text-white/50 py-6 px-6 rounded-[20px] focus:border-white/60 focus:bg-white/20 transition-all"
            maxLength={20}
            autoFocus
          />
          {name && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <span className="text-2xl">👋</span>
            </motion.div>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={!name.trim()}
          whileHover={{ scale: name.trim() ? 1.05 : 1 }}
          whileTap={{ scale: name.trim() ? 0.95 : 1 }}
          className={`w-full py-4 rounded-[20px] shadow-xl flex items-center justify-center gap-2 transition-all ${
            name.trim()
              ? 'bg-white text-purple-600 cursor-pointer'
              : 'bg-white/30 text-white/50 cursor-not-allowed'
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center text-white/60 text-sm"
      >
        <p>🏆 Beat your best score and become a legend!</p>
      </motion.div>
    </div>
  );
}
