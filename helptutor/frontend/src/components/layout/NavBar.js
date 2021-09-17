import React, { useState } from 'react';

// ROUTER
import { useHistory } from 'react-router-dom';

// REDUX
import { useSelector, useDispatch } from 'react-redux';

// ACTIONS
import { logout } from '../../redux/actions/auth';

import { Avatar, Menu, MenuItem } from '@material-ui/core';

export default function NavBar() {
  const dispacth = useDispatch();
  const auth = useSelector((state) => state.auth);

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const authLinks =
    auth.roleCurrent != null ? (
      <>
        <Avatar
          className='avatar'
          aria-controls='menu'
          onClick={handleOpen}
          alt='user photo'
          src={auth.user != null ? auth.user.photo : ''}>
          <b>{auth.user != null ? auth.user.first_name[0] : ''}</b>
        </Avatar>
        <Menu
          id='menu'
          aria-labelledby='menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem
            onClick={() => {
              history.push('/' + auth.roleCurrent + '/perfil');
              handleClose();
            }}>
            Perfil
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              dispacth(logout());
            }}>
            Cerrar sesión
          </MenuItem>
        </Menu>
      </>
    ) : (
      <></>
    );
  const guestLinks = (
    <>
      <button className='btn btn-outline-primary mr-2' onClick={() => history.push('login')}>
        REGISTRARME
      </button>
      <button className='btn btn-outline-primary' onClick={() => history.push('login')}>
        INICIAR SESION
      </button>
    </>
  );

  return (
    <div className='navbar navbar-main'>
      <div className='container-fluid'>
        <a href='' className='navbar-brand'>
          Helptutor
        </a>
        <div className='navbar-profile'>{auth.isAuthenticated ? authLinks : guestLinks}</div>
      </div>
    </div>
  );
}
