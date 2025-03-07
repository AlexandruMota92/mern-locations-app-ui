import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './users/pages/Users';
import NewLocation from './locations/pages/NewLocation';
import './App.css';

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/" exact><Users/></Route>
        <Route path="/locations/new" exact><NewLocation/></Route>
        <Redirect to="/"/>
      </Switch>
    </Router>
  );
};

export default App;
