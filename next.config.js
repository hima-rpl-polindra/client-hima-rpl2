module.exports = {
  webpack: (config, { dev, isServer }) => {
    // Menonaktifkan HMR secara paksa
    if (!dev && !isServer) {
      Object.assign(config.optimization.splitChunks.cacheGroups, {
        vendors: false,
        commons: false,
      });

      // Menonaktifkan webpack hot middleware
      config.plugins = config.plugins.filter(
        (plugin) => plugin.constructor.name !== "HotModuleReplacementPlugin"
      );
    }
    return config;
  },
  // Opsi tambahan untuk produksi
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
};
