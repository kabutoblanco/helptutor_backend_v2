import React from 'react';

import { Link } from 'react-router-dom';

export default function List() {
  const menu = [
    { path: '/tutor/perfil', label: 'Ver perfil' },
    { path: '/tutor/perfil/informacion', label: 'Editar información' },
    { path: '/tutor/perfil/especialidad', label: 'Especialidades' },
    { path: '/tutor/perfil/asesoria', label: 'Asesorias' },
    { path: '/tutor/perfil/postulacion', label: 'Postulaciones' },
    { path: '/tutor/perfil/sesion', label: 'Sesiones' },
    { path: '/tutor/perfil/horario', label: 'Horario' },
  ];

  return (
    <div>
      <ul className='list-group mt-1'>
        {menu.map((item) => (
          <div key={item.path} className='item-list'>
            <Link to={item.path}>{item.label}</Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
