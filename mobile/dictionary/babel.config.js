module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@styles': './src/styles',
          '@constants': './src/constants',
          '@routes': './src/routes',
          '@models': './src/models',
          '@storage': './src/storage',
          '@services': './src/services',
          '@contexts': './src/contexts',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
