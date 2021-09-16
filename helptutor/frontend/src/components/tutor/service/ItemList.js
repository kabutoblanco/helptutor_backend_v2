import React from "react";

export default function ItemList(props) {
  return (
    <div className="item-list">
      <span className='text-truncate' onClick={props.onSelect}>{props.data.title}</span>
      <div className="options" onClick={props.onDelete}>x</div>
    </div>
  );
}
