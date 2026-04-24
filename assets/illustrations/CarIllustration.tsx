// src/assets/illustrations/CarIllustration.tsx
import React from "react";
import Svg, {
  G,
  Path,
  Circle,
  Ellipse,
  Rect,
  Line,
  Polygon,
} from "react-native-svg";

interface CarIllustrationProps {
  width?: number;
  height?: number;
  variant?: "default" | "side" | "front";
}

/**
 * Hopin Car Illustration Component
 * Green car with passengers - perfect for hero sections
 */
export const CarIllustration: React.FC<CarIllustrationProps> = ({
  width = 280,
  height = 200,
  variant = "default",
}) => {
  if (variant === "side") {
    // Side view of car with passengers visible through windows
    return (
      <Svg width={width} height={height} viewBox="0 0 280 200">
        {/* Car Body */}
        <Path
          d="M 40 100 L 50 60 L 120 50 L 180 60 L 230 100 L 240 110 L 240 130 L 40 130 Z"
          fill="#16A34A"
          stroke="#158D1D"
          strokeWidth="2"
        />

        {/* Car Bottom (darker green) */}
        <Rect x="40" y="130" width="200" height="40" fill="#158D1D" />

        {/* Front Bumper */}
        <Rect x="40" y="128" width="200" height="4" fill="#111827" />

        {/* Windows */}
        {/* Front Window */}
        <Rect
          x="55"
          y="65"
          width="55"
          height="35"
          fill="#E0F2FE"
          stroke="#16A34A"
          strokeWidth="1"
          rx="3"
        />

        {/* Back Window */}
        <Rect
          x="125"
          y="70"
          width="50"
          height="30"
          fill="#E0F2FE"
          stroke="#16A34A"
          strokeWidth="1"
          rx="3"
        />

        {/* Wheels */}
        {/* Front Wheel */}
        <Circle cx="80" cy="135" r="15" fill="#111827" />
        <Circle cx="80" cy="135" r="10" fill="#374151" />
        <Circle cx="80" cy="135" r="6" fill="#111827" />

        {/* Back Wheel */}
        <Circle cx="200" cy="135" r="15" fill="#111827" />
        <Circle cx="200" cy="135" r="10" fill="#374151" />
        <Circle cx="200" cy="135" r="6" fill="#111827" />

        {/* Headlights */}
        <Circle cx="45" cy="100" r="4" fill="#FBBF24" />
        <Circle cx="52" cy="100" r="4" fill="#FBBF24" />

        {/* People in car (simple) */}
        {/* Driver */}
        <Circle cx="75" cy="72" r="5" fill="#F59E0B" />
        {/* Passenger 1 */}
        <Circle cx="100" cy="75" r="4" fill="#EC4899" />
        {/* Passenger 2 */}
        <Circle cx="140" cy="78" r="4" fill="#3B82F6" />
      </Svg>
    );
  }

  // Default: front 3/4 view
  return (
    <Svg width={width} height={height} viewBox="0 0 280 200">
      {/* Road/Ground */}
      <Rect x="0" y="165" width="280" height="35" fill="#E5E7EB" />
      <Line x1="0" y1="165" x2="280" y2="165" stroke="#D1D5DB" strokeWidth="2" />

      {/* Car Shadow */}
      <Ellipse cx="140" cy="168" rx="95" ry="8" fill="rgba(0,0,0,0.1)" />

      {/* Car Body - Main */}
      <Path
        d="M 60 130 L 50 85 L 70 60 L 150 50 L 210 75 L 220 130"
        fill="#16A34A"
        stroke="#158D1D"
        strokeWidth="2"
      />

      {/* Car Top/Roof */}
      <Path
        d="M 85 60 L 100 55 L 180 60 L 190 75"
        fill="#0D8C2A"
        stroke="#158D1D"
        strokeWidth="1"
      />

      {/* Car Sides - Dark Green shading */}
      <Path
        d="M 60 130 L 65 85 L 70 60"
        fill="#158D1D"
        opacity="0.4"
      />

      {/* Front Windshield */}
      <Polygon
        points="75,75 95,65 120,70 100,85"
        fill="#B3E5FC"
        stroke="#16A34A"
        strokeWidth="1"
      />

      {/* Side Window 1 */}
      <Rect
        x="110"
        y="70"
        width="45"
        height="30"
        fill="#E1F5FE"
        stroke="#16A34A"
        strokeWidth="1"
        rx="2"
      />

      {/* Side Window 2 */}
      <Rect
        x="160"
        y="75"
        width="35"
        height="25"
        fill="#E1F5FE"
        stroke="#16A34A"
        strokeWidth="1"
        rx="2"
      />

      {/* Door Line */}
      <Line x1="125" y1="85" x2="125" y2="130" stroke="#158D1D" strokeWidth="1" />

      {/* Bumper */}
      <Rect x="55" y="128" width="165" height="4" fill="#111827" />

      {/* Front Bumper Grille */}
      <Rect x="55" y="128" width="165" height="2" fill="#374151" />

      {/* Wheels */}
      {/* Front Wheel */}
      <Circle cx="85" cy="138" r="18" fill="#111827" />
      <Circle cx="85" cy="138" r="13" fill="#374151" />
      <Circle cx="85" cy="138" r="8" fill="#1F2937" />
      <Circle cx="85" cy="138" r="4" fill="#111827" />

      {/* Back Wheel */}
      <Circle cx="195" cy="138" r="18" fill="#111827" />
      <Circle cx="195" cy="138" r="13" fill="#374151" />
      <Circle cx="195" cy="138" r="8" fill="#1F2937" />
      <Circle cx="195" cy="138" r="4" fill="#111827" />

      {/* Headlights */}
      <Circle cx="58" cy="105" r="4" fill="#FBBF24" />
      <Circle cx="50" cy="115" r="3" fill="#FBBF24" />

      {/* Mirror */}
      <Rect x="125" y="82" width="6" height="8" fill="#6B7280" rx="1" />

      {/* People in Car */}
      {/* Driver Head */}
      <Circle cx="95" cy="72" r="6" fill="#F59E0B" />
      {/* Driver Body */}
      <Rect x="92" y="78" width="6" height="12" fill="#EF4444" rx="2" />

      {/* Passenger 1 Head */}
      <Circle cx="130" cy="75" r="5" fill="#EC4899" />
      {/* Passenger 1 Body */}
      <Rect x="127" y="80" width="6" height="10" fill="#F472B6" rx="2" />

      {/* Passenger 2 Head */}
      <Circle cx="165" cy="77" r="5" fill="#3B82F6" />
      {/* Passenger 2 Body */}
      <Rect x="162" y="82" width="6" height="10" fill="#60A5FA" rx="2" />

      {/* Passenger 3 Head */}
      <Circle cx="195" cy="75" r="4" fill="#14B8A6" />
      {/* Passenger 3 Body */}
      <Rect x="193" y="79" width="4" height="9" fill="#2DD4BF" rx="1" />
    </Svg>
  );
};

export default CarIllustration;
