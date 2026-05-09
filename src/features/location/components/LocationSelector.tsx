import { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ThemedInput from '@/theme/components/ThemedInput';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/tokens';
import type { LocationSelectorViewProps } from '../types';
import type { ActiveLocationInput } from '../types';
import type { SavedLocationKind } from '@/types/types';
import { LOCATION_SELECTOR_COPY } from '../constants/location.constants';
import MapLocationPicker from './MapLocationPicker';

const LocationSelector = ({
  flowMode,
  roleLabel,
  heading,
  description,
  submitLabel,
  submittingLabel,
  onSubmit,
  isSubmitting,
  activeInput,
  pickupQuery,
  destinationQuery,
  searchResults,
  isSearchingPlaces,
  placesError,
  pickup,
  destination,
  savedLocations,
  isLoadingSavedLocations,
  isSavingLocation,
  locationError,
  hasGooglePlacesApiKey,
  isLoadingCurrentLocation,
  shouldShowResults,
  mapPickerInput,
  mapRegion,
  mapCameraRequestKey,
  mapPreviewLocation,
  mapError,
  isWaitingForMapPreview,
  isLoadingMapPreview,
  isConfirmingMapLocation,
  dateTime,
  isDateTimePickerOpen,
  minDateTime,
  formatDateAndTime,
  onPickupChange,
  onDestinationChange,
  onActiveInputChange,
  onOpenRouteMap,
  onOpenLocationMap,
  onOpenDateTimePicker,
  onCloseDateTimePicker,
  onDateTimeConfirm,
  onCloseMapPicker,
  onMapRegionChange,
  onUseDeviceLocationOnMap,
  onConfirmMapLocation,
  onPlaceSelected,
  onSavedLocationSelected,
  onSaveLocation,
}: LocationSelectorViewProps) => {
  const [saveTargetInput, setSaveTargetInput] =
    useState<ActiveLocationInput | null>(null);
  const [selectedSavedKind, setSelectedSavedKind] =
    useState<SavedLocationKind>('home');
  const [customLocationLabel, setCustomLocationLabel] = useState('');
  const canSubmit = Boolean(pickup && destination && dateTime);
  const saveKindOptions: Array<{ kind: SavedLocationKind; label: string }> = [
    { kind: 'home', label: 'Home' },
    { kind: 'office', label: 'Office' },
    { kind: 'university', label: 'University' },
    { kind: 'other', label: 'Other' },
  ];
  const savedLocationLabel =
    selectedSavedKind === 'other'
      ? customLocationLabel.trim()
      : (saveKindOptions.find(option => option.kind === selectedSavedKind)
          ?.label ?? '');
  const canSaveLocation = Boolean(saveTargetInput && savedLocationLabel);
  const colorScheme = flowMode === 'find' ? 'secondary' : 'primary';
  const modeClasses =
    flowMode === 'offer'
      ? {
          container: 'bg-light-blue',
          label: 'text-primary',
          routeCard: 'bg-light-blue',
          routeLabel: 'text-primary',
          routePlaceholder: 'text-gray-500',
          selectedSaveKind: 'border-primary bg-light-blue',
          selectedSaveKindText: 'text-primary',
        }
      : {
          container: 'bg-blue-100',
          label: 'text-secondary',
          routeCard: 'bg-blue-100',
          routeLabel: 'text-secondary',
          routePlaceholder: 'text-blue-700',
          selectedSaveKind: 'border-secondary bg-blue-100',
          selectedSaveKindText: 'text-secondary',
        };
  const openSaveLocationModal = (input: ActiveLocationInput) => {
    setSaveTargetInput(input);
    setSelectedSavedKind(input === 'pickup' ? 'home' : 'office');
    setCustomLocationLabel('');
  };

  const closeSaveLocationModal = () => {
    setSaveTargetInput(null);
    setCustomLocationLabel('');
  };

  const handleSaveLocation = async () => {
    if (!saveTargetInput || !savedLocationLabel) {
      return;
    }

    try {
      await onSaveLocation(
        saveTargetInput,
        savedLocationLabel,
        selectedSavedKind,
      );
      closeSaveLocationModal();
    } catch (error) {
      Alert.alert(
        "Couldn't save location",
        error instanceof Error ? error.message : 'Please try again.',
      );
    }
  };

  const renderSaveLocationAction = (
    input: ActiveLocationInput,
    isDisabled: boolean,
  ) => (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={isDisabled}
      className={`ml-3 flex-row items-center rounded-full border px-3 py-2 ${
        isDisabled ? 'border-gray-200 bg-gray-50' : 'border-gray-200 bg-white'
      }`}
      style={styles.saveLocationAction}
      onPress={event => {
        event.stopPropagation();
        openSaveLocationModal(input);
      }}
    >
      <Ionicons
        name="bookmark-outline"
        size={14}
        color={isDisabled ? themeColors.gray300 : themeColors.gray600}
      />
      <ThemedText
        weight="semiBold"
        size="xs"
        className={`ml-1 ${isDisabled ? 'text-gray-300' : 'text-gray-700'}`}
      >
        Save
      </ThemedText>
    </TouchableOpacity>
  );

  const renderRouteLocationCard = (
    input: ActiveLocationInput,
    label: string,
    address: string | undefined,
    placeholder: string,
    hasLocation: boolean,
  ) => (
    <View className={`rounded-2xl px-3 py-3 ${modeClasses.routeCard}`}>
      <View className="flex-row items-start justify-between">
        <TouchableOpacity
          activeOpacity={0.75}
          className="min-w-0 flex-1 pr-2"
          onPress={() => onOpenLocationMap(input)}
        >
          <ThemedText
            weight="semiBold"
            className={`mb-1 text-[12px] uppercase tracking-wide ${modeClasses.routeLabel}`}
          >
            {label}
          </ThemedText>
          <ThemedText
            className={`text-sm ${address ? 'text-gray-900' : modeClasses.routePlaceholder}`}
            numberOfLines={2}
          >
            {address ?? placeholder}
          </ThemedText>
        </TouchableOpacity>

        {renderSaveLocationAction(input, !hasLocation)}
      </View>
    </View>
  );

  return (
    <View className="bg-white flex-1">
      <View className={`mb-4 rounded-3xl p-4 ${modeClasses.container}`}>
        <ThemedText
          weight="semiBold"
          className={`mb-1 text-[12px] uppercase tracking-wide ${modeClasses.label}`}
        >
          {roleLabel}
        </ThemedText>
        <ThemedText weight="semiBold" size="xl" className="text-gray-900">
          {heading}
        </ThemedText>
        <ThemedText className="mt-2 text-gray-600">{description}</ThemedText>
      </View>

      <View
        className="mb-2 rounded-3xl border border-gray-200 bg-white p-4"
        style={styles.routeSummaryCard}
      >
        <View className="mb-4 flex-row items-center justify-between">
          <ThemedText weight="semiBold" className="text-base text-gray-900">
            {LOCATION_SELECTOR_COPY.routeSummaryTitle}
          </ThemedText>
          <TouchableOpacity activeOpacity={0.75} onPress={onOpenRouteMap}>
            <Ionicons
              name="arrow-forward-circle"
              size={22}
              color={themeColors.gray400}
            />
          </TouchableOpacity>
        </View>

        <View className="gap-3">
          {renderRouteLocationCard(
            'pickup',
            LOCATION_SELECTOR_COPY.fromLabel,
            pickup?.address,
            LOCATION_SELECTOR_COPY.pickupPlaceholder,
            Boolean(pickup),
          )}
          {renderRouteLocationCard(
            'destination',
            LOCATION_SELECTOR_COPY.toLabel,
            destination?.address,
            LOCATION_SELECTOR_COPY.routePlaceholder,
            Boolean(destination),
          )}
        </View>
      </View>

      <TouchableOpacity onPress={onOpenDateTimePicker} activeOpacity={0.7}>
        <View pointerEvents="none" className="mt-3">
          <ThemedInput
            placeholder={LOCATION_SELECTOR_COPY.dateTimeLabel}
            leftIcon="calendar"
            rightIcon="arrow-forward-circle"
            value={formatDateAndTime(dateTime)}
            editable={false}
            weight="regular"
            inputClassName="pl-2 text-base"
          />
        </View>
      </TouchableOpacity>

      <ThemedButton
        title={isSubmitting ? submittingLabel : submitLabel}
        loading={isSubmitting}
        disabled={!canSubmit || isSubmitting}
        onPress={onSubmit}
        containerClassName="mt-4"
        leftIcon={flowMode === 'offer' ? 'send-outline' : 'search-outline'}
        colorScheme={colorScheme}
      />

      <MapLocationPicker
        visible={mapPickerInput !== null}
        flowMode={flowMode}
        inputType={mapPickerInput}
        activeInput={activeInput}
        pickupQuery={pickupQuery}
        destinationQuery={destinationQuery}
        pickup={pickup}
        destination={destination}
        searchResults={searchResults}
        isSearchingPlaces={isSearchingPlaces}
        placesError={placesError}
        shouldShowResults={shouldShowResults}
        savedLocations={savedLocations}
        isLoadingSavedLocations={isLoadingSavedLocations}
        locationError={locationError}
        hasGooglePlacesApiKey={hasGooglePlacesApiKey}
        isLoadingCurrentLocation={isLoadingCurrentLocation}
        region={mapRegion}
        cameraRequestKey={mapCameraRequestKey}
        previewLocation={mapPreviewLocation}
        isWaitingForPreview={isWaitingForMapPreview}
        isLoadingPreview={isLoadingMapPreview}
        isConfirming={isConfirmingMapLocation}
        error={mapError}
        onPickupChange={onPickupChange}
        onDestinationChange={onDestinationChange}
        onActiveInputChange={onActiveInputChange}
        onPlaceSelected={onPlaceSelected}
        onSavedLocationSelected={onSavedLocationSelected}
        onRegionChange={onMapRegionChange}
        onUseCurrentLocation={onUseDeviceLocationOnMap}
        onConfirm={onConfirmMapLocation}
        onClose={onCloseMapPicker}
      />

      <DateTimePickerModal
        isVisible={isDateTimePickerOpen}
        mode="datetime"
        onConfirm={onDateTimeConfirm}
        onCancel={onCloseDateTimePicker}
        minimumDate={minDateTime}
        is24Hour={false}
      />

      <Modal
        visible={saveTargetInput !== null}
        animationType="fade"
        transparent
        onRequestClose={closeSaveLocationModal}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={closeSaveLocationModal}
        >
          <Pressable style={styles.saveLocationModal}>
            <ThemedText weight="semiBold" size="lg" className="text-gray-900">
              Save location
            </ThemedText>
            <View className="my-4 flex-row flex-wrap gap-2">
              {saveKindOptions.map(option => {
                const isSelected = option.kind === selectedSavedKind;

                return (
                  <TouchableOpacity
                    key={option.kind}
                    activeOpacity={0.8}
                    onPress={() => setSelectedSavedKind(option.kind)}
                    className={`rounded-xl border px-3 py-2 ${
                      isSelected
                        ? modeClasses.selectedSaveKind
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <ThemedText
                      weight="semiBold"
                      size="sm"
                      className={
                        isSelected
                          ? modeClasses.selectedSaveKindText
                          : 'text-gray-700'
                      }
                    >
                      {option.label}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
            {selectedSavedKind === 'other' && (
              <ThemedInput
                value={customLocationLabel}
                onChangeText={setCustomLocationLabel}
                placeholder="Label"
                leftIcon="bookmark-outline"
              />
            )}
            <View className="mt-2 flex-row gap-2">
              <ThemedButton
                title="Cancel"
                variant="outline"
                colorScheme={colorScheme}
                onPress={closeSaveLocationModal}
                containerClassName="flex-1"
              />
              <ThemedButton
                title={isSavingLocation ? 'Saving...' : 'Save'}
                loading={isSavingLocation}
                disabled={!canSaveLocation || isSavingLocation}
                onPress={handleSaveLocation}
                colorScheme={colorScheme}
                containerClassName="flex-1"
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  routeSummaryCard: {
    shadowColor: themeColors.black,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  saveLocationAction: {
    zIndex: 2,
    elevation: 3,
  },
  modalBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 20,
  },
  saveLocationModal: {
    width: '100%',
    borderRadius: 18,
    backgroundColor: themeColors.white,
    padding: 18,
  },
});

export default LocationSelector;
