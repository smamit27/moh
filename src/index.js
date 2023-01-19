
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@mui/material/styles"
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {store} from './redux/store'
import { Provider } from 'react-redux'
import {SnackbarProvider} from 'notistack'
import {theme} from './theme'
import BackDropLoader  from './components/molecules/BackDropLoader'
import StatusNotification from './components/molecules/StatusNotification'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <SnackbarProvider maxSnack={2} dense>
        <StatusNotification />
      </SnackbarProvider>
      <App />
      <BackDropLoader /> 
    </Provider> 
    </ThemeProvider>
  </React.StrictMode>
)
reportWebVitals()
