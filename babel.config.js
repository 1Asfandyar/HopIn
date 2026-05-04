module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'nativewind',
          web: {
            unstable_transformImportMeta: true,
          },
        },
      ],
    ],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/hooks': './src/hooks',
            '@/store': './src/store',
            '@/services': './src/services',
            '@/theme': './src/theme',
            '@/types': './src/types',
            '@/utils': './src/utils',
            '@/assets': './src/assets',
          },
        },
      ],
    ],
  };
};
