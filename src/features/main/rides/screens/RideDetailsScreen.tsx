import { RefreshControl, ScrollView, View } from 'react-native';
import BrandedLoader from '@/components/feedback/BrandedLoader';
import RideParticipantAvatar from '@/features/rides/components/RideParticipantAvatar';
import RideStatusPill from '@/features/rides/components/RideStatusPill';
import {
  getRideDetailActionLabel,
  getRideParticipantName,
  getRideSummaryText,
} from '@/features/rides/helpers/rideDisplay.helpers';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedCard from '@/theme/components/ThemedCard';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import { formatDateAndTime } from '@/utils/date';
import type { RideRecord, RideRecordType } from '@/types/types';

type RideDetailsScreenProps = {
  ride: RideRecord | null;
  rideType: RideRecordType;
  isLoading: boolean;
  isSubmitting: boolean;
  errorMessage: string | null;
  onPrimaryAction: () => void;
  onOpenRoute: () => void;
  onRefresh: () => void;
};

const RouteStop = ({ label, address }: { label: string; address: string }) => {
  return (
    <View>
      <ThemedText weight="semiBold" size="sm" className="text-gray-900">
        {label}
      </ThemedText>
      <ThemedText className="mt-1 text-gray-600">{address}</ThemedText>
    </View>
  );
};

const RideDetailsScreen = ({
  ride,
  rideType,
  isLoading,
  isSubmitting,
  errorMessage,
  onPrimaryAction,
  onOpenRoute,
  onRefresh,
}: RideDetailsScreenProps) => {
  const participantFallback = rideType === 'offer' ? 'Driver' : 'Rider';
  const participantName = ride
    ? getRideParticipantName(ride, participantFallback)
    : participantFallback;

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="px-5 pb-8 pt-5"
      refreshControl={
        <RefreshControl
          refreshing={false}
          tintColor={themeColors.primary}
          onRefresh={onRefresh}
        />
      }
    >
      {isLoading ? (
        <View className="py-20">
          <BrandedLoader variant="inline" label="Loading ride details..." />
        </View>
      ) : errorMessage || !ride ? (
        <View className="gap-3">
          <ThemedCard
            heading="Could not load ride"
            subHeading={errorMessage ?? 'Please try again.'}
            variant="outline"
            leftIcon="alert-circle-outline"
            containerClassName="min-h-0"
          />
          <ThemedButton
            title="Try again"
            leftIcon="refresh-outline"
            onPress={onRefresh}
          />
        </View>
      ) : (
        <View>
          <View className="items-center">
            <RideParticipantAvatar profile={ride.userProfile} size={88} />
            <ThemedText
              weight="semiBold"
              size="xl"
              className="mt-4 text-center text-gray-900"
            >
              {participantName}
            </ThemedText>
            <View className="mt-2">
              <RideStatusPill status={ride.status} />
            </View>
          </View>

          <ThemedCard
            heading={getRideSummaryText(ride, rideType)}
            subHeading={formatDateAndTime(new Date(ride.departureTime))}
            variant="outline"
            leftIcon={
              rideType === 'offer' ? 'car-sport-outline' : 'person-outline'
            }
            containerClassName="mt-6 min-h-0"
            headingSize="md"
          />

          <View className="mt-6">
            <ThemedText weight="semiBold" size="lg" className="text-gray-900">
              Route
            </ThemedText>
            <ThemedCard
              heading="Open route in maps"
              subHeading="Pickup to destination"
              variant="outline"
              rightIcon="arrow-forward-circle-outline"
              touchable
              onPress={onOpenRoute}
              containerClassName="mt-3 min-h-0"
              headingSize="md"
              middleElement={
                <View className="my-4">
                  <RouteStop label="From" address={ride.pickup.address} />
                  <View className="my-4 h-8 w-px bg-gray-200" />
                  <RouteStop label="To" address={ride.destination.address} />
                </View>
              }
            />
          </View>

          <View className="mt-5 rounded-2xl bg-gray-50 p-4">
            <ThemedText weight="semiBold" size="sm" className="text-gray-900">
              Scheduled time
            </ThemedText>
            <ThemedText className="mt-1 text-gray-600">
              {formatDateAndTime(new Date(ride.departureTime))}
            </ThemedText>
          </View>

          <ThemedButton
            title={
              isSubmitting ? 'Saving...' : getRideDetailActionLabel(rideType)
            }
            loading={isSubmitting}
            disabled={isSubmitting || ride.status !== 'open'}
            leftIcon={
              rideType === 'offer'
                ? 'checkmark-circle-outline'
                : 'person-add-outline'
            }
            colorScheme={rideType === 'offer' ? 'secondary' : 'primary'}
            onPress={onPrimaryAction}
            containerClassName="mt-6"
          />
        </View>
      )}
    </ScrollView>
  );
};

export default RideDetailsScreen;
