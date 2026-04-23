const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)

// Add support for module resolution with @ alias
config.resolver.sourceExts.push('mjs')

// Configure project roots to include both root and src directory
config.projectRoot = __dirname
config.watchFolders = [path.resolve(__dirname, ''), path.resolve(__dirname, 'src')]

module.exports = config
