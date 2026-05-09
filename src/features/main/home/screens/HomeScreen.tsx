import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Image, Platform, StyleSheet, View } from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  type Region,
} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_ROUTES } from '@/constants/appRoutes';
import { USER_ROLES } from '@/constants/roles';
import { useAuthStore } from '@/store/auth.store';
import { useLocationStore } from '@/store/location.store';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedCard from '@/theme/components/ThemedCard';
import ThemedText from '@/theme/components/ThemedText';
import { getRoleTheme } from '@/theme/helpers/roleTheme.helpers';
import { themeColors } from '@/theme/tokens';

const mapProvider = Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined;

const FALLBACK_REGION: Region = {
  latitude: 30.3753,
  longitude: 69.3451,
  latitudeDelta: 14,
  longitudeDelta: 14,
};

const HomeScreen = () => {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const currentLocation = useLocationStore(state => state.currentLocation);
  const fetchCurrentLocation = useLocationStore(
    state => state.fetchCurrentLocation,
  );
  const role = user?.role ?? USER_ROLES.rider;
  const isDriver = role === USER_ROLES.driver;
  const roleTheme = getRoleTheme(role);
  const mapRegion = currentLocation
    ? {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      }
    : FALLBACK_REGION;

  useEffect(() => {
    if (!currentLocation) {
      fetchCurrentLocation();
    }
  }, [currentLocation, fetchCurrentLocation]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={['bottom']}>
      <View className="flex-1">
        <MapView
          provider={mapProvider}
          style={styles.map}
          region={mapRegion}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
          showsUserLocation={Boolean(currentLocation)}
          showsMyLocationButton={false}
          showsCompass={false}
          toolbarEnabled={false}
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
            >
              <View
                className="h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: roleTheme.lightColor }}
              >
                <View
                  className="h-5 w-5 rounded-full border-4"
                  style={{
                    backgroundColor: roleTheme.color,
                    borderColor: themeColors.white,
                  }}
                />
              </View>
            </Marker>
          )}
        </MapView>

        <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white px-5 pb-6 pt-5">
          <View className="mb-5 flex-row items-center">
            <Image
              source={require('../../../../assets/icons/hopin_icon.png')}
              className="h-11 w-11 rounded-full"
              resizeMode="contain"
            />
            <View className="ml-3 flex-1">
              <ThemedText size="sm" className="text-gray-500">
                {isDriver ? 'Driver mode' : 'Rider mode'}
              </ThemedText>
              <ThemedText weight="semiBold" size="xl" className="text-gray-900">
                {isDriver ? 'Offer seats in your car' : 'Where are you going?'}
              </ThemedText>
            </View>
          </View>

          {isDriver ? (
            <View>
              <ThemedText className="text-gray-500 mb-5">
                Earn by sharing your daily route with people going the same way.
              </ThemedText>
              <ThemedButton
                title="Offer Seats"
                leftIcon="add"
                colorScheme={roleTheme.colorScheme}
                onPress={() => router.push(APP_ROUTES.main.offerRide)}
              />
            </View>
          ) : (
            <View>
              <ThemedButton
                title="Find Rides"
                colorScheme={roleTheme.colorScheme}
                onPress={() => router.push(APP_ROUTES.main.findRide)}
              />
            </View>
          )}

          <View className="mt-5">
            <ThemedCard
              heading="No upcoming rides"
              subHeading={
                isDriver
                  ? 'Your published rides will appear here.'
                  : 'Your requested rides will appear here.'
              }
              variant="outline"
              colorScheme={roleTheme.colorScheme}
              rightIcon="calendar-outline"
              containerClassName="min-h-0"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeScreen;
