import { RefreshControl, ScrollView, View } from 'react-native';
import BrandedLoader from '@/components/feedback/BrandedLoader';
import RideParticipantAvatar from '@/features/rides/components/RideParticipantAvatar';
import RideSeatsControl from '@/features/rides/components/RideSeatsControl';
import {
  getRideDetailActionLabel,
  getRideParticipantName,
  getRideSeatCount,
  getShortRideAddress,
} from '@/features/rides/helpers/rideDisplay.helpers';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedCard from '@/theme/components/ThemedCard';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import { formatDateAndTime } from '@/utils/date';
import type {
  RideDetailsScreenProps,
  RideRecord,
  RideRecordType,
} from '@/types/types';

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

const RideSummaryText = ({
  ride,
  rideType,
  color,
}: {
  ride: RideRecord;
  rideType: RideRecordType;
  color: string;
}) => {
  const participantName = getRideParticipantName(
    ride,
    rideType === 'offer' ? 'A driver' : 'A rider',
  );
  const verb = rideType === 'offer' ? 'is driving to' : 'is going to';
  const destination = getShortRideAddress(ride.destination.address);
  const pickup = getShortRideAddress(ride.pickup.address);
  const departureTime = formatDateAndTime(new Date(ride.departureTime));

  return (
    <>
      {participantName} {verb}{' '}
      <ThemedText weight="semiBold" style={{ color }}>
        {destination}
      </ThemedText>{' '}
      from{' '}
      <ThemedText weight="semiBold" style={{ color }}>
        {pickup}
      </ThemedText>{' '}
      at{' '}
      <ThemedText weight="semiBold" style={{ color }}>
        {departureTime}
      </ThemedText>
      .
    </>
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
  const highlightColor =
    rideType === 'offer' ? themeColors.secondary : themeColors.primary;
  const seatCount =
    ride && rideType === 'offer' ? getRideSeatCount(ride) : null;

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
          </View>

          <ThemedCard
            heading={
              <RideSummaryText
                ride={ride}
                rideType={rideType}
                color={highlightColor}
              />
            }
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
            {seatCount && (
              <View className="mt-4">
                <RideSeatsControl
                  value={seatCount}
                  editable={false}
                  label="Seats"
                  color={highlightColor}
                />
              </View>
            )}
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
