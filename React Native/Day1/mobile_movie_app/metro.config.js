const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// ✅ Add alias support for "@/"
config.resolver.alias = {
  "@": path.resolve(__dirname),
};

// ✅ Wrap config with NativeWind (for global.css etc.)
module.exports = withNativeWind(config, {
  input: "./app/global.css",
});
