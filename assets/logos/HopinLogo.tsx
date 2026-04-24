// src/assets/logos/HopinLogo.tsx
import React from "react";
import { View } from "react-native";
import Svg, { Circle, Path, Text as SvgText, G } from "react-native-svg";

interface LogoProps {
  variant?: "primary" | "dark" | "icon";
  width?: number;
  height?: number;
}

/**
 * Hopin Logo Component
 * Variants: primary (green), dark (dark green), icon (just the 'h' mark)
 */
export const HopinLogo: React.FC<LogoProps> = ({
  variant = "primary",
  width = 120,
  height = 40,
}) => {
  const colors = {
    primary: { bg: "#16A34A", text: "#FFFFFF" },
    dark: { bg: "#158D1D", text: "#FFFFFF" },
    icon: { bg: "#16A34A", text: "#FFFFFF" },
  };

  const color = colors[variant];

  if (variant === "icon") {
    // Icon-only version (just the 'h')
    return (
      <Svg width={width} height={height} viewBox="0 0 48 48">
        <Circle cx="24" cy="24" r="22" fill={color.bg} />
        <SvgText
          x="24"
          y="32"
          textAnchor="middle"
          fontSize="28"
          fontWeight="bold"
          fill={color.text}
          fontFamily="Poppins"
        >
          h
        </SvgText>
      </Svg>
    );
  }

  // Full logo with text
  return (
    <Svg width={width} height={height} viewBox="0 0 200 60">
      {/* Circle background for icon */}
      <Circle cx="25" cy="30" r="20" fill={color.bg} />

      {/* 'h' text inside circle */}
      <SvgText
        x="25"
        y="40"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill={color.text}
        fontFamily="Poppins"
      >
        h
      </SvgText>

      {/* 'hopin' text */}
      <SvgText
        x="55"
        y="40"
        fontSize="26"
        fontWeight="bold"
        fill={color.bg}
        fontFamily="Poppins"
      >
        hopin
      </SvgText>
    </Svg>
  );
};

export default HopinLogo;
