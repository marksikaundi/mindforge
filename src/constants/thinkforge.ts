export const Brand = {
  name: 'THINKFORGE',
  tagline: 'Critical Thinking. Sharpened.',
  primary: '#6C5CE7',
  primaryDark: '#5A4BD1',
  accent: '#00CEC9',
  gold: '#FDCB6E',
  success: '#00B894',
  error: '#E17055',
  warning: '#F39C12',
} as const;

export type GameModeId =
  | 'logical-fallacies'
  | 'detective-cases'
  | 'ethical-dilemmas'
  | 'fake-news'
  | 'escape-room'
  | 'ai-challenges';

export type GameMode = {
  id: GameModeId;
  title: string;
  description: string;
  icon: { ios: string; android: string; web: string };
  color: string;
  totalLevels: number;
  completedLevels: number;
};

export const GAME_MODES: GameMode[] = [
  {
    id: 'logical-fallacies',
    title: 'Logical Fallacies',
    description: 'Identify flaws in arguments',
    icon: { ios: 'exclamationmark.triangle', android: 'warning', web: 'warning' },
    color: '#6C5CE7',
    totalLevels: 50,
    completedLevels: 12,
  },
  {
    id: 'detective-cases',
    title: 'Detective Cases',
    description: 'Solve mysteries with clues',
    icon: { ios: 'magnifyingglass', android: 'search', web: 'search' },
    color: '#0984E3',
    totalLevels: 30,
    completedLevels: 8,
  },
  {
    id: 'ethical-dilemmas',
    title: 'Ethical Dilemmas',
    description: 'Navigate moral gray areas',
    icon: { ios: 'scale.3d', android: 'balance', web: 'balance' },
    color: '#00B894',
    totalLevels: 40,
    completedLevels: 5,
  },
  {
    id: 'fake-news',
    title: 'Fake News',
    description: 'Spot misinformation',
    icon: { ios: 'newspaper', android: 'article', web: 'article' },
    color: '#E17055',
    totalLevels: 35,
    completedLevels: 15,
  },
  {
    id: 'escape-room',
    title: 'Escape Room',
    description: 'Puzzle your way out',
    icon: { ios: 'lock.open', android: 'lock_open', web: 'lock_open' },
    color: '#FDCB6E',
    totalLevels: 20,
    completedLevels: 3,
  },
  {
    id: 'ai-challenges',
    title: 'AI Challenges',
    description: 'AI-generated cases',
    icon: { ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' },
    color: '#A29BFE',
    totalLevels: 100,
    completedLevels: 7,
  },
];

export type Question = {
  id: string;
  modeId: GameModeId;
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xpReward: number;
};

export const QUESTIONS: Question[] = [
  {
    id: 'lf-1',
    modeId: 'logical-fallacies',
    scenario:
      'A politician argues: "My opponent wants to raise taxes. Everyone who wants to raise taxes hates the middle class. Therefore, my opponent hates the middle class."',
    question: 'What type of fallacy is this?',
    options: [
      'Straw Man',
      'False Dilemma',
      'Affirming the Consequent',
      'Ad Hominem',
      'Slippery Slope',
    ],
    correctIndex: 0,
    explanation:
      'This is a Straw Man fallacy. The argument misrepresents the opponent\'s position by claiming they "hate the middle class" based on a distorted version of their tax policy stance.',
    xpReward: 25,
  },
  {
    id: 'lf-2',
    modeId: 'logical-fallacies',
    scenario:
      'A commercial states: "Nine out of ten dentists recommend our toothpaste. Therefore, our toothpaste is the best choice for dental health."',
    question: 'What type of fallacy is this?',
    options: [
      'Appeal to Authority',
      'Hasty Generalization',
      'Bandwagon',
      'Circular Reasoning',
      'Red Herring',
    ],
    correctIndex: 0,
    explanation:
      'This is an Appeal to Authority fallacy. While dentist recommendations carry weight, the ad doesn\'t provide evidence about why this specific toothpaste is superior.',
    xpReward: 25,
  },
  {
    id: 'lf-3',
    modeId: 'logical-fallacies',
    scenario:
      'Someone says: "You can\'t trust her opinion on climate change — she drives an SUV."',
    question: 'What type of fallacy is this?',
    options: [
      'Tu Quoque',
      'Ad Hominem',
      'Genetic Fallacy',
      'Appeal to Emotion',
      'False Cause',
    ],
    correctIndex: 1,
    explanation:
      'This is an Ad Hominem fallacy. The argument attacks the person\'s character (driving an SUV) rather than addressing the merits of their climate change argument.',
    xpReward: 25,
  },
];

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: { ios: string; android: string; web: string };
  progress: number;
  total: number;
  unlocked: boolean;
  unlockedAt?: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'logic-learner',
    title: 'Logic Learner',
    description: 'Solve 20 logical fallacies',
    icon: { ios: 'brain.head.profile', android: 'psychology', web: 'psychology' },
    progress: 12,
    total: 20,
    unlocked: false,
  },
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Maintain a 7-day streak',
    icon: { ios: 'flame', android: 'local_fire_department', web: 'local_fire_department' },
    progress: 7,
    total: 7,
    unlocked: true,
    unlockedAt: '2 days ago',
  },
  {
    id: 'battle-victor',
    title: 'Battle Victor',
    description: 'Win 10 multiplayer battles',
    icon: { ios: 'trophy', android: 'emoji_events', web: 'emoji_events' },
    progress: 6,
    total: 10,
    unlocked: false,
  },
  {
    id: 'detective',
    title: 'Master Detective',
    description: 'Complete 5 detective cases',
    icon: { ios: 'magnifyingglass', android: 'search', web: 'search' },
    progress: 3,
    total: 5,
    unlocked: false,
  },
  {
    id: 'truth-seeker',
    title: 'Truth Seeker',
    description: 'Identify 15 fake news articles',
    icon: { ios: 'newspaper', android: 'article', web: 'article' },
    progress: 15,
    total: 15,
    unlocked: true,
    unlockedAt: '1 week ago',
  },
  {
    id: 'level-10',
    title: 'Rising Mind',
    description: 'Reach level 10',
    icon: { ios: 'star', android: 'star', web: 'star' },
    progress: 10,
    total: 10,
    unlocked: true,
    unlockedAt: '3 days ago',
  },
];

export type LeaderboardEntry = {
  rank: number;
  username: string;
  xp: number;
  avatar: string;
  isCurrentUser?: boolean;
};

export const GLOBAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: 'MindMaster', xp: 15420, avatar: '🧠' },
  { rank: 2, username: 'LogicQueen', xp: 14890, avatar: '👑' },
  { rank: 3, username: 'ThinkTank', xp: 13200, avatar: '⚡' },
  { rank: 4, username: 'ReasonBot', xp: 12100, avatar: '🤖' },
  { rank: 5, username: 'SageMind', xp: 11500, avatar: '🦉' },
  { rank: 6, username: 'CritThink', xp: 10800, avatar: '💡' },
  { rank: 7, username: 'BrainWave', xp: 9900, avatar: '🌊' },
  { rank: 8, username: 'PuzzlePro', xp: 9200, avatar: '🧩' },
];

export const FRIENDS_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: 'Alex', xp: 8900, avatar: '🎯' },
  { rank: 2, username: 'Brainsmith', xp: 8200, avatar: '🔥', isCurrentUser: true },
  { rank: 3, username: 'Sam', xp: 7600, avatar: '🎮' },
  { rank: 4, username: 'Jordan', xp: 6800, avatar: '📚' },
];

export type ShopItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: { ios: string; android: string; web: string };
  category: 'rewards' | 'powerups' | 'themes';
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'xp-booster',
    title: 'XP Booster',
    description: '2x XP for 1 hour',
    price: 100,
    icon: { ios: 'bolt.fill', android: 'bolt', web: 'bolt' },
    category: 'powerups',
  },
  {
    id: 'hint-pack',
    title: 'Hint Pack',
    description: '5 hints for tough questions',
    price: 75,
    icon: { ios: 'lightbulb.fill', android: 'lightbulb', web: 'lightbulb' },
    category: 'powerups',
  },
  {
    id: 'skip-token',
    title: 'Skip Token',
    description: 'Skip one difficult question',
    price: 50,
    icon: { ios: 'forward.fill', android: 'skip_next', web: 'skip_next' },
    category: 'powerups',
  },
  {
    id: 'avatar',
    title: 'Exclusive Avatar',
    description: 'Unlock a unique avatar',
    price: 200,
    icon: { ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' },
    category: 'rewards',
  },
  {
    id: 'theme',
    title: 'Premium Theme',
    description: 'Dark purple theme',
    price: 150,
    icon: { ios: 'paintpalette.fill', android: 'palette', web: 'palette' },
    category: 'themes',
  },
];

export type AICase = {
  id: string;
  title: string;
  description: string;
  cluesFound: number;
  totalClues: number;
};

export const AI_CASES: AICase[] = [
  {
    id: 'mysterious-disappearance',
    title: 'The Mysterious Disappearance',
    description:
      'A renowned scientist vanishes from her locked laboratory. Security footage shows no one entering or leaving, yet she\'s gone without a trace. Three colleagues had access, but each claims an alibi.',
    cluesFound: 3,
    totalClues: 8,
  },
];

export function xpForLevel(level: number): number {
  return level * 1500;
}

export function levelFromXp(xp: number): number {
  let level = 1;
  let threshold = 1500;
  let remaining = xp;
  while (remaining >= threshold) {
    remaining -= threshold;
    level += 1;
    threshold = level * 1500;
  }
  return level;
}

export function xpProgressInLevel(xp: number): { current: number; max: number; level: number } {
  const level = levelFromXp(xp);
  let spent = 0;
  for (let l = 1; l < level; l++) {
    spent += l * 1500;
  }
  const current = xp - spent;
  const max = level * 1500;
  return { current, max, level };
}
