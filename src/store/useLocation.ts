import { create } from 'zustand';
import * as Location from 'expo-location';

type UserLocation = {
  latitude: number;
  longitude: number;
  address: string;
  city: string | null;
  country: string | null;
  countryCode: string | null;
};

type LocationState = {
  currentLocation: UserLocation | null;
  error: string | null;
  isLoading: boolean;
  fetchCurrentLocation: () => Promise<UserLocation | null>;
  setCurrentLocation: (location: UserLocation) => void;
};

const formatAddress = (address?: Location.LocationGeocodedAddress) => {
  if (!address) {
    return 'Current location';
  }

  return (
    address.formattedAddress ||
    [
      address.name,
      address.street,
      address.district,
      address.city,
      address.region,
      address.country,
    ]
      .filter(Boolean)
      .join(', ') ||
    'Current location'
  );
};

export const useLocation = create<LocationState>(set => ({
  currentLocation: null,
  error: null,
  isLoading: false,

  setCurrentLocation: location => {
    set({ currentLocation: location, error: null });
  },

  fetchCurrentLocation: async () => {
    set({ error: null, isLoading: true });

    try {
      const permission = await Location.requestForegroundPermissionsAsync();

      if (!permission.granted) {
        set({
          error: 'Location permission was denied.',
          isLoading: false,
        });

        return null;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = position.coords;
      const [address] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const currentLocation = {
        latitude,
        longitude,
        address: formatAddress(address),
        city: address?.city ?? null,
        country: address?.country ?? null,
        countryCode: address?.isoCountryCode?.toLowerCase() ?? null,
      };

      set({ currentLocation, isLoading: false });

      return currentLocation;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to get current location.';

      set({ error: message, isLoading: false });

      return null;
    }
  },
}));
