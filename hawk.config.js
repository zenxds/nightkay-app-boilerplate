const path = require('path')
const UnusedWebpackPlugin = require('unused-webpack-plugin')

module.exports = {
  // or integrated
  mode: 'independent',
  webpack: (config, type) => {
    if (type === 'development') {
      config.plugins.push(
        new UnusedWebpackPlugin({
          directories: [path.join(__dirname, 'src')],
          exclude: ['*.d.ts', 'vendor.js'],
          root: path.join(__dirname, '.'),
        }),
      )
    }

    return config
  },
}
