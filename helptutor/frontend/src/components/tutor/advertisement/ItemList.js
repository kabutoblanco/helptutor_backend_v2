import React from 'react';

import { Avatar } from '@material-ui/core';

export default function ItemList(props) {
  const { data } = props;

  return (
    <div className='item-offer d-flex'>
      <div className='offer-view'>
        <Avatar
          alt='user photo'
          className='mr-3'
          src={data.student.user.photo}
          sx={{ width: 65, height: 65 }}>
          <b>{data.student.user.first_name[0]}</b>
        </Avatar>
        <div className=''>
          <div className='offer-information'>
            <span className='offer-title'>{data.title}</span>
            <span className='offer-autor'>{data.student.user.first_name}</span>
            <span className='offer-description'></span>
          </div>
          <div className='input-adv'>
            <input type='text' name='' id='' />
            <button className='btn btn-primary'>></button>
          </div>
        </div>
      </div>
      <div className='offer-options'>
        <button className='btn btn-primary'>POSTULAR</button>
      </div>
    </div>
  );
}
