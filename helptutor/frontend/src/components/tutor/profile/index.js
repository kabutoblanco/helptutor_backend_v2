import React from 'react';

import Profile from './profile'
import Information from '../information';
import KnowledgeArea from '../knowledge_area';
import Service from '../service';
import Nomination from '../nomination';
import Sesion from '../sesion';
import Schedule from '../schedule';

import { Route, Switch, useRouteMatch } from 'react-router-dom';

export default function index() {
  const { path } = useRouteMatch();

  return (
    <div className=''>
      <Switch>
        <Route exact path={`${path}`} component={Profile} />
        <Route exact path={`${path}/informacion`} component={Information} />
        <Route exact path={`${path}/especialidad`} component={KnowledgeArea} />
        <Route exact path={`${path}/asesoria`} component={Service} />
        <Route exact path={`${path}/postulacion`} component={Nomination} />
        <Route exact path={`${path}/sesion`} component={Sesion} />
        <Route exact path={`${path}/horario`} component={Schedule} />
      </Switch>
    </div>
  );
}
