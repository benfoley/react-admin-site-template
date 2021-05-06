import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { combineReducers, createStore } from "redux"
import { firebaseReducer, ReactReduxFirebaseProvider } from "react-redux-firebase"
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"

import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

import './index.css'
import App from './App'

import 'semantic-ui-css/semantic.min.css'

// Firebase configand initialisation
const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
}
firebase.initializeApp(config)
firebase.firestore()

// Redux store setup
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
})
const initialState = {}
const store = createStore(
  rootReducer,
  initialState
)

// React-Redux-Firebase config with Firestore
const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance
}

// Wrap the app in BrowserRouter, RRF and redux
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
