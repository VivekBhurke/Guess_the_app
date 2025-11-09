import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Heart, Share2, SkipForward, SkipBack, Pause, Volume2, ThumbsUp, Eye, MessageCircle, Send, Bookmark, MoreVertical, Plus, CheckCheck, Mic, Smile, Hash, Users, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { soundManager } from '../utils/sounds';

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface QuestionScreenProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: Option[];
  theme: 'netflix' | 'spotify' | 'youtube' | 'instagram' | 'twitter' | 'tiktok' | 'whatsapp' | 'discord';
  onAnswer: (isCorrect: boolean) => void;
}

export function QuestionScreen({ questionNumber, totalQuestions, question, options, theme, onAnswer }: QuestionScreenProps) {
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per question
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (answered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswer(false); // Auto-fail on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answered]);

  const handleAnswer = (isCorrect: boolean) => {
    if (answered) return;
    setAnswered(true);
    
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }
    onAnswer(isCorrect);
  };

  const renderNetflixUI = () => (
    <div className="space-y-4">
      <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1756412955475-7e1ed16869af?w=400"
          alt="Featured movie"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white mb-2">Trending Now</h3>
          <div className="flex gap-2">
            <button className="bg-white text-black px-6 py-2 rounded-lg flex items-center gap-2">
              <Play className="w-4 h-4" fill="currentColor" />
              <span>Play</span>
            </button>
            <button className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-lg">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-white/90">Continue Watching</h4>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-purple-700/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-6 h-6 text-white/50" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div className="h-full bg-red-500" style={{ width: `${30 * i}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSpotifyUI = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-6 shadow-xl">
        <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden shadow-2xl mb-4">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1644855640845-ab57a047320e?w=400"
            alt="Album cover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-white">Midnight Vibes</h3>
          <p className="text-white/70">Various Artists</p>
        </div>
      </div>

      <div className="bg-black/30 rounded-3xl p-6 space-y-4 backdrop-blur">
        <div className="flex items-center justify-between text-white/60">
          <span>1:23</span>
          <div className="flex-1 mx-4 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 rounded-full" style={{ width: '40%' }} />
          </div>
          <span>3:45</span>
        </div>

        <div className="flex items-center justify-center gap-6 text-white">
          <SkipBack className="w-6 h-6" />
          <button className="bg-white text-black rounded-full p-4">
            <Pause className="w-6 h-6" fill="currentColor" />
          </button>
          <SkipForward className="w-6 h-6" />
        </div>

        <div className="flex items-center justify-between text-white/60">
          <Heart className="w-5 h-5" />
          <Volume2 className="w-5 h-5" />
        </div>
      </div>
    </div>
  );

  const renderYouTubeUI = () => (
    <div className="space-y-4">
      <div className="relative h-52 rounded-2xl overflow-hidden bg-gray-800 shadow-lg">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1745223676002-b881b2a19089?w=400"
          alt="Video thumbnail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-600 rounded-full p-4">
            <Play className="w-8 h-8 text-white" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
          12:34
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white">
          G
        </div>
        <div className="flex-1">
          <h3 className="text-white mb-1">Amazing Gaming Highlights</h3>
          <div className="flex items-center gap-3 text-white/60">
            <span>GameChannel</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              1.2M views
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 text-white/80">
        <button className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
          <ThumbsUp className="w-4 h-4" />
          <span>12K</span>
        </button>
        <button className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-700">
              <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1.5 py-0.5 rounded text-xs">
                8:21
              </div>
            </div>
            <p className="text-white/70 text-sm">Related Video {i}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInstagramUI = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 p-0.5">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-white">
              U
            </div>
          </div>
          <span className="text-white">user_photos</span>
        </div>
        <MoreVertical className="w-5 h-5 text-white" />
      </div>

      <div className="rounded-2xl overflow-hidden shadow-lg">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1704652838411-4ddb18904aae?w=400"
          alt="Instagram post"
          className="w-full aspect-square object-cover"
        />
      </div>

      <div className="flex items-center justify-between text-white">
        <div className="flex gap-4">
          <Heart className="w-6 h-6" />
          <MessageCircle className="w-6 h-6" />
          <Send className="w-6 h-6" />
        </div>
        <Bookmark className="w-6 h-6" />
      </div>

      <div className="text-white">
        <p>2,847 likes</p>
        <p className="text-white/70 text-sm mt-1">View all 124 comments</p>
      </div>

      <div className="grid grid-cols-3 gap-1 mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-pink-600/30 to-purple-600/30" />
        ))}
      </div>
    </div>
  );

  const renderTwitterUI = () => (
    <div className="space-y-4">
      <div className="bg-white/5 backdrop-blur rounded-3xl p-4 space-y-3">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
            T
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-white">Tech Updates</span>
              <span className="text-white/50">@techupdates · 2h</span>
            </div>
            <p className="text-white/90 mt-2">
              Just launched our new feature! Check it out and let us know what you think 🚀
            </p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden bg-blue-500/20 h-40" />

        <div className="flex justify-between text-white/60 px-2">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>42</span>
          </div>
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span>128</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span>1.2K</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>5.3K</span>
          </div>
        </div>
      </div>

      {[1, 2].map((i) => (
        <div key={i} className="bg-white/5 backdrop-blur rounded-3xl p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white">User {i}</span>
                <span className="text-white/50 text-sm">@user{i} · 5h</span>
              </div>
              <p className="text-white/80 text-sm mt-1">This is amazing! Love the new updates...</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTikTokUI = () => (
    <div className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-pink-900 to-purple-900">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1659353672237-91826f496791?w=400"
        alt="TikTok video"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      
      <div className="absolute right-4 bottom-32 space-y-5 flex flex-col items-center">
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Heart className="w-8 h-8 text-white" fill="white" />
          <span className="text-white text-xs">234K</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <MessageCircle className="w-8 h-8 text-white" />
          <span className="text-white text-xs">1,234</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Share2 className="w-8 h-8 text-white" />
          <span className="text-white text-xs">891</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-20 text-white space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
          <span>@creative_user</span>
        </div>
        <p className="text-sm">Amazing content! 🔥 #viral #trending</p>
      </div>
    </div>
  );

  const renderWhatsAppUI = () => (
    <div className="space-y-3">
      <div className="flex items-center gap-3 bg-green-900/30 backdrop-blur p-4 rounded-2xl">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white">
          J
        </div>
        <div className="flex-1">
          <h3 className="text-white">John Doe</h3>
          <p className="text-white/60 text-sm">online</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-start">
          <div className="bg-gray-700/50 backdrop-blur rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
            <p className="text-white text-sm">Hey! How are you?</p>
            <span className="text-white/40 text-xs">10:30 AM</span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-green-600 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
            <p className="text-white text-sm">I'm good! Just checking out this new app 😊</p>
            <div className="flex items-center gap-1 justify-end">
              <span className="text-white/70 text-xs">10:32 AM</span>
              <CheckCheck className="w-3 h-3 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-gray-700/50 backdrop-blur rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
            <p className="text-white text-sm">Nice! Send me the link</p>
            <span className="text-white/40 text-xs">10:33 AM</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-gray-700/30 backdrop-blur rounded-full px-4 py-3 mt-4">
        <Smile className="w-5 h-5 text-white/60" />
        <input 
          type="text" 
          placeholder="Type a message"
          className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-sm"
          readOnly
        />
        <Mic className="w-5 h-5 text-white/60" />
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {['Mom 💝', 'Work 💼', 'Friends 🎉'].map((name, i) => (
          <div key={i} className="bg-green-900/20 rounded-xl p-3 text-center">
            <p className="text-white/80 text-sm">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDiscordUI = () => (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        {['#', '#', '#'].map((_, i) => (
          <div key={i} className="w-12 h-12 rounded-2xl bg-indigo-600/30 flex items-center justify-center">
            <Hash className="w-5 h-5 text-indigo-300" />
          </div>
        ))}
      </div>

      <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-5 h-5 text-gray-400" />
          <span className="text-white">general</span>
        </div>

        <div className="space-y-3">
          {[
            { user: 'GameMaster', time: '12:45 PM', msg: 'Anyone up for a game?' },
            { user: 'ProPlayer', time: '12:46 PM', msg: 'Sure! I\'m in 🎮' },
            { user: 'TechGuru', time: '12:47 PM', msg: 'Count me in too!' }
          ].map((chat, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                {chat.user[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white">{chat.user}</span>
                  <span className="text-white/40 text-xs">{chat.time}</span>
                </div>
                <p className="text-white/80 text-sm">{chat.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 bg-gray-700/30 backdrop-blur rounded-lg px-4 py-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-white/60" />
          <span className="text-white/40 text-sm">Message #general</span>
        </div>
      </div>

      <div className="flex gap-2">
        {['🎮 Gaming', '💻 Dev', '🎨 Creative'].map((server, i) => (
          <div key={i} className="flex-1 bg-indigo-900/30 rounded-xl p-3 text-center">
            <p className="text-white/80 text-sm">{server}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const getBackground = () => {
    switch (theme) {
      case 'netflix':
        return 'bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900';
      case 'spotify':
        return 'bg-gradient-to-br from-black via-gray-900 to-green-900';
      case 'youtube':
        return 'bg-gradient-to-br from-gray-900 via-red-900 to-gray-800';
      case 'instagram':
        return 'bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900';
      case 'twitter':
        return 'bg-gradient-to-br from-blue-950 via-cyan-900 to-blue-900';
      case 'tiktok':
        return 'bg-gradient-to-br from-black via-pink-950 to-cyan-950';
      case 'whatsapp':
        return 'bg-gradient-to-br from-green-950 via-teal-900 to-green-900';
      case 'discord':
        return 'bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900';
    }
  };

  const getTimerColor = () => {
    if (timeLeft > 10) return 'text-green-400';
    if (timeLeft > 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className={`min-h-screen ${getBackground()} p-6 flex flex-col`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between text-white/60 mb-4"
      >
        <span>Question {questionNumber} of {totalQuestions}</span>
        <div className="flex items-center gap-3">
          <motion.div
            animate={timeLeft <= 5 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
            className={`flex items-center gap-1 ${getTimerColor()}`}
          >
            <Clock className="w-4 h-4" />
            <span className="font-mono">{timeLeft}s</span>
          </motion.div>
          <div className="flex gap-1">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full ${
                  i < questionNumber ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Timer Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-4"
      >
        <motion.div
          className={`h-full ${
            timeLeft > 10 ? 'bg-green-400' : timeLeft > 5 ? 'bg-yellow-400' : 'bg-red-400'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / 15) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 mb-6"
      >
        {theme === 'netflix' && renderNetflixUI()}
        {theme === 'spotify' && renderSpotifyUI()}
        {theme === 'youtube' && renderYouTubeUI()}
        {theme === 'instagram' && renderInstagramUI()}
        {theme === 'twitter' && renderTwitterUI()}
        {theme === 'tiktok' && renderTikTokUI()}
        {theme === 'whatsapp' && renderWhatsAppUI()}
        {theme === 'discord' && renderDiscordUI()}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-white text-center">{question}</h2>

        <div className="grid grid-cols-1 gap-3">
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onClick={() => handleAnswer(option.isCorrect)}
              onMouseEnter={() => !answered && soundManager.playHover()}
              whileHover={!answered ? { scale: 1.02 } : {}}
              whileTap={!answered ? { scale: 0.98 } : {}}
              disabled={answered}
              className={`w-full bg-white/10 backdrop-blur text-white py-4 rounded-[20px] border-2 border-white/20 transition-all ${
                !answered ? 'hover:bg-white/20 hover:border-white/40 cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                  {option.id}
                </span>
                <span className="text-sm">{option.text}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
