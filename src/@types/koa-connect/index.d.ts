declare module 'koa-connect' {
  import Koa from 'koa'

  // FIXME: What should the type be here?
  function koaConnect(middleware: any): Koa.Middleware

  export = koaConnect
}