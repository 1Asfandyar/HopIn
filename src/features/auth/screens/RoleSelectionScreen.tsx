import { View } from 'react-native';
import AuthScaffold from '@/components/auth/AuthScaffold';
import RoleSelectionCard from '@/components/auth/RoleSelectionCard';
import ThemedText from '@/theme/components/ThemedText';
import { USER_ROLES, type UserRole } from '@/constants/roles';

type RoleSelectionScreenProps = {
  selectedRole: UserRole | null;
  onSelectRole: (role: UserRole) => void;
};

const RoleSelectionScreen = ({
  selectedRole,
  onSelectRole,
}: RoleSelectionScreenProps) => {
  return (
    <AuthScaffold
      title="How will you use Hopin?"
      subtitle="Pick your usual role. You can switch this later from Profile."
    >
      <View>
        <RoleSelectionCard
          role={USER_ROLES.driver}
          title="I am a Driver"
          description="I have a car and want to offer seats."
          buttonTitle="Continue as Driver"
          icon="car-outline"
          selected={selectedRole === USER_ROLES.driver}
          onPress={() => onSelectRole(USER_ROLES.driver)}
        />
        <RoleSelectionCard
          role={USER_ROLES.rider}
          title="I am a Rider"
          description="I need a ride and want to join."
          buttonTitle="Continue as Rider"
          icon="person-outline"
          selected={selectedRole === USER_ROLES.rider}
          onPress={() => onSelectRole(USER_ROLES.rider)}
        />
      </View>
      <ThemedText className="text-gray-500 text-center mt-2">
        You can switch your role anytime from Profile.
      </ThemedText>
    </AuthScaffold>
  );
};

export default RoleSelectionScreen;
