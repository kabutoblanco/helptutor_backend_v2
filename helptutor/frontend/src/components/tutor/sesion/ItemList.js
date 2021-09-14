import React from "react";

export default function ItemList(props) {
  return (
    <div className="item-list">
      <span className='text-truncate'>{props.data.knowledge_area.name}</span>
      <div className="options">x</div>
    </div>
  );
}
