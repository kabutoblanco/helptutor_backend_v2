import React from 'react';

import NavLateral from './NavLateral';
import Body from './Body';

export default function MainLayout({ navLateral, body }) {
  return (
    <div className='container-fluid d-flex main-layout'>
      <div className='nav-lateral'>
        <NavLateral component={navLateral} />
      </div>
      <div className='body'>
        <Body component={body} />
      </div>
    </div>
  );
}
