import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { BackHeader } from '@/components/game/back-header';
import { Card } from '@/components/game/card';
import { CategoryBadge } from '@/components/game/category-badge';
import { GameButton } from '@/components/game/game-button';
import { OptionButton } from '@/components/game/option-button';
import { ProgressBar } from '@/components/game/progress-bar';
import { QuestionPanel } from '@/components/game/question-panel';
import { ScreenContainer } from '@/components/game/screen-container';
import { ThemedText } from '@/components/themed-text';
import { MODE_COLORS, Spacing, Typography } from '@/constants/theme';
import { Difficulty, GameMode, useGame } from '@/context/game-context';
import { getQuestionByIndex, QUESTIONS_PER_LEVEL } from '@/data/questions';
import { useTheme } from '@/hooks/use-theme';

export default function GameplayScreen() {
  const { levelId, mode, difficulty, q } = useLocalSearchParams<{
    levelId: string;
    mode: string;
    difficulty: string;
    q?: string;
  }>();
  const router = useRouter();
  const theme = useTheme();
  const { lives } = useGame();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const gameMode = (mode ?? 'puzzles') as GameMode;
  const diff = (difficulty ?? 'easy') as Difficulty;
  const level = levelId === 'daily' ? 1 : parseInt(levelId ?? '1', 10);
  const questionNum = parseInt(q ?? '1', 10);
  const questionIndex = questionNum - 1;

  const question = getQuestionByIndex(gameMode, diff, level, questionIndex);
  const modeColor = MODE_COLORS[gameMode];
  const progress = (questionNum / QUESTIONS_PER_LEVEL) * 100;

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    setAnswered(true);
    const isCorrect = index === question.correctIndex;

    setTimeout(() => {
      if (isCorrect) {
        router.push({
          pathname: '/correct',
          params: {
            levelId: levelId ?? '1',
            mode: gameMode,
            difficulty: diff,
            question: String(questionNum),
            total: String(QUESTIONS_PER_LEVEL),
          },
        });
      } else {
        router.push({
          pathname: '/incorrect',
          params: {
            levelId: levelId ?? '1',
            mode: gameMode,
            difficulty: diff,
            explanation: question.explanation,
            question: String(questionNum),
          },
        });
      }
      setSelectedIndex(null);
      setAnswered(false);
    }, 400);
  };

  const handleSkip = () => {
    if (questionNum >= QUESTIONS_PER_LEVEL) {
      router.replace({
        pathname: '/level-complete',
        params: { levelId, mode: gameMode, difficulty: diff, score: '120', time: '01:32' },
      });
    } else {
      router.replace({
        pathname: '/gameplay/[levelId]',
        params: {
          levelId: levelId ?? '1',
          mode: gameMode,
          difficulty: diff,
          q: String(questionNum + 1),
        },
      });
    }
  };

  const openHint = () => {
    router.push({
      pathname: '/hint',
      params: { hint: question.hint, cost: '50' },
    });
  };

  return (
    <ScreenContainer ambient>
      <BackHeader
        title={levelId === 'daily' ? 'Daily Challenge' : `Level ${levelId}`}
        right={
          <View style={styles.lives}>
            {Array.from({ length: 3 }, (_, i) => (
              <SymbolView
                key={i}
                name={{ ios: 'heart.fill', android: 'favorite', web: 'favorite' }}
                size={16}
                tintColor={i < lives ? theme.error : theme.borderSubtle}
              />
            ))}
          </View>
        }
      />

      <View style={styles.meta}>
        <CategoryBadge mode={gameMode} size="sm" />
        <ThemedText themeColor="textSecondary" style={styles.difficulty}>
          {diff} · Q{questionNum}/{QUESTIONS_PER_LEVEL}
        </ThemedText>
      </View>

      <ProgressBar progress={progress} height={8} color={modeColor} />

      <Card style={styles.questionCard} accent={modeColor} variant="glass">
        <ThemedText style={styles.prompt}>{question.prompt}</ThemedText>
        <QuestionPanel visual={question.visual} />
      </Card>

      <ThemedText themeColor="textSecondary" style={styles.chooseLabel}>
        Select your answer
      </ThemedText>

      <View style={styles.options}>
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            index={index}
            label={option}
            selected={selectedIndex === index}
            onPress={() => handleAnswer(index)}
            disabled={answered}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <GameButton label="Hint" variant="outline" onPress={openHint} style={styles.footerBtn} />
        <GameButton label="Skip" variant="secondary" onPress={handleSkip} style={styles.footerBtn} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  lives: {
    flexDirection: 'row',
    gap: 4,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
    marginTop: Spacing.one,
  },
  difficulty: {
    ...Typography.caption,
    textTransform: 'capitalize',
  },
  questionCard: {
    marginTop: Spacing.three,
    marginBottom: Spacing.four,
    gap: Spacing.four,
  },
  prompt: {
    ...Typography.body,
    fontWeight: '600',
    lineHeight: 26,
  },
  chooseLabel: {
    ...Typography.label,
    marginBottom: Spacing.two,
  },
  options: {
    flex: 1,
    gap: Spacing.two,
  },
  footer: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },
  footerBtn: {
    flex: 1,
    minHeight: 46,
  },
});
