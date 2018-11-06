import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Index from './pages/index'

ReactDOM.render(<Index />, document.getElementById('root'))

if (module.hot) {
  module.hot!.accept()
}
