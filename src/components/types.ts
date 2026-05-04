import { Ionicons } from "@expo/vector-icons";

export type LocationInputProps = {
  label?: string;
  placeholder?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  onPlaceSelected: (data: any, details: any) => void;
  containerClassName?: string;
};