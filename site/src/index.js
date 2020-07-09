import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"

import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { applyMiddleware, compose, createStore } from "redux"
import thunk from 'redux-thunk';
import { Provider } from "react-redux"
import { getFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase"
import { createFirestoreInstance } from "redux-firestore"
import { rootReducer } from "Store/reducers"

import 'index.css'
import 'semantic-ui-css/semantic.min.css'

import App from './App'



// Get Firebase config from env
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}
const rrfConfig = {
}

firebase.initializeApp(config)
firebase.firestore()

const initialState = {}

// const middlewares = [
//   thunk.withExtraArgument(getFirebase)
// ]

const store = createStore(
  rootReducer,
  initialState,
  // compose(
  //   applyMiddleware(...middlewares)
  // )
)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // since we are using Firestore
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)
