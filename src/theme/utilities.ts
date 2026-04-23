// NativeWind Utilities Quick Reference
// Use these className values throughout your app

export const utilities = {
  // Layout
  container: 'flex-1',
  row: 'flex-row',
  column: 'flex-col',
  center: 'items-center justify-center',
  between: 'justify-between',
  
  // Spacing (predefined in tailwind.config.js)
  spacingXS: 'gap-xs',
  spacingSM: 'gap-sm',
  spacingMD: 'gap-md',
  spacingLG: 'gap-lg',
  spacingXL: 'gap-xl',
  
  // Common Patterns
  screen: 'flex-1 bg-background',
  card: 'bg-surface rounded-lg p-4 shadow-md',
  button: 'rounded-lg px-4 py-3 items-center justify-center',
  input: 'border border-border rounded-md px-3 py-2 bg-surface',
  badge: 'rounded-full px-3 py-1',
  
  // Text
  heading1: 'text-3xl font-bold',
  heading2: 'text-2xl font-semibold',
  heading3: 'text-xl font-semibold',
  body: 'text-base font-normal',
  bodyStrong: 'text-base font-semibold',
  caption: 'text-xs font-normal',
  captionStrong: 'text-xs font-semibold',
  
  // Colors - Backgrounds
  bgPrimary: 'bg-primary',
  bgSecondary: 'bg-secondary',
  bgSuccess: 'bg-success',
  bgError: 'bg-error',
  bgWarning: 'bg-warning',
  bgSurface: 'bg-surface',
  bgBackground: 'bg-background',
  
  // Colors - Text
  textPrimary: 'text-text-primary',
  textSecondary: 'text-text-secondary',
  textTertiary: 'text-text-tertiary',
  
  // Shadows
  shadowSM: 'shadow-sm',
  shadowMD: 'shadow-md',
  shadowLG: 'shadow-lg',
  shadowXL: 'shadow-xl',
}

// Usage Example:
// import { utilities } from '@/theme/utilities'
// 
// <View className={utilities.screen}>
//   <Text className={utilities.heading1}>Title</Text>
// </View>
