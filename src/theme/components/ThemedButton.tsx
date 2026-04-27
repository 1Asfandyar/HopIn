import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ThemedButtonProps } from '../types'
import ThemedText from './ThemedText'

const fontMap = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
}

const ThemedButton = ({
  title,
  weight = 'semiBold',
  variant = 'primary',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  iconSize = 18,
  containerClassName = '',
  textClassName = '',
  ...props
}: ThemedButtonProps) => {
  const isDisabled = disabled || loading

  const variantStyles = {
    primary: {
      container: 'bg-green-600',
      text: 'text-white',
      icon: '#ffffff',
    },
    outline: {
      container: 'border border-green-600 bg-transparent',
      text: 'text-green-600',
      icon: '#16A34A',
    },
    ghost: {
      container: 'bg-transparent',
      text: 'text-green-600',
      icon: '#16A34A',
    },
  }

  const colors = variantStyles[variant]

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      className={`rounded-xl py-4 px-4 flex-row items-center justify-center ${
        colors.container
      } ${isDisabled ? 'opacity-60' : ''} ${containerClassName}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={colors.icon} />
      ) : (
        <View className="flex-row items-center">
          
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={iconSize}
              color={colors.icon}
              style={{ marginRight: 8 }}
            />
          )}

          <ThemedText
            className={`text-base ${colors.text} ${textClassName}`}
            style={{ fontFamily: fontMap[weight] }}
          >
            {title}
          </ThemedText>

          {rightIcon && (
            <Ionicons
              name={rightIcon}
              size={iconSize}
              color={colors.icon}
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  )
}

export default ThemedButton
