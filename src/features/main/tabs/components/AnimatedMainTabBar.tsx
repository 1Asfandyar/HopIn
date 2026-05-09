import { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  getMainTabConfig,
  type MainTabName,
} from '@/features/main/tabs/constants/mainTabs.constants';
import { themeColors } from '@/theme/tokens';

type AnimatedMainTabBarProps = BottomTabBarProps & {
  activeColor: string;
  activeLightColor: string;
};

type AnimatedTabItemProps = {
  route: BottomTabBarProps['state']['routes'][number];
  isFocused: boolean;
  activeColor: string;
  onPress: () => void;
  onLongPress: () => void;
};

const getCenteredRoutes = (props: BottomTabBarProps) => {
  const activeRoute = props.state.routes[props.state.index];
  const inactiveRoutes = props.state.routes.filter(
    route => route.key !== activeRoute.key,
  );

  return [inactiveRoutes[0], activeRoute, inactiveRoutes[1]].filter(Boolean);
};

const AnimatedTabItem = ({
  route,
  isFocused,
  activeColor,
  onPress,
  onLongPress,
}: AnimatedTabItemProps) => {
  const progress = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const config = getMainTabConfig(route.name) ?? {
    label: route.name,
    icon: 'ellipse-outline',
  };

  useEffect(() => {
    Animated.spring(progress, {
      toValue: isFocused ? 1 : 0,
      useNativeDriver: true,
      friction: 7,
      tension: 95,
    }).start();
  }, [isFocused, progress]);

  const animatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    opacity: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.74, 1],
    }),
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0],
        }),
      },
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1],
        }),
      },
    ],
  };
  const iconShellStyle = {
    backgroundColor: isFocused ? activeColor : themeColors.gray100,
    shadowOpacity: isFocused ? 0.16 : 0,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={config.label}
      className="min-w-0 flex-1 items-center"
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Animated.View style={[styles.tabItem, animatedStyle]}>
        <View
          className="items-center justify-center"
          style={[
            styles.iconShell,
            isFocused ? styles.activeIconShell : null,
            iconShellStyle,
          ]}
        >
          <Ionicons
            name={config.icon}
            size={isFocused ? 27 : 23}
            color={isFocused ? themeColors.white : themeColors.gray500}
          />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const AnimatedMainTabBar = ({
  state,
  descriptors,
  navigation,
  insets,
  activeColor,
}: AnimatedMainTabBarProps) => {
  const centeredRoutes = useMemo(
    () => getCenteredRoutes({ state, descriptors, navigation, insets }),
    [descriptors, insets, navigation, state],
  );

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        {
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      <View style={styles.bar}>
        {centeredRoutes.map(route => {
          const isFocused = state.routes[state.index].key === route.key;

          const handlePress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name as MainTabName);
            }
          };

          const handleLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <AnimatedTabItem
              key={route.key}
              route={route}
              isFocused={isFocused}
              activeColor={activeColor}
              onPress={handlePress}
              onLongPress={handleLongPress}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: themeColors.white,
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  bar: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 28,
    backgroundColor: themeColors.white,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: themeColors.black,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
  },
  iconShell: {
    height: 48,
    width: 48,
    borderRadius: 24,
    shadowColor: themeColors.black,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  activeIconShell: {
    height: 56,
    width: 56,
    borderRadius: 28,
  },
});

export default AnimatedMainTabBar;
