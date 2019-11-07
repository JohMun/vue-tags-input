'use strict';
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const resolve = src => path.resolve(__dirname, src);

module.exports = {
  mode: 'production',
  entry: [resolve('../vue-tags-input/publish.js')],
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    filename: 'vue-tags-input.js',
    library: 'vueTagsInput',
    libraryTarget: 'umd',
  },
  externals:{
    vue: 'vue',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
            presets: ['@babel/preset-env']
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')(),
              ],
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanPlugin(['../dist'], { allowExternal: true }),
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  devtool: '#source-map',
  optimization: {
    minimize: true,
  },
};
