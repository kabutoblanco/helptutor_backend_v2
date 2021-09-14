import React from 'react';

import { useHistory } from 'react-router-dom';

export default function SetRole() {
  const history = useHistory();

  const onSelect = (e) => {
    const { name } = e.target;
    if (name == 'tutor') history.replace('tutor');
    else if (name == 'student') history.replace('estudiante');
  };
  
  return (
    <div>
      <button name='tutor' onClick={onSelect}>
        Tutor
      </button>
      <button name='student' onClick={onSelect}>
        Estudiante
      </button>
    </div>
  );
}
