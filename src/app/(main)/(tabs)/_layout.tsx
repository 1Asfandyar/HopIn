import { useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { themeColors } from '@/theme/tokens';
import AppHeader from '@/theme/components/AppHeader';
import MainMenu from '@/features/menu/components/MainMenu';
import { useAuthStore } from '@/store/auth.store';

const MainTabsLayout = () => {
  const router = useRouter();
  const logout = useAuthStore(state => state.logout);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setLoggingOut] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await logout();
      closeMenu();
      router.replace('/');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: themeColors.primary,
          tabBarInactiveTintColor: themeColors.gray300,
          tabBarStyle: {
            backgroundColor: themeColors.white,
            borderTopWidth: 0,
          },
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
                onLeftPress={openMenu}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="rides"
          options={{
            tabBarLabel: 'My Rides',
            tabBarIcon: ({ color }) => (
              <Ionicons name="car" size={24} color={color} />
            ),
            header: () => (
              <AppHeader
                title="My Rides"
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
      <MainMenu
        visible={isMenuOpen}
        isLoggingOut={isLoggingOut}
        onClose={closeMenu}
        onLogout={handleLogout}
      />
    </>
  );
};

export default MainTabsLayout;
