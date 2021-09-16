import React from 'react';

import Profile from './Profile';
import Information from '../information';
import KnowledgeArea from '../knowledge_area';
import Service from '../service';
import Nomination from '../nomination';
import Sesion from '../sesion';
import Schedule from '../schedule';

import { Route, Switch, useRouteMatch } from 'react-router-dom';

export default function index() {
  const { url } = useRouteMatch();

  console.log('dentro de perfil tutor');

  return (
    <div className=''>
      <Switch>
        <Route exact path={[`${url}/`, `${url}`]} component={Profile} />
        <Route exact path={`${url}/informacion`} component={Information} />
        <Route exact path={`${url}/especialidad`} component={KnowledgeArea} />
        <Route exact path={`${url}/asesoria`} component={Service} />
        <Route exact path={`${url}/postulacion`} component={Nomination} />
        <Route exact path={`${url}/sesion`} component={Sesion} />
        <Route exact path={`${url}/horario`} component={Schedule} />
        <Route>
          <div className=''>Página no existe</div>
        </Route>
      </Switch>
    </div>
  );
}
