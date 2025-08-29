const path = require('path')
const WebpackReactComponentNamePlugin = require('webpack-react-component-name')
const NpmDtsPlugin = require('npm-dts-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.ts',
    library: {
      name: 'hmrc-gds-react-components',
      type: 'umd'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/

      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new WebpackReactComponentNamePlugin(),
    new NpmDtsPlugin({
      entry: 'main.js',
      logLevel: 'debug'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: 'source-map',
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  }
}
