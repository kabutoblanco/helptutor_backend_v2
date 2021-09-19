import React from 'react';

import ItemList from './ItemList';

export default function List(props) {
  const { list } = props;

  return list.map((item) => <ItemList key={item.id} data={item} />);
}
