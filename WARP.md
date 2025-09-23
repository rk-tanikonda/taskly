# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is **Taskly**, a React Native mobile application built with Expo. It's currently in its initial state with a basic setup showing a starter screen. The project uses TypeScript with strict mode enabled and Yarn as the package manager.

## Development Commands

### Environment Setup
```bash
# Install dependencies
yarn install

# Start the Expo development server
yarn start
```

### Platform-Specific Development
```bash
# Start with Android simulator/device
yarn android

# Start with iOS simulator/device  
yarn ios

# Start web version
yarn web
```

### Development Workflow
```bash
# Clean start (if you encounter caching issues)
yarn start --clear

# Start with specific platform and clear cache
yarn android --clear
yarn ios --clear
```

## Architecture Overview

### Project Structure
- **`index.ts`**: Entry point that registers the root component with Expo
- **`App.tsx`**: Main application component (currently shows starter screen)
- **`assets/`**: Contains app icons, splash screens, and static assets
- **Expo Configuration**: Managed via `app.json` with cross-platform settings

### Key Technologies
- **React Native**: Mobile app framework
- **Expo**: Development platform and toolchain  
- **TypeScript**: Type-safe JavaScript with strict mode enabled
- **Yarn**: Package manager (configured with `nodeLinker: node-modules`)

### App Configuration
The app is configured in `app.json` with:
- Cross-platform support (iOS, Android, Web)
- New Architecture enabled (`newArchEnabled: true`)
- Portrait orientation lock
- Edge-to-edge Android experience
- Adaptive icons and splash screens

### Development Environment
- **TypeScript**: Extends Expo's base config with strict type checking
- **Expo SDK**: Version ~54.0.10
- **React**: Version 19.1.0
- **React Native**: Version 0.81.4

## Important Context

### Current State
This is a fresh Expo project with minimal implementation. The main `App.tsx` component currently displays a placeholder message encouraging developers to start building.

### Development Notes
- The project uses the new React Native architecture
- Yarn is configured to use node_modules linking (not Plug'n'Play)
- TypeScript is configured with strict mode for better code quality
- The app supports iOS tablets via `supportsTablet: true`
- Android has edge-to-edge display enabled but predictive back gesture is disabled

### Asset Management
All visual assets (icons, splash screens) are located in the `assets/` directory and properly configured for each platform in the Expo configuration.