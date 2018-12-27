'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ip = require('ip');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const resolve = src => path.resolve(__dirname, src);
const port = 3000;

module.exports = {
  mode,
  entry: ['@babel/polyfill', resolve('../docs/main.js')],
  output: {
    path: resolve('../docs-dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.demo\./,
        use: 'raw-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|\.demo\.)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        exclude: /\.demo\./,
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
        test: /\.(woff|woff2|eot|ttf|mp3|mp4|webm)$/,
        loader: 'file-loader?name=[path][name]-[hash].[ext]',
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: mode === 'production' ? {
              mozjpeg: {
                progressive: true,
                quality: 75,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '75-90',
                speed: 4,
              },
            } : { disable: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{ from: resolve('../docs/.htaccess') }]),
    new CleanPlugin(['../docs-dist'], { allowExternal: true }),
    new HtmlWebpackPlugin({
      template: resolve('../docs/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@components': resolve('../docs/components'),
      '@johmun/vue-tags-input': resolve('../vue-tags-input/vue-tags-input.vue'),
      '@tag-input': resolve('../vue-tags-input/tag-input.vue'),
      'colors': resolve('../docs/colors.scss'),
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port,
    public: 'localhost:' + port,
    host: '0.0.0.0',
    after() {
      console.log('\nServing on: ', 'localhost:' + port);
      console.log('IP: ', `${ip.address()}:${port}`);
    },
  },
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

if (mode === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.LoaderOptionsPlugin({ minimize: true }),
  ]);
}

if (process.env.ANALYZE === 'true') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new BundleAnalyzerPlugin(),
  ]);
}
