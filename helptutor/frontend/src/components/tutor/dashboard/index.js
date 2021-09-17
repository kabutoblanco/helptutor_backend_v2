import React from 'react';

import { Route, Switch, useRouteMatch } from 'react-router-dom';

import MainLayout from '../../layout/MainLayout';
import NavBar from '../layout/NavBar';

import Offer from '../offer';
import Advertisement from '../advertisement';

export default function index() {
  const { url } = useRouteMatch();

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path={[`${url}/`, `${url}/oferta`]} component={Offer} />
        <Route exact path={`${url}/anuncio`} component={Advertisement} />
        <Route>
          <div className=''>Página no existe</div>
        </Route>
      </Switch>
    </div>
  );
}
