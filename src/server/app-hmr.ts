import Koa from 'koa'
import logger from 'koa-morgan'
import staticCache from 'koa-static-cache'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import path from 'path'
import webpack from 'webpack'

import appConfig from '../../webpack/webpack.config.app'
import config from './config'

const configureHMR = (app: Koa, webpackConfig: webpack.Configuration) => {
  const compiler: webpack.Compiler = webpack(webpackConfig)
  const hmrPath = '/__webpack_hmr_app'
  app.use(
    devMiddleware(compiler, {
      index: false,
      lazy: false,
      noInfo: false,
      publicPath: webpackConfig!.output!.publicPath,
      quiet: false,
      stats: {
        colors: true,
      },
      timeout: 1000 * 20,
      watchOptions: {
        aggregateTimeout: 500,
        poll: true,
      }
    })
  )
  app.use(
    hotMiddleware(compiler, {
      // log: console.log,
      heartbeat: 10 * 1000,
      path: hmrPath,
    })
  )
}

const configure = () => {
  const app: Koa = new Koa()

  app.use(logger('combined', { stream: process.stdout }))

  // Webpack
  configureHMR(app, appConfig)

  // Static cache.
  app.use(
    staticCache(path.join(__dirname, '/public/'), {
      buffer: !config.debug,
      maxAge: config.debug ? 0 : 60 * 60 * 24 * 7,
    })
  )

  return app
}

export {
  configure,
}
