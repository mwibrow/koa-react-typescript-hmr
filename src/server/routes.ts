import * as Router from 'koa-router'

import { appCtrl } from './controllers/app'

const configureApp = (router: Router) => {
  router.get('/', appCtrl)
}

export {
  configureApp,
}
