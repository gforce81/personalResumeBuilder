import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './lib/initializeDatabase' // Make initializeDatabase available in console
import './utils/suppressWarnings' // Suppress noisy console warnings in development

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

