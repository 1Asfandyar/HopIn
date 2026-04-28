import {
  StyleProp,
  TextInputProps,
  TextProps,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

export type FontWeight = 'regular' | 'medium' | 'semiBold' | 'bold';

export interface ThemedTextProps extends TextProps {
  weight?: FontWeight;
}

export interface ThemedTextInputProps extends TextInputProps {
  weight?: FontWeight;
  label?: string;
  leftIcon?: ComponentProps<typeof Ionicons>['name'];
  rightIcon?: ComponentProps<typeof Ionicons>['name'];
  onRightIconPress?: () => void;
  containerClassName?: string;
  inputClassName?: string;
  borderClassName?: string;
}

export interface ThemedButtonProps extends TouchableOpacityProps {
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
}

export interface ThemedCardProps extends TouchableOpacityProps {
  heading: string;
  subHeading?: string;

  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  touchable?: boolean;
  disabled?: boolean;

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
}
