import { SymbolView, type SymbolViewProps } from 'expo-symbols';

export type PlatformIcon = {
  ios: string;
  android: string;
  web: string;
};

type AppIconProps = {
  icon: PlatformIcon;
  size?: number;
  tintColor?: string;
};

export function AppIcon({ icon, size = 24, tintColor }: AppIconProps) {
  return (
    <SymbolView
      name={icon as unknown as SymbolViewProps['name']}
      size={size}
      tintColor={tintColor}
    />
  );
}
