const WebpackBar = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const env = process.env.NODE_ENV;

module.exports = {
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
  ],
  devServer: {
    quiet: true,
  },
  stats: env === 'prod' ? 'normal' : 'errors-only',
};
