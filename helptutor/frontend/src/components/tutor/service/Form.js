import React, { useState, useEffect } from 'react';

// REDUX
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { createMessage } from '../../../redux/actions/messages';
import { ACTION_END, ACTION_RUNNING } from '../../../redux/actions/types';

// SERVICES
import { getTutorKnowledgeAreas, postTutorService, patchTutorService } from '../../../services/Tutor';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function Form(props) {
  const { data, list, setList } = props;

  // REDUX
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // LOCAL
  const [knowledgeAreaTutor, setKnowledgeAreaTutor] = useState(null);
  const [knowledgeAreasTutor, setKnowledgeAreasTutor] = useState([]);

  // VALUES CURRENT
  const [service, setService] = useState({
    knowledge_area_tutor: null,
    title: '',
    price: 0.0,
  });

  useEffect(() => {
    getTutorKnowledgeAreas(user.id).then((res) => {
      setKnowledgeAreasTutor(res.data);
    });
  }, []);

  useEffect(() => {
    if (data != null) {
      setKnowledgeAreaTutor(
        knowledgeAreasTutor.filter((item) => item.id == data.knowledge_area_tutor)[0]
      );
      setService(data);
    } else {
      setKnowledgeAreaTutor(null);
      setService({
        knowledge_area_tutor: null,
        title: '',
        price: 0.0,
      });
    }
  }, [data]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const save = (e) => {
    e.preventDefault();
    const data = {
      ...service,
      knowledge_area_tutor: knowledgeAreaTutor.id,
    };
    dispatch({ type: ACTION_RUNNING });
    postTutorService(data).then((res) => {
      setList(list.concat(res.data));
      dispatch({ type: ACTION_END });
      dispatch(createMessage('Especialidad guardada'));
    });
  };

  const update = (e) => {
    e.preventDefault();
    const data = {
      ...service,
      knowledge_area_tutor: knowledgeAreaTutor.id,
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
    <div className=''>
      <span className='title-component'>INFORMACIÓN</span>
      <div className='container d-flex justify-content-center'>
        <form action=''>
          <div className='row mb-2'>
            <div className='col-12'>
              <Autocomplete
                placeholder='Especialidades'
                options={knowledgeAreasTutor}
                value={knowledgeAreaTutor}
                getOptionLabel={(option) => {
                  return option.knowledge_area.name;
                }}
                onChange={(event, value) => {
                  setKnowledgeAreaTutor(value);
                }}
                renderOption={(option) => (
                  <React.Fragment>
                    <div className='w-100'>
                      <span>{option.knowledge_area.name}</span>
                    </div>
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField {...params} label='' name='knowledgeAreaTutor' variant='outlined' />
                )}
              />
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-12'>
              <input
                className='w-100'
                type='text'
                name='title'
                value={service.title}
                onChange={onChange}
                placeholder='Titulo'
              />
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-12'>
              <input
                className='w-100'
                type='number'
                name='price'
                value={service.price}
                onChange={onChange}
                placeholder='Precio'
              />
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-danger mr-1' onClick={save}>
              CANCELAR
            </button>
            <button
              className={'btn btn-primary' + (data == null ? ' hidden' : '')}
              onClick={update}>
              ACTUALIZAR
            </button>
            <button className={'btn btn-primary' + (data != null ? ' hidden' : '')} onClick={save}>
              GUARDAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
