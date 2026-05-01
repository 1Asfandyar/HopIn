import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ThemedText from './ThemedText';
import { ThemedCardProps } from '../types';
import { themeColors } from '../tokens';

const ThemedCard = ({
  heading,
  subHeading,
  middleElement,
  variant = 'primary',
  touchable = false,
  disabled = false,
  href,
  leftIcon,
  rightIcon,
  iconSize = 24,
  containerClassName = '',
  iconContainerClassName = '',
  leftIconContainerClassName = '',
  rightIconContainerClassName = '',
  iconContainerStyle,
  leftIconContainerStyle,
  rightIconContainerStyle,
  headingClassName = '',
  subHeadingClassName = '',
  ...props
}: ThemedCardProps) => {
  const router = useRouter();
  const isDisabled = disabled;
  const isPressable = touchable || Boolean(href) || Boolean(props.onPress);

  const variantStyles = {
    primary: {
      container: 'bg-light-blue',
      heading: 'text-primary',
      subHeading: 'text-gray-600',
      icon: themeColors.primary,
    },
    secondary: {
      container: 'bg-blue-100',
      heading: 'text-secondary',
      subHeading: 'text-blue-700',
      icon: themeColors.secondary,
    },
    outline: {
      container: 'bg-white border border-gray-200',
      heading: 'text-gray-900',
      subHeading: 'text-gray-500',
      icon: themeColors.gray600,
    },
    ghost: {
      container: 'bg-transparent',
      heading: 'text-gray-900',
      subHeading: 'text-gray-500',
      icon: themeColors.gray600,
    },
  };

  const colors = variantStyles[variant];
  const hasLeadingIcon = Boolean(leftIcon);
  const hasTrailingIcon = Boolean(rightIcon);

  const renderIcon = (
    iconName: ThemedCardProps['leftIcon'] | ThemedCardProps['rightIcon'],
  ) => {
    if (!iconName) {
      return null;
    }

    return <Ionicons name={iconName} size={iconSize} color={colors.icon} />;
  };

  const CardContent = (
    <View
      className={`w-full rounded-2xl p-4 ${
        colors.container
      } ${isDisabled ? 'opacity-60' : ''} ${containerClassName}`}
      style={{
        minHeight: 100,
        elevation: variant === 'outline' ? 0 : 2,
        shadowColor: themeColors.black,
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        minWidth: 0,
      }}
    >
      <View className="flex-row items-start">
        {hasLeadingIcon && (
          <View
            className={`mr-3 self-start ${iconContainerClassName} ${leftIconContainerClassName}`}
            style={[iconContainerStyle, leftIconContainerStyle]}
          >
            {renderIcon(leftIcon)}
          </View>
        )}

        <View className="flex-1 self-start">
          <ThemedText
            weight="semiBold"
            className={`${headingClassName} ${colors.heading}`}
          >
            {heading}
          </ThemedText>
          {middleElement}
          {subHeading && (
            <ThemedText
              weight="regular"
              className={`${colors.subHeading} ${subHeadingClassName}`}
            >
              {subHeading}
            </ThemedText>
          )}
        </View>

        {hasTrailingIcon && (
          <View
            className={`ml-3 self-start ${iconContainerClassName} ${rightIconContainerClassName}`}
            style={[iconContainerStyle, rightIconContainerStyle]}
          >
            {renderIcon(rightIcon)}
          </View>
        )}
      </View>
    </View>
  );

  const handlePress: ThemedCardProps['onPress'] = event => {
    props.onPress?.(event);

    if (!event?.defaultPrevented && href) {
      router.push(href);
    }
  };

  if (isPressable) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        disabled={isDisabled}
        {...props}
        onPress={handlePress}
      >
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};

export default ThemedCard;
