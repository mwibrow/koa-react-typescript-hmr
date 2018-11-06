import * as Koa from 'koa'

import appView from '../views/app'

const appCtrl = (ctx: Koa.Context) => {
  ctx.type = 'html'
  ctx.body = appView()
}

export {
  appCtrl,
}
