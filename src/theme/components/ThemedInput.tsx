import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedTextInputProps } from '../types';
import ThemedText from './ThemedText';
import { fontFamilies, themeColors } from '../tokens';

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
        <ThemedText className="text-gray-600 text-sm mb-1">{label}</ThemedText>
      )}

      <View
        className={`flex-row items-center border border-gray-200 rounded-xl px-4 py-4 bg-white ${borderClassName}`}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={18}
            color={themeColors.gray400}
            style={{ marginRight: 8 }}
          />
        )}

        <TextInput
          {...props}
          secureTextEntry={secureTextEntry}
          pointerEvents={selectDate ? 'none' : 'auto'}
          placeholderTextColor={themeColors.gray400}
          className={`text-xl flex-1 text-gray-800 ${inputClassName}`}
          style={[
            {
              fontFamily: fontFamilies[weight],
            },
            style,
          ]}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons name={rightIcon} size={18} color={themeColors.gray400} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ThemedInput;
