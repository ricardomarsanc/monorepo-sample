import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // Strict mode will render every component twice on purpose, to ensure
  // you are not causing any side effect to the components you're developing
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
