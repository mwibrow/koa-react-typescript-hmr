import NodemonPlugin from 'nodemon-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'

import pkg from '../package.json'

const rootDir = process.cwd()
const srcDir = path.resolve(rootDir, 'src')
const buildDir = path.resolve(rootDir, 'dist')
const name = 'server-hmr'
const mode = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development'

const serverConfig = {
  entry: path.resolve(srcDir, 'server', `${name}.ts`),
  externals: [nodeExternals()],
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
  node: {
    __dirname: false,
  },
  output: {
    filename: `${name}.js`,
    path: buildDir,
  },
  plugins: [
    new NodemonPlugin({
      ignore: ['*.js.map'],
      script: path.resolve(buildDir, `${name}.js`),
      verbose: true,
      watch: path.resolve(buildDir, `${name}.js`),
    }),
    new webpack.DefinePlugin({
      PKG_NAME: JSON.stringify(pkg.name),
      PKG_VERSION: JSON.stringify(`v${pkg.version}`)
    }),
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  target: 'node',
  watchOptions: {
    aggregateTimeout: 500,
    ignored: /node_modules/,
    poll: 1000
  },
}

export {
  serverConfig as default,
  serverConfig,
}
