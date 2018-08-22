import React from 'react'
import ReactDOM from 'react-dom'

const App = () => <div>Hello World</div>

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.dispose(function() {
    // module is about to be replaced
  })
}
