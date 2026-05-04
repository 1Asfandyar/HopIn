import { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import type { MainMenuProps } from '@/types/types';

const DRAWER_WIDTH = 280;

const MainMenu = ({
  visible,
  isLoggingOut,
  onClose,
  onLogout,
}: MainMenuProps) => {
  const [shouldRender, setShouldRender] = useState(visible);
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start();
      return;
    }

    Animated.timing(translateX, {
      toValue: -DRAWER_WIDTH,
      duration: 180,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setShouldRender(false);
      }
    });
  }, [translateX, visible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Modal
      visible={shouldRender}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1">
        <Pressable className="absolute inset-0 bg-black/40" onPress={onClose} />
        <Animated.View
          className="h-full w-[280px] rounded-r-[18px] bg-white pt-14 shadow-lg"
          style={{ transform: [{ translateX }] }}
        >
          <View className="h-1 w-9 self-center rounded-full bg-gray-200" />
          <View className="px-4 pt-4">
            <Pressable
              className={`flex-row items-center rounded-xl px-4 py-4 ${
                isLoggingOut ? 'opacity-60' : ''
              }`}
              disabled={isLoggingOut}
              onPress={onLogout}
            >
              <Ionicons
                name="log-out-outline"
                size={22}
                color={themeColors.gray900}
              />
              <ThemedText weight="semiBold" className="text-gray-900 ml-3">
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </ThemedText>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default MainMenu;
