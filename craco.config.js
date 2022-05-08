const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.join(path.resolve(__dirname, './src')),
      '@assets': path.join(path.resolve(__dirname, './src/assets')),
      '@store': path.join(path.resolve(__dirname, './src/store')),
      '@shared': path.join(path.resolve(__dirname, './src/shared')),
      '@app': path.join(path.resolve(__dirname, './src/app')),
      '@pages': path.join(path.resolve(__dirname, './src/app/pages')),
      '@components': path.join(path.resolve(__dirname, './src/app/components')),
      '@utilz': path.join(path.resolve(__dirname, './src/utilz')),
    },
  },
};
