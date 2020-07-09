import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from 'Components/Home'
import EntryList from 'Components/EntryList'
import Entry from 'Components/Entry'

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact />
      <Route path="/entries" component={EntryList} />
      <Route path="/entry/:id" component={Entry} />
    </BrowserRouter>
  );
}

export default App;
