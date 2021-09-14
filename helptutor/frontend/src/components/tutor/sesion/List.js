import React from 'react';

import ItemList from './ItemList'

export default function List() {
  return (
    <div className=''>
      <span className='title-component'>Mis sesiones</span>
      <ul className='list-group'>
        <ItemList data={{name: 'sesion1'}} />
      </ul>
    </div>
  );
}
