import React from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { Redirect, Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/actions/auth';

import AuthGoogle from './AuthGoogle';

export default function index() {
  const scheme = yup.object().shape({
    email: yup.string().required('Requerido'),
    password: yup.string().required('Requerido'),
  });

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const auth = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues: auth,
    validationSchema: scheme,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(login(values));
    },
  });

  return isAuthenticated ? (
    <Redirect to='/rol' />
  ) : (
    <div className='container d-flex justify-content-center'>
      <div className='box-form'>
        <span className='title-component'>INICIAR SESION</span>
        <form onSubmit={formik.handleSubmit}>
          <div className='row mb-2'>
            <div className='col-12'>
              <div className='input-form'>
                <label className='form-label'>Correo electronico</label>
                <input
                  type='email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder='Correo electronico'
                />
                {formik.touched.email && formik.errors.email ? (
                  <span className='error'>{formik.errors.email}</span>
                ) : null}
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder='Contraseña'
                />
                {formik.touched.password && formik.errors.password ? (
                  <span className='error'>{formik.errors.password}</span>
                ) : null}
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <button type='submit' className='btn btn-primary mr-2'>
              INGRESAR
            </button>
            <div className=''>
              <AuthGoogle isLogin={true} />
            </div>
          </div>
          <span className='span-description'>
            ¿No tienes cuenta?, <Link to='/registro'>haz click para registrarte</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
