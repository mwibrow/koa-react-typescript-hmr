
import * as http from 'http'

import { configure } from './app'
import config from './config'

const app = configure()
const server = http.createServer(app.callback())

server.listen(config.port)

export {
  server as default,
}
