import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setRole } from '../../redux/actions/auth';

import { useHistory } from 'react-router-dom';

export default function SetRole() {
  const history = useHistory();
  const dispatch = useDispatch();

  const roles = useSelector((state) => state.auth.roles);

  const onSelect = (e) => {
    const { name } = e.target;
    if (name == 'tutor') {
      dispatch(setRole('tutor'));
      history.push('tutor');
    } else if (name == 'student') {
      dispatch(setRole('estudiante'));
      history.push('estudiante');
    }
  };

  return (
    <div className='set-role'>
      <button name='tutor' onClick={onSelect} disabled={!roles[0]}>
        Tutor
      </button>
      <button name='student' onClick={onSelect} disabled={!roles[1]}>
        Estudiante
      </button>
    </div>
  );
}
