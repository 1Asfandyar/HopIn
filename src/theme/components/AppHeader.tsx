import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themeColors } from '../tokens';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeaderProps } from '../types';
import ThemedText from './ThemedText';

const HeaderIconButton = ({
  icon,
  onPress,
}: {
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
}) => {
  if (!icon) {
    return <View style={styles.iconPlaceholder} />;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconButton,
        pressed ? styles.iconButtonPressed : null,
      ]}
    >
      <Ionicons name={icon} size={24} color={themeColors.gray900} />
    </Pressable>
  );
};

const AppHeader = ({
  title = '',
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
}: AppHeaderProps) => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftSlot}>
          <HeaderIconButton icon={leftIcon} onPress={onLeftPress} />
        </View>

        <View style={styles.titleSlot}>
          <ThemedText weight="semiBold" size="xl" style={styles.title}>
            {title}
          </ThemedText>
        </View>

        <View style={styles.rightSlot}>
          <HeaderIconButton icon={rightIcon} onPress={onRightPress} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 0,
  },
  container: {
    height: 56,
    backgroundColor: themeColors.white,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonPressed: {
    opacity: 0.65,
  },
  leftSlot: {
    width: 40,
    alignItems: 'flex-start',
  },
  titleSlot: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: themeColors.gray900,
  },
  rightSlot: {
    width: 40,
    alignItems: 'flex-end',
  },
});

export default AppHeader;
