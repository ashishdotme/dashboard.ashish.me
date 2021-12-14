import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import store from './slices/store'

ReactDOM.render(
  <Auth0Provider
    domain="ashish-prod.us.auth0.com"
    audience="systemapi.ashish.me"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
    scope="openid profile email manage:admin"
    clientId="JUFVd6bj3SQCpXfIjbsMilfyAMS9lagB"
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
