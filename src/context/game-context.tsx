import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type GameMode = 'puzzles' | 'logic' | 'analyze' | 'decisions';
export type Difficulty = 'easy' | 'medium' | 'hard';

export type Skills = {
  logic: number;
  analysis: number;
  problemSolving: number;
  decisionMaking: number;
};

export type GameState = {
  stars: number;
  flames: number;
  xp: number;
  level: number;
  xpToNextLevel: number;
  lives: number;
  skills: Skills;
  completedLevels: Record<string, number>;
  unlockedAchievements: string[];
  hasOnboarded: boolean;
  soundEnabled: boolean;
  musicEnabled: boolean;
  vibrationEnabled: boolean;
  darkMode: boolean;
  language: string;
  displayName: string;
  streakDays: number;
};

const DEFAULT_STATE: GameState = {
  stars: 1200,
  flames: 5,
  xp: 350,
  level: 5,
  xpToNextLevel: 500,
  lives: 3,
  skills: {
    logic: 70,
    analysis: 60,
    problemSolving: 80,
    decisionMaking: 65,
  },
  completedLevels: { 'puzzles-easy-1': 3 },
  unlockedAchievements: ['first-steps'],
  hasOnboarded: false,
  soundEnabled: true,
  musicEnabled: true,
  vibrationEnabled: true,
  darkMode: false,
  language: 'English',
  displayName: 'Alex',
  streakDays: 4,
};

type GameContextValue = GameState & {
  completeOnboarding: () => void;
  spendStars: (amount: number) => boolean;
  addStars: (amount: number) => void;
  useFlame: () => boolean;
  addXp: (amount: number) => void;
  completeLevel: (key: string, starsEarned: number) => void;
  unlockAchievement: (id: string) => void;
  updateSettings: (
    patch: Partial<
      Pick<GameState, 'soundEnabled' | 'musicEnabled' | 'vibrationEnabled' | 'darkMode' | 'language'>
    >,
  ) => void;
  resetLives: () => void;
  loseLife: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(DEFAULT_STATE);

  const completeOnboarding = useCallback(() => {
    setState((s) => ({ ...s, hasOnboarded: true }));
  }, []);

  const spendStars = useCallback((amount: number) => {
    let success = false;
    setState((s) => {
      if (s.stars < amount) return s;
      success = true;
      return { ...s, stars: s.stars - amount };
    });
    return success;
  }, []);

  const addStars = useCallback((amount: number) => {
    setState((s) => ({ ...s, stars: s.stars + amount }));
  }, []);

  const useFlame = useCallback(() => {
    let success = false;
    setState((s) => {
      if (s.flames <= 0) return s;
      success = true;
      return { ...s, flames: s.flames - 1 };
    });
    return success;
  }, []);

  const addXp = useCallback((amount: number) => {
    setState((s) => {
      let xp = s.xp + amount;
      let level = s.level;
      let xpToNextLevel = s.xpToNextLevel;
      while (xp >= xpToNextLevel) {
        xp -= xpToNextLevel;
        level += 1;
        xpToNextLevel = Math.round(xpToNextLevel * 1.2);
      }
      return { ...s, xp, level, xpToNextLevel };
    });
  }, []);

  const completeLevel = useCallback((key: string, starsEarned: number) => {
    setState((s) => ({
      ...s,
      completedLevels: {
        ...s.completedLevels,
        [key]: Math.max(s.completedLevels[key] ?? 0, starsEarned),
      },
    }));
  }, []);

  const unlockAchievement = useCallback((id: string) => {
    setState((s) => {
      if (s.unlockedAchievements.includes(id)) return s;
      return { ...s, unlockedAchievements: [...s.unlockedAchievements, id] };
    });
  }, []);

  const updateSettings = useCallback(
    (
      patch: Partial<
        Pick<GameState, 'soundEnabled' | 'musicEnabled' | 'vibrationEnabled' | 'darkMode' | 'language'>
      >,
    ) => {
      setState((s) => ({ ...s, ...patch }));
    },
    [],
  );

  const resetLives = useCallback(() => {
    setState((s) => ({ ...s, lives: 3 }));
  }, []);

  const loseLife = useCallback(() => {
    setState((s) => ({ ...s, lives: Math.max(0, s.lives - 1) }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      completeOnboarding,
      spendStars,
      addStars,
      useFlame,
      addXp,
      completeLevel,
      unlockAchievement,
      updateSettings,
      resetLives,
      loseLife,
    }),
    [
      state,
      completeOnboarding,
      spendStars,
      addStars,
      useFlame,
      addXp,
      completeLevel,
      unlockAchievement,
      updateSettings,
      resetLives,
      loseLife,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
