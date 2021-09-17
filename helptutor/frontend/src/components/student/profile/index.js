import React from 'react';

import Profile from './profile'
import Information from '../information';
import KnowledgeArea from '../knowledge_area';
import Offer from '../offer';
import Aggrement from '../aggrement';
import Sesion from '../sesion';

import { Route, Switch, useRouteMatch } from 'react-router-dom';

export default function index() {
  const { path } = useRouteMatch();

  return (
    <div className=''>
      <div className='div'>Perfil inicial</div>
      <Switch>
        <Route exact path={`${path}`} component={Profile} />
        <Route exact path={`${path}/informacion`} component={Information} />
        <Route exact path={`${path}/interes`} component={KnowledgeArea} />
        <Route exact path={`${path}/oferta`} component={Offer} />
        <Route exact path={`${path}/acuerdo`} component={Aggrement} />
        <Route exact path={`${path}/sesion`} component={Sesion} />
      </Switch>
    </div>
  );
}
