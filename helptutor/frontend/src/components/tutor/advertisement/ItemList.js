import React from 'react';

import { Avatar } from '@material-ui/core';

export default function ItemList(props) {
  const { data } = props;

  return (
    <div className='item-offer item-adv d-flex'>
      <div className='offer-view w-100'>
        <Avatar
          alt='user photo'
          className='mr-3'
          src={data.student.user.photo}
          sx={{ width: 65, height: 65 }}>
          <b>{data.student.user.first_name[0]}</b>
        </Avatar>
        <div className='w-100'>
          <div className='offer-information'>
            <span className='offer-title'>{data.title}</span>
            <span className='offer-autor'>{data.student.user.first_name}</span>
            <span className='offer-description'></span>
          </div>
          <div className='input-adv'>
            <input type='text' name='' id='' />
            <button className='btn btn-primary'>></button>
          </div>
          <span className='d-flex hover-pointer'>
            <i className='fas fa-sort-down mr-1'></i>Ver respuestas
          </span>
        </div>
      </div>
    </div>
  );
}
