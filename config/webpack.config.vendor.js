const path = require('path')

const vendorConfig = {
  mode: 'production',
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    './src/vendor.js'
  ],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'vendor.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader']
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader']
      },
    ]
  }
}

module.exports = vendorConfig
