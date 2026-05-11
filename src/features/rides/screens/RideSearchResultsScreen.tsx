import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BrandedLoader from '@/components/feedback/BrandedLoader';
import { getRideSummaryText } from '@/features/rides/helpers/rideDisplay.helpers';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedCard from '@/theme/components/ThemedCard';
import ThemedInput from '@/theme/components/ThemedInput';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import type { RideSearchResultsScreenProps } from '../types';
import type { RideRecord } from '@/types/types';

const RideSearchResultsScreen = ({
  flowMode,
  title,
  subtitle,
  emptyTitle,
  emptyDescription,
  loadingLabel,
  itemLabel,
  rides,
  rideType,
  isLoading,
  errorMessage,
  hasDepartureTime,
  dateTime,
  isDateTimePickerOpen,
  minDateTime,
  formatDateAndTime,
  isPosting,
  postLabel,
  postingLabel,
  disabledPostLabel,
  onOpenDateTimePicker,
  onCloseDateTimePicker,
  onDateTimeConfirm,
  onPost,
  onCancel,
  onRidePress,
}: RideSearchResultsScreenProps) => {
  const colorScheme = flowMode === 'find' ? 'secondary' : 'primary';
  const isPostDisabled = !hasDepartureTime || isPosting;
  const postButtonTitle = !hasDepartureTime
    ? disabledPostLabel
    : isPosting
      ? postingLabel
      : postLabel;

  const renderRide = ({ item }: { item: RideRecord }) => (
    <ThemedCard
      heading={getRideSummaryText(item, rideType)}
      variant="outline"
      rightIcon="chevron-forward"
      touchable
      onPress={() => onRidePress(item)}
      containerClassName="min-h-0"
      headingSize="sm"
      middleElement={
        <ThemedText size="sm" className="mt-3 text-gray-500">
          Tap for complete route details
        </ThemedText>
      }
    />
  );

  const renderEmptyState = () => {
    if (isLoading) {
      return <BrandedLoader variant="inline" label={loadingLabel} />;
    }

    if (errorMessage) {
      return (
        <View className="items-center px-4 py-12">
          <Ionicons
            name="alert-circle-outline"
            size={32}
            color={themeColors.gray400}
          />
          <ThemedText
            weight="semiBold"
            className="mt-3 text-center text-gray-900"
          >
            Couldn't load matches
          </ThemedText>
          <ThemedText className="mt-1 text-center text-gray-500">
            {errorMessage}
          </ThemedText>
        </View>
      );
    }

    return (
      <View className="items-center px-4 py-12">
        <Ionicons name="search-outline" size={32} color={themeColors.gray400} />
        <ThemedText
          weight="semiBold"
          className="mt-3 text-center text-gray-900"
        >
          {emptyTitle}
        </ThemedText>
        <ThemedText className="mt-1 text-center text-gray-500">
          {emptyDescription}
        </ThemedText>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white px-5">
      <View className="pb-4 pt-2">
        <ThemedText weight="semiBold" size="xl" className="text-gray-900">
          {title}
        </ThemedText>
        <ThemedText className="mt-1 text-gray-500">{subtitle}</ThemedText>

        <TouchableOpacity
          activeOpacity={0.75}
          className="mt-4"
          onPress={onOpenDateTimePicker}
        >
          <View pointerEvents="none">
            <ThemedInput
              placeholder="Departure time"
              leftIcon="calendar"
              rightIcon="arrow-forward-circle"
              value={formatDateAndTime(dateTime)}
              editable={false}
              weight="regular"
              inputClassName="pl-2 text-base"
            />
          </View>
        </TouchableOpacity>

        {rides.length > 0 && (
          <ThemedText size="sm" className="mt-3 text-gray-500">
            {rides.length} {rides.length === 1 ? itemLabel : `${itemLabel}s`}{' '}
            available
          </ThemedText>
        )}
      </View>

      <FlatList
        data={rides}
        keyExtractor={item => item.id}
        renderItem={renderRide}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      <View className="border-t border-gray-200 bg-white py-4">
        <ThemedButton
          title={postButtonTitle}
          loading={isPosting}
          disabled={isPostDisabled}
          leftIcon="add-circle-outline"
          onPress={onPost}
          colorScheme={colorScheme}
        />
        <ThemedButton
          title="Cancel"
          variant="ghost"
          disabled={isPosting}
          onPress={onCancel}
          colorScheme={colorScheme}
          containerClassName="mt-2"
        />
      </View>

      <DateTimePickerModal
        isVisible={isDateTimePickerOpen}
        mode="datetime"
        onConfirm={onDateTimeConfirm}
        onCancel={onCloseDateTimePicker}
        minimumDate={minDateTime}
        is24Hour={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
  },
});

export default RideSearchResultsScreen;
