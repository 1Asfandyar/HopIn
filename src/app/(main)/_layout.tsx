import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { themeColors } from '@/theme/tokens';

const MainLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: themeColors.white,
        },
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
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          tabBarLabel: 'Rides',
          tabBarIcon: ({ color }) => (
            <Ionicons name="car" size={24} color={color} />
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
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
