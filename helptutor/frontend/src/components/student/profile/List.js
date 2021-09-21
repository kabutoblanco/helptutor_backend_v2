import React, { useState, useEffect } from 'react';

// REDUX
import { useSelector } from 'react-redux';

import { Avatar } from '@material-ui/core';

import { Link, useLocation } from 'react-router-dom';

export default function List() {
  const menu = [
    { id: 0, icon: 'fas fa-user', path: '/estudiante/perfil', label: 'Ver perfil' },
    {
      id: 1,
      icon: 'fas fa-user-edit',
      path: '/estudiante/perfil/informacion',
      label: 'Editar información',
    },
    {
      id: 2,
      icon: 'fas fa-briefcase',
      path: '/estudiante/perfil/interes',
      label: 'Intereses',
    },
    { id: 2, icon: 'fas fa-briefcase', path: '/estudiante/perfil/oferta', label: 'Ofertas' },
    {
      id: 2,
      icon: 'fas fa-briefcase',
      path: '/estudiante/perfil/postulacion',
      label: 'Postulaciones',
    },
    { id: 2, icon: 'fas fa-briefcase', path: '/estudiante/perfil/acuerdo', label: 'Acuerdos' },
    { id: 2, icon: 'fas fa-calendar-alt', path: '/estudiante/perfil/sesion', label: 'Sesiones' },
  ];

  const [id, setId] = useState(0);

  const auth = useSelector((state) => state.auth);
  const pathname = useLocation().pathname;

  useEffect(() => {
    switch (pathname) {
      case '/estudiante/perfil':
        setId(0);
        break;
      case '/estudiante/perfil/informacion':
        setId(1);
        break;
    }
  }, []);

  return (
    <div>
      <div className='profile'>
        <Avatar alt='user photo' src={auth.user != null ? auth.user.photo : ''}>
          <b>{auth.user != null ? auth.user.first_name[0] : ''}</b>
        </Avatar>
        <span className='profile-name'>
          {auth.user != null ? auth.user.first_name + ' ' + auth.user.last_name : ''}
        </span>
      </div>
      <ul className='list-group mt-1'>
        {menu.map((item) => (
          <div key={item.path} className={'item-list item-menu' + (item.id == id ? ' active' : '')}>
            <i className={item.icon}></i>
            <Link to={item.path}>{item.label}</Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
