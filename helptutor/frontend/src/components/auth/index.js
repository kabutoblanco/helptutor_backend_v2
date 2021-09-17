import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/actions/auth';

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
    <div className='container'>
      <form action=''>
        <input type='email' name='email' value={auth.email} onChange={onChange} id='' />
        <input type='password' name='password' value={auth.password} onChange={onChange} id='' />
        <button className='btn btn-primary' onClick={onLogin}>
          Ingresar
        </button>
      </form>
    </div>
  );
}
