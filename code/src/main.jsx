import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { ChatContextProvider } from './Context/ChatContext.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
)
