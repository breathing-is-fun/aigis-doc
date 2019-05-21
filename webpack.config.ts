const WebpackBar = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const env = process.env.NODE_ENV;
const rxPaths = require('rxjs/_esm5/path-mapping');
const webpack = require('webpack');

module.exports = {
  resolve: {
    alias: rxPaths(),
  },
  plugins: [
    new WebpackBar({
      name: '少女祈祷中...  ',
      color: 'cyanBright',
    }),
    new CopyWebpackPlugin([
      {
        from: './.circleci/config.yml',
        to: '.circleci/config.yml',
      },
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  devServer: {
    quiet: true,
  },
  stats: env === 'prod' ? 'normal' : 'errors-only',
};
