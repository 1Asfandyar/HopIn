import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import type { UserRole } from '@/constants/roles';

type RoleSelectionCardProps = {
  role: UserRole;
  title: string;
  description: string;
  buttonTitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected?: boolean;
  onPress: () => void;
};

const RoleSelectionCard = ({
  title,
  description,
  buttonTitle,
  icon,
  selected = false,
  onPress,
}: RoleSelectionCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress}>
      <View
        className={`mb-4 rounded-2xl border p-5 ${
          selected ? 'border-primary bg-light-blue' : 'border-gray-200 bg-white'
        }`}
      >
        <View className="flex-row items-center">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-white">
            <Ionicons name={icon} size={30} color={themeColors.primary} />
          </View>
          <View className="ml-4 flex-1">
            <ThemedText weight="semiBold" size="xl" className="text-gray-900">
              {title}
            </ThemedText>
            <ThemedText className="text-gray-500 mt-1">
              {description}
            </ThemedText>
          </View>
        </View>
        <ThemedButton
          title={buttonTitle}
          onPress={onPress}
          containerClassName="mt-5"
          rightIcon="arrow-forward"
        />
      </View>
    </TouchableOpacity>
  );
};

export default RoleSelectionCard;
