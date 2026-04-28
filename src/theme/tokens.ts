import { FontWeight } from './types';

export const themeColors = {
  primary: '#16A34A',
  primaryDark: '#158D1D',
  secondary: '#2563EB',
  lightBlue: '#EFFFF7',
  white: '#FFFFFF',
  black: '#000000',
  gray900: '#111827',
  gray700: '#374151',
  gray600: '#4B5563',
  gray500: '#8F8290',
  gray400: '#9CA3AF',
  gray300: '#D1D5DB',
  gray200: '#E5E7EB',
  gray100: '#F3F4F6',
} as const;

export const fontFamilies: Record<FontWeight, string> = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
};
