import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type GradientSurfaceProps = {
  colors: [string, string];
  angle?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export function GradientSurface({ colors, angle = '145deg', style, children }: GradientSurfaceProps) {
  return (
    <View
      style={[
        style,
        {
          experimental_backgroundImage: `linear-gradient(${angle}, ${colors[0]}, ${colors[1]})`,
        } as ViewStyle,
      ]}>
      {children}
    </View>
  );
}

type GradientOverlayProps = {
  color: string;
  style?: ViewStyle;
};

/** Soft color wash on top of white cards */
export function GradientOverlay({ color, style }: GradientOverlayProps) {
  return (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        style,
        {
          experimental_backgroundImage: `linear-gradient(180deg, ${color}22 0%, transparent 55%)`,
        } as ViewStyle,
      ]}
    />
  );
}
