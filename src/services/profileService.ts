import type { UserProfile } from '@/types/types';
import { supabase } from './supabaseClient';

type ProfileRow = {
  id: string;
  full_name: string | null;
  role: string | null;
  photo_url: string | null;
  updated_at: string | null;
};

const mapProfileRow = (row: ProfileRow): UserProfile => ({
  id: row.id,
  fullName: row.full_name ?? 'Hopin User',
  role: row.role === 'driver' || row.role === 'rider' ? row.role : undefined,
  photoUrl: row.photo_url ?? undefined,
  updatedAt: row.updated_at ?? undefined,
});

export const profileService = {
  upsertProfile: async (profile: UserProfile) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw userError;
    }

    if (userData.user?.id !== profile.id) {
      throw new Error('You can only update your own profile.');
    }

    const { error } = await supabase.from('profiles').upsert({
      id: profile.id,
      full_name: profile.fullName,
      role: profile.role,
      photo_url: profile.photoUrl,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      throw error;
    }
  },

  listProfilesByIds: async (ids: string[]): Promise<UserProfile[]> => {
    const uniqueIds = Array.from(new Set(ids.filter(Boolean)));

    if (uniqueIds.length === 0) {
      return [];
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('id,full_name,role,photo_url,updated_at')
      .in('id', uniqueIds);

    if (error) {
      throw error;
    }

    return (data ?? []).map(row => mapProfileRow(row as ProfileRow));
  },
};
