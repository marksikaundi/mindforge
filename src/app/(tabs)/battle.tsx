import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Brand, QUESTIONS } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/context/user-context';
import { useTheme } from '@/hooks/use-theme';

export default function BattleScreen() {
  const theme = useTheme();
  const user = useUser();
  const [timer, setTimer] = useState(45);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [myScore, setMyScore] = useState(120);
  const [opponentScore, setOpponentScore] = useState(90);
  const question = QUESTIONS[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (selectedIndex === question.correctIndex) {
      setMyScore((s) => s + 30);
    }
    setOpponentScore((s) => s + 20);
    setSelectedIndex(null);
    setTimer(45);
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title="Battle" />

      <View style={styles.content}>
        <View style={styles.timerRow}>
          <ThemedText style={styles.timer}>
            {Math.floor(timer / 60)
              .toString()
              .padStart(2, '0')}
            :{(timer % 60).toString().padStart(2, '0')}
          </ThemedText>
        </View>

        <Card style={styles.scoreboard}>
          <View style={styles.playerCol}>
            <ThemedText style={styles.playerEmoji}>{user.avatar}</ThemedText>
            <ThemedText type="smallBold">You</ThemedText>
            <ThemedText style={[styles.score, { color: Brand.primary }]}>{myScore}</ThemedText>
          </View>
          <ThemedText style={styles.vs}>VS</ThemedText>
          <View style={styles.playerCol}>
            <ThemedText style={styles.playerEmoji}>🎯</ThemedText>
            <ThemedText type="smallBold">Alex</ThemedText>
            <ThemedText style={[styles.score, { color: Brand.error }]}>{opponentScore}</ThemedText>
          </View>
        </Card>

        <Card style={styles.questionCard}>
          <ThemedText type="small" themeColor="textSecondary">
            Question 3 of 5
          </ThemedText>
          <ThemedText style={styles.scenario}>{question.scenario}</ThemedText>
          <ThemedText style={styles.questionText}>{question.question}</ThemedText>

          <View style={styles.options}>
            {question.options.map((option, index) => {
              const isSelected = selectedIndex === index;
              return (
                <Pressable
                  key={option}
                  onPress={() => setSelectedIndex(index)}
                  style={[
                    styles.option,
                    { backgroundColor: theme.background },
                    isSelected && styles.optionSelected,
                  ]}>
                  <ThemedText style={[styles.optionLetter, isSelected && styles.optionLetterSelected]}>
                    {String.fromCharCode(65 + index)}
                  </ThemedText>
                  <ThemedText style={styles.optionText}>{option}</ThemedText>
                </Pressable>
              );
            })}
          </View>
        </Card>

        <Button
          title="CHOOSE AN ANSWER"
          onPress={handleSubmit}
          disabled={selectedIndex === null}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  timerRow: {
    alignItems: 'center',
  },
  timer: {
    fontSize: 32,
    fontWeight: '800',
    color: Brand.error,
    fontVariant: ['tabular-nums'],
  },
  scoreboard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Spacing.four,
  },
  playerCol: {
    alignItems: 'center',
    gap: 4,
  },
  playerEmoji: {
    fontSize: 32,
  },
  score: {
    fontSize: 28,
    fontWeight: '800',
  },
  vs: {
    fontSize: 18,
    fontWeight: '800',
    opacity: 0.4,
  },
  questionCard: {
    flex: 1,
    gap: Spacing.two,
  },
  scenario: {
    fontSize: 15,
    lineHeight: 22,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '700',
  },
  options: {
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: 12,
    gap: Spacing.two,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: Brand.primary,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(108, 92, 231, 0.15)',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '700',
    fontSize: 14,
    overflow: 'hidden',
  },
  optionLetterSelected: {
    backgroundColor: Brand.primary,
    color: '#FFFFFF',
  },
  optionText: {
    flex: 1,
    fontSize: 14,
  },
});
