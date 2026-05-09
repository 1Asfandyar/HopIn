import { RefreshControl, ScrollView, View } from 'react-native';
import BrandedLoader from '@/components/feedback/BrandedLoader';
import MyRideCard from '@/features/rides/components/MyRideCard';
import MyRidesTabs from '@/features/rides/components/MyRidesTabs';
import { MY_RIDES_TABS } from '@/features/rides/constants/rides.constants';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedCard from '@/theme/components/ThemedCard';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import type { MyRide, MyRideLifecycle, MyRidesSummary } from '@/types/types';

type MyRidesScreenProps = {
  activeTab: MyRideLifecycle;
  rides: MyRidesSummary;
  isLoading: boolean;
  isRefreshing: boolean;
  errorMessage: string | null;
  onTabChange: (tab: MyRideLifecycle) => void;
  onDeleteRide: (ride: MyRide) => void;
  deletingRideKey: string | null;
  onRefresh: () => void;
};

const getEmptyState = (activeTab: MyRideLifecycle) => {
  if (activeTab === MY_RIDES_TABS.completed) {
    return {
      heading: 'No completed rides',
      subHeading:
        'Completed and missed requests will appear here after their scheduled time.',
      icon: 'checkmark-done-outline' as const,
    };
  }

  return {
    heading: 'No upcoming rides',
    subHeading:
      'Posted requests, joined rides, and accepted requests will appear here.',
    icon: 'calendar-outline' as const,
  };
};

const MyRidesList = ({
  rides,
  deletingRideKey,
  onDeleteRide,
}: {
  rides: MyRide[];
  deletingRideKey: string | null;
  onDeleteRide: (ride: MyRide) => void;
}) => {
  return (
    <View className="gap-3">
      {rides.map(ride => (
        <MyRideCard
          key={`${ride.kind}-${ride.id}`}
          ride={ride}
          isDeleting={deletingRideKey === `${ride.kind}-${ride.id}`}
          onDelete={onDeleteRide}
        />
      ))}
    </View>
  );
};

const MyRidesScreen = ({
  activeTab,
  rides,
  isLoading,
  isRefreshing,
  errorMessage,
  onTabChange,
  deletingRideKey,
  onDeleteRide,
  onRefresh,
}: MyRidesScreenProps) => {
  const visibleRides = rides[activeTab];
  const emptyState = getEmptyState(activeTab);

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="px-5 pb-8 pt-4"
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          tintColor={themeColors.primary}
          onRefresh={onRefresh}
        />
      }
    >
      <View className="mb-5">
        <ThemedText weight="semiBold" size="2xl" className="text-gray-900">
          My Rides
        </ThemedText>
        <ThemedText className="mt-1 text-gray-500">
          Track posted requests, accepted rides, and ride history.
        </ThemedText>
      </View>

      <MyRidesTabs
        activeTab={activeTab}
        upcomingCount={rides.upcoming.length}
        completedCount={rides.completed.length}
        onChange={onTabChange}
      />

      <View className="mt-5">
        {isLoading ? (
          <View className="py-16">
            <BrandedLoader variant="inline" label="Loading rides..." />
          </View>
        ) : errorMessage ? (
          <View className="gap-3">
            <ThemedCard
              heading="Could not load rides"
              subHeading={errorMessage}
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
        ) : visibleRides.length > 0 ? (
          <MyRidesList
            rides={visibleRides}
            deletingRideKey={deletingRideKey}
            onDeleteRide={onDeleteRide}
          />
        ) : (
          <ThemedCard
            heading={emptyState.heading}
            subHeading={emptyState.subHeading}
            variant="outline"
            leftIcon={emptyState.icon}
            containerClassName="min-h-0"
          />
        )}
      </View>
    </ScrollView>
  );
};

export default MyRidesScreen;
