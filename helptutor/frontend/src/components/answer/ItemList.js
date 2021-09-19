import React from 'react';

export default function ItemList(props) {
  const { data } = props;

  return (
    <div className='item-answer'>
      <div className='offer-autor'>{data.user.first_name}</div>
      <div className='answer-response'>{data.description}</div>
    </div>
  );
}
