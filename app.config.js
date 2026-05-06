import 'dotenv/config';

const googleMapsApiKey =
  process.env.GOOGLE_MAPS_API_KEY ?? process.env.GOOGLE_PLACES_API_KEY;

export default ({ config }) => ({
  ...config, // this spreads everything from your app.json automatically
  ios: {
    ...config.ios,
    config: {
      ...config.ios?.config,
      googleMapsApiKey,
    },
  },
  android: {
    ...config.android,
    config: {
      ...config.android?.config,
      googleMaps: {
        ...config.android?.config?.googleMaps,
        apiKey: googleMapsApiKey,
      },
    },
  },
  extra: {
    ...config.extra,
    googleMapsApiKey,
    googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY,
  },
});
