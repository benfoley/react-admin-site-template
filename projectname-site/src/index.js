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


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyARvro_S5rvzchZyNklERvRxqJpKP03r4w",
  authDomain: "react-site-template-bf.firebaseapp.com",
  projectId: "react-site-template-bf",
  storageBucket: "react-site-template-bf.appspot.com",
  messagingSenderId: "218255874481",
  appId: "1:218255874481:web:344dd3dd0d556e8e7b4590"
};

firebase.initializeApp(firebaseConfig)
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
