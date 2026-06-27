import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppIcon } from '@/components/ui/app-icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AI_CASES, Brand } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';

export default function CaseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const caseData = AI_CASES.find((c) => c.id === id) ?? AI_CASES[0];

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title="AI Case" showBack onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.imagePlaceholder}>
          <AppIcon
            icon={{ ios: 'photo', android: 'image', web: 'image' }}
            size={48}
            tintColor={Brand.primary}
          />
          <ThemedText type="small" themeColor="textSecondary">
            Scene illustration
          </ThemedText>
        </View>

        <ThemedText style={styles.title}>{caseData.title}</ThemedText>
        <ThemedText style={styles.description}>{caseData.description}</ThemedText>

        <Card style={styles.clueCard}>
          <ThemedText type="smallBold" style={styles.clueLabel}>
            Clues Found
          </ThemedText>
          <ProgressBar
            current={caseData.cluesFound}
            max={caseData.totalClues}
            showLabel
            color={Brand.accent}
          />
          <View style={styles.clueIcons}>
            {Array.from({ length: caseData.totalClues }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.clueDot,
                  i < caseData.cluesFound ? styles.clueFound : styles.clueMissing,
                ]}>
                <AppIcon
                  icon={{
                    ios: i < caseData.cluesFound ? 'magnifyingglass' : 'questionmark',
                    android: i < caseData.cluesFound ? 'search' : 'help',
                    web: i < caseData.cluesFound ? 'search' : 'help',
                  }}
                  size={16}
                  tintColor={i < caseData.cluesFound ? '#FFFFFF' : Brand.primary}
                />
              </View>
            ))}
          </View>
        </Card>

        <Button
          title="INVESTIGATE"
          onPress={() => router.push('/challenge/detective-cases')}
        />
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
  imagePlaceholder: {
    height: 180,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  clueCard: {
    gap: Spacing.three,
  },
  clueLabel: {
    color: Brand.accent,
    letterSpacing: 0.5,
  },
  clueIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  clueDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clueFound: {
    backgroundColor: Brand.accent,
  },
  clueMissing: {
    backgroundColor: 'rgba(108, 92, 231, 0.15)',
  },
});
