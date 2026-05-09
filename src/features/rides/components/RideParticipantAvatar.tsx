import { Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themeColors } from '@/theme/tokens';
import type { UserProfile } from '@/types/types';

type RideParticipantAvatarProps = {
  profile?: UserProfile | null;
  size?: number;
};

const RideParticipantAvatar = ({
  profile,
  size = 48,
}: RideParticipantAvatarProps) => {
  const avatarStyle = {
    height: size,
    width: size,
    borderRadius: size / 2,
  };

  if (profile?.photoUrl) {
    return (
      <Image
        source={{ uri: profile.photoUrl }}
        resizeMode="cover"
        style={avatarStyle}
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
