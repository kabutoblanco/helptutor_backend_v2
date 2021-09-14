import React from 'react';

import Dashboard from './dashboard';
import Profile from './profile';

import { Route, Switch, useRouteMatch } from 'react-router-dom';

export default function index() {
  const { path } = useRouteMatch();

  return (
    <div className=''>
      <Switch>
        <Route exact path={`${path}`} component={Dashboard} />
        <Route path={`${path}/perfil`} component={Profile} />
      </Switch>
    </div>
  );
}
