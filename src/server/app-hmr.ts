import canopi from 'canopi'
import Koa from 'koa'
import logger from 'koa-morgan'
import staticCache from 'koa-static-cache'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import path from 'path'
import { Writable } from 'stream'
import webpack from 'webpack'

import appConfig from '../../webpack/webpack.config.app'
import config from './config'

canopi.setOutputStream(process.stdout)
const log = canopi('hmr-server')

class RequestLogger extends Writable {
  public stream: any
  constructor(stream: any, ...args: any[]) {
    super(...args)
    this.stream = stream
  }
  public _write(chunk: object, enc: any, cb: (err: Error | null) => void) {
    if (this.stream) {
      this.stream.info(chunk.toString().trim())
    }
    cb(null)
  }
}

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

  app.use(logger('combined', { stream: new RequestLogger(log) }))

  // Get request uid into logger.
  app.use(async (ctx, next) => {
    const id = ctx.headers['x-req-id']
    ctx.request._reqId = id
    ctx.request._log = log(`req-${id}`)
    ctx.response.set('x-req-id', id)
    await next()
  })

  // Webpack
  configureHMR(app, appConfig)

  // Mount routers
  app.use(
    staticCache(path.join(__dirname, '/public/'), {
      buffer: !config.debug,
      maxAge: config.debug ? 0 : 60 * 60 * 24 * 7,
    })
  )

  return app
}

export { configure, log }
