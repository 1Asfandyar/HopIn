# NativeWind Setup Guide for Hopin

## ✅ Installation Complete

NativeWind (Tailwind CSS for React Native) is now configured in your project.

### Configuration Files
- ✅ `tailwind.config.js` - Theme configuration
- ✅ `babel.config.js` - Babel + module alias configuration
- ✅ `metro.config.js` - Metro bundler configured

---

## 🎨 How to Use NativeWind

### Basic Usage with `className`

Instead of StyleSheet:
```tsx
// OLD - StyleSheet approach
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: #007AFF,
  }
})

// NEW - NativeWind approach
<View className="flex-1 px-4 bg-primary">
  {/* code */}
</View>
```

### Common Utility Classes

**Layout:**
- `flex`, `flex-1`, `flex-row`, `flex-col`
- `items-center`, `justify-center`, `justify-between`
- `gap-md`, `gap-lg` (spacing between items)

**Spacing:**
- `p-4` (padding), `px-4` (padding-x), `py-4` (padding-y)
- `m-4` (margin), `mx-auto` (margin-x auto)
- `pt-md`, `pb-lg` (top/bottom padding)

**Colors:**
- `bg-primary`, `bg-secondary`, `bg-surface`
- `text-text-primary`, `text-gray-600`
- `border-primary`

**Typography:**
- `text-base`, `text-lg`, `text-2xl`
- `font-bold`, `font-semibold`, `font-normal`
- `leading-6` (line height)

**Size & Borders:**
- `w-full`, `h-16`, `rounded-lg`
- `border-md` (border-radius)
- `shadow-md`, `shadow-lg`

---

## 📝 Examples

### Button Component
```tsx
import { TouchableOpacity, Text } from 'react-native'

export function Button({ children, variant = 'primary' }) {
  const variantStyles = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
  }
  
  return (
    <TouchableOpacity className={`rounded-lg px-4 py-3 ${variantStyles[variant]}`}>
      <Text className="text-white font-semibold text-center">
        {children}
      </Text>
    </TouchableOpacity>
  )
}
```

### Screen Component
```tsx
import { View } from 'react-native'

export function HomeScreen() {
  return (
    <View className="flex-1 bg-background px-4 py-md">
      <View className="gap-lg">
        {/* Content */}
      </View>
    </View>
  )
}
```

### Card Component
```tsx
<View className="bg-surface rounded-lg p-4 shadow-md mb-4">
  {/* Card content */}
</View>
```

---

## 🔄 Mixing StyleSheet and NativeWind

**You can use both together:**

```tsx
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  customStyle: {
    // Only for complex/dynamic styles
  }
})

<View className="flex-1 rounded-lg px-4" style={[styles.customStyle]}>
  {/* Works perfectly */}
</View>
```

---

## 📋 Color Reference (from tailwind.config.js)

```
bg-primary          → #16A34A
bg-primary-dark     → #158D1D
bg-secondary        → #2563EB
bg-light-blue       → #EFFFF7
text-gray-900       → #111827
text-gray-700       → #374151
text-gray-600       → #4B5563
text-gray-500       → #8F8290
border-gray-200     → #E5E7EB
```

---

## 📐 Spacing Reference

```
*-xs    → 4px
*-sm    → 8px
*-md    → 12px
*-base  → 16px
*-lg    → 24px
*-xl    → 32px
*-2xl   → 48px
```

---

## ✨ Benefits

✅ **Faster Development** - No need to create StyleSheet objects  
✅ **Consistency** - All values come from tailwind.config.js  
✅ **DRY** - No repeated style definitions  
✅ **Easy Refactoring** - Change theme values in one place  
✅ **Type-Safe** - VS Code provides autocomplete for class names  
✅ **Small Bundle** - Only used utilities are included

---

## 🚀 Next Steps

1. Keep screen routes in `src/app` and UI implementation in `src/features`
2. Reuse `src/theme/components` for shared button, input, and text primitives
3. Reference `tailwind.config.js` for project colors, spacing, radius, and fonts
4. Add feature-specific components under `src/features/<feature>/components` as screens grow

---

## 📚 Resources

- [NativeWind Docs](https://www.nativewind.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Available Utilities](https://www.nativewind.dev/react-native-utilities)
