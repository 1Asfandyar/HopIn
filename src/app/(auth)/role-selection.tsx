import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/constants/appRoutes';
import RoleSelectionScreen from '@/features/auth/screens/RoleSelectionScreen';
import { useOnboardingStore } from '@/store/onboarding.store';
import type { UserRole } from '@/constants/roles';

const RoleSelection = () => {
  const router = useRouter();
  const role = useOnboardingStore(state => state.role);
  const setRole = useOnboardingStore(state => state.setRole);

  const handleSelectRole = (nextRole: UserRole) => {
    setRole(nextRole);
    router.push(APP_ROUTES.auth.profilePhoto);
  };

  return (
    <RoleSelectionScreen selectedRole={role} onSelectRole={handleSelectRole} />
  );
};

export default RoleSelection;
