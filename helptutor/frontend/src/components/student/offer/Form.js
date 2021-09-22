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
  getStudentKnowledgeAreas,
  postStudentOffer,
  patchStudentOffer,
} from '../../../services/Student';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function Form(props) {
  const { data, list, setList } = props;

  const scheme = yup.object().shape({
    knowledge_area_student: yup.object().nullable().required('Requerido'),
    title: yup.string().required('Requerido'),
  });

  // REDUX
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // LOCAL
  const [knowledgeAreasStudent, setKnowledgeAreasStudent] = useState([]);

  // VALUES CURRENT
  const offer = {
    knowledge_area_student: null,
    title: '',
    description: '',
  };

  const formik = useFormik({
    initialValues: offer,
    validationSchema: scheme,
    onSubmit: (values, { setSubmitting }) => {
      data == null ? save(values) : update(values);
    },
  });

  useEffect(() => {
    getStudentKnowledgeAreas(user.id).then((res) => {
      setKnowledgeAreasStudent(res.data);
    });
  }, []);

  useEffect(() => {
    if (data != null) {
      const knowledge_area_student = knowledgeAreasStudent.filter(
        (item) => item.id == data.knowledge_area_student
      )[0];
      formik.setValues({ ...data, knowledge_area_student: knowledge_area_student });
    } else {
      formik.setValues({
        knowledge_area_student: null,
        title: '',
      });
    }
  }, [data]);

  const save = (values) => {
    const data = {
      ...values,
      knowledge_area_student: values.knowledge_area_student.id,
    };
    dispatch({ type: ACTION_RUNNING });
    postStudentOffer(data).then((res) => {
      setList(list.concat(res.data));
      dispatch({ type: ACTION_END });
      dispatch(createMessage('Oferta guardada'));
    });
  };

  const update = (values) => {
    const data = {
      ...values,
      knowledge_area_student: values.knowledge_area_student.id,
    };
    dispatch({ type: ACTION_RUNNING });
    patchStudentOffer(data.id, data).then((res) => {
      const newList = list.map((item) => {
        if (item.id === res.data.id) return { ...res.data };
        return item;
      });
      setList(newList);
      dispatch({ type: ACTION_END });
      dispatch(createMessage('Oferta actualizada'));
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='row mb-2'>
        <div className='col-12'>
          <label htmlFor=''>Interes</label>
          <Autocomplete
            options={knowledgeAreasStudent}
            value={formik.values.knowledge_area_student}
            getOptionLabel={(option) => {
              return option.knowledge_area.name;
            }}
            onChange={(event, value) => {
              formik.setFieldValue('knowledge_area_student', value);
            }}
            renderOption={(option) => (
              <React.Fragment>
                <div className='w-100'>
                  <span>{option.knowledge_area.name}</span>
                </div>
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField {...params} label='' name='knowledge_area_student' variant='outlined' />
            )}
          />
          {formik.touched.knowledge_area_student && formik.errors.knowledge_area_student ? (
            <span className='error'>{formik.errors.knowledge_area_student}</span>
          ) : null}
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-12'>
          <label htmlFor=''>Titulo</label>
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
          <label htmlFor=''>Descripción</label>
          <textarea
            className='w-100'
            name='dNombresescription'
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder='Descripción'
            cols='30'
            rows='10'></textarea>
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
