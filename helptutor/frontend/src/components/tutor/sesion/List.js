import React, {useState, useEffect} from "react";
import axios from "axios";

import ItemList from "./ItemList";
import {tokenConfig} from '../../../redux/actions/utils'
import store from '../../../redux/store';

export default function List() {
  const [sesions, setSesions] = useState([]);
  useEffect(() => {
    console.log('cargando')
    axios
    .get("api/tutor/1/knowledgearea", tokenConfig(store.getState))
    .then((res) => {
      setSesions(res.data);
    })
    .catch();
  }, [])
  
  return (
    <div className="">
      <div className="header-list">
        <span className="title-component">Mis sesiones</span>
        <button className="btn btn-primary">AGREGAR</button>
      </div>
      <ul className="list-group mt-1">
        {sesions.map((item) => (
          <ItemList key={item.id} data={item} />
        ))}
      </ul>
    </div>
  );
}
