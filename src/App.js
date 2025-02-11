import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './users/pages/Users';
import MainNavigation from './common/components/Navigation/MainNavigation';
import NewLocation from './locations/pages/NewLocation/NewLocation';
import UpdateLocation from './locations/pages/UpdateLocation/UpdateLocation';
import Unnumefrumos from './locations/pages/Unnumefrumos';
import './App.css';
import UserLocations from './locations/pages/UserLocations/UserLocations';
import Auth from './users/pages/Auth';
import { AuthContext } from './common/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if(isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact><Users/></Route>
        <Route path="/:userId/locations" exact><UserLocations/></Route>
        <Route path="/locations/new" exact><NewLocation/></Route>
        <Route path="/locations/:locationId"><UpdateLocation/></Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact><Users/></Route>
        <Route path="/auth" exact><Auth/></Route>
        <Route path="/:userId/locations" exact><UserLocations/></Route>
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
      <Router>
        <MainNavigation></MainNavigation>
        <main>
           {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
