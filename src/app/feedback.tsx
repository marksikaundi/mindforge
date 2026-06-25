import { SymbolView } from 'expo-symbols';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Brand } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/context/user-context';

export default function FeedbackScreen() {
  const router = useRouter();
  const user = useUser();
  const params = useLocalSearchParams<{
    correct: string;
    correctIndex: string;
    explanation: string;
    xp: string;
    answer: string;
    mode: string;
  }>();

  const isCorrect = params.correct === '1';
  const xp = parseInt(params.xp ?? '25', 10);

  const handleNext = () => {
    if (isCorrect) {
      user.addXp(xp);
    }
    router.replace(`/challenge/${params.mode ?? 'logical-fallacies'}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title="Result" showBack onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.resultHeader}>
          <SymbolView
            name={{
              ios: isCorrect ? 'checkmark.circle.fill' : 'xmark.circle.fill',
              android: isCorrect ? 'check_circle' : 'cancel',
              web: isCorrect ? 'check_circle' : 'cancel',
            }}
            size={64}
            tintColor={isCorrect ? Brand.success : Brand.error}
          />
          <ThemedText style={[styles.resultText, { color: isCorrect ? Brand.success : Brand.error }]}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </ThemedText>
        </View>

        {!isCorrect && (
          <Card style={styles.answerCard}>
            <ThemedText type="small" themeColor="textSecondary">
              Correct Answer
            </ThemedText>
            <ThemedText style={styles.answer}>{params.answer}</ThemedText>
          </Card>
        )}

        <Card style={styles.explanationCard}>
          <ThemedText type="smallBold" style={styles.explanationLabel}>
            Explanation
          </ThemedText>
          <ThemedText style={styles.explanation}>{params.explanation}</ThemedText>
        </Card>

        {isCorrect && (
          <View style={styles.xpRow}>
            <SymbolView
              name={{ ios: 'star.fill', android: 'star', web: 'star' }}
              size={24}
              tintColor={Brand.gold}
            />
            <ThemedText style={styles.xpText}>+{xp} XP</ThemedText>
          </View>
        )}

        <Button title="NEXT QUESTION" onPress={handleNext} variant={isCorrect ? 'success' : 'primary'} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: Spacing.three,
    gap: Spacing.three,
    paddingBottom: Spacing.six,
  },
  resultHeader: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.four,
  },
  resultText: {
    fontSize: 32,
    fontWeight: '800',
  },
  answerCard: {
    gap: Spacing.one,
    borderLeftWidth: 4,
    borderLeftColor: Brand.success,
  },
  answer: {
    fontSize: 18,
    fontWeight: '700',
  },
  explanationCard: {
    gap: Spacing.two,
  },
  explanationLabel: {
    color: Brand.primary,
  },
  explanation: {
    fontSize: 15,
    lineHeight: 24,
  },
  xpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  xpText: {
    fontSize: 24,
    fontWeight: '800',
    color: Brand.gold,
  },
});
