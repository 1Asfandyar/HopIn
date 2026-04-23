module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
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
  }
}
