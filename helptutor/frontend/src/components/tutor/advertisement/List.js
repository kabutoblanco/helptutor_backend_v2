import React from 'react';

import { createMessage } from '../../../redux/actions/messages';
import { useDispatch } from 'react-redux';
import { ACTION_END, ACTION_RUNNING } from '../../../redux/actions/types';

import { deleteTutorKnowledgeArea } from '../../../services/Tutor';

// import ItemList from './ItemList';

export default function List(props) {
  const { setData, list, setList } = props;

  console.log(list);

  //   const dispatch = useDispatch();

  //   const onDelete = (id) => {
  //     dispatch({ type: ACTION_RUNNING });
  //     deleteTutorKnowledgeArea(id).then((res) => {
  //       setList(list.filter((item) => item.id != id));
  //       dispatch({ type: ACTION_END });
  //       dispatch(createMessage('Especialidad eliminada'));
  //     });
  //   };

  return (
    <div className=''>
      <div className='header-list'>
        <span className='title-component'>Anuncios disponibles</span>
      </div>
      <ul className='list-group mt-1'>
        {list.map(
          (item) =>
            item.title + ' ' + item.student.user.first_name
            // <ItemList
            //   key={item.id}
            //   data={item}
            //   onDelete={() => {
            //     onDelete(item.id);
            //     setData(null);
            //   }}
            //   onSelect={() => {
            //     setData({ ...item });
            //   }}
            // />
        )}
      </ul>
    </div>
  );
}
