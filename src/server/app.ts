import canopi from 'canopi'
import proxy from 'http-proxy-middleware'
import Koa from 'koa'
import connect from 'koa-connect'
import logger from 'koa-morgan'
import Router from 'koa-router'
import staticCache from 'koa-static-cache'
import path from 'path'
import { Writable } from 'stream'

import config from './config'
import processEnv from './env'
import { configureApp } from './routes'

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

const isDevelopment = () => processEnv.NODE_ENV !== 'production'

const configure = () => {
  const app = new Koa()

  app.use(logger('combined', { stream: new RequestLogger(log) }))

  if (isDevelopment) {
    app.use(connect(proxy(
      `/${config.version}`,
      { target: `http://localhost:${config.hmrPort}` })))
    app.use(connect(proxy(
      '/__webpack_hmr_*',
      { target: `http://localhost:${config.hmrPort}` })))
  }

  const appRouter = new Router()
  configureApp(appRouter)
  app.use(appRouter.middleware())

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
  log,
}
