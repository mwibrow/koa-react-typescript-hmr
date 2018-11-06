
import * as http from 'http'

import { configure } from './app-hmr'
import config from './config'

const app = configure()
const server = http.createServer(app.callback())

server.listen(config.hmrPort)

export {
  server as default,
}
