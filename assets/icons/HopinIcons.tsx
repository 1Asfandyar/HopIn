// src/assets/icons/HopinIcons.tsx
import React from "react";
import Svg, { Circle, Path, G, Line, Polygon, Rect } from "react-native-svg";

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * Location Pin Icon
 */
export const LocationIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
        fill={color}
      />
    </Svg>
  );
};

/**
 * Star Rating Icon
 */
export const StarIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#FF86B6",
  strokeWidth = 1,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Polygon
        points="12,2 15.09,10.26 24,10.35 17.55,16.54 19.64,24.75 12,19.77 4.36,24.75 6.45,16.54 0,10.35 8.91,10.26"
        fill={color}
      />
    </Svg>
  );
};

/**
 * Half Star Icon (for ratings)
 */
export const HalfStarIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#FF86B6",
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Left half filled */}
      <Path
        d="M12 2 L14.39 10.26 H12 L12 2 M12 2 L15.09 10.26 L24 10.35 L17.55 16.54 L19.64 24.75 L12 19.77 L12 2"
        fill={color}
      />
      {/* Right half outline */}
      <Path
        d="M12 2 L15.09 10.26 L24 10.35 L17.55 16.54 L19.64 24.75 L12 19.77 L4.36 24.75 L6.45 16.54 L0 10.35 L8.91 10.26 L12 2"
        stroke={color}
        strokeWidth="1"
        fill="none"
      />
    </Svg>
  );
};

/**
 * Car Icon
 */
export const CarIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 9h18M3 9l1.5-4.5h15l1.5 4.5M3 9v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9M6 15a2 2 0 1 1 4 0 2 2 0 0 1-4 0m10 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

/**
 * People/Passengers Icon
 */
export const PeopleIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Person 1 */}
      <Circle cx="8" cy="5" r="2" fill={color} />
      <Path
        d="M6 9c0-1.1.9-2 2-2s2 .9 2 2v3H6V9z"
        fill={color}
      />

      {/* Person 2 */}
      <Circle cx="16" cy="5" r="2" fill={color} />
      <Path
        d="M14 9c0-1.1.9-2 2-2s2 .9 2 2v3h-4V9z"
        fill={color}
      />

      {/* Person 3 */}
      <Circle cx="12" cy="8" r="2" fill={color} />
      <Path
        d="M10 12c0-1.1.9-2 2-2s2 .9 2 2v4h-4v-4z"
        fill={color}
      />
    </Svg>
  );
};

/**
 * Clock/Time Icon
 */
export const ClockIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} />
      <Line x1="12" y1="6" x2="12" y2="12" stroke={color} strokeWidth={strokeWidth} />
      <Line x1="12" y1="12" x2="16" y2="16" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
};

/**
 * Price/Money Icon
 */
export const PriceIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
      <Path
        d="M12 8v8M9 10h6a2 2 0 0 1 0 4H9a2 2 0 0 0 0 4h6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
};

/**
 * Seat/Chair Icon
 */
export const SeatIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="6"
        y="8"
        width="12"
        height="2"
        fill={color}
      />
      <Rect
        x="6"
        y="10"
        width="12"
        height="8"
        rx="1"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Line x1="8" y1="18" x2="8" y2="20" stroke={color} strokeWidth={strokeWidth} />
      <Line x1="16" y1="18" x2="16" y2="20" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
};

/**
 * Phone Call Icon
 */
export const PhoneIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 5c0-1.1.9-2 2-2h3l4 9-3.8 3.8c1.1 1.7 2.9 3.4 4.6 4.6L13 17l9 4v3c0 1.1-.9 2-2 2-3.3 0-6.5-1.3-8.8-3.7C7.3 19.5 6 16.3 6 13 6 4.9 3.1 5 3 5z"
        fill={color}
      />
    </Svg>
  );
};

/**
 * Chat/Message Icon
 */
export const ChatIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 3h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5l-5 5v-5H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </Svg>
  );
};

/**
 * User/Profile Icon
 */
export const UserIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={strokeWidth} />
      <Path
        d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </Svg>
  );
};

/**
 * Search Icon
 */
export const SearchIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="10" cy="10" r="6" stroke={color} strokeWidth={strokeWidth} />
      <Line x1="14" y1="14" x2="20" y2="20" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
};

/**
 * Plus Icon (Add)
 */
export const PlusIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth={strokeWidth} />
      <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
};

/**
 * Checkmark Icon
 */
export const CheckIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12l5 5L19 7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

/**
 * X/Close Icon
 */
export const CloseIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth={strokeWidth} />
      <Line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
};

/**
 * Arrow Right Icon
 */
export const ArrowRightIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#16A34A",
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={strokeWidth} />
      <Path
        d="M12 5l7 7-7 7"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
