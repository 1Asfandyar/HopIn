import { TextInput } from 'react-native'
import { FontWeight, ThemedTextInputProps } from '../type'

const fontMap: Record<FontWeight, string>  = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
}

const ThemedInput = ({ weight = 'regular', style, ...props }: ThemedTextInputProps)  => {
  return (
    <TextInput
      {...props}
      style={[
        {
          fontFamily: fontMap[weight],
        },
        style,
      ]}
    />
  )
}

export default ThemedInput