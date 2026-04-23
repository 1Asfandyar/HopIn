# Salah Tracker - React Native App

A modern, scalable React Native application for tracking Islamic prayers (Salah) built with Expo, featuring clean architecture, NativeWind (Tailwind CSS), and best practices from Obytes.

## 📱 Features

- ✨ **Clean Architecture** - Organized folders with clear separation of concerns
- 🎨 **NativeWind/Tailwind CSS** - Utility-first styling approach
- 🔐 **Type-Safe** - Full TypeScript support
- 🗂️ **File-based Routing** - Expo Router with organized groups
- ⚙️ **State Management** - Zustand for global state
- 🔌 **API Integration** - Centralized service layer
- 🎯 **Custom Hooks** - Pre-built hooks for common functionality
- 💾 **Storage** - AsyncStorage integration
- 🚀 **Production Ready** - Optimized for performance

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React Native** | Mobile development framework |
| **Expo** | Development platform & EAS builds |
| **Expo Router** | File-based routing (v6) |
| **NativeWind** | Tailwind CSS for React Native |
| **TypeScript** | Type safety |
| **Zustand** | State management |
| **AsyncStorage** | Persistent storage |
| **React Navigation** | Navigation primitives |
| **Babel** | Module resolution with path aliases |

---

## 📁 Project Structure

```
src/
├── app/                          # Expo Router navigation
│   ├── _layout.tsx              # Root layout (imports global.css)
│   ├── index.tsx                # Entry point - Main dashboard
│   ├── auth/                    # Auth stack - Login/Register/etc
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   └── tabs/                    # Tab navigation - Main features
│       ├── _layout.tsx
│       ├── today.tsx            # Today's prayers
│       ├── schedule.tsx         # Prayer schedule
│       ├── statistics.tsx       # Prayer statistics
│       └── settings.tsx         # Settings
│
├── components/                  # Reusable components
│   ├── ui/                      # Generic UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── TimePicker.tsx
│   │   └── Text.tsx
│   ├── layout/                  # Layout components
│   │   ├── Screen.tsx
│   │   ├── Header.tsx
│   │   └── TabBar.tsx
│   └── features/                # Feature-specific components
│       ├── auth/                # Auth-related components
│       ├── home/                # Dashboard components
│       └── menu/                # Menu/settings components
│       └── menu/
│
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts
│   ├── useTheme.ts
│   ├── useAppState.ts
│   └── index.ts
│
├── store/                       # Zustand state stores
│   ├── authStore.ts             # Authentication state
│   ├── salahStore.ts            # Prayer tracking state
│   ├── userStore.ts             # User preferences
│   └── index.ts
│
├── services/                    # API & external services
│   ├── api.ts                   # API client
│   ├── salah.service.ts         # Prayer times & tracking
│   ├── auth.service.ts
│   └── user.service.ts
│
├── theme/                       # Design tokens & styling
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── utilities.ts             # NativeWind utilities
│   └── index.ts
│
├── types/                       # TypeScript types
│   ├── auth.types.ts
│   ├── navigation.types.ts
│   └── index.ts
│
├── utils/                       # Utility functions
│   ├── storage.ts               # LocalStorage helpers
│   ├── validators.ts
│   └── formatters.ts
│
└── assets/                      # Static assets
    ├── fonts/
    ├── images/
    └── icons/
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16+ (with npm or yarn)
- **Expo CLI** (optional, but recommended)
- **iOS Simulator** or **Android Emulator** (or physical device)

### Installation

1. **Clone the repository**
```salah-tracker
git clone <repository-url>
cd hopin
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the development server**
```bash
npm start
# or
yarn start
```

### Running on Different Platforms

**iOS Simulator**
```bash
npm run ios
```

**Android Emulator**
```bash
npm run android
```

**Web Browser**
```bash
npm run web
```

**Physical Device**
- Scan QR code with Expo app (iOS) or with your device camera (Android)

---

## 📐 Architecture & Patterns

### Folder Organization (Obytes Pattern)

- **`app/`** - Expo Router pages (routes)
- **`components/`** - Reusable & feature-specific components
- **`hooks/`** - Custom React hooks for logic
- **`store/`** - Global state (Zustand)
- **`services/`** - API calls & external integrations
- **`theme/`** - Design tokens & styling utilities
- **`types/`** - TypeScript definitions
- **`utils/`** - Helper functions

### Key Principles

✅ **Separation of Concerns** - Each folder has a single responsibility  
✅ **Reusability** - Components in `ui/` are feature-agnostic  
✅ **Type Safety** - All props/data are typed  
✅ **DRY** - Shared logic in hooks/utils  
✅ **Scalability** - Easy to add new features  

---

## 🎨 Styling with NativeWind

This project uses **NativeWind** (Tailwind CSS for React Native) for a utility-first styling approach.

### Quick Example

```tsx
import { View, Text } from 'react-native'

export function HomeScreen() {
  return (
    <View className="flex-1 bg-background px-4 py-4">
      <Text className="text-2xl font-bold text-text-primary mb-4">
        Welcome Home
      </Text>
      <View className="bg-surface rounded-lg p-4 shadow-md">
        <Text className="text-base text-text-secondary">
          This is a styled card using NativeWind
        </Text>
      </View>
    </View>
  )
}
```

### Configuration

- **`tailwind.config.js`** - Theme configuration (colors, spacing, etc.)
- **`babel.config.js`** - NativeWind plugin enabled
- **`src/theme/utilities.ts`** - Common utility combinations

For detailed styling guide, see [NATIVEWIND_GUIDE.md](./NATIVEWIND_GUIDE.md)

---

## 🔄 State Management (Zustand)

Global state is managed with **Zustand** stores.

### Example Store

```typescript
// src/store/authStore.ts
import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email, password) => {
    // Login logic
    set({ isAuthenticated: true })
  },
  logout: () => {
    set({ isAuthenticated: false, user: null })
  },
}))
```

### Using in Components

```tsx
import { useAuthStore } from '@/store'

export function Profile() {
  const { user, logout } = useAuthStore()

  return (
    <View>
      <Text>{user?.name}</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  )
}
```

---

## 🔌 API Integration

All API calls are centralized in `src/services/`.

### Making API Calls

```typescript
// src/services/user.service.ts
import { api } from './api'

export const userService = {
  async getProfile() {
    return api.get('/users/profile')
  },

  async updateProfile(data: any) {
    return api.put('/users/profile', data)
  },
}
```

### Using in Components

```tsx
import { userService } from '@/services'

export function ProfileScreen() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    userService.getProfile().then(setProfile)
  }, [])

  return <Text>{profile?.name}</Text>
}
```

---

## 💾 Storage & Persistence

Use the `storage` utility for AsyncStorage operations.

```typescript
import { storage } from '@/utils'

// Save data
await storage.setItem('user_token', token)

// Get data
const token = await storage.getItem('user_token')

// Remove data
await storage.removeItem('user_token')

// Clear all
await storage.clear()
```

---

## 📝 Development Guidelines

### Creating a New Screen

1. Create file in `src/app/tabs/` or `src/app/auth/`
2. Use `Screen` component from layout
3. Style with NativeWind classNames

```tsx
import { View, Text } from 'react-native'
import { Screen } from '@/components/layout/Screen'

export default function MyScreen() {
  return (
    <Screen>
      <View className="gap-md">
        <Text className="text-2xl font-bold">My Screen</Text>
      </View>
    </Screen>
  )
}
```

### Creating a New Component

1. Place in `components/ui/` (generic) or `components/features/` (feature-specific)
2. Keep components small and focused
3. Accept props for customization

```tsx
import { View, Text } from 'react-native'

interface CardProps {
  title: string
  children: React.ReactNode
}

export function Card({ title, children }: CardProps) {
  return (
    <View className="bg-surface rounded-lg p-4 shadow-md">
      <Text className="text-lg font-semibold mb-2">{title}</Text>
      {children}
    </View>
  )
}
```

### Creating a Custom Hook

```typescript
// src/hooks/useCustom.ts
import { useState, useEffect } from 'react'

export function useCustom() {
  const [state, setState] = useState(null)

  useEffect(() => {
    // Setup logic
  }, [])

  return { state }
}
```

---

## 🔐 Environment Variables

Create a `.env` file in the root (see `.env.example`):

```env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_APP_NAME=HopIn
EXPO_PUBLIC_ENABLE_ANALYTICS=true
```

**Note**: Only variables prefixed with `EXPO_PUBLIC_` are accessible in the app.

---

## 📚 File Naming Conventions

- **Files**: `kebab-case.tsx` for screens/components, `camelCase.ts` for utilities/services
- **Folders**: `kebab-case` (lowercase)
- **Components**: `PascalCase`
- **Exports**: Always use `export default` for screens, named exports for components

---

## 🧪 Testing

Testing setup coming soon. When added:
- Unit tests in `__tests__/` folders
- Integration tests for services
- Component tests with React Testing Library

---

## 🚢 Building & Deployment

### Create a Production Build

```bash
npm run build
```

### EAS Build (Recommended)

```bash
# Setup account
eas login

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

For more info: [EAS Documentation](https://docs.expo.dev/build/introduction/)

---

## 📚 Resources & Documentation

- **[Expo Documentation](https://docs.expo.dev/)** - Official Expo docs
- **[Expo Router Docs](https://docs.expo.dev/routing/introduction/)** - File-based routing
- **[React Native Docs](https://reactnative.dev/)** - React Native API reference
- **[NativeWind Guide](./NATIVEWIND_GUIDE.md)** - Tailwind CSS for RN
- **[Zustand Docs](https://github.com/pmndrs/zustand)** - State management
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript

### Additional Documentation

- [NATIVEWIND_GUIDE.md](./NATIVEWIND_GUIDE.md) - Complete styling guide
- [MIGRATION_EXAMPLES.md](./MIGRATION_EXAMPLES.md) - StyleSheet to NativeWind examples
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Architecture overview
- [.env.example](./.env.example) - Environment variables template

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Follow the project structure and patterns
3. Use TypeScript for type safety
4. Test your changes before committing
5. Push to your branch and create a Pull Request

### Commit Convention

```
feat: Add new feature
fix: Fix a bug
docs: Documentation changes
style: Code style changes (formatting, etc)
refactor: Code refactoring without feature change
test: Add or update tests
chore: Build process, dependencies, etc
```

---

## 📝 Git Workflow

```bash
# Clone project
git clone <url>
cd hopin

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes & commit
git add .
git commit -m "feat: Add amazing feature"

# Push to remote
git push origin feature/amazing-feature

# Create Pull Request on GitHub
```

---

## ⚡ Performance Tips

- Use `React.memo()` for expensive components
- Implement lazy loading for large lists
- Optimize images before adding to assets
- Profile with React DevTools
- Use production builds for testing performance

---

## 🐛 Troubleshooting

### Styles not applying
- Clear cache: `npm start -- --clear`
- Rebuild with `metro`: `npm start -- --reset-cache`

### Module not found
- Check path aliases in `tsconfig.json`
- Restart dev server: `npm start`

### Build errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Expo cache: `expo login` then `expo logout`

### Android build fails
- Run: `cd android && ./gradlew clean && cd ..`
- Update Android SDK tools

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👥 Teamfollowing [Obytes](https://obytes.com) best practices for scalable React Native app

Built with ❤️ by the HopIn team, following [Obytes](https://obytes.com) best practices.

---

## 📞 Support

For Email: support@hopinapp.com
- 🐛 GitHub Issues: [Report a bug](https://github.com/yourrepo/issues/new)
- 💬 Discussions: [Ask a question](https://github.com/yourrepo/discussions)

---

## 📈 Roadmap

- [ ] Authentication (sign up, login, password reset)
- [ ] User profiles
- [ ] Prayer time tracking & reminders
- [ ] Push notifications for prayer times
- [ ] Prayer statistics & analytics
- [ ] User profiles & settings
- [ ] Offline support & sync
- [ ] Dark mode
- [ ] Multi-language support (Arabic, English, Urdu, etc.)ts

---

**Last Updated**: April 23, 2026  
**Version**: 1.0.0
