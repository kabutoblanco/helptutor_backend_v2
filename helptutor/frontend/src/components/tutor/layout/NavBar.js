import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const [id, setId] = useState(0);

  const pathname =  useLocation().pathname;

  useEffect(() => {
    switch (pathname) {
      case '/tutor':
      case '/tutor/oferta':
        setId(0);
        break;
      case '/tutor/anuncio':
        setId(1);
        break;
    }
  }, []);
  
  return (
    <div className='navbar navbar-submain'>
      <div className='container-fluid'>
        <ul className='navbar-nav navbar-menu'>
          <li className='nav-item mr-4'>
            <Link className={id == 0 ? 'navbar-active' : ''} to='/tutor/oferta' onClick={() => setId(0)}>
              Ofertas
            </Link>
          </li>
          <li className='nav-item'>
            <Link className={id == 1 ? 'navbar-active' : ''} to='/tutor/anuncio' onClick={() => setId(1)}>
              Anuncios
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
