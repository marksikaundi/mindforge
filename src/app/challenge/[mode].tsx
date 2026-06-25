import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Brand, GAME_MODES, QUESTIONS, type GameModeId } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ChallengeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { mode } = useLocalSearchParams<{ mode: string }>();
  const modeId = (mode ?? 'logical-fallacies') as GameModeId;
  const gameMode = GAME_MODES.find((m) => m.id === modeId);
  const questions = QUESTIONS.filter((q) => q.modeId === modeId);
  const question = questions[0] ?? QUESTIONS[0];

  const [questionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSubmit = () => {
    router.push({
      pathname: '/feedback',
      params: {
        correct: selectedIndex === question.correctIndex ? '1' : '0',
        correctIndex: question.correctIndex.toString(),
        selectedIndex: selectedIndex?.toString() ?? '0',
        explanation: question.explanation,
        xp: question.xpReward.toString(),
        answer: question.options[question.correctIndex],
        mode: modeId,
      },
    });
  };

  const handleSkip = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader
        title={gameMode?.title ?? 'Challenge'}
        showBack
        onBackPress={() => router.back()}
      />

      <View style={styles.content}>
        <ProgressBar
          current={questionIndex + 1}
          max={10}
          color={gameMode?.color ?? Brand.primary}
          label={`Question ${questionIndex + 1} of 10`}
          showLabel
        />

        <Card style={styles.questionCard}>
          <ThemedText type="small" themeColor="textSecondary">
            {gameMode?.title}
          </ThemedText>
          <ThemedText style={styles.scenario}>{question.scenario}</ThemedText>
          <ThemedText style={styles.questionText}>{question.question}</ThemedText>
        </Card>

        <View style={styles.options}>
          {question.options.map((option, index) => {
            const isSelected = selectedIndex === index;
            return (
              <Pressable
                key={option}
                onPress={() => setSelectedIndex(index)}
                style={[
                  styles.option,
                  { backgroundColor: theme.backgroundElement },
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

        <View style={styles.footer}>
          <Button title="SKIP" variant="outline" onPress={handleSkip} style={styles.footerBtn} />
          <Button
            title="SUBMIT"
            onPress={handleSubmit}
            disabled={selectedIndex === null}
            style={styles.footerBtn}
          />
        </View>
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
  questionCard: {
    gap: Spacing.two,
  },
  scenario: {
    fontSize: 15,
    lineHeight: 24,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
  },
  options: {
    flex: 1,
    gap: Spacing.two,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(108, 92, 231, 0.15)',
    textAlign: 'center',
    lineHeight: 32,
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
    fontSize: 15,
  },
  footer: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  footerBtn: {
    flex: 1,
  },
});
