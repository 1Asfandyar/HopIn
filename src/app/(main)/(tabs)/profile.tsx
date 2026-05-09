import { useState } from 'react';
import { Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { USER_ROLE_LABELS, USER_ROLES, type UserRole } from '@/constants/roles';
import { useAuthStore } from '@/store/auth.store';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedCard from '@/theme/components/ThemedCard';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import { showFeedback } from '@/utils/errors';

const Profile = () => {
  const user = useAuthStore(state => state.user);
  const updateUserRole = useAuthStore(state => state.updateUserRole);
  const [isSwitchingRole, setSwitchingRole] = useState(false);
  const role = user?.role ?? USER_ROLES.rider;

  const switchRole = async (nextRole: UserRole) => {
    if (nextRole === role || isSwitchingRole) {
      return;
    }

    setSwitchingRole(true);

    try {
      await updateUserRole(nextRole);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to switch role.';
      showFeedback('Role switch failed', message);
    } finally {
      setSwitchingRole(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-5 pt-4">
      <View className="items-center py-6">
        <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-light-blue">
          {user?.photoUrl ? (
            <Image
              source={{ uri: user.photoUrl }}
              className="h-full w-full"
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="person" size={48} color={themeColors.primary} />
          )}
        </View>
        <ThemedText weight="semiBold" size="2xl" className="text-gray-900 mt-4">
          {user?.fullName ?? 'Hopin User'}
        </ThemedText>
        <ThemedText className="text-gray-500">
          {USER_ROLE_LABELS[role]} · Email verified
        </ThemedText>
      </View>

      <ThemedText weight="semiBold" size="lg" className="text-gray-900 mb-3">
        Role
      </ThemedText>
      <View className="flex-row gap-3">
        <View className="flex-1">
          <ThemedButton
            title="Driver"
            variant={role === USER_ROLES.driver ? 'primary' : 'outline'}
            loading={isSwitchingRole && role !== USER_ROLES.driver}
            disabled={isSwitchingRole}
            onPress={() => switchRole(USER_ROLES.driver)}
            leftIcon="car-outline"
          />
        </View>
        <View className="flex-1">
          <ThemedButton
            title="Rider"
            variant={role === USER_ROLES.rider ? 'primary' : 'outline'}
            loading={isSwitchingRole && role !== USER_ROLES.rider}
            disabled={isSwitchingRole}
            onPress={() => switchRole(USER_ROLES.rider)}
            leftIcon="person-outline"
          />
        </View>
      </View>

      <View className="mt-6">
        <ThemedCard
          heading="Saved Places"
          subHeading="Home · Office · University"
          variant="outline"
          leftIcon="location-outline"
          containerClassName="min-h-0"
        />
      </View>
      <View className="mt-3">
        <ThemedCard
          heading="Help & Support"
          subHeading="Get help with rides and account settings."
          variant="outline"
          leftIcon="help-circle-outline"
          containerClassName="min-h-0"
        />
      </View>
    </View>
  );
};

export default Profile;
