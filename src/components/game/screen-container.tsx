import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackgroundOrbs } from '@/components/game/background-orbs';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ScreenContainerProps = {
  children: ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  padded?: boolean;
  ambient?: boolean;
};

export function ScreenContainer({
  children,
  scroll,
  style,
  padded = true,
  ambient = false,
}: ScreenContainerProps) {
  const theme = useTheme();
  const content = (
    <View style={[styles.inner, padded && styles.padded, style]}>{children}</View>
  );

  const body = (
    <>
      {ambient && <BackgroundOrbs />}
      {scroll ? (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        pointerEvents="none"
        style={[
          styles.topGlow,
          {
            experimental_backgroundImage: `linear-gradient(180deg, ${theme.accent}14 0%, transparent 100%)`,
          } as ViewStyle,
        ]}
      />
      {body}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 220,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  padded: {
    paddingHorizontal: Spacing.three,
  },
});
