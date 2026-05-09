import { create } from 'zustand';
import type { UserRole } from '@/constants/roles';

type OnboardingState = {
  email: string;
  fullName: string;
  role: UserRole | null;
  photoUrl: string | null;
  setEmail: (email: string) => void;
  setFullName: (fullName: string) => void;
  setRole: (role: UserRole) => void;
  setPhotoUrl: (photoUrl: string | null) => void;
  reset: () => void;
};

const initialState = {
  email: '',
  fullName: '',
  role: null,
  photoUrl: null,
};

export const useOnboardingStore = create<OnboardingState>(set => ({
  ...initialState,
  setEmail: email => set({ email }),
  setFullName: fullName => set({ fullName }),
  setRole: role => set({ role }),
  setPhotoUrl: photoUrl => set({ photoUrl }),
  reset: () => set(initialState),
}));
