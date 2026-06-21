import { GameMode } from '@/context/game-context';

export const GAME_MODES: { id: GameMode; label: string; emoji: string; description: string }[] = [
  { id: 'puzzles', label: 'Puzzles', emoji: '🧩', description: 'Spot visual patterns' },
  { id: 'logic', label: 'Logic', emoji: '🔢', description: 'Numbers & reasoning' },
  { id: 'analyze', label: 'Analyze', emoji: '🔍', description: 'Clues & inference' },
  { id: 'decisions', label: 'Decisions', emoji: '⚖️', description: 'Real-world choices' },
];

export const GAME_MODE_META: Record<GameMode, { label: string; emoji: string; description: string }> = {
  puzzles: { label: 'Puzzles', emoji: '🧩', description: 'Spot visual patterns and sequences' },
  logic: { label: 'Logic', emoji: '🔢', description: 'Number sequences and deductive reasoning' },
  analyze: { label: 'Analyze', emoji: '🔍', description: 'Read clues and draw conclusions' },
  decisions: { label: 'Decisions', emoji: '⚖️', description: 'Choose the best course of action' },
};

export const ONBOARDING_STEPS = [
  {
    emoji: '🧠',
    title: 'Welcome!',
    description: 'Train your brain with fun, focused challenges across four skill areas.',
  },
  {
    emoji: '🧩',
    title: 'Think Deep',
    description: 'Solve puzzles, analyze clues, apply logic, and make smart decisions.',
  },
  {
    emoji: '🏆',
    title: 'Get Better',
    description: 'Track your skills, earn stars, and climb the leaderboard.',
  },
];

export const LEADERBOARD = [
  { rank: 1, name: 'Alex M.', score: 2450, avatar: '🦊' },
  { rank: 2, name: 'Jordan K.', score: 2280, avatar: '🐼' },
  { rank: 3, name: 'Sam R.', score: 2100, avatar: '🦁' },
  { rank: 4, name: 'You', score: 1950, avatar: '👤', isUser: true },
  { rank: 5, name: 'Taylor B.', score: 1820, avatar: '🐯' },
  { rank: 6, name: 'Casey L.', score: 1750, avatar: '🐸' },
];

export const STORE_POWERUPS = [
  { id: 'hint', name: 'Extra Hint', price: 100, emoji: '💡' },
  { id: 'remove', name: 'Remove Two', price: 150, emoji: '❌' },
  { id: 'skip', name: 'Skip Level', price: 200, emoji: '⏭️' },
];

export const STORE_THEMES = [
  { id: 'classic', name: 'Classic', price: 0, color: '#FFFFFF' },
  { id: 'ocean', name: 'Ocean', price: 300, color: '#4FC3F7' },
  { id: 'forest', name: 'Forest', price: 300, color: '#66BB6A' },
  { id: 'sunset', name: 'Sunset', price: 500, color: '#FF7043' },
];

export type Achievement = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  progress?: number;
  total?: number;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first level',
    emoji: '🎯',
  },
  {
    id: 'problem-solver',
    title: 'Problem Solver',
    description: 'Solve 50 puzzles',
    emoji: '🧩',
    progress: 30,
    total: 50,
  },
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Win 10 levels in a row',
    emoji: '🔥',
    progress: 7,
    total: 10,
  },
  {
    id: 'star-collector',
    title: 'Star Collector',
    description: 'Earn 5000 stars',
    emoji: '⭐',
    progress: 1200,
    total: 5000,
  },
];
