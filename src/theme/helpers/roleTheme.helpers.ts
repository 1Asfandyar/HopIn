import { USER_ROLES, type UserRole } from '@/constants/roles';
import { themeColors } from '@/theme/tokens';

export const getRoleColorScheme = (role: UserRole): 'primary' | 'secondary' =>
  role === USER_ROLES.driver ? 'primary' : 'secondary';

export const getRoleTheme = (role: UserRole) => {
  const colorScheme = getRoleColorScheme(role);
  const isDriver = role === USER_ROLES.driver;

  return {
    colorScheme,
    color: isDriver ? themeColors.primary : themeColors.secondary,
    lightColor: isDriver
      ? themeColors.primaryLight
      : themeColors.secondaryLight,
  };
};
