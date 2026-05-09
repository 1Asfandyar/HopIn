import type { UserRole } from '@/constants/roles';
import { USER_ROLES } from '@/constants/roles';

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));

export const getEmailValidationMessage = (email: string) => {
  if (!normalizeEmail(email)) {
    return 'Email is required.';
  }

  if (!isValidEmail(email)) {
    return 'Please enter a valid email address.';
  }

  return null;
};

export const normalizeFullName = (name: string) =>
  name.trim().replace(/\s+/g, ' ');

export const getFullNameValidationMessage = (name: string) => {
  const normalizedName = normalizeFullName(name);

  if (!normalizedName) {
    return 'Please enter your full name.';
  }

  if (normalizedName.length < 2) {
    return 'Name must be at least 2 characters.';
  }

  if (/^\d+$/.test(normalizedName)) {
    return 'Please enter your full name.';
  }

  return null;
};

export const OTP_LENGTH = 6;

export const isValidOtp = (otp: string) =>
  new RegExp(`^\\d{${OTP_LENGTH}}$`).test(otp);

export const isUserRole = (role: string): role is UserRole =>
  role === USER_ROLES.driver || role === USER_ROLES.rider;
