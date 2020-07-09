import React from 'react';
import { Admin, Resource } from 'react-admin';
import { FirebaseAuthProvider, FirebaseDataProvider } from 'react-admin-firebase';
import { EntryList, EntryShow, EntryCreate, EntryEdit } from './Components/Entry';
import Dashboard from './Dashboard';

// Get Firebase config from env
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Seems to still neeed empty options. See https://github.com/benwinding/react-admin-firebase/issues/35
const options = { relativeFilePaths: false };
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);

const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard} >

    <Resource name="entries" list={EntryList} create={EntryCreate} show={EntryShow} edit={EntryEdit} />

  </Admin >
)

export default App;
