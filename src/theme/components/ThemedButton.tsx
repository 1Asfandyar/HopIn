import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedButtonProps } from '../types';
import ThemedText from './ThemedText';
import { themeColors } from '../tokens';
import BrandedLoader from '@/components/feedback/BrandedLoader';

const ThemedButton = ({
  title,
  weight = 'semiBold',
  variant = 'primary',
  colorScheme = 'primary',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  iconSize = 18,
  containerClassName = '',
  textClassName = '',
  style,
  ...props
}: ThemedButtonProps) => {
  const isDisabled = disabled || loading;
  const schemeColor =
    colorScheme === 'secondary' ? themeColors.secondary : themeColors.primary;

  const variantStyles = {
    primary: {
      container: '',
      text: 'text-white',
      icon: themeColors.white,
      style: { backgroundColor: schemeColor },
    },
    outline: {
      container: 'border bg-transparent',
      text: '',
      icon: schemeColor,
      style: { borderColor: schemeColor },
    },
    ghost: {
      container: 'bg-transparent',
      text: '',
      icon: schemeColor,
      style: null,
    },
  };

  const colors = variantStyles[variant];
  const textStyle = variant === 'primary' ? undefined : { color: schemeColor };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      className={`rounded-xl py-4 px-4 flex-row items-center justify-center ${
        colors.container
      } ${isDisabled ? 'opacity-60' : ''} ${containerClassName}`}
      {...props}
      style={[colors.style, style]}
    >
      {loading ? (
        <BrandedLoader variant="button" label="" />
      ) : (
        <View className="flex-row items-center">
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={iconSize}
              color={colors.icon}
              style={styles.leftIcon}
            />
          )}

          <ThemedText
            weight={weight}
            size="md"
            className={`${colors.text} ${textClassName}`}
            style={textStyle}
          >
            {title}
          </ThemedText>

          {rightIcon && (
            <Ionicons
              name={rightIcon}
              size={iconSize}
              color={colors.icon}
              style={styles.rightIcon}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default ThemedButton;
