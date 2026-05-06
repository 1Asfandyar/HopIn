import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedTextInputProps } from '../types';
import ThemedText from './ThemedText';
import { fontFamilies, fontSizes, themeColors } from '../tokens';

const ThemedInput = ({
  weight = 'regular',
  style,
  label,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  containerClassName = '',
  inputClassName = '',
  borderClassName = '',
  selectDate = false,
  ...props
}: ThemedTextInputProps) => {
  return (
    <View className={`mb-2 ${containerClassName} `}>
      {label && (
        <ThemedText size="sm" className="text-gray-600 mb-1">
          {label}
        </ThemedText>
      )}

      <View
        className={`flex-row items-center border border-gray-200 rounded-xl px-4 py-4 bg-white overflow-hidden ${borderClassName}`}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={themeColors.gray400}
            style={{ marginRight: 8 }}
          />
        )}

        <TextInput
          {...props}
          secureTextEntry={secureTextEntry}
          pointerEvents={selectDate ? 'none' : 'auto'}
          placeholderTextColor={themeColors.gray400}
          className={`flex-1 min-w-0 text-gray-800 ${inputClassName}`}
          style={[
            {
              fontFamily: fontFamilies[weight],
              ...fontSizes.md,
              flexShrink: 1,
              minWidth: 0,
            },
            style,
          ]}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={{ flexShrink: 0 }}
          >
            <Ionicons name={rightIcon} size={20} color={themeColors.gray400} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ThemedInput;
