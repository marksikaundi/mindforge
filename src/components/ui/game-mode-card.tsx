import { Pressable, StyleSheet, View } from 'react-native';

import { AppIcon } from '@/components/ui/app-icon';
import { ThemedText } from '@/components/themed-text';
import { Brand } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type GameModeIcon = {
  ios: string;
  android: string;
  web: string;
};

type GameModeCardProps = {
  title: string;
  description?: string;
  icon: GameModeIcon;
  color: string;
  completed?: number;
  total?: number;
  compact?: boolean;
  onPress: () => void;
};

export function GameModeCard({
  title,
  description,
  icon,
  color,
  completed,
  total,
  compact,
  onPress,
}: GameModeCardProps) {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
      <View style={[styles.card, compact && styles.compact, { backgroundColor: theme.backgroundElement }]}>
        <View style={[styles.iconWrap, { backgroundColor: `${color}22` }]}>
          <AppIcon icon={icon} size={compact ? 24 : 28} tintColor={color} />
        </View>
        <View style={styles.content}>
          <ThemedText style={[styles.title, compact && styles.compactTitle]}>{title}</ThemedText>
          {description && !compact && (
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
              {description}
            </ThemedText>
          )}
          {completed !== undefined && total !== undefined && (
            <View style={styles.progressRow}>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(completed / total) * 100}%`, backgroundColor: color },
                  ]}
                />
              </View>
              <ThemedText type="small" themeColor="textSecondary">
                {completed}/{total}
              </ThemedText>
            </View>
          )}
        </View>
        {!compact && (
          <AppIcon
            icon={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={16}
            tintColor={theme.textSecondary}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: 16,
    gap: Spacing.three,
  },
  compact: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: Spacing.two,
    minHeight: 100,
  },
  pressed: {
    opacity: 0.85,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  compactTitle: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: 4,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(108, 92, 231, 0.15)',
    borderRadius: 100,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 100,
  },
});
