import React from "react";

export default function ItemList(props) {
  return (
    <div className="item-list">
      <span className='text-truncate' onClick={props.onSelect}>{props.data.knowledge_area.name}</span>
      <div className="options" onClick={props.onDelete}>x</div>
    </div>
  );
}
