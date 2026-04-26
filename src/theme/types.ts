import { TextInputProps, TextProps, TouchableOpacityProps } from 'react-native'
import { ComponentProps } from 'react'
import { Ionicons } from '@expo/vector-icons'

export type FontWeight = 'regular' | 'medium' | 'semiBold' | 'bold'

export interface ThemedTextProps extends TextProps {
  weight?: FontWeight
}

export interface ThemedTextInputProps extends TextInputProps {
  weight?: FontWeight
  label?: string
  leftIcon?: ComponentProps<typeof Ionicons>['name']
  rightIcon?: ComponentProps<typeof Ionicons>['name']
  onRightIconPress?: () => void
  containerClassName?: string
  inputClassName?: string
}

export interface ThemedButtonProps extends TouchableOpacityProps {
  title: string
  weight?: FontWeight
  variant?: 'primary' | 'outline' | 'ghost'
  loading?: boolean
  disabled?: boolean
  leftIcon?: ComponentProps<typeof Ionicons>['name']
  rightIcon?: ComponentProps<typeof Ionicons>['name']
  iconSize?: number
  containerClassName?: string
  textClassName?: string
}