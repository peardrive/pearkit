const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
// Only needed because this example consumes pearkit from the parent folder.
config.watchFolders = [path.resolve(__dirname, '../..')];

module.exports = withNativeWind(config, { input: './global.css' });
