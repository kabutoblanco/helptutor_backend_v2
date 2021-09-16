import React, { useEffect } from 'react';

import Dashboard from './dashboard';
import Profile from './profile';

import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRole } from '../../redux/actions/auth';

export default function index() {
  const dispatch = useDispatch();

  const { path } = useRouteMatch();

  useEffect(() => {
    dispatch(setRole('tutor'));
  }, []);

  console.log('tutor general');
  console.log(path);

  return (
    <div className=''>
      <Switch>
        <Route path={`${path}/perfil`} component={Profile} />
        <Route path={`${path}`} component={Dashboard} />
        <Route>
          <div className=''>Página no existe</div>
        </Route>
      </Switch>
    </div>
  );
}
