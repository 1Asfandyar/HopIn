import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type MainTabName = 'home' | 'rides' | 'profile';

type MainTabConfig = {
  label: string;
  icon: ComponentProps<typeof Ionicons>['name'];
};

export const MAIN_TAB_CONFIG: Record<MainTabName, MainTabConfig> = {
  home: {
    label: 'Home',
    icon: 'home',
  },
  rides: {
    label: 'My Rides',
    icon: 'car',
  },
  profile: {
    label: 'Profile',
    icon: 'person',
  },
};

export const getMainTabConfig = (routeName: string) => {
  return MAIN_TAB_CONFIG[routeName as MainTabName];
};
