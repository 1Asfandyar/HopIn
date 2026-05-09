import { useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AuthScaffold from '@/components/auth/AuthScaffold';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import { showFeedback } from '@/utils/errors';

type ProfilePhotoScreenProps = {
  isSubmitting: boolean;
  onComplete: (photoUrl?: string) => Promise<void>;
};

const ProfilePhotoScreen = ({
  isSubmitting,
  onComplete,
}: ProfilePhotoScreenProps) => {
  const [selectedPhotoUri, setSelectedPhotoUri] = useState<string | null>(null);
  const hasPreview = Boolean(selectedPhotoUri);

  const pickerOptions: ImagePicker.ImagePickerOptions = {
    mediaTypes: 'images',
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.75,
  };

  const pickFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      showFeedback(
        'Photo access needed',
        'Please allow photo library access to choose a profile photo.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync(pickerOptions);

    if (!result.canceled) {
      setSelectedPhotoUri(result.assets[0]?.uri ?? null);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      showFeedback(
        'Camera access needed',
        'Please allow camera access to take a profile photo.',
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync(pickerOptions);

    if (!result.canceled) {
      setSelectedPhotoUri(result.assets[0]?.uri ?? null);
    }
  };

  const openPhotoOptions = () => {
    Alert.alert('Profile photo', 'Choose how you want to add your photo.', [
      {
        text: 'Take Photo',
        onPress: takePhoto,
      },
      {
        text: 'Choose from Gallery',
        onPress: pickFromLibrary,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  return (
    <AuthScaffold
      title="Add a profile photo"
      subtitle="A clear photo helps people trust you before sharing a ride."
      footer={
        <View>
          {hasPreview ? (
            <>
              <ThemedButton
                title={isSubmitting ? 'Saving...' : 'Continue'}
                loading={isSubmitting}
                disabled={isSubmitting}
                onPress={() => onComplete(selectedPhotoUri ?? undefined)}
              />
              <ThemedButton
                title="Change Photo"
                variant="ghost"
                disabled={isSubmitting}
                onPress={openPhotoOptions}
                containerClassName="mt-2"
              />
            </>
          ) : (
            <>
              <ThemedButton
                title="Add Photo"
                leftIcon="camera-outline"
                disabled={isSubmitting}
                onPress={openPhotoOptions}
              />
              <ThemedButton
                title="Skip for now"
                variant="ghost"
                loading={isSubmitting}
                disabled={isSubmitting}
                onPress={() => onComplete()}
                containerClassName="mt-2"
              />
            </>
          )}
        </View>
      }
    >
      <View className="items-center justify-center pt-12">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={openPhotoOptions}
          className={`h-36 w-36 items-center justify-center rounded-full border ${
            hasPreview
              ? 'border-primary bg-light-blue'
              : 'border-gray-200 bg-gray-50'
          }`}
        >
          {selectedPhotoUri ? (
            <Image
              source={{ uri: selectedPhotoUri }}
              className="h-full w-full rounded-full"
              resizeMode="cover"
            />
          ) : (
            <Ionicons
              name="camera-outline"
              size={48}
              color={themeColors.gray400}
            />
          )}
        </TouchableOpacity>
        <ThemedText weight="semiBold" className="text-gray-900 mt-6">
          {hasPreview ? 'Looks good?' : 'Profile photo'}
        </ThemedText>
        <ThemedText className="text-gray-500 text-center mt-2 px-6">
          {hasPreview
            ? 'Your photo preview is ready.'
            : 'You can add this later from your profile.'}
        </ThemedText>
      </View>
    </AuthScaffold>
  );
};

export default ProfilePhotoScreen;
