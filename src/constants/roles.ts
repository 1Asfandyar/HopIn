export const USER_ROLES = {
  driver: 'driver',
  rider: 'rider',
} as const;

export const USER_ROLE_LABELS = {
  driver: 'Driver',
  rider: 'Rider',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
