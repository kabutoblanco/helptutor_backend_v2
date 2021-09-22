import React, { useEffect, useState } from 'react';

import { useFormik, getIn } from 'formik';
import * as yup from 'yup';

// REDUX
import { useSelector, useDispatch } from 'react-redux';

// ACTIONS
import { loadUser } from '../../../redux/actions/auth';
import { createMessage } from '../../../redux/actions/messages';
import { ACTION_RUNNING, ACTION_END } from '../../../redux/actions/types';

// SERVICES
import { patchStudent } from '../../../services/Student';
import useStudent from '../../../query/useStudent';

export default function Form() {
  const scheme = yup.object().shape({
    user: yup.object().shape({
      first_name: yup.string().required('Requerido'),
      last_name: yup.string().required('Requerido'),
    }),
  });

  // REDUX
  const dispacth = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // QUERY
  const { data, isLoading } = useStudent(user.id);

  // LOCAL
  const student = data || {
    user: user,
  };

  const formik = useFormik({
    initialValues: student,
    validationSchema: scheme,
    onSubmit: (values, { setSubmitting }) => {
      update(values);
    },
  });

  useEffect(() => {
    if (data) formik.setValues(data);
  }, [data]);

  const update = (values) => {
    dispacth({ type: ACTION_RUNNING });
    patchStudent(user.id, values).then((res) => {
      formik.setValues(res.data);
      dispacth(loadUser);
      dispacth({ type: ACTION_END });
      dispacth(createMessage('Información actualizada'));
      dispacth(createMessage(''));
    });
  };

  return isLoading ? (
    <span>Load</span>
  ) : (
    <form onSubmit={formik.handleSubmit}>
      <div className='row'>
        <div className='col-md-6 mb-2'>
          <label htmlFor=''>Nombres</label>
          <input
            className='w-100'
            type='text'
            name='user.first_name'
            value={formik.values.user.first_name}
            onChange={formik.handleChange}
            placeholder='Nombres'
          />
          {getIn(formik.touched, 'user.first_name') && getIn(formik.errors, 'user.first_name') ? (
            <span className='error'>{getIn(formik.errors, 'user.first_name')}</span>
          ) : null}
        </div>
        <div className='col-md-6 mb-2'>
          <label htmlFor=''>Apellidos</label>
          <input
            className='w-100'
            type='text'
            name='user.last_name'
            value={formik.values.user.last_name}
            onChange={formik.handleChange}
            placeholder='Apellidos'
          />
          {getIn(formik.touched, 'user.last_name') && getIn(formik.errors, 'user.last_name') ? (
            <span className='error'>{getIn(formik.errors, 'user.last_name')}</span>
          ) : null}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 mb-2'>
          <label htmlFor=''>Correo electronico</label>
          <input
            className='w-100'
            type='email'
            name='user.email'
            value={formik.values.user.email}
            onChange={formik.handleChange}
            disabled={true}
            placeholder='Correo electronico'
          />
        </div>
        <div className='col-md-6 mb-2'>
          <label htmlFor=''>Telefono</label>
          <input
            className='w-100'
            type='text'
            name='user.telephone'
            value={formik.values.user.telephone}
            onChange={formik.handleChange}
            placeholder='Telefono'
          />
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-md-6'>
          <label htmlFor=''>Fecha de nacimiento</label>
          <input
            className='w-100'
            type='date'
            name='user.birthday'
            value={formik.values.user.birthday}
            onChange={formik.handleChange}
            placeholder='Fecha de nacimiento'
          />
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-12'>
          <label htmlFor=''>Intereses</label>
          <textarea
            className='w-100'
            name='user.interest'
            value={formik.values.user.interest}
            onChange={formik.handleChange}
            cols='30'
            rows='5'
            placeholder='Intereses'></textarea>
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <button type='submit' className='btn btn-primary'>
          GUARDAR
        </button>
      </div>
    </form>
  );
}
