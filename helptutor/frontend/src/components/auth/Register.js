import React, { useState } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addTutor, addStudent } from '../../redux/actions/auth';
import { returnErrors } from '../../redux/actions/messages';

import AuthGoogle from './AuthGoogle';

export default function index() {
  const scheme = yup.object().shape({
    first_name: yup.string().required('Requerido'),
    last_name: yup.string().required('Requerido'),
    email: yup.string().required('Requerido'),
    password: yup.string().required('Requerido'),
    re_password: yup
      .mixed()
      .test('equals', 'Revise la contraseña', function () {
        return this.parent.password == this.parent.re_password;
      })
      .required('Requerido'),
  });

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [role, setRole] = useState(undefined);

  const auth = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: '',
  };

  const formik = useFormik({
    initialValues: auth,
    validationSchema: scheme,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(onAdd(values));
    },
  });

  const onAdd = (values) => {
    const data = {
      user: values,
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
        <form onSubmit={formik.handleSubmit}>
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
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  placeholder='Nombres'
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <span className='error'>{formik.errors.first_name}</span>
                ) : null}
              </div>
            </div>
            <div className='col-6'>
              <div className='input-form'>
                <label className='form-label'>Apellidos</label>
                <input
                  type='text'
                  name='last_name'
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  placeholder='Apellidos'
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <span className='error'>{formik.errors.last_name}</span>
                ) : null}
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
            <div className='col-6'>
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
            <div className='col-6'>
              <div className='input-form'>
                <label htmlFor='' className='form-label'>
                  Confirmar contraseña
                </label>
                <input
                  type='password'
                  name='re_password'
                  value={formik.values.re_password}
                  onChange={formik.handleChange}
                  placeholder='Confirmar contraseña'
                />
                {formik.touched.re_password && formik.errors.re_password ? (
                  <span className='error'>{formik.errors.re_password}</span>
                ) : null}
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <button type='submit' className='btn btn-primary mr-2'>
              REGISTRARME
            </button>
            <div className=''>
              <AuthGoogle isLogin={false} role={role} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
