import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MY_RIDES_TABS } from '@/features/rides/constants/rides.constants';
import { themeColors } from '@/theme/tokens';
import ThemedText from '@/theme/components/ThemedText';
import type { MyRideLifecycle } from '@/types/types';

type MyRidesTabsProps = {
  activeTab: MyRideLifecycle;
  upcomingCount: number;
  completedCount: number;
  onChange: (tab: MyRideLifecycle) => void;
};

const tabs = [
  {
    id: MY_RIDES_TABS.upcoming,
    label: 'Upcoming',
  },
  {
    id: MY_RIDES_TABS.completed,
    label: 'Completed',
  },
];

const MyRidesTabs = ({
  activeTab,
  upcomingCount,
  completedCount,
  onChange,
}: MyRidesTabsProps) => {
  const counts = {
    upcoming: upcomingCount,
    completed: completedCount,
  };

  return (
    <View className="flex-row rounded-xl bg-gray-100 p-1">
      {tabs.map(tab => {
        const isActive = tab.id === activeTab;

        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.85}
            className={`h-11 flex-1 flex-row items-center justify-center rounded-lg ${
              isActive ? 'bg-white' : ''
            }`}
            style={isActive ? styles.activeTab : null}
            onPress={() => onChange(tab.id)}
          >
            <ThemedText
              weight="semiBold"
              size="sm"
              className={isActive ? 'text-gray-900' : 'text-gray-500'}
            >
              {tab.label}
            </ThemedText>
            <View
              className={`ml-2 min-w-6 items-center rounded-full px-2 py-0.5 ${
                isActive ? 'bg-green-50' : 'bg-white'
              }`}
            >
              <ThemedText
                weight="semiBold"
                size="xs"
                style={{
                  color: isActive ? themeColors.primary : themeColors.gray600,
                }}
              >
                {counts[tab.id]}
              </ThemedText>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  activeTab: {
    shadowColor: themeColors.black,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
});

export default MyRidesTabs;
