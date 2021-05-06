import React from 'react';
import { Admin, Resource } from 'react-admin';
import { FirebaseAuthProvider, FirebaseDataProvider } from 'react-admin-firebase';
import { PageList, PageShow, PageCreate, PageEdit } from './Page';
import Dashboard from './Dashboard';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyARvro_S5rvzchZyNklERvRxqJpKP03r4w",
  authDomain: "react-site-template-bf.firebaseapp.com",
  projectId: "react-site-template-bf",
  storageBucket: "react-site-template-bf.appspot.com",
  messagingSenderId: "218255874481",
  appId: "1:218255874481:web:344dd3dd0d556e8e7b4590"
};
const options = { relativeFilePaths: false };
const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authProvider = FirebaseAuthProvider(firebaseConfig, options);

const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard} >
    <Resource name="pages" list={PageList} create={PageCreate} show={PageShow} edit={PageEdit} />
  </Admin >
)

export default App;
