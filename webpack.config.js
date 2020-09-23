const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const baseConfig = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    chrome: '70',
                    node: '14',
                  },
                },
              ],
              '@babel/react',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }), // Fix bugs with some modules may help
  ],
  devtool: false,
}

module.exports = [
  merge(baseConfig, {
    entry: './src/web.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.TARGET': '"web"',
      }),
    ],
  }),
  merge(baseConfig, {
    target: 'node',
    entry: './src/server.js',
    resolve: {
      mainFields: ['main', 'module'],
    },
    output: {
      path: path.resolve(__dirname, 'functions'),
      filename: 'index.js',
      libraryTarget: 'commonjs',
    },
    externals: {
      firebase: 'commonjs2 firebase',
      'firebase-functions': 'commonjs2 firebase-functions',
      'firebase-admin': 'commonjs2 firebase-admin',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.TARGET': '"node"',
      }),
    ],
  }),
]
