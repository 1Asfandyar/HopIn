import type { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';
import type * as ExpoLocation from 'expo-location';
import type { ComponentProps, ReactNode } from 'react';
import type { UserRole } from '@/constants/roles';
import type {
  StyleProp,
  TextInputProps,
  TextProps,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export type User = {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  role?: UserRole;
  photoUrl?: string;
  isEmailVerified?: boolean;
  isProfileComplete?: boolean;
};

export type UserProfile = {
  id: string;
  fullName: string;
  role?: UserRole;
  photoUrl?: string;
  updatedAt?: string;
};

export type AuthSession = {
  user: User;
  accessToken: string;
};

export type AppLocation = {
  latitude: number;
  longitude: number;
  address: string;
  city: string | null;
  country: string | null;
  countryCode: string | null;
};

export type SavedLocationKind = 'home' | 'office' | 'university' | 'other';

export type SavedLocation = {
  id: string;
  userId: string;
  label: string;
  kind: SavedLocationKind;
  location: AppLocation;
  createdAt: string;
};

export type RideDraft = {
  pickup: AppLocation | null;
  destination: AppLocation | null;
  departureTime: string | null;
};

export type RideRouteDraft = Pick<RideDraft, 'pickup' | 'destination'>;

export type RideRequest = {
  pickup: AppLocation;
  destination: AppLocation;
  departureTime: string;
};

export type RideRecordStatus =
  | 'open'
  | 'pending'
  | 'accepted'
  | 'cancelled'
  | 'completed'
  | 'not_completed';

export type RideRecord = RideRequest & {
  id: string;
  userId: string | null;
  status: RideRecordStatus;
  createdAt: string;
  userProfile?: UserProfile | null;
};

export type RideOffer = RideRecord & {
  seats?: number;
  price?: number;
};

export type RideRequestPost = RideRecord;

export type RideBookingStatus =
  | 'accepted'
  | 'cancelled'
  | 'completed'
  | 'not_completed';

export type RideBookingSource = 'direct_offer' | 'request_acceptance';

export type RideBooking = {
  id: string;
  offerId: string | null;
  requestId: string | null;
  riderId: string;
  driverId: string | null;
  status: RideBookingStatus;
  source: RideBookingSource;
  createdAt: string;
  offer?: RideOffer | null;
  request?: RideRequestPost | null;
};

export type MyRideLifecycle = 'upcoming' | 'completed';

export type MyRideKind = 'request' | 'offer' | 'booking';

export type MyRideRole = 'rider' | 'driver';

export type MyRide = RideRequest & {
  id: string;
  kind: MyRideKind;
  role: MyRideRole;
  status: RideRecordStatus;
  lifecycle: MyRideLifecycle;
  createdAt: string;
  bookingId?: string;
  source?: RideBookingSource;
  offerId?: string | null;
  requestId?: string | null;
};

export type MyRidesSummary = {
  upcoming: MyRide[];
  completed: MyRide[];
};

export type RideFlowMode = 'offer' | 'find';

export type RideRecordType = 'offer' | 'request';

export type AppErrorCode =
  | 'AUTH_FAILED'
  | 'LOCATION_PERMISSION_DENIED'
  | 'PLACES_SEARCH_FAILED'
  | 'PLACE_DETAILS_FAILED'
  | 'LOCATION_GEOCODE_FAILED'
  | 'CONFIG_MISSING'
  | 'NETWORK_ERROR'
  | 'UNKNOWN';

export type AppError = {
  code: AppErrorCode;
  message: string;
  cause?: unknown;
};

export type GooglePlaceData = {
  description: string;
  place_id?: string;
  types?: string[];
  structured_formatting?: {
    main_text?: string;
    secondary_text?: string;
  };
};

export type GooglePlaceDetails = {
  geometry?: {
    location?: {
      lat: number;
      lng: number;
    };
  };
  name?: string;
  vicinity?: string;
  types?: string[];
  formatted_address?: string;
  address_components?: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
};

export type LocationGeocodedAddress = ExpoLocation.LocationGeocodedAddress;

export type AuthStore = {
  user: User | null;
  isLoading: boolean;
  error: AppError | null;
  signInWithGoogle: () => Promise<void>;
  sendEmailOtp: (email: string) => Promise<void>;
  verifyEmailOtp: (email: string, otp: string) => Promise<User | null>;
  completeProfile: (profile: {
    fullName: string;
    role?: UserRole;
    photoUrl?: string;
  }) => Promise<void>;
  updateUserRole: (role: UserRole) => Promise<void>;
  handleOAuthCallback: (url: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export type LocationStore = {
  currentLocation: AppLocation | null;
  error: AppError | null;
  isLoading: boolean;
  fetchCurrentLocation: () => Promise<AppLocation | null>;
  setCurrentLocation: (location: AppLocation) => void;
};

export type PlacesStore = {
  searchResults: GooglePlaceData[];
  isLoading: boolean;
  error: AppError | null;

  searchPlaces: (query: string) => Promise<GooglePlaceData[]>;
  getPlaceDetailsById: (placeId: string) => Promise<GooglePlaceDetails | null>;
  clearResults: () => void;
};

export type RidesStore = {
  draft: RideDraft;
  setPickup: (pickup: AppLocation) => void;
  clearPickup: () => void;
  setDestination: (destination: AppLocation) => void;
  clearDestination: () => void;
  setDepartureTime: (departureTime: Date | null) => void;
  resetDraft: () => void;
};

export type ExpoExtra = {
  googlePlacesApiKey?: string;
};

export type LogMetadata = Record<string, unknown>;

export type FontWeight = 'regular' | 'medium' | 'semiBold' | 'bold';

export type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type ThemedTextProps = TextProps & {
  weight?: FontWeight;
  size?: FontSize;
};

export type ThemedTextInputProps = TextInputProps & {
  weight?: FontWeight;
  label?: string;
  leftIcon?: ComponentProps<typeof Ionicons>['name'];
  rightIcon?: ComponentProps<typeof Ionicons>['name'];
  onRightIconPress?: () => void;
  containerClassName?: string;
  inputClassName?: string;
  borderClassName?: string;
  selectDate?: boolean;
};

export type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  weight?: FontWeight;
  variant?: 'primary' | 'outline' | 'ghost';
  colorScheme?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ComponentProps<typeof Ionicons>['name'];
  rightIcon?: ComponentProps<typeof Ionicons>['name'];
  iconSize?: number;
  containerClassName?: string;
  textClassName?: string;
};

export type ThemedCardProps = TouchableOpacityProps & {
  heading: ReactNode;
  subHeading?: string;
  middleElement?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  colorScheme?: 'primary' | 'secondary';
  touchable?: boolean;
  disabled?: boolean;
  href?: Href;
  leftIcon?: ComponentProps<typeof Ionicons>['name'];
  rightIcon?: ComponentProps<typeof Ionicons>['name'];
  iconSize?: number;
  containerClassName?: string;
  iconContainerClassName?: string;
  leftIconContainerClassName?: string;
  rightIconContainerClassName?: string;
  iconContainerStyle?: StyleProp<ViewStyle>;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  headingSize?: FontSize;
  subHeadingSize?: FontSize;
  headingClassName?: string;
  subHeadingClassName?: string;
};

export type AppHeaderProps = {
  title?: string;
  leftIcon?: ComponentProps<typeof Ionicons>['name'];
  rightIcon?: ComponentProps<typeof Ionicons>['name'];
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

export type MainMenuProps = {
  visible: boolean;
  isLoggingOut: boolean;
  onClose: () => void;
  onLogout: () => void;
};

export type BrandedLoaderProps = {
  label?: string;
  variant?: 'screen' | 'splash' | 'inline' | 'button';
  onFinish?: () => void;
};
