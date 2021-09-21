import React, { useState, useEffect } from 'react';

import { useFormik, getIn } from 'formik';
import * as yup from 'yup';

// REDUX
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { createMessage } from '../../../redux/actions/messages';
import { ACTION_END, ACTION_RUNNING } from '../../../redux/actions/types';

// SERVICES
import {
  getTutorKnowledgeAreas,
  postTutorService,
  patchTutorService,
} from '../../../services/Tutor';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function Form(props) {
  const { data, list, setList } = props;

  const scheme = yup.object().shape({
    knowledge_area_tutor: yup.object().nullable().required('Requerido'),
    title: yup.string().required('Requerido'),
    price: yup.number().positive('Debe ser un valor positivo'),
  });

  // REDUX
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // LOCAL
  const [knowledgeAreasTutor, setKnowledgeAreasTutor] = useState([]);

  // VALUES CURRENT
  const service = {
    knowledge_area_tutor: null,
    title: '',
    price: 0.0,
  };

  const formik = useFormik({
    initialValues: service,
    validationSchema: scheme,
    onSubmit: (values, { setSubmitting }) => {
      data == null ? save(values) : update(values);
    },
  });

  useEffect(() => {
    getTutorKnowledgeAreas(user.id).then((res) => {
      setKnowledgeAreasTutor(res.data);
    });
  }, []);

  useEffect(() => {
    if (data != null) {
      const knowledge_area_tutor = knowledgeAreasTutor.filter(
        (item) => item.id == data.knowledge_area_tutor
      )[0];
      formik.setValues({ ...data, knowledge_area_tutor: knowledge_area_tutor });
    } else {
      formik.setValues({
        knowledge_area_tutor: null,
        title: '',
        price: 0.0,
      });
    }
  }, [data]);

  const save = (values) => {
    const data = {
      ...values,
      knowledge_area_tutor: values.knowledge_area_tutor.id,
    };
    dispatch({ type: ACTION_RUNNING });
    postTutorService(data).then((res) => {
      setList(list.concat(res.data));
      dispatch({ type: ACTION_END });
      dispatch(createMessage('Oferta guardada'));
    });
  };

  const update = (values) => {
    const data = {
      ...values,
      knowledge_area_tutor: values.knowledge_area_tutor.id,
    };
    dispatch({ type: ACTION_RUNNING });
    patchTutorService(data.id, data).then((res) => {
      const newList = list.map((item) => {
        if (item.id === res.data.id) return { ...res.data };
        return item;
      });
      setList(newList);
      dispatch({ type: ACTION_END });
      dispatch(createMessage('Asesoria actualizada'));
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='row mb-2'>
        <div className='col-12'>
          <Autocomplete
            options={knowledgeAreasTutor}
            value={formik.values.knowledge_area_tutor}
            getOptionLabel={(option) => {
              return option.knowledge_area.name;
            }}
            onChange={(event, value) => {
              formik.setFieldValue('knowledge_area_tutor', value);
            }}
            renderOption={(option) => (
              <React.Fragment>
                <div className='w-100'>
                  <span>{option.knowledge_area.name}</span>
                </div>
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField {...params} label='' name='knowledge_area_tutor' variant='outlined' />
            )}
          />
          {formik.touched.knowledge_area_tutor && formik.errors.knowledge_area_tutor ? (
            <span className='error'>{formik.errors.knowledge_area_tutor}</span>
          ) : null}
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-12'>
          <input
            className='w-100'
            type='text'
            name='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder='Titulo'
          />
          {formik.touched.title && formik.errors.title ? (
            <span className='error'>{formik.errors.title}</span>
          ) : null}
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-12'>
          <input
            className='w-100'
            type='number'
            name='price'
            value={formik.values.price}
            onChange={formik.handleChange}
            placeholder='Precio'
          />
          {formik.touched.price && formik.errors.price ? (
            <span className='error'>{formik.errors.price}</span>
          ) : null}
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <button className='btn btn-primary' type='submit'>
          {data == null ? 'GUARDAR' : 'ACTUALIZAR'}
        </button>
      </div>
    </form>
  );
}
