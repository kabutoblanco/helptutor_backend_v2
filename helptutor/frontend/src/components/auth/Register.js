import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addTutor, addStudent } from '../../redux/actions/auth';
import { returnErrors } from '../../redux/actions/messages';

import AuthGoogle from './AuthGoogle';

export default function index() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [role, setRole] = useState(undefined);
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [re_password, setRe_password] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onAdd = (e) => {
    e.preventDefault();
    const data = {
      user: user,
    };
    if (role != undefined) {
      if (role == 'tutor') dispatch(addTutor(data));
      else if (role == 'student') dispatch(addStudent(data));
    } else {
      dispatch(returnErrors({ detail: 'Seleccione un rol' }, 400));
    }
  };

  return isAuthenticated ? (
    <Redirect to='/rol' />
  ) : (
    <div className='container d-flex justify-content-center'>
      <div className='box-form'>
        <span className='title-component'>FORMULARIO DE REGISTRO</span>
        <form action=''>
          <div className='d-flex justify-content-center'>
            <div className='pr-1'>
              <input
                type='radio'
                name='flexRadioDefault'
                id=''
                value='tutor'
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor=''>Tutor</label>
            </div>
            <div className='pl-1'>
              <input
                type='radio'
                name='flexRadioDefault'
                id=''
                value='student'
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor=''>Estudiante</label>
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-6'>
              <div className='input-form'>
                <label className='form-label'>Nombres</label>
                <input
                  type='text'
                  name='first_name'
                  value={user.first_name}
                  onChange={onChange}
                  placeholder='Nombres'
                />
              </div>
            </div>
            <div className='col-6'>
              <div className='input-form'>
                <label className='form-label'>Apellidos</label>
                <input
                  type='text'
                  name='last_name'
                  value={user.last_name}
                  onChange={onChange}
                  placeholder='Apellidos'
                />
              </div>
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-12'>
              <div className='input-form'>
                <label className='form-label'>Correo electronico</label>
                <input
                  type='email'
                  name='email'
                  value={user.email}
                  onChange={onChange}
                  placeholder='Correo electronico'
                />
              </div>
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-6'>
              <div className='input-form'>
                <label htmlFor='' className='form-label'>
                  Contraseña
                </label>
                <input
                  type='password'
                  name='password'
                  value={user.password}
                  onChange={onChange}
                  placeholder='Contraseña'
                />
              </div>
            </div>
            <div className='col-6'>
              <div className='input-form'>
                <label htmlFor='' className='form-label'>
                  Confirmar contraseña
                </label>
                <input
                  type='password'
                  name='re_password'
                  value={re_password}
                  onChange={(e) => setRe_password(e.target.value)}
                  placeholder='Confirmar contraseña'
                />
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-primary mr-2' onClick={onAdd}>
              REGISTRARME
            </button>
            <div className=''>
              <AuthGoogle isLogin={false} role={role} />
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
