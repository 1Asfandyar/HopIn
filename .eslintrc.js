module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:prettier/recommended'],
  rules: {
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
  },
};
