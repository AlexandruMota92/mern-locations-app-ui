import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './users/pages/Users';
import Auth from './users/pages/Auth';
import MainNavigation from './common/components/Navigation/MainNavigation';
import NewLocation from './locations/pages/NewLocation/NewLocation';
import UpdateLocation from './locations/pages/UpdateLocation/UpdateLocation';
import UserLocations from './locations/pages/UserLocations/UserLocations';
import { AuthContext } from './common/context/auth-context';
import './App.css';
import useAuth from './common/hooks/auth-hook';

const App = () => {

  const { token, userId, login, logout } = useAuth();

  let routes;
  if(token) {
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
    <AuthContext.Provider value={{isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout}}>
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
