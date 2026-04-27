# Hopin Assets Usage Guide

This project currently uses local bitmap assets from `src/assets` rather than exported SVG component modules.

## Asset Structure

```text
src/assets/
├── fonts/
│   └── font.config.ts
├── icons/
│   └── hopin_icon.png
├── illustrations/
│   ├── hopin_cab.png
│   └── hopin_cab_dark.png
└── logos/
    ├── hopin_dark.png
    └── hopin_light.png
```

## How Assets Are Used

In React Native screens, the current codebase uses `require(...)` with relative paths:

```tsx
<Image
  source={require('../../../assets/logos/hopin_light.png')}
  resizeMode="contain"
/>
```

That pattern is used in:

- `src/features/auth/screens/LoginScreen.tsx`
- `src/features/auth/screens/RegisterScreen.tsx`
- `src/features/home/screens/WelcomeScreen.tsx`

## Current Asset Roles

### Logos

- `src/assets/logos/hopin_light.png`
  Used on light-background auth and welcome screens.

- `src/assets/logos/hopin_dark.png`
  Available for darker surfaces or alternate branding contexts.

### Illustrations

- `src/assets/illustrations/hopin_cab.png`
  Primary onboarding/auth illustration currently used in the UI.

- `src/assets/illustrations/hopin_cab_dark.png`
  Dark-mode-friendly variant available for future use.

### Icons

- `src/assets/icons/hopin_icon.png`
  App icon-style asset available for branding or launcher-related usage.

### Fonts

- `src/assets/fonts/font.config.ts`
  Declares remote Poppins font sources loaded by Expo Font in `src/app/_layout.tsx`.

## Recommended Conventions

- Keep logos in `src/assets/logos`
- Keep large scene artwork in `src/assets/illustrations`
- Keep standalone app or brand icons in `src/assets/icons`
- Keep font configuration in `src/assets/fonts`

## Notes

- Themed UI icons inside buttons and inputs currently come from `@expo/vector-icons/Ionicons`, not from `src/assets/icons`
- If asset imports become repetitive, the next cleanup step would be creating a shared asset export module, but that does not exist in the repo yet
