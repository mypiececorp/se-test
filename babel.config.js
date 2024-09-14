module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js', '.ts'],
      },
    ],
  ],
};
