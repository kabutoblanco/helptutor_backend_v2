import React, { lazy } from 'react';

// ROUTER
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
const PrivateRoute = lazy(() => import('./PrivateRoute'));

// LAYOUT
const NavBar = lazy(() => import('../layout/NavBar'));
const Home = lazy(() => import('../home'));

// AUTHENTICATION
const Login = lazy(() => import('../auth'));
const SetRole = lazy(() => import('../auth/SetRole'));

// MODULES
const Tutor = lazy(() => import('../tutor'));
const Student = lazy(() => import('../student'));
// const Moderator = lazy(() => import('../moderator'));

export default function Routing() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <PrivateRoute path={'/tutor'} component={Tutor} />
        <PrivateRoute path={'/estudiante'} component={Student} />
        <PrivateRoute path={'/rol'} component={SetRole} />
        <Route exact path={['/', '/inicio']} component={Home} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </Router>
  );
}
