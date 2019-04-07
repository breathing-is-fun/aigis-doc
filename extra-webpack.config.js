const WebpackBar = require('webpackbar');

module.exports = {
  plugins: [
    new WebpackBar({
      name: '少女祈祷中...  ',
      color: 'cyanBright',
    }),
  ],
  devServer: {
    quiet: true,
  },
  stats: 'errors-only',
};
