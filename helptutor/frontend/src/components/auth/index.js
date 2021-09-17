import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/actions/auth';

import AuthGoogle from './AuthGoogle';

export default function index() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [auth, setAuth] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setAuth({ ...auth, [name]: value });
  };

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(login(auth));
  };

  return isAuthenticated ? (
    <Redirect to='/rol' />
  ) : (
    <div className='container d-flex justify-content-center'>
      <div className='box-form'>
        <span className='title-component'>INICIAR SESION</span>
        <form action=''>
          <div className='row mb-2'>
            <div className='col-12'>
              <div className='input-form'>
                <label className='form-label'>Correo electronico</label>
                <input
                  type='email'
                  name='email'
                  value={auth.email}
                  onChange={onChange}
                  placeholder='Correo electronico'
                />
              </div>
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-12'>
              <div className='input-form'>
                <label htmlFor='' className='form-label'>
                  Contraseña
                </label>
                <input
                  type='password'
                  name='password'
                  value={auth.password}
                  onChange={onChange}
                  placeholder='Contraseña'
                />
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-primary mr-2' onClick={onLogin}>
              INGRESAR
            </button>
            <div className=''>
              <AuthGoogle isLogin={true} />
            </div>
          </div>
          <span className='span-description'>
            ¿No tienes cuenta?, <a href=''>haz click para registrarte</a>
          </span>
        </form>
      </div>
    </div>
  );
}
