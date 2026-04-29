import ThemedCard from '@/theme/components/ThemedCard';
import ThemedText from '@/theme/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

const HomeScreen = () => {
  return (
    <View className="flex-1 px-4 ">
      <View className="mb-6">
        <ThemedText className="text-2xl">
          Good Morning,{' '}
          <Ionicons name="sunny-outline" size={30} color="#FFA500" />
        </ThemedText>
        <ThemedText weight="semiBold" className="text-2xl">
          Where are you going?
        </ThemedText>
      </View>

      <View className="flex-row items-stretch gap-3 mb-8">
        <View className="flex-1 self-stretch">
          <ThemedCard
            heading="I'm driving"
            subHeading="Offer a ride"
            variant="primary"
            rightIcon="car"
            href="/(main)/offer-ride"
            headingClassName="text-2xl"
            subHeadingClassName=" text-xl"
            iconSize={40}
            rightIconContainerClassName="ml-3 pt-20"
          />
        </View>
        <View className="flex-1 self-stretch">
          <ThemedCard
            heading="I need a ride"
            subHeading="Find a ride"
            variant="secondary"
            href="/(main)/find-ride"
            rightIcon="person"
            headingClassName="text-2xl"
            subHeadingClassName=" text-xl"
            iconSize={40}
            rightIconContainerClassName="ml-3 pt-20"
          />
        </View>
      </View>

      <View className="h-px bg-gray-200" />

      <View>
        <ThemedText weight="semiBold" className="text-2xl mt-6 mb-3">
          Upcoming Rides
        </ThemedText>

        <ThemedCard
          heading="No upcoming rides"
          subHeading="When you have bookings, it will appear here."
          variant="outline"
          rightIcon="calendar"
          headingClassName="text-xl"
          subHeadingClassName=" text-md"
          iconSize={80}
          rightIconContainerClassName="justify-center items-center ml-3"
        />
      </View>

      <View>
        <ThemedText weight="semiBold" className="text-2xl mt-6 mb-3">
          Recent Rides
        </ThemedText>

        <ThemedCard
          heading="No recent rides"
          subHeading="Your completed rides will appear here."
          variant="outline"
          rightIcon="time"
          headingClassName="text-xl"
          subHeadingClassName=" text-md"
          iconSize={80}
          rightIconContainerClassName="justify-center items-center ml-3"
        />
      </View>
    </View>
  );
};

export default HomeScreen;
