import 'dotenv/config';

export default ({ config }) => ({
  ...config,  // this spreads everything from your app.json automatically
  extra: {
    googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY,
  },
});