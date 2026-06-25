import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { xpProgressInLevel } from '@/constants/thinkforge';

type UserState = {
  username: string;
  avatar: string;
  xp: number;
  coins: number;
  streak: number;
  challengesCompleted: number;
  winRate: number;
  isGuest: boolean;
  isOnboarded: boolean;
};

type UserContextValue = UserState & {
  level: number;
  xpCurrent: number;
  xpMax: number;
  addXp: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  completeOnboarding: (asGuest?: boolean) => void;
  login: (username: string) => void;
};

const defaultState: UserState = {
  username: 'Brainsmith',
  avatar: '🔥',
  xp: 18200,
  coins: 250,
  streak: 15,
  challengesCompleted: 68,
  winRate: 72,
  isGuest: false,
  isOnboarded: false,
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserState>(defaultState);

  const { current: xpCurrent, max: xpMax, level } = xpProgressInLevel(state.xp);

  const addXp = useCallback((amount: number) => {
    setState((prev) => ({ ...prev, xp: prev.xp + amount }));
  }, []);

  const spendCoins = useCallback((amount: number) => {
    let success = false;
    setState((prev) => {
      if (prev.coins < amount) return prev;
      success = true;
      return { ...prev, coins: prev.coins - amount };
    });
    return success;
  }, []);

  const completeOnboarding = useCallback((asGuest = false) => {
    setState((prev) => ({ ...prev, isOnboarded: true, isGuest: asGuest }));
  }, []);

  const login = useCallback((username: string) => {
    setState((prev) => ({
      ...prev,
      username,
      isOnboarded: true,
      isGuest: false,
    }));
  }, []);

  const value = useMemo<UserContextValue>(
    () => ({
      ...state,
      level,
      xpCurrent,
      xpMax,
      addXp,
      spendCoins,
      completeOnboarding,
      login,
    }),
    [state, level, xpCurrent, xpMax, addXp, spendCoins, completeOnboarding, login],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
