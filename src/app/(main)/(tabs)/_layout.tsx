import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { themeColors } from '@/theme/tokens';
import AppHeader from '@/theme/components/AppHeader';

const MainTabsLayout = () => {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.gray300,
        tabBarStyle: { backgroundColor: themeColors.white, borderTopWidth: 0 },
        headerShadowVisible: false,
        sceneStyle: {
          backgroundColor: themeColors.white,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          header: () => (
            <AppHeader
              title=""
              leftIcon="menu-outline"
              rightIcon="notifications-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          tabBarLabel: 'Rides',
          tabBarIcon: ({ color }) => (
            <Ionicons name="car" size={24} color={color} />
          ),
          header: () => (
            <AppHeader
              title="Ride History"
              leftIcon="arrow-back"
              onLeftPress={() => router.replace('/(main)/(tabs)/home')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
          header: () => (
            <AppHeader
              title="Profile"
              leftIcon="arrow-back"
              onLeftPress={() => router.replace('/(main)/(tabs)/home')}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default MainTabsLayout;
