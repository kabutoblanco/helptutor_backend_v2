import React from 'react';

import Profile from './Profile'
import Information from '../information';
import KnowledgeArea from '../knowledge_area';
import Offer from '../offer';
import Aggrement from '../aggrement';
import Sesion from '../sesion';

import { Route, Switch, useRouteMatch } from 'react-router-dom';

export default function index() {
  const { url } = useRouteMatch();

  return (
    <div className=''>
      <Switch>
        <Route exact path={`${url}`} component={Profile} />
        <Route exact path={`${url}/informacion`} component={Information} />
        <Route exact path={`${url}/interes`} component={KnowledgeArea} />
        <Route exact path={`${url}/oferta`} component={Offer} />
        <Route exact path={`${url}/acuerdo`} component={Aggrement} />
        <Route exact path={`${url}/sesion`} component={Sesion} />
      </Switch>
    </div>
  );
}
