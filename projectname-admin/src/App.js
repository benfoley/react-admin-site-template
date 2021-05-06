import React from 'react';
import { Admin, Resource } from 'react-admin';
import { FirebaseAuthProvider, FirebaseDataProvider } from 'react-admin-firebase';
import { PageList, PageShow, PageCreate, PageEdit } from './Page';
import Dashboard from './Dashboard';

// Get Firebase config from env
const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

const options = { relativeFilePaths: false };
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);

const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard} >
    <Resource name="pages" list={PageList} create={PageCreate} show={PageShow} edit={PageEdit} />
  </Admin >
)

export default App;
