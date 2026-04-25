import {  TextInputProps, TextProps, } from 'react-native'
 
export type FontWeight = 'regular' | 'medium' | 'semiBold' | 'bold'
 
export interface ThemedTextProps extends TextProps {
  weight?: FontWeight
}

export interface ThemedTextInputProps extends TextInputProps {
  weight?: FontWeight
}
