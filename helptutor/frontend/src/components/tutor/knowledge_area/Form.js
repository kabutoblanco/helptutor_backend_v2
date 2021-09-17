import React, { useState, useEffect } from 'react';

// REDUX
import { useDispatch } from 'react-redux';

// ACTIONS
import { createMessage } from '../../../redux/actions/messages';
import { ACTION_END, ACTION_RUNNING } from '../../../redux/actions/types';

// SERVICES
import { getKnowledgeAreas, getSubKnowledgeAreas } from '../../../services/KnowledgeArea';
import { postTutorKnowledgeArea, patchTutorKnowledgeArea } from '../../../services/Tutor';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function Form(props) {
  const { data, list, setList } = props;

  // REDUX
  const dispatch = useDispatch();

  // LOCAL
  const [knowledgeAreas, setKnowledgeAreas] = useState([]);
  const [subKnowledgeAreas, setSubKnowledgeAreas] = useState([]);

  // VALUES CURRENT
  const [knowledgeArea, setKnowledgeArea] = useState(null);
  const [knowledgeAreaTutor, setKnowledgeAreaTutor] = useState({
    knowledge_area: null,
    tags: '',
    description: '',
  });

  useEffect(() => {
    getKnowledgeAreas().then((res) => {
      setKnowledgeAreas(res.data);
    });
  }, []);

  useEffect(() => {
    if (knowledgeArea != null) {
      const id = knowledgeArea.id;
      getSubKnowledgeAreas(id).then((res) => {
        setSubKnowledgeAreas(res.data);
      });
    }
  }, [knowledgeArea]);

  useEffect(() => {
    if (data != null) {
      setKnowledgeArea(knowledgeAreas.filter((item) => item.id == data.knowledge_area.knowledge_area[0])[0]);
      setKnowledgeAreaTutor(data);
    } else {
      setKnowledgeArea(null)
      setKnowledgeAreaTutor({
        knowledge_area: null,
        tags: '',
        description: '',
      });
    }
  }, [data]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setKnowledgeAreaTutor({ ...knowledgeAreaTutor, [name]: value });
  };

  const save = (e) => {
    e.preventDefault();
    const data = {
      ...knowledgeAreaTutor,
      knowledge_area: knowledgeAreaTutor.knowledge_area.id,
    };
    dispatch({ type: ACTION_RUNNING });
    postTutorKnowledgeArea(data).then((res) => {
      setList(list.concat(res.data));
      dispatch({ type: ACTION_END });
      dispatch(createMessage('Especialidad guardada'));
    });
  };

  const update = (e) => {
    e.preventDefault();
    const data = {
      ...knowledgeAreaTutor,
      knowledge_area: knowledgeAreaTutor.knowledge_area.id,
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
                placeholder='Area de conocimiento'
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
                renderInput={(params) => (
                  <TextField {...params} label='' name='knowledgeArea' variant='outlined' />
                )}
              />
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-12'>
              <Autocomplete
                placeholder='Especialidad'
                options={subKnowledgeAreas}
                value={knowledgeAreaTutor.knowledge_area}
                getOptionLabel={(option) => {
                  return option.name;
                }}
                onChange={(event, value) => {
                  setKnowledgeAreaTutor({ ...knowledgeAreaTutor, knowledge_area: value });
                }}
                renderOption={(option) => (
                  <React.Fragment>
                    <div className='w-100'>
                      <span>{option.name}</span>
                    </div>
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField {...params} label='' name='knowledge_area' variant='outlined' />
                )}
              />
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-12'>
              <input
                className='w-100'
                type='text'
                name='tags'
                value={knowledgeAreaTutor.tags}
                onChange={onChange}
                placeholder='Etiquetas'
              />
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-12'>
              <textarea
                className='w-100'
                name='description'
                value={knowledgeAreaTutor.description}
                onChange={onChange}
                cols='30'
                rows='10'
                placeholder='Descripción'></textarea>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-danger mr-1' onClick={save}>
              CANCELAR
            </button>
            <button className={'btn btn-primary' + (data == null ? ' hidden' : '')} onClick={update}>
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
