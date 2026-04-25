import { View, Text } from 'react-native'
import { ThemedTextProps, FontWeight} from '../type'
import React from 'react'


const fontMap: Record<FontWeight, string>  = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
}

const ThemedText = ({weight= 'regular', style, ...props}: ThemedTextProps) => {
  return (
    <Text
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

export default ThemedText