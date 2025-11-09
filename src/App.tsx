import { useState, useEffect } from 'react';
import { NameEntry } from './components/NameEntry';
import { StartScreen } from './components/StartScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultScreen } from './components/ResultScreen';
import { ThankYouScreen } from './components/ThankYouScreen';
import { soundManager } from './utils/sounds';
import { shuffleArray } from './utils/shuffle';

type Screen = 'nameEntry' | 'start' | 'question' | 'result' | 'thankyou';

interface Question {
  id: number;
  question: string;
  theme: 'netflix' | 'spotify' | 'youtube' | 'instagram' | 'twitter' | 'tiktok' | 'whatsapp' | 'discord';
  options: {
    id: number;
    text: string;
    isCorrect: boolean;
  }[];
}

const allQuestions: Question[] = [
  {
    id: 1,
    question: 'Can you identify this streaming platform?',
    theme: 'netflix',
    options: [
      { id: 1, text: 'Amazon Prime Video', isCorrect: false },
      { id: 2, text: 'Netflix', isCorrect: true },
      { id: 3, text: 'Disney+', isCorrect: false },
      { id: 4, text: 'HBO Max', isCorrect: false },
    ],
  },
  {
    id: 2,
    question: 'Which music streaming service is this?',
    theme: 'spotify',
    options: [
      { id: 1, text: 'Spotify', isCorrect: true },
      { id: 2, text: 'Apple Music', isCorrect: false },
      { id: 3, text: 'YouTube Music', isCorrect: false },
      { id: 4, text: 'Tidal', isCorrect: false },
    ],
  },
  {
    id: 3,
    question: 'What video platform does this belong to?',
    theme: 'youtube',
    options: [
      { id: 1, text: 'Vimeo', isCorrect: false },
      { id: 2, text: 'Dailymotion', isCorrect: false },
      { id: 3, text: 'YouTube', isCorrect: true },
      { id: 4, text: 'Twitch', isCorrect: false },
    ],
  },
  {
    id: 4,
    question: 'Which photo-sharing platform is this?',
    theme: 'instagram',
    options: [
      { id: 1, text: 'Pinterest', isCorrect: false },
      { id: 2, text: 'Instagram', isCorrect: true },
      { id: 3, text: 'Snapchat', isCorrect: false },
      { id: 4, text: 'VSCO', isCorrect: false },
    ],
  },
  {
    id: 5,
    question: 'Name this microblogging platform',
    theme: 'twitter',
    options: [
      { id: 1, text: 'Threads', isCorrect: false },
      { id: 2, text: 'Mastodon', isCorrect: false },
      { id: 3, text: 'Twitter (X)', isCorrect: true },
      { id: 4, text: 'Bluesky', isCorrect: false },
    ],
  },
  {
    id: 6,
    question: 'Which short-form video app is this?',
    theme: 'tiktok',
    options: [
      { id: 1, text: 'Instagram Reels', isCorrect: false },
      { id: 2, text: 'YouTube Shorts', isCorrect: false },
      { id: 3, text: 'TikTok', isCorrect: true },
      { id: 4, text: 'Snapchat Spotlight', isCorrect: false },
    ],
  },
  {
    id: 7,
    question: 'Identify this messaging application',
    theme: 'whatsapp',
    options: [
      { id: 1, text: 'Telegram', isCorrect: false },
      { id: 2, text: 'Signal', isCorrect: false },
      { id: 3, text: 'WhatsApp', isCorrect: true },
      { id: 4, text: 'Messenger', isCorrect: false },
    ],
  },
  {
    id: 8,
    question: 'Which community platform is this?',
    theme: 'discord',
    options: [
      { id: 1, text: 'Slack', isCorrect: false },
      { id: 2, text: 'Microsoft Teams', isCorrect: false },
      { id: 3, text: 'Discord', isCorrect: true },
      { id: 4, text: 'Guilded', isCorrect: false },
    ],
  },
];

const STORAGE_KEYS = {
  PLAYER_NAME: 'guessTheApp_playerName',
  BEST_SCORE: 'guessTheApp_bestScore',
  SOUND_ENABLED: 'guessTheApp_soundEnabled',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('nameEntry');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  // Load saved data on mount
  useEffect(() => {
    const savedName = localStorage.getItem(STORAGE_KEYS.PLAYER_NAME);
    const savedBestScore = localStorage.getItem(STORAGE_KEYS.BEST_SCORE);
    const savedSoundEnabled = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);

    if (savedName) {
      setPlayerName(savedName);
      setCurrentScreen('start');
    }
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
    if (savedSoundEnabled !== null) {
      const enabled = savedSoundEnabled === 'true';
      setSoundEnabled(enabled);
      soundManager.setEnabled(enabled);
    }
  }, []);

  // Load confetti library
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    localStorage.setItem(STORAGE_KEYS.PLAYER_NAME, name);
    soundManager.playClick();
    setCurrentScreen('start');
  };

  const handleStart = () => {
    // Shuffle questions and their options
    const shuffled = shuffleArray(allQuestions).map(question => ({
      ...question,
      options: shuffleArray(question.options).map((opt, idx) => ({
        ...opt,
        id: idx + 1 // Re-index to maintain sequential numbering
      }))
    }));
    setShuffledQuestions(shuffled);
    setCurrentScreen('question');
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswer = (correct: boolean) => {
    setIsCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setCurrentScreen('result');
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentScreen('question');
    } else {
      // Game completed - update best score if needed
      if (score + (isCorrect ? 1 : 0) > bestScore) {
        const newBestScore = score + (isCorrect ? 1 : 0);
        setBestScore(newBestScore);
        localStorage.setItem(STORAGE_KEYS.BEST_SCORE, newBestScore.toString());
      }
      setCurrentScreen('thankyou');
    }
  };

  const handleRetry = () => {
    setCurrentScreen('question');
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentScreen('start');
  };

  const handleToggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundManager.setEnabled(newState);
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, newState.toString());
    if (newState) {
      soundManager.playClick();
    }
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const finalScore = currentScreen === 'thankyou' ? score : 0;
  const totalQuestions = allQuestions.length;

  return (
    <div className="max-w-md mx-auto bg-gray-900 min-h-screen">
      {currentScreen === 'nameEntry' && (
        <NameEntry onSubmit={handleNameSubmit} />
      )}

      {currentScreen === 'start' && (
        <StartScreen
          playerName={playerName}
          bestScore={bestScore}
          totalQuestions={totalQuestions}
          soundEnabled={soundEnabled}
          onStart={handleStart}
          onToggleSound={handleToggleSound}
        />
      )}
      
      {currentScreen === 'question' && currentQuestion && (
        <QuestionScreen
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          question={currentQuestion.question}
          options={currentQuestion.options}
          theme={currentQuestion.theme}
          onAnswer={handleAnswer}
        />
      )}
      
      {currentScreen === 'result' && (
        <ResultScreen
          isCorrect={isCorrect}
          onNext={handleNext}
          onRetry={handleRetry}
        />
      )}
      
      {currentScreen === 'thankyou' && (
        <ThankYouScreen
          playerName={playerName}
          score={finalScore}
          totalQuestions={totalQuestions}
          bestScore={bestScore}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
