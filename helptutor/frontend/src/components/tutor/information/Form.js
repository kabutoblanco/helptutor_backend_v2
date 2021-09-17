import React, { useEffect, useState } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';

// ACTIONS
import { loadUser } from '../../../redux/actions/auth';
import { createMessage } from '../../../redux/actions/messages';
import { ACTION_RUNNING, ACTION_END } from '../../../redux/actions/types';

// SERVICES
import { getTutor, patchTutor } from '../../../services/Tutor';

export default function Form() {
  // REDUX
  const dispacth = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // LOCAL
  const [tutor, setTutor] = useState({
    user: user,
    methodology: '',
    trajectory: '',
  });

  useEffect(() => {
    getTutor(user.id).then((res) => {
      setTutor({ ...tutor, ...res.data });
    });
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setTutor({ ...tutor, [name]: value });
  };

  const onChangeUser = (e) => {
    const { name, value } = e.target;
    const user = { ...tutor.user, [name]: value };
    console.log(user)
    setTutor({ ...tutor, user: user });
  };

  const update = (e) => {
    e.preventDefault();
    dispacth({ type: ACTION_RUNNING });
    patchTutor(user.id, tutor).then((res) => {
      setTutor(res.data);
      dispacth(loadUser);
      dispacth({ type: ACTION_END });
      dispacth(createMessage('Información actualizada'));
    });
  };

  return (
    <div className=''>
      <span className='title-component'>INFORMACIÓN</span>
      <div className='container d-flex justify-content-center'>
        <form action=''>
          <div className='row'>
            <div className='col-md-6 mb-2'>
              <input
                className='w-100'
                type='text'
                name='first_name'
                value={tutor.user.first_name}
                onChange={onChangeUser}
                placeholder='Nombres'
              />
            </div>
            <div className='col-md-6 mb-2'>
              <input
                className='w-100'
                type='text'
                name='last_name'
                value={tutor.user.last_name}
                onChange={onChangeUser}
                placeholder='Apellidos'
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 mb-2'>
              <input
                className='w-100'
                type='email'
                name='email'
                value={tutor.user.email}
                onChange={onChangeUser}
                disabled={true}
                placeholder='Correo electronico'
              />
            </div>
            <div className='col-md-6 mb-2'>
              <input
                className='w-100'
                type='text'
                name='telephone'
                value={tutor.user.telephone}
                onChange={onChangeUser}
                placeholder='Telefono'
              />
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-md-6'>
              <input
                className='w-100'
                type='date'
                name='birthday'
                value={tutor.user.birthday}
                onChange={onChangeUser}
                placeholder='Fecha de nacimiento'
              />
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-12'>
              <textarea
                className='w-100'
                name='interest'
                value={tutor.user.interest}
                onChange={onChangeUser}
                cols='30'
                rows='5'
                placeholder='Intereses'></textarea>
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-12'>
              <textarea
                className='w-100'
                name='methodology'
                value={tutor.methodology}
                onChange={onChange}
                cols='30'
                rows='5'
                placeholder='Metodología'></textarea>
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-12'>
              <textarea
                className='w-100'
                name='trajectory'
                value={tutor.trajectory}
                onChange={onChange}
                cols='30'
                rows='5'
                placeholder='Trayectoria'></textarea>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-primary' onClick={update}>
              GUARDAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
