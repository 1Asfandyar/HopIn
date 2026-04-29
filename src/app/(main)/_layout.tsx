import { useCallback } from 'react';
import { BackHandler, Pressable } from 'react-native';
import { Tabs, useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { themeColors } from '@/theme/tokens';

const MainLayout = () => {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );

      return () => subscription.remove();
    }, []),
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: themeColors.white,
        },
        sceneStyle: {
          backgroundColor: themeColors.white,
        },
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.gray300,
        tabBarStyle: { backgroundColor: themeColors.white, borderTopWidth: 0 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          headerLeft: () => (
            <Pressable className="ml-4">
              <Ionicons
                name="menu-outline"
                size={24}
                color={themeColors.gray900}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable className="mr-4">
              <Ionicons
                name="notifications-outline"
                size={24}
                color={themeColors.gray900}
              />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          tabBarLabel: 'Rides',
          headerTitle: 'Ride History',
          tabBarIcon: ({ color }) => (
            <Ionicons name="car" size={24} color={color} />
          ),
          headerLeft: () => (
            <Pressable
              className="ml-4"
              onPress={() => router.replace('/(main)/home')}
            >
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={themeColors.gray900}
              />
            </Pressable>
          ),
          headerRight: () => null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          headerTitle: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
          headerLeft: () => (
            <Pressable
              className="ml-4"
              onPress={() => router.replace('/(main)/home')}
            >
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={themeColors.gray900}
              />
            </Pressable>
          ),
          headerRight: () => null,
        }}
      />
      <Tabs.Screen
        name="offer-ride"
        options={{
          href: null,
          headerTitle: 'Offer a Ride',
          tabBarStyle: { display: 'none' },
          headerLeft: () => (
            <Pressable className="ml-4" onPress={() => router.back()}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={themeColors.gray900}
              />
            </Pressable>
          ),
          headerRight: () => null,
        }}
      />
      <Tabs.Screen
        name="find-ride"
        options={{
          href: null,
          headerTitle: 'Find a Ride',
          tabBarStyle: { display: 'none' },
          headerLeft: () => (
            <Pressable className="ml-4" onPress={() => router.back()}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={themeColors.gray900}
              />
            </Pressable>
          ),
          headerRight: () => null,
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
