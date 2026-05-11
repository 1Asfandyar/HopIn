import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themeColors } from '@/theme/tokens';

type RideParticipantAvatarProps = {
  profile?: { photoUrl?: string | null } | null;
  size?: number;
};

const RideParticipantAvatar = ({
  profile,
  size = 48,
}: RideParticipantAvatarProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const photoUrl = profile?.photoUrl?.trim();
  const shouldShowPhoto = Boolean(photoUrl) && !hasImageError;
  const avatarStyle = {
    height: size,
    width: size,
    borderRadius: size / 2,
  };

  useEffect(() => {
    setHasImageError(false);
  }, [photoUrl]);

  if (shouldShowPhoto) {
    return (
      <Image
        source={{ uri: photoUrl }}
        resizeMode="cover"
        style={avatarStyle}
        onError={() => setHasImageError(true)}
      />
    );
  }

  return (
    <View
      className="items-center justify-center bg-gray-100"
      style={avatarStyle}
    >
      <Ionicons
        name="person"
        size={Math.floor(size * 0.46)}
        color={themeColors.gray500}
      />
    </View>
  );
};

export default RideParticipantAvatar;
