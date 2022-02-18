const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  // ...Other Vue config options here, possibly
  pwa: {
    name: "Fontys PWA Offline App Test",
    themeColor: "#007777",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/service-worker.js",
    },
  },
};
