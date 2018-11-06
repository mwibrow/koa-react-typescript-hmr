import appConfig from './webpack/webpack.config.app'
import hmrConfig from './webpack/webpack.config.hmr'
import serverConfig from './webpack/webpack.config.server'

const config = (env: string) => {
  switch (env) {
    case 'app':
      return appConfig
    case 'hmr':
      return hmrConfig
    case 'server':
      return serverConfig
    default:
      return [
        appConfig,
        hmrConfig,
        serverConfig,
      ]
  }
}

module.exports = config
