import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './users/pages/Users';
import MainNavigation from './common/components/Navigation/MainNavigation';
import NewLocation from './locations/pages/NewLocation/NewLocation';
import Unnumefrumos from './locations/pages/Unnumefrumos';
import './App.css';
import UserLocations from './locations/pages/UserLocations/UserLocations';

const App = () => {

  return (
    <Router>
      <MainNavigation></MainNavigation>
      <main>
        <Switch>
          <Route path="/" exact><Users/></Route>
          <Route path="/locations/new" exact><NewLocation/></Route>
          <Route path="/:userId/locations" exact><UserLocations/></Route>
          <Route path="/locations/Unnumefrumos" exact><Unnumefrumos/></Route>
          <Redirect to="/"/>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
