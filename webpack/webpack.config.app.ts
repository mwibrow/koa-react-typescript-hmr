import * as path from 'path'
import * as webpack from 'webpack'

import pkg from '../package.json'

const version = `v${pkg.version}`

const rootDir = process.cwd()
const srcDir = path.resolve(rootDir, 'src')
const distDir = path.resolve(rootDir, 'dist')
const publicDir = path.resolve(distDir, 'public', version)

const mode = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development'

const webpackHMRPath = '/__webpack_hmr_app'

const appConfig: webpack.Configuration = {
  entry: {
    app: [
      `webpack-hot-middleware/client?path=${webpackHMRPath}&timeout=20000`,
      path.resolve(srcDir, 'app', 'index.tsx'),
    ]
  },
  mode,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    filename: path.join('js', 'bundle.js'),
    path: publicDir,
    publicPath: `/${version}/`,
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  target: 'web',
  watchOptions: {
    aggregateTimeout: 500,
    ignored: /node_modules/,
    poll: 1000
  }
}

export {
  appConfig as default,
  appConfig,
}
