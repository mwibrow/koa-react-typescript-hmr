declare module '*.json' {
  const value: any
  export default value
}

declare module 'nodemon-webpack-plugin'
declare module 'koa-webpack-middleware'
declare module 'webpack.config.app'

declare module 'koa-connect' {
  import Koa from 'koa'

  function koaConnect(middelware: any): Koa.Middleware

  export = koaConnect
}

declare var PKG_VERSION: string
declare var PKG_NAME: string
