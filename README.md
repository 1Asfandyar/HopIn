# Hopin

Hopin is an Expo + React Native app with Expo Router, NativeWind, Formik, and Yup. The current codebase is organized around feature modules, with routing kept inside `src/app` and screen logic/UI grouped under `src/features`.

## Tech Stack

- React Native 0.81
- Expo 54
- Expo Router 6
- TypeScript
- NativeWind
- Formik
- Yup
- Zustand

## Project Structure

```text
src/
├── app/                            # Expo Router routes only
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (main)/                     # Reserved for main app routes
│   ├── _layout.tsx
│   └── index.tsx
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   │   ├── useLogin.ts
│   │   │   └── useRegister.ts
│   │   ├── screens/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── services/
│   │   └── types.ts
│   ├── home/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── screens/
│   │       ├── DashboardScreen.tsx
│   │       └── WelcomeScreen.tsx
│   └── menu/
│       ├── components/
│       └── hooks/
├── components/                     # Global reusable components
│   ├── layout/
│   └── ui/
├── assets/
│   ├── fonts/
│   ├── icons/
│   ├── illustrations/
│   └── logos/
├── theme/
│   ├── components/                 # ThemedButton, ThemedInput, ThemedText
│   └── types.ts
├── hooks/                          # Global hooks only
├── services/                       # Shared services only
├── store/
├── types/
└── utils/
```

## Current App Flow

- `src/app/index.tsx` renders the welcome experience
- `src/app/(auth)/login.tsx` connects the login hook to the login screen
- `src/app/(auth)/register.tsx` connects the register hook to the register screen
- feature screen components live under `src/features/.../screens`

## Architecture Notes

- `src/app` should stay route-focused
- `src/features` owns feature-specific screens, hooks, types, and future services/components
- `src/components` is for cross-feature reusable pieces
- `src/theme/components` contains the shared themed UI primitives
- `src/hooks`, `src/services`, `src/store`, `src/types`, and `src/utils` are reserved for app-wide concerns

## Path Aliases

The project uses `@` aliases configured in `tsconfig.json` and `babel.config.js`.

Examples:

```ts
import LoginScreen from '@/features/auth/screens/LoginScreen'
import ThemedButton from '@/theme/components/ThemedButton'
```

## Styling

NativeWind is enabled across the app, and the Tailwind theme currently includes project colors, spacing, radius, and Poppins font families. Shared UI building blocks live in:

- `src/theme/components/ThemedButton.tsx`
- `src/theme/components/ThemedInput.tsx`
- `src/theme/components/ThemedText.tsx`

For more detail, see [NATIVEWIND_GUIDE.md](./NATIVEWIND_GUIDE.md).

## Assets

Static assets currently live under:

- `src/assets/logos`
- `src/assets/illustrations`
- `src/assets/icons`
- `src/assets/fonts`

This project currently uses bitmap assets (`.png`) for logos and illustrations. See [ASSETS_USAGE_GUIDE.md](./ASSETS_USAGE_GUIDE.md).

## Getting Started

### Install

```bash
npm install
```

### Start the app

```bash
npm start
```

### Run on a platform

```bash
npm run android
npm run ios
npm run web
```

## Fonts

Poppins font sources are configured in [`src/assets/fonts/font.config.ts`](src/assets/fonts/font.config.ts) and loaded in [`src/app/_layout.tsx`](src/app/_layout.tsx).

## Status

The repo has already been partially reorganized into the feature-based structure above. Some target folders are intentionally present but still empty, ready for future components, hooks, and services as the app grows.
