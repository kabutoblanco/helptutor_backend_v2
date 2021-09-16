import React from 'react';

import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className='navbar navbar-submain'>
      <div className='container-fluid'>
        <ul className='navbar-nav navbar-menu'>
          <li className='nav-item mr-4'>
            <Link className='nav-link' to='/tutor/oferta'>Ofertas</Link>
          </li>
          <li class='nav-item'>
            <Link className='nav-link' to='/tutor/anuncio'>Anuncios</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
