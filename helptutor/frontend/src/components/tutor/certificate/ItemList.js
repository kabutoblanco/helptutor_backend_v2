import React from 'react';

export default function ItemList(props) {
  const { data } = props;
  return (
    <div>
      <div className='item-list'>
        <span className='text-truncate'>
          {data.name} {data.entity}
        </span>
        <div className='options'>x</div>
      </div>
    </div>
  );
}
