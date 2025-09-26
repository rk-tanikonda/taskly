// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const eslintPluginReactNative = require('eslint-plugin-react-native')

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      'react-native': eslintPluginReactNative,
    },
    rules: {
      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'error',
      'react-native/no-color-literals': 'error',
      'react-native/no-raw-text': 'error',
    },
  },
  {
    ignores: ['dist/*'],
  },
])
