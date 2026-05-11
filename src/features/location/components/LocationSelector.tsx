import { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
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
import RouteLocationCard from './RouteLocationCard';
import SaveLocationModal from './SaveLocationModal';
import { locationSelectorStyles as styles } from './LocationSelector.styles';

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
  onLocationInputClear,
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
          <RouteLocationCard
            input="pickup"
            label={LOCATION_SELECTOR_COPY.fromLabel}
            address={pickup?.address}
            placeholder={LOCATION_SELECTOR_COPY.pickupPlaceholder}
            hasLocation={Boolean(pickup)}
            routeCardClassName={modeClasses.routeCard}
            routeLabelClassName={modeClasses.routeLabel}
            routePlaceholderClassName={modeClasses.routePlaceholder}
            onOpenLocationMap={onOpenLocationMap}
            onSaveLocationPress={openSaveLocationModal}
          />
          <RouteLocationCard
            input="destination"
            label={LOCATION_SELECTOR_COPY.toLabel}
            address={destination?.address}
            placeholder={LOCATION_SELECTOR_COPY.routePlaceholder}
            hasLocation={Boolean(destination)}
            routeCardClassName={modeClasses.routeCard}
            routeLabelClassName={modeClasses.routeLabel}
            routePlaceholderClassName={modeClasses.routePlaceholder}
            onOpenLocationMap={onOpenLocationMap}
            onSaveLocationPress={openSaveLocationModal}
          />
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
        onLocationInputClear={onLocationInputClear}
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

      <SaveLocationModal
        visible={saveTargetInput !== null}
        colorScheme={colorScheme}
        saveKindOptions={saveKindOptions}
        selectedKind={selectedSavedKind}
        customLabel={customLocationLabel}
        canSave={canSaveLocation}
        isSaving={isSavingLocation}
        selectedKindClassName={modeClasses.selectedSaveKind}
        selectedKindTextClassName={modeClasses.selectedSaveKindText}
        onKindChange={setSelectedSavedKind}
        onCustomLabelChange={setCustomLocationLabel}
        onClose={closeSaveLocationModal}
        onSave={handleSaveLocation}
      />
    </View>
  );
};

export default LocationSelector;
