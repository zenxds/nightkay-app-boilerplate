const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dxMock = require('dx-mock')

const rules = require('./webpack.rules')

module.exports = {
  mode: 'development',
  entry: {
    index: ['react-hot-loader/patch', './src/index.js'],
    main: './src/main.js'
  },
  output: {
    path: path.join(__dirname, '../build'),
    jsonpFunction: 'webpackJsonp' + Date.now(),
    filename: '[name].js'
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['src', 'node_modules'],
    alias: {
      '@constants': resolve('constants'),
      '@utils': resolve('utils'),
      '@components': resolve('components'),
      '@decorators': resolve('decorators'),
      // 'react-dom': '@hot-loader/react-dom',
    }
  },
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
    // 'react-router-dom': 'ReactRouterDOM',
    // 'mobx': 'MobX',
    // 'mobx-react': 'MobXReact',
    // '@dx/xbee': 'xbee',
    // '@dx/xpanda': 'xpanda',
    // '@antv/g2': 'G2',
    // '@antv/data-set': 'DataSet',
    // 'd3': 'D3',
    // 'moment': 'moment',
    'night-kay': 'nightKay'
  },
  module: {
    rules: rules.concat([
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|xbee|xpanda)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              relativeUrls: false,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /(xbee|xpanda)\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'url-loader?limit=8192&name=image/[hash].[ext]'
      }
    ])
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: fs.existsSync(path.join(__dirname, '../template/index.dev.html')) ? 'template/index.dev.html' : 'template/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new webpack.DefinePlugin({
      API_SERVER_PLACEHOLDER: JSON.stringify('')
    })
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, '../data'),
      path.join(__dirname, '../build')
    ],
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    before(app){
      dxMock(app, { root: path.join(__dirname, '../api')})
    }
  }
}

function resolve(p) {
  return path.join(__dirname, '../src', p)
}
