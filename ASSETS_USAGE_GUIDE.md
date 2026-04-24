# Hopin Image Assets - Complete Usage Guide

## 📦 Overview

All image resources for Hopin are provided as **React Native SVG components**. They're scalable, lightweight, and can be customized with colors and sizes.

**Total Assets Included:**
- 1 Logo (3 variants)
- 4 Character Illustrations
- 1 Car Illustration
- 3 Map/Location Illustrations
- 16 Icons

---

## 🎨 Asset Structure

```
src/assets/
├── logos/
│   └── HopinLogo.tsx          # Logo component
├── illustrations/
│   ├── CarIllustration.tsx    # Green car with passengers
│   ├── CharacterIllustrations.tsx  # User avatars
│   └── MapIllustration.tsx    # Maps & routes
├── icons/
│   └── HopinIcons.tsx         # All UI icons
└── index.ts                   # Export all assets
```

---

## 🏷️ Logo Component

### Usage

```tsx
import { HopinLogo } from "@/assets";

// Primary Logo (green with text)
<HopinLogo variant="primary" width={120} height={40} />

// Dark Logo (for dark backgrounds)
<HopinLogo variant="dark" width={120} height={40} />

// Icon Only (just the 'h' mark)
<HopinLogo variant="icon" width={48} height={48} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | "primary" \| "dark" \| "icon" | "primary" | Logo style |
| `width` | number | 120 | SVG width |
| `height` | number | 40 | SVG height |

### Use Cases
- **Primary:** App header, splash screen, marketing
- **Dark:** Dark mode backgrounds, buttons
- **Icon:** Favicon, tab bar icon, app icon base

---

## 🚗 Car Illustration

Green car with diverse passengers - perfect for hero sections and onboarding.

### Usage

```tsx
import { CarIllustration } from "@/assets";

// Default view (front 3/4)
<CarIllustration width={280} height={200} />

// Side view
<CarIllustration variant="side" width={280} height={200} />

// Front view
<CarIllustration variant="front" width={280} height={200} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | "default" \| "side" \| "front" | "default" | Car angle |
| `width` | number | 280 | SVG width |
| `height` | number | 200 | SVG height |

### Use Cases
- Splash screen hero image
- Onboarding screens
- Home page banner
- Empty state illustration

---

## 👥 Character Illustrations

Diverse avatar characters for user profiles and testimonials.

### Usage

```tsx
import { Character, MaleCharacter, FemaleCharacter } from "@/assets";

// Generic character (defaults to male)
<Character type="male" width={120} height={140} />
<Character type="female" width={120} height={140} />

// Specific avatars
<Character type="avatar1" width={100} height={100} />
<Character type="avatar2" width={100} height={100} />
<Character type="avatar3" width={100} height={100} />

// Direct imports
<MaleCharacter width={120} height={140} />
<FemaleCharacter width={120} height={140} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | "male" \| "female" \| "avatar1" \| "avatar2" \| "avatar3" | "male" | Character type |
| `width` | number | 120 | SVG width |
| `height` | number | 140 | SVG height |

### Character Types
- **Male:** Generic male character
- **Female:** Generic female character
- **Avatar1:** Young professional male (blue shirt)
- **Avatar2:** Young professional female (green dress)
- **Avatar3:** Diverse character (yellow shirt)

### Use Cases
- Driver profile pictures
- Passenger list
- User testimonials
- Team member profiles
- Onboarding illustrations

---

## 🗺️ Map & Location Illustrations

Route maps and location visualizations.

### Map Illustration

```tsx
import { MapIllustration } from "@/assets";

<MapIllustration width={300} height={250} />
```

Shows a simple map with:
- Grid-based road network
- Green areas (parks)
- Blue buildings (landmarks)
- Route line with start/end pins
- Distance/time info box

### Location Pin

```tsx
import { LocationPin } from "@/assets";

// Start location (green)
<LocationPin size={40} variant="start" />

// End location (red)
<LocationPin size={40} variant="end" />
```

### Route Illustration

```tsx
import { RouteIllustration } from "@/assets";

<RouteIllustration width={280} height={180} />
```

Shows route from A to B with:
- Road graphic
- Start and end markers
- Route details (distance, time, seats)

### Use Cases
- Route display screens
- Location selection
- Ride details cards
- Map integration placeholders

---

## 🎯 Icon Components

16 customizable icons for UI elements.

### Basic Usage

```tsx
import {
  LocationIcon,
  StarIcon,
  CarIcon,
  PeopleIcon,
  ClockIcon,
  PriceIcon,
  SeatIcon,
  PhoneIcon,
  ChatIcon,
  UserIcon,
  SearchIcon,
  PlusIcon,
  CheckIcon,
  CloseIcon,
  ArrowRightIcon,
} from "@/assets";

// Default size (24px), green color
<LocationIcon />

// Custom size and color
<StarIcon size={32} color="#FF86B6" />
<CarIcon size={20} color="#EF4444" />
```

### Icon Props (All Icons)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | number | 24 | SVG size (px) |
| `color` | string | "#16A34A" | Icon color |
| `strokeWidth` | number | 2 | Stroke width (outline icons) |

### Available Icons

| Icon | Component | Use Cases |
|------|-----------|-----------|
| 📍 | `LocationIcon` | Location pins, address fields |
| ⭐ | `StarIcon` | Ratings, favorites, full star |
| ☆ | `HalfStarIcon` | Half ratings (4.5 stars) |
| 🚗 | `CarIcon` | Car type selector, ride badge |
| 👥 | `PeopleIcon` | Passenger count, team size |
| 🕐 | `ClockIcon` | Time, schedule, duration |
| 💰 | `PriceIcon` | Cost, price, payment |
| 💺 | `SeatIcon` | Seats available, capacity |
| ☎️ | `PhoneIcon` | Call driver, contact |
| 💬 | `ChatIcon` | Messages, chat, communication |
| 👤 | `UserIcon` | Profile, account, user |
| 🔍 | `SearchIcon` | Search, find, filter |
| ➕ | `PlusIcon` | Add, create, new |
| ✓ | `CheckIcon` | Confirm, done, success |
| ✕ | `CloseIcon` | Close, cancel, delete |
| →️ | `ArrowRightIcon` | Navigation, next, go |

---

## 💡 Example Usage in Screens

### Home Screen with Car Illustration

```tsx
import { CarIllustration } from "@/assets";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Hero Section */}
      <View className="bg-light-blue p-4">
        <CarIllustration width={280} height={200} />
        <Text className="text-2xl font-bold text-center">
          Share a Ride. Save more.
        </Text>
      </View>

      {/* Rest of screen */}
    </View>
  );
}
```

### Ride Card with Icons

```tsx
import {
  StarIcon,
  ClockIcon,
  PriceIcon,
  SeatIcon,
  PhoneIcon,
  Character,
} from "@/assets";
import { View, Text, TouchableOpacity } from "react-native";

export default function RideCard() {
  return (
    <View className="bg-white rounded-md p-4 shadow-md">
      {/* Driver Info */}
      <View className="flex-row items-center mb-3">
        <Character type="avatar1" width={48} height={56} />
        <View className="flex-1 ml-3">
          <Text className="font-semibold">Rahul S.</Text>
          <View className="flex-row items-center">
            <StarIcon size={16} color="#FF86B6" />
            <Text className="text-sm ml-1">4.8 (125 reviews)</Text>
          </View>
        </View>
      </View>

      {/* Route Info */}
      <View className="bg-light-blue p-3 rounded-md mb-3">
        <Text className="font-semibold mb-1">Bangalore → Mysore</Text>
        <View className="flex-row items-center mb-1">
          <ClockIcon size={16} color="#16A34A" />
          <Text className="text-sm ml-2">May 25, 2024 | 08:00 AM</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <PriceIcon size={16} color="#16A34A" />
            <Text className="font-bold text-lg ml-2">₹450</Text>
          </View>
          <View className="flex-row items-center">
            <SeatIcon size={16} color="#16A34A" />
            <Text className="text-sm ml-2">2 seats</Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View className="flex-row gap-2">
        <TouchableOpacity className="flex-1 bg-primary rounded-md py-2 flex-row items-center justify-center">
          <ChatIcon size={16} color="white" />
          <Text className="text-white font-semibold ml-2">Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-primary rounded-md py-2 flex-row items-center justify-center">
          <PhoneIcon size={16} color="white" />
          <Text className="text-white font-semibold ml-2">Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

### Profile Screen with Avatar

```tsx
import { HopinLogo, Character } from "@/assets";
import { View, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="items-center mb-6">
        <HopinLogo variant="icon" width={60} height={60} />
        <Text className="text-2xl font-bold mt-4">My Profile</Text>
      </View>

      {/* Profile Avatar */}
      <View className="items-center mb-6">
        <Character type="avatar2" width={100} height={120} />
        <Text className="text-xl font-semibold mt-4">Sarah J.</Text>
        <Text className="text-gray-600">Member since 2023</Text>
      </View>

      {/* Rest of profile */}
    </View>
  );
}
```

---

## 🎨 Customization

### Change Colors Globally

```tsx
// All icons with custom color
<LocationIcon color="#EF4444" />
<StarIcon color="#14B8A6" />
<CarIcon color="#3B82F6" />
```

### Responsive Sizing

```tsx
import { useWindowDimensions } from "react-native";

export default function ResponsiveComponent() {
  const { width } = useWindowDimensions();
  const carWidth = width > 500 ? 350 : 280;

  return <CarIllustration width={carWidth} height={200} />;
}
```

---

## 📏 Recommended Sizes

### Logos
- App header: 40-80px height
- Splash screen: 80-120px height
- Icon/favicon: 48-64px

### Illustrations
- Hero section: 280-400px width
- Onboarding: 250-320px width
- Card preview: 200-250px width

### Characters
- Profile avatar: 48-64px
- Full profile: 100-140px
- Team list: 40-50px

### Icons
- Inline text: 16-18px
- Buttons: 20-24px
- Tab bar: 28-32px
- Feature icons: 32-48px

---

## 🚀 Performance Tips

1. **Use consistent sizes** - SVGs scale perfectly, no need for multiple versions
2. **Memoize components** - These are static, so memoization helps:
   ```tsx
   const MemoCarIllustration = React.memo(CarIllustration);
   ```
3. **Don't animate frequently** - SVGs handle static display best
4. **Color theming** - Use CSS variables or pass color props for dark mode

---

## 📝 Notes

- All components use `react-native-svg` - make sure it's installed
- Icons default to **green (#16A34A)** - change with `color` prop
- All SVGs are **responsive** - maintain aspect ratio by setting width OR height
- Characters and illustrations are **optimized for mobile** - clean and simple
- No external image files needed - everything is code-based SVG

---

## 🐛 Troubleshooting

### Icons not showing?
- Make sure `react-native-svg` is installed: `npm install react-native-svg`
- Check that the component is imported correctly from `@/assets`

### Colors not applying?
- Icons default to green. Pass `color` prop to change
- Make sure color is a valid hex code: `color="#FF00FF"`

### Size issues?
- Maintain aspect ratio: set width OR height, not both
- Use even numbers for crisp rendering: `size={24}` not `size={23.5}`

---

**All assets are production-ready and can be used immediately in your Hopin app!** 🎉
