import { StyleSheet } from 'react-native';
import { themeColors } from '@/theme/tokens';

export const locationSelectorStyles = StyleSheet.create({
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
