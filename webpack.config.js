'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const env = process.env.NODE_ENV;

const output = {
  path: path.resolve(__dirname, './dist'),
  publicPath: '/',
  filename: '[name].[hash].js',
};

if (env === 'buildLib') {
  output.publicPath = '/dist/';
  output.filename = 'vue-tags-input.js';
  output.library = 'vueTagsInput';
  output.libraryTarget = 'umd';
}

module.exports = {
  entry: env === 'buildLib' ? './publish.js' : ['babel-polyfill', './src/main.js'],
  output,
  externals:{
    vue: env === 'buildLib' ? {
      root: 'vue',
      commonjs2: 'vue',
      commonjs: 'vue',
      amd: 'vue',
    } : false,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformToRequire: {
            img: 'src',
            image: 'xlink:href',
            video: 'poster',
            source: 'src',
          },
          css: {
            options: {
              minimize: true,
              sourceMap: true,
            },
          },
          postcss: {
            plugins: [
              require('autoprefixer')(),
            ],
            options: {
              sourceMap: true,
            },
          },
          scss: {
            options: {
              sourceMap: true,
            },
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(mp3|mp4|webm)$/,
        loader: 'file-loader?name=[path][name]-[hash].[ext]',
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        use: [
          'file-loader?hash=sha1&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              mozjpeg: {
                progressive: true,
                quality: 72,
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              // webp: { quality: 75 },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanPlugin(['./dist']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(
          env === 'buildDocs' || env === 'buildLib' ? 'production' : 'develop'
        ),
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'colors': path.resolve(__dirname, './src/colors.scss'),
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 3000,
    host: 'localhost',
  },
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
};

if (env === 'buildDocs') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CopyWebpackPlugin([
      { from: './.htaccess' },
    ]),
  ]);
}

if (env !== 'buildLib') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
    }),
  ]);
}

if (process.env.ANALYZE === 'true') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new BundleAnalyzerPlugin(),
  ]);
}

if (env === 'buildLib' || env === 'buildDocs') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        unsafe: true,
        'pure_getters': true,
        'unsafe_comps': true,
        'screw_ie8': true,
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi], // skip pre-minified libs
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
