import React from 'react';

import NavLateral from './NavLateral';
import Body from './Body';

export default function MainLayout({ navLateral, body }) {
  console.log(navLateral);
  return (
    <div className='container-fluid d-flex main-layout'>
      {navLateral != undefined ? (
        <div className='nav-lateral'>
          <NavLateral component={navLateral} />
        </div>
      ) : (
        <></>
      )}
      <div className='body'>
        <Body component={body} />
      </div>
    </div>
  );
}
