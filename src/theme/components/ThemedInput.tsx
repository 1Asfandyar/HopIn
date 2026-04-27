import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FontWeight, ThemedTextInputProps } from '../types'
import ThemedText from './ThemedText'

const fontMap: Record<FontWeight, string> = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
}

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
  ...props
}: ThemedTextInputProps) => {
  return (
    <View className={`mb-2 ${containerClassName} `}>
      
      {label && (
        <ThemedText className="text-gray-600 text-sm mb-1">
          {label}
        </ThemedText>
      )}

      <View className={`flex-row items-center border border-gray-200 rounded-xl px-4 py-4 bg-white + ${borderClassName}`}>
        
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={18}
            color="#9CA3AF"
            style={{ marginRight: 8 }}
          />
        )}

        <TextInput
          {...props}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#9CA3AF"
          className={`text-xl flex-1 text-gray-800 ${inputClassName}`}
          style={[
            {
              fontFamily: fontMap[weight],
            },
            style,
          ]}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons
              name={rightIcon}
              size={18}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default ThemedInput
