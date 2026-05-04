import { jest } from '@jest/globals';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      apiUrl: '',
      googlePlacesApiKey: 'test-google-key',
    },
  },
}));
