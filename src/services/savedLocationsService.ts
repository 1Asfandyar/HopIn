import type {
  AppLocation,
  SavedLocation,
  SavedLocationKind,
} from '@/types/types';
import { supabase } from './supabaseClient';

type SavedLocationRow = {
  id: string;
  user_id: string;
  label: string;
  kind: SavedLocationKind;
  location: AppLocation;
  created_at: string;
};

const selectSavedLocationColumns = 'id,user_id,label,kind,location,created_at';

const getCurrentUserId = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!data.user?.id) {
    throw new Error('Please sign in before saving locations.');
  }

  return data.user.id;
};

const mapSavedLocationRow = (row: SavedLocationRow): SavedLocation => ({
  id: row.id,
  userId: row.user_id,
  label: row.label,
  kind: row.kind,
  location: row.location,
  createdAt: row.created_at,
});

export const savedLocationsService = {
  list: async (): Promise<SavedLocation[]> => {
    const userId = await getCurrentUserId();
    const { data, error } = await supabase
      .from('saved_locations')
      .select(selectSavedLocationColumns)
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    return (data ?? []).map(row =>
      mapSavedLocationRow(row as SavedLocationRow),
    );
  },

  save: async ({
    label,
    kind,
    location,
  }: {
    label: string;
    kind: SavedLocationKind;
    location: AppLocation;
  }): Promise<SavedLocation> => {
    const userId = await getCurrentUserId();
    const { data, error } = await supabase
      .from('saved_locations')
      .upsert(
        {
          user_id: userId,
          label,
          kind,
          location,
        },
        { onConflict: 'user_id,label' },
      )
      .select(selectSavedLocationColumns)
      .single<SavedLocationRow>();

    if (error) {
      throw error;
    }

    return mapSavedLocationRow(data);
  },
};
