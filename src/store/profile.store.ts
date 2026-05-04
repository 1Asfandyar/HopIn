import { create } from 'zustand';
import type { ProfileStore } from '@/types/types';

export const useProfileStore = create<ProfileStore>(set => ({
  profile: null,
  setProfile: profile => set({ profile }),
}));

export const selectProfile = (state: ProfileStore) => state.profile;
