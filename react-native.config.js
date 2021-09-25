function getDisableAutoLinkingConf() {
    return {
      platforms: {
        ios: null // disable iOS platform, other platforms will still autolink if provided
      },
      hooks: {},
      assets: [],
      params: []
    }
  }
  module.exports = {
    assets: ["./app/assets/fonts/"],
    dependencies: {
      "@react-native-async-storage/async-storage": getDisableAutoLinkingConf(),
    }
  };
  