const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const { merge } = require('webpack-merge');
const { config } = require('process');

module.exports = function (env) {
  const isDevelopment = env === 'development';
  console.log(
    `This is a ${isDevelopment ? 'development' : 'production'} build`
  );
  const baseConfig = {
    entry: {
      vendors: ['./src/js/vendors/vendor1.js', './src/js/vendors/vendor2.js'],
      main: './src/js/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contentHash].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: './index.html',
      }),
    ],
  };
  if (isDevelopment) {
    return merge(baseConfig, {
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
      },
      devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        publicPath: '/',
      },
    });
  }
  return baseConfig;
};
