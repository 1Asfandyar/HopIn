import type { Ionicons } from '@expo/vector-icons';
import type { Router, Href } from 'expo-router';
import type * as ExpoLocation from 'expo-location';
import type { ComponentProps, ReactNode } from 'react';
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

export type RideDraft = {
  pickup: AppLocation | null;
  destination: AppLocation | null;
  departureTime: string | null;
};

export type RideRequest = {
  pickup: AppLocation;
  destination: AppLocation;
  departureTime: string;
};

export type RideOffer = RideRequest & {
  seats?: number;
  price?: number;
};

export type RideFlowMode = 'offer' | 'find';

export type AppErrorCode =
  | 'AUTH_FAILED'
  | 'LOCATION_PERMISSION_DENIED'
  | 'LOCATION_GEOCODE_FAILED'
  | 'CONFIG_MISSING'
  | 'NETWORK_ERROR'
  | 'UNKNOWN';

export type AppError = {
  code: AppErrorCode;
  message: string;
  cause?: unknown;
};

export type ApiResult<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: AppError;
    };

export type LoginCredentials = {
  identifier: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
};

export type GooglePlaceData = {
  description: string;
  place_id?: string;
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
  formatted_address?: string;
  address_components?: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
};

export type LocationInputProps = {
  label?: string;
  placeholder?: string;
  initialValue?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  onPlaceSelected: (
    data: GooglePlaceData,
    details: GooglePlaceDetails | null,
  ) => void;
  containerClassName?: string;
  rightButtonLabel?: string;
  onRightButtonPress?: () => void;
};

export type LocationGeocodedAddress = ExpoLocation.LocationGeocodedAddress;

export type AuthStore = {
  user: User | null;
  isLoading: boolean;
  error: AppError | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
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

export type RidesStore = {
  draft: RideDraft;
  setPickup: (pickup: AppLocation) => void;
  setDestination: (destination: AppLocation) => void;
  setDepartureTime: (departureTime: Date | null) => void;
  resetDraft: () => void;
};

export type ProfileStore = {
  profile: User | null;
  setProfile: (profile: User | null) => void;
};

export type ExpoExtra = {
  apiUrl?: string;
  googlePlacesApiKey?: string;
};

export type LogMetadata = Record<string, unknown>;

export type RequestOptions = RequestInit & {
  skipJsonParse?: boolean;
};

export type FontWeight = 'regular' | 'medium' | 'semiBold' | 'bold';

export type ThemedTextProps = TextProps & {
  weight?: FontWeight;
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
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ComponentProps<typeof Ionicons>['name'];
  rightIcon?: ComponentProps<typeof Ionicons>['name'];
  iconSize?: number;
  containerClassName?: string;
  textClassName?: string;
};

export type ThemedCardProps = TouchableOpacityProps & {
  heading: string;
  subHeading?: string;
  middleElement?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
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

export type LoginViewProps = {
  phone: string;
  password: string;
  phoneError: string | undefined;
  passwordError: string | undefined;
  phoneTouched: boolean | undefined;
  passwordTouched: boolean | undefined;
  isSubmitting: boolean;
  onPhoneChange: (phone: string) => void;
  onPasswordChange: (password: string) => void;
  onPhoneBlur: () => void;
  onPasswordBlur: () => void;
  onLoginPress: () => void;
  router: Router;
  isKeyboardVisible: boolean;
};

export type RegisterViewProps = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  fullNameError: string | undefined;
  phoneError: string | undefined;
  emailError: string | undefined;
  passwordError: string | undefined;
  fullNameTouched: boolean | undefined;
  phoneTouched: boolean | undefined;
  emailTouched: boolean | undefined;
  passwordTouched: boolean | undefined;
  isSubmitting: boolean;
  onFullNameChange: (fullName: string) => void;
  onPhoneChange: (phone: string) => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onFullNameBlur: () => void;
  onPhoneBlur: () => void;
  onEmailBlur: () => void;
  onPasswordBlur: () => void;
  onRegisterPress: () => void;
  router: Router;
};
