// src/assets/illustrations/MapIllustration.tsx
import React from "react";
import Svg, {
  Rect,
  Circle,
  Line,
  Path,
  G,
  Polygon,
  Text as SvgText,
} from "react-native-svg";

interface MapProps {
  width?: number;
  height?: number;
}

/**
 * Simple Map Illustration with route
 */
export const MapIllustration: React.FC<MapProps> = ({
  width = 300,
  height = 250,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 250">
      {/* Map Background */}
      <Rect width="300" height="250" fill="#E8F5E9" />

      {/* Grid Lines (road network) */}
      <Line x1="30" y1="50" x2="30" y2="220" stroke="#C8E6C9" strokeWidth="1" />
      <Line x1="100" y1="40" x2="100" y2="230" stroke="#C8E6C9" strokeWidth="1" />
      <Line x1="170" y1="50" x2="170" y2="220" stroke="#C8E6C9" strokeWidth="1" />
      <Line x1="240" y1="40" x2="240" y2="230" stroke="#C8E6C9" strokeWidth="1" />

      <Line x1="20" y1="80" x2="280" y2="80" stroke="#C8E6C9" strokeWidth="1" />
      <Line x1="15" y1="130" x2="285" y2="130" stroke="#C8E6C9" strokeWidth="1" />
      <Line x1="20" y1="180" x2="280" y2="180" stroke="#C8E6C9" strokeWidth="1" />

      {/* Parks/Green spaces */}
      <Circle cx="60" cy="100" r="20" fill="#A5D6A7" opacity="0.6" />
      <Circle cx="220" cy="160" r="25" fill="#A5D6A7" opacity="0.6" />

      {/* Buildings/Landmarks */}
      <Rect x="40" y="140" width="30" height="25" fill="#BBDEFB" opacity="0.7" />
      <Rect x="200" y="90" width="35" height="30" fill="#BBDEFB" opacity="0.7" />
      <Rect x="100" y="200" width="25" height="20" fill="#FFE0B2" opacity="0.7" />

      {/* Route Line (Curved path) */}
      <Path
        d="M 50 200 Q 100 150 150 120 T 250 80"
        stroke="#16A34A"
        strokeWidth="3"
        fill="none"
        strokeDasharray="5,5"
      />

      {/* START Location Pin */}
      <G>
        {/* Pin Shadow */}
        <Circle cx="50" cy="202" r="1.5" fill="rgba(0,0,0,0.1)" />
        {/* Pin */}
        <Path
          d="M 50 190 C 45 190 42 193 42 198 C 42 204 50 215 50 215 C 50 215 58 204 58 198 C 58 193 55 190 50 190 Z"
          fill="#16A34A"
          stroke="#158D1D"
          strokeWidth="1"
        />
        {/* Pin Inner Circle */}
        <Circle cx="50" cy="198" r="3" fill="white" />
      </G>

      {/* END Location Pin */}
      <G>
        {/* Pin Shadow */}
        <Circle cx="250" cy="82" r="1.5" fill="rgba(0,0,0,0.1)" />
        {/* Pin */}
        <Path
          d="M 250 70 C 245 70 242 73 242 78 C 242 84 250 95 250 95 C 250 95 258 84 258 78 C 258 73 255 70 250 70 Z"
          fill="#EF4444"
          stroke="#DC2626"
          strokeWidth="1"
        />
        {/* Pin Inner Circle */}
        <Circle cx="250" cy="78" r="3" fill="white" />
      </G>

      {/* Distance/Info Box */}
      <Rect
        x="20"
        y="20"
        width="120"
        height="30"
        fill="white"
        stroke="#D1D5DB"
        strokeWidth="1"
        rx="4"
      />
      <SvgText x="30" y="32" fontSize="11" fontWeight="bold" fill="#111827">
        Distance: 45 km
      </SvgText>
      <SvgText x="30" y="45" fontSize="9" fill="#6B7280">
        Est. Time: 1h 15m
      </SvgText>
    </Svg>
  );
};

/**
 * Location Pin (standalone)
 */
export const LocationPin: React.FC<{
  size?: number;
  color?: string;
  variant?: "start" | "end";
}> = ({ size = 40, color = "#16A34A", variant = "start" }) => {
  const pinColor = variant === "start" ? "#16A34A" : "#EF4444";

  return (
    <Svg width={size} height={size} viewBox="0 0 40 50">
      {/* Shadow */}
      <Circle cx="20" cy="48" r="4" fill="rgba(0,0,0,0.1)" />

      {/* Pin Body */}
      <Path
        d="M 20 5 C 12 5 6 11 6 19 C 6 30 20 45 20 45 C 20 45 34 30 34 19 C 34 11 28 5 20 5 Z"
        fill={pinColor}
        stroke={pinColor}
        strokeWidth="2"
      />

      {/* Pin Inner Circle */}
      <Circle cx="20" cy="19" r="6" fill="white" />

      {/* Pin Center Dot */}
      <Circle cx="20" cy="19" r="2" fill={pinColor} />
    </Svg>
  );
};

/**
 * Route/Direction Illustration
 */
export const RouteIllustration: React.FC<MapProps> = ({
  width = 280,
  height = 180,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 280 180">
      {/* Background */}
      <Rect width="280" height="180" fill="#F0F4FF" rx="8" />

      {/* Road */}
      <Rect x="40" y="60" width="200" height="60" fill="#E8E8E8" rx="4" />

      {/* Road markings */}
      <Line x1="50" y1="90" x2="220" y2="90" stroke="#C0C0C0" strokeWidth="2" strokeDasharray="8,4" />

      {/* FROM Location */}
      <G>
        <Circle cx="50" cy="90" r="12" fill="#16A34A" />
        <SvgText x="50" y="97" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">
          A
        </SvgText>
      </G>

      {/* Route arrow/path */}
      <Path
        d="M 70 90 L 210 90"
        stroke="#16A34A"
        strokeWidth="3"
        fill="none"
        markerEnd="url(#arrowhead)"
      />

      {/* TO Location */}
      <G>
        <Circle cx="230" cy="90" r="12" fill="#EF4444" />
        <SvgText x="230" y="97" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">
          B
        </SvgText>
      </G>

      {/* Details */}
      <Rect x="40" y="130" width="200" height="40" fill="white" stroke="#D1D5DB" strokeWidth="1" rx="4" />

      <SvgText x="55" y="150" fontSize="12" fontWeight="bold" fill="#111827">
        Bangalore → Mysore
      </SvgText>
      <SvgText x="55" y="165" fontSize="10" fill="#6B7280">
        45 km • 1h 15m • 4 seats available
      </SvgText>
    </Svg>
  );
};

export default MapIllustration;
