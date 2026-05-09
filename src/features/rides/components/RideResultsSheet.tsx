import { forwardRef, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedCard from '@/theme/components/ThemedCard';
import ThemedText from '@/theme/components/ThemedText';
import RideParticipantAvatar from '@/features/rides/components/RideParticipantAvatar';
import {
  getRideStatusLabel,
  getRideSummaryText,
} from '@/features/rides/helpers/rideDisplay.helpers';
import type { RideRecord, RideRecordType } from '@/types/types';

type RideResultsSheetProps = {
  title: string;
  emptyTitle: string;
  emptyDescription: string;
  itemLabel?: string;
  rides: RideRecord[];
  rideType: RideRecordType;
  colorScheme?: 'primary' | 'secondary';
  isPostingRequest?: boolean;
  postRequestLabel?: string;
  onPostRequest?: () => void;
  onRidePress?: (ride: RideRecord) => void;
};

const RideResultsSheet = forwardRef<BottomSheetModal, RideResultsSheetProps>(
  (
    {
      title,
      emptyTitle,
      emptyDescription,
      itemLabel = 'ride',
      rides,
      rideType,
      colorScheme = 'primary',
      isPostingRequest = false,
      postRequestLabel = 'Post a request',
      onPostRequest,
      onRidePress,
    },
    ref,
  ) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.45}
          pressBehavior="close"
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={['60%', '88%']}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
      >
        <BottomSheetScrollView
          className="flex-1 px-5"
          contentContainerStyle={styles.scrollContent}
        >
          <View className="mb-4">
            <ThemedText weight="semiBold" size="xl" className="text-gray-900">
              {rides.length > 0 ? title : emptyTitle}
            </ThemedText>
            <ThemedText className="mt-1 text-gray-500">
              {rides.length > 0
                ? `${rides.length} ${rides.length === 1 ? itemLabel : `${itemLabel}s`} available`
                : emptyDescription}
            </ThemedText>
          </View>

          <View className="gap-3">
            {rides.map(ride => (
              <ThemedCard
                key={ride.id}
                heading={getRideSummaryText(ride, rideType)}
                subHeading={`Status: ${getRideStatusLabel(ride)}`}
                variant="outline"
                rightIcon="chevron-forward"
                touchable={Boolean(onRidePress)}
                onPress={() => onRidePress?.(ride)}
                containerClassName="min-h-0"
                headingSize="sm"
                middleElement={
                  <View className="mb-2 mt-3 flex-row items-center">
                    <RideParticipantAvatar profile={ride.userProfile} />
                    <View className="ml-3 flex-1">
                      <ThemedText weight="semiBold" className="text-gray-900">
                        {ride.userProfile?.fullName ??
                          (rideType === 'offer' ? 'Driver' : 'Rider')}
                      </ThemedText>
                      <ThemedText size="sm" className="text-gray-500">
                        Tap for complete route details
                      </ThemedText>
                    </View>
                  </View>
                }
              />
            ))}
          </View>

          {onPostRequest && (
            <ThemedButton
              title={isPostingRequest ? 'Posting request...' : postRequestLabel}
              loading={isPostingRequest}
              disabled={isPostingRequest}
              leftIcon="add-circle-outline"
              onPress={onPostRequest}
              colorScheme={colorScheme}
              containerClassName="mt-5"
            />
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  },
);

RideResultsSheet.displayName = 'RideResultsSheet';

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 28,
  },
});

export default RideResultsSheet;
