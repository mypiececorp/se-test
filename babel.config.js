module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js', '.ts'],
      },
    ],
  ],
};
