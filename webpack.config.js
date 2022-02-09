const path = require('path'); // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin'); // eslint-disable-line
const CopyPlugin = require("copy-webpack-plugin"); // eslint-disable-line

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, './src/ts/index.ts')
  },
  output: {
    path: path.resolve(__dirname, './app'),
    filename: '[name].[hash].js',
    assetModuleFilename: '[file]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/template.html'), // шаблон
      filename: 'index.html', // название выходного файла
      favicon: './flag-of-uk.jpg'
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
       // { from: "other", to: "public" },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:mp3|wav|ogg|mp4)$/i,
        type: 'asset/resource',
      },
      {
        test: /.(ts|tsx)$/i,
        loader: 'ts-loader',
        /* exclude: ['/node_modules/'], */
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      }
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}
