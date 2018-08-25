import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './components/App'

import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.dispose(() => {
    // module is about to be replaced
  })
}
