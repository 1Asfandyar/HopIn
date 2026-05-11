import { Modal, Pressable, View } from 'react-native';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedInput from '@/theme/components/ThemedInput';
import ThemedText from '@/theme/components/ThemedText';
import type { SavedLocationKind } from '@/types/types';
import { locationSelectorStyles as styles } from './LocationSelector.styles';

type SaveKindOption = {
  kind: SavedLocationKind;
  label: string;
};

type SaveLocationModalProps = {
  visible: boolean;
  colorScheme: 'primary' | 'secondary';
  saveKindOptions: SaveKindOption[];
  selectedKind: SavedLocationKind;
  customLabel: string;
  canSave: boolean;
  isSaving: boolean;
  selectedKindClassName: string;
  selectedKindTextClassName: string;
  onKindChange: (kind: SavedLocationKind) => void;
  onCustomLabelChange: (label: string) => void;
  onClose: () => void;
  onSave: () => void;
};

const SaveLocationModal = ({
  visible,
  colorScheme,
  saveKindOptions,
  selectedKind,
  customLabel,
  canSave,
  isSaving,
  selectedKindClassName,
  selectedKindTextClassName,
  onKindChange,
  onCustomLabelChange,
  onClose,
  onSave,
}: SaveLocationModalProps) => (
  <Modal
    visible={visible}
    animationType="fade"
    transparent
    onRequestClose={onClose}
  >
    <Pressable style={styles.modalBackdrop} onPress={onClose}>
      <Pressable style={styles.saveLocationModal}>
        <ThemedText weight="semiBold" size="lg" className="text-gray-900">
          Save location
        </ThemedText>
        <View className="my-4 flex-row flex-wrap gap-2">
          {saveKindOptions.map(option => {
            const isSelected = option.kind === selectedKind;

            return (
              <Pressable
                key={option.kind}
                onPress={() => onKindChange(option.kind)}
                className={`rounded-xl border px-3 py-2 ${
                  isSelected
                    ? selectedKindClassName
                    : 'border-gray-200 bg-white'
                }`}
              >
                <ThemedText
                  weight="semiBold"
                  size="sm"
                  className={
                    isSelected ? selectedKindTextClassName : 'text-gray-700'
                  }
                >
                  {option.label}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
        {selectedKind === 'other' && (
          <ThemedInput
            value={customLabel}
            onChangeText={onCustomLabelChange}
            placeholder="Label"
            leftIcon="bookmark-outline"
          />
        )}
        <View className="mt-2 flex-row gap-2">
          <ThemedButton
            title="Cancel"
            variant="outline"
            colorScheme={colorScheme}
            onPress={onClose}
            containerClassName="flex-1"
          />
          <ThemedButton
            title={isSaving ? 'Saving...' : 'Save'}
            loading={isSaving}
            disabled={!canSave || isSaving}
            onPress={onSave}
            colorScheme={colorScheme}
            containerClassName="flex-1"
          />
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);

export default SaveLocationModal;
