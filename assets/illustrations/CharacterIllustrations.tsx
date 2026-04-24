// src/assets/illustrations/CharacterIllustrations.tsx
import React from "react";
import Svg, { Circle, G, Path, Rect, Ellipse, Polygon } from "react-native-svg";

interface CharacterProps {
  width?: number;
  height?: number;
  type?: "male" | "female" | "avatar1" | "avatar2" | "avatar3";
}

/**
 * Character Illustrations for Hopin
 * Diverse user avatars for driver/passenger profiles
 */
export const MaleCharacter: React.FC<CharacterProps> = ({
  width = 120,
  height = 140,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 120 140">
      {/* Head */}
      <Circle cx="60" cy="35" r="18" fill="#F59E0B" />

      {/* Hair */}
      <Path
        d="M 42 35 Q 42 15 60 12 Q 78 15 78 35"
        fill="#D97706"
      />

      {/* Eyes */}
      <Circle cx="54" cy="32" r="2" fill="#1F2937" />
      <Circle cx="66" cy="32" r="2" fill="#1F2937" />

      {/* Smile */}
      <Path
        d="M 54 38 Q 60 41 66 38"
        stroke="#1F2937"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Body/Shirt */}
      <Rect x="40" y="55" width="40" height="50" fill="#EF4444" rx="8" />

      {/* Shirt collar */}
      <Path d="M 50 55 L 48 65 M 70 55 L 72 65" stroke="#DC2626" strokeWidth="2" />

      {/* Arms */}
      <Rect x="25" y="60" width="15" height="35" fill="#F59E0B" rx="7" />
      <Rect x="80" y="60" width="15" height="35" fill="#F59E0B" rx="7" />

      {/* Pants */}
      <Rect x="42" y="105" width="36" height="25" fill="#1F2937" rx="4" />

      {/* Shoes */}
      <Ellipse cx="52" cy="133" rx="6" ry="5" fill="#111827" />
      <Ellipse cx="68" cy="133" rx="6" ry="5" fill="#111827" />
    </Svg>
  );
};

export const FemaleCharacter: React.FC<CharacterProps> = ({
  width = 120,
  height = 140,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 120 140">
      {/* Head */}
      <Circle cx="60" cy="35" r="18" fill="#FBBF24" />

      {/* Hair */}
      <Path
        d="M 42 35 Q 42 15 60 10 Q 78 15 78 35 Q 78 48 60 50 Q 42 48 42 35"
        fill="#D97706"
      />

      {/* Eyes */}
      <Circle cx="54" cy="32" r="2.5" fill="#1F2937" />
      <Circle cx="66" cy="32" r="2.5" fill="#1F2937" />

      {/* Smile */}
      <Path
        d="M 54 38 Q 60 41 66 38"
        stroke="#1F2937"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Body/Dress */}
      <Path
        d="M 45 55 L 40 110 Q 40 120 50 125 L 70 125 Q 80 120 80 110 L 75 55 Z"
        fill="#EC4899"
      />

      {/* Dress pattern */}
      <Circle cx="55" cy="70" r="3" fill="#F472B6" opacity="0.5" />
      <Circle cx="65" cy="75" r="3" fill="#F472B6" opacity="0.5" />
      <Circle cx="50" cy="85" r="3" fill="#F472B6" opacity="0.5" />

      {/* Arms */}
      <Rect x="25" y="60" width="15" height="35" fill="#FBBF24" rx="7" />
      <Rect x="80" y="60" width="15" height="35" fill="#FBBF24" rx="7" />

      {/* Shoes */}
      <Ellipse cx="48" cy="133" rx="6" ry="5" fill="#D97706" />
      <Ellipse cx="72" cy="133" rx="6" ry="5" fill="#D97706" />
    </Svg>
  );
};

export const Avatar1: React.FC<CharacterProps> = ({
  width = 100,
  height = 100,
}) => {
  // Young professional male
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100">
      {/* Head */}
      <Circle cx="50" cy="30" r="15" fill="#D2B48C" />

      {/* Hair */}
      <Path d="M 35 30 Q 35 12 50 10 Q 65 12 65 30" fill="#5D4037" />

      {/* Eyes */}
      <Circle cx="46" cy="28" r="2" fill="#1F2937" />
      <Circle cx="54" cy="28" r="2" fill="#1F2937" />

      {/* Nose */}
      <Line x1="50" y1="30" x2="50" y2="35" stroke="#1F2937" strokeWidth="1" />

      {/* Smile */}
      <Path
        d="M 46 36 Q 50 38 54 36"
        stroke="#1F2937"
        strokeWidth="1"
        fill="none"
      />

      {/* Shirt */}
      <Rect x="35" y="45" width="30" height="35" fill="#3B82F6" rx="5" />

      {/* Collar */}
      <Polygon points="43,45 45,55 50,52 55,55 57,45" fill="#2563EB" />

      {/* Bottom/Pants */}
      <Rect x="38" y="80" width="24" height="15" fill="#1F2937" />
    </Svg>
  );
};

export const Avatar2: React.FC<CharacterProps> = ({
  width = 100,
  height = 100,
}) => {
  // Young professional female
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100">
      {/* Head */}
      <Circle cx="50" cy="30" r="15" fill="#F4A46D" />

      {/* Hair */}
      <Path
        d="M 35 30 Q 35 12 50 10 Q 65 12 65 30 Q 65 40 50 42 Q 35 40 35 30"
        fill="#8B4513"
      />

      {/* Eyes */}
      <Circle cx="46" cy="28" r="2.5" fill="#1F2937" />
      <Circle cx="54" cy="28" r="2.5" fill="#1F2937" />

      {/* Smile */}
      <Path
        d="M 46 36 Q 50 38 54 36"
        stroke="#1F2937"
        strokeWidth="1"
        fill="none"
      />

      {/* Dress Top */}
      <Rect x="35" y="45" width="30" height="20" fill="#10B981" rx="5" />

      {/* Dress Bottom */}
      <Path
        d="M 38 65 L 35 80 L 65 80 L 62 65 Z"
        fill="#10B981"
      />

      {/* Shoes */}
      <Ellipse cx="43" cy="88" rx="4" ry="3" fill="#374151" />
      <Ellipse cx="57" cy="88" rx="4" ry="3" fill="#374151" />
    </Svg>
  );
};

export const Avatar3: React.FC<CharacterProps> = ({
  width = 100,
  height = 100,
}) => {
  // Diverse character
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100">
      {/* Head */}
      <Circle cx="50" cy="30" r="15" fill="#A0826D" />

      {/* Hair/Top */}
      <Path
        d="M 35 30 L 38 12 Q 50 8 62 12 L 65 30"
        fill="#3B3B3B"
      />

      {/* Eyes */}
      <Circle cx="46" cy="28" r="2" fill="#1F2937" />
      <Circle cx="54" cy="28" r="2" fill="#1F2937" />

      {/* Smile */}
      <Path
        d="M 46 36 Q 50 38 54 36"
        stroke="#1F2937"
        strokeWidth="1"
        fill="none"
      />

      {/* Shirt */}
      <Rect x="35" y="45" width="30" height="35" fill="#F59E0B" rx="5" />

      {/* Pocket */}
      <Rect x="42" y="60" width="8" height="10" fill="#D97706" rx="1" />

      {/* Pants */}
      <Rect x="38" y="80" width="24" height="15" fill="#2D3436" />

      {/* Shoes */}
      <Ellipse cx="43" cy="98" rx="5" ry="4" fill="#111827" />
      <Ellipse cx="57" cy="98" rx="5" ry="4" fill="#111827" />
    </Svg>
  );
};

/**
 * Character component with variant selection
 */
export const Character: React.FC<CharacterProps> = ({
  width = 120,
  height = 140,
  type = "male",
}) => {
  switch (type) {
    case "female":
      return <FemaleCharacter width={width} height={height} />;
    case "avatar1":
      return <Avatar1 width={width} height={height} />;
    case "avatar2":
      return <Avatar2 width={width} height={height} />;
    case "avatar3":
      return <Avatar3 width={width} height={height} />;
    default:
      return <MaleCharacter width={width} height={height} />;
  }
};

export default Character;
