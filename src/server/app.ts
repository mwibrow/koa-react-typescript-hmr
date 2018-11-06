import proxy from 'http-proxy-middleware'
import Koa from 'koa'
import connect from 'koa-connect'
import logger from 'koa-morgan'
import Router from 'koa-router'
import staticCache from 'koa-static-cache'
import path from 'path'

import config from './config'
import processEnv from './env'
import { configureApp } from './routes'

const isDevelopment = () => processEnv.NODE_ENV !== 'production'

const configure = () => {
  const app = new Koa()

  app.use(logger('combined', { stream: process.stdout }))

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
}
