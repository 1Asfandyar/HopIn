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
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  iconSize = 18,
  containerClassName = '',
  textClassName = '',
  ...props
}: ThemedButtonProps) => {
  const isDisabled = disabled || loading;

  const variantStyles = {
    primary: {
      container: 'bg-primary',
      text: 'text-white',
      icon: themeColors.white,
    },
    outline: {
      container: 'border border-primary bg-transparent',
      text: 'text-primary',
      icon: themeColors.primary,
    },
    ghost: {
      container: 'bg-transparent',
      text: 'text-primary',
      icon: themeColors.primary,
    },
  };

  const colors = variantStyles[variant];

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
