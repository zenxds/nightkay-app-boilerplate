// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const moment = require('moment')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const rules = require('./webpack.rules')
module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'main.js',
    jsonpFunction: 'webpackJsonp' + Date.now(),
    chunkFilename: '[name].[hash].js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'mobx': 'MobX',
    'mobx-react': 'MobXReact',
    '@dx/xbee': 'xbee',
    '@dx/xpanda': 'xpanda',
    '@antv/g2': 'G2',
    '@antv/data-set': 'DataSet',
    'd3': 'D3',
    'moment': 'moment',
    'night-kay': 'nightKay'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            ascii_only: true
          },
          compress: {
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({}),
      new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['src', 'node_modules'],
    alias: {
      '@constants': resolve('constants'),
      '@utils': resolve('utils'),
      '@components': resolve('components'),
      '@decorators': resolve('decorators'),
    }
  },
  module: {
    rules: rules.concat([
      {
        test: /\.jsx?$/,
        use: ['babel-loader']
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              modules: true,
              localIdentName: '[hash:base64]'
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              modules: true,
              localIdentName: '[hash:base64]'
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
              relativeUrls: false
            }
          }
        ]
      },
      {
        test: /(xbee|xpanda)\.less$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true
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
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
          name: 'image/[hash].[ext]'
        }
      }
      // {
        // test: /\.(jpe?g|png|gif|svg)$/,
      //   loader: 'image-webpack-loader',
      //   options: {
      //     mozjpeg: {
      //       quality: 80
      //     },
      //     // optipng.enabled: false will disable optipng
      //     optipng: {
      //       enabled: false
      //     },
      //     pngquant: {
      //       quality: '65-90',
      //       speed: 4
      //     }
      //   },
      //   // This will apply the loader before the other ones
      //   enforce: 'pre'
      // }
    ])
  },
  plugins: [
    new WebpackCleanupPlugin({
      exclude: ['vendor.js']
    }),
    new webpack.DefinePlugin({
      API_SERVER_PLACEHOLDER: JSON.stringify('')
    }),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new CopyWebpackPlugin([
      path.join(__dirname, '../data')
    ]),
    new MiniCssExtractPlugin({
      chunkFilename: '[name].[hash].css',
      filename: '[name].css'
    }),
  ]
}

function resolve(p) {
  return path.join(__dirname, '../src', p)
}
