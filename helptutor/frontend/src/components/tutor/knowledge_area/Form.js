import React, { useState, useEffect } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

// REDUX
import { useDispatch } from 'react-redux';

// ACTIONS
import { createMessage } from '../../../redux/actions/messages';
import { ACTION_END, ACTION_RUNNING } from '../../../redux/actions/types';

// SERVICES
import { useKnowledgeAreas } from '../../../query/useKnowledgeArea';

import { getKnowledgeAreas, getSubKnowledgeAreas } from '../../../services/KnowledgeArea';
import { postTutorKnowledgeArea, patchTutorKnowledgeArea } from '../../../services/Tutor';

import Certificate from '../certificate';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function Form(props) {
  const { data, list, setList } = props;

  const scheme = yup.object().shape({
    knowledge_area: yup.object().nullable().required('Requerido'),
  });

  // REDUX
  const dispatch = useDispatch();

  // LOCAL
  const knowledgeAreas = useKnowledgeAreas().data;

  // const [knowledgeAreas, setKnowledgeAreas] = useState([]);
  const [subKnowledgeAreas, setSubKnowledgeAreas] = useState([]);

  // VALUES CURRENT
  const [knowledgeArea, setKnowledgeArea] = useState(null);

  const knowledgeAreaTutor = {
    knowledge_area: null,
    tags: '',
    description: '',
  };

  const formik = useFormik({
    initialValues: knowledgeAreaTutor,
    validationSchema: scheme,
    onSubmit: (values, { setSubmitting }) => {
      data == null ? save(values) : update(values);
    },
  });

  useEffect(() => {
    if (knowledgeArea != null) {
      const id = knowledgeArea.id;
      getSubKnowledgeAreas(id).then((res) => {
        formik.setValues({
          ...formik.values,
          knowledge_area: null,
        });
        setSubKnowledgeAreas(res.data);
      });
    }
  }, [knowledgeArea]);

  useEffect(() => {
    if (data != null) {
      setKnowledgeArea(
        knowledgeAreas.filter((item) => item.id == data.knowledge_area.knowledge_area[0])[0]
      );
      formik.setValues(data);
    } else {
      setKnowledgeArea(null);
      formik.setValues({
        knowledge_area: null,
        tags: '',
        description: '',
      });
    }
  }, [data]);

  const save = (values) => {
    const data = {
      ...values,
      knowledge_area: values.knowledge_area.id,
    };
    dispatch({ type: ACTION_RUNNING });
    postTutorKnowledgeArea(data).then((res) => {
      setList(list.concat(res.data));
      dispatch({ type: ACTION_END });
      dispatch(createMessage('Especialidad guardada'));
      dispatch(createMessage(''));
    });
  };

  const update = (values) => {
    const data = {
      ...values,
      knowledge_area: values.knowledge_area.id,
    };
    dispatch({ type: ACTION_RUNNING });
    patchTutorKnowledgeArea(data.id, data).then((res) => {
      const newList = list.map((item) => {
        if (item.id === res.data.id) return { ...res.data };
        return item;
      });
      setList(newList);
      dispatch({ type: ACTION_END });
      dispatch(createMessage('Especialidad actualizada'));
      dispatch(createMessage(''));
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='row'>
        <div className='col-md-6 mb-2'>
          <label htmlFor=''>Area de conocimiento</label>
          <Autocomplete
            options={knowledgeAreas}
            value={knowledgeArea}
            getOptionLabel={(option) => {
              return option.name;
            }}
            onChange={(event, value) => {
              setKnowledgeArea(value);
            }}
            renderOption={(option) => (
              <React.Fragment>
                <div className='w-100'>
                  <span>{option.name}</span>
                </div>
              </React.Fragment>
            )}
            renderInput={(params) => <TextField {...params} label='' variant='outlined' />}
          />
        </div>
        <div className='col-md-6 mb-2'>
          <label htmlFor=''>Especialidad</label>
          <Autocomplete
            name='knowledge_area'
            options={subKnowledgeAreas}
            value={formik.values.knowledge_area}
            getOptionLabel={(option) => {
              return option.name;
            }}
            onChange={(e, value) => {
              formik.setFieldValue('knowledge_area', value);
            }}
            renderOption={(option) => (
              <React.Fragment>
                <div className='w-100'>
                  <span>{option.name}</span>
                </div>
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField {...params} name='knowledge_area' variant='outlined' />
            )}
          />
          {formik.touched.knowledge_area && formik.errors.knowledge_area ? (
            <span className='error'>{formik.errors.knowledge_area}</span>
          ) : null}
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-12'>
          <label htmlFor=''>Etiquetas</label>
          <input
            className='w-100'
            type='text'
            name='tags'
            value={formik.values.tags}
            onChange={formik.handleChange}
            placeholder='Etiquetas'
          />
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-12'>
          <label htmlFor=''>Descripción</label>
          <textarea
            className='w-100'
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            cols='30'
            rows='10'
            placeholder='Descripción'></textarea>
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-12'>
          <Certificate id={data != null ? data.id : undefined} />
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
