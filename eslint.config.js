// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      'react-native': require('eslint-plugin-react-native'),
    },
    rules: {
      'react-native/no-unused-styles': 'error',
    },
  },
  {
    ignores: ['dist/*'],
  },
])
