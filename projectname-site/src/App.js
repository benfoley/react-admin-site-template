import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from 'Components/Home'
import PageList from 'Components/PageList'
import Page from 'Components/Page'

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact />
      <Route path="/pages" component={PageList} />
      <Route path="/page/:name" component={Page} />
    </BrowserRouter>
  );
}

export default App;
