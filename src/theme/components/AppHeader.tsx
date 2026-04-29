import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fontFamilies, themeColors } from '../tokens';
import { SafeAreaView } from 'react-native-safe-area-context';

type AppHeaderProps = {
  title?: string;
  leftIcon?: React.ComponentProps<typeof Ionicons>['name'];
  rightIcon?: React.ComponentProps<typeof Ionicons>['name'];
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

const HeaderIconButton = ({
  icon,
  onPress,
}: {
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
}) => {
  if (!icon) {
    return <View style={{ width: 40, height: 40 }} />;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.65 : 1,
      })}
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
    <SafeAreaView edges={['top']} style={{paddingTop: 0}}>
      <View
        style={{
          height: 56,
          backgroundColor: themeColors.white,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 40, alignItems: 'flex-start' }}>
          <HeaderIconButton icon={leftIcon} onPress={onLeftPress} />
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: fontFamilies.semiBold,
              fontSize: 20,
              color: themeColors.gray900,
            }}
          >
            {title}
          </Text>
        </View>

        <View style={{ width: 40, alignItems: 'flex-end' }}>
          <HeaderIconButton icon={rightIcon} onPress={onRightPress} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;
