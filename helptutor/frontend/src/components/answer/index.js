import React, { useState, useEffect } from 'react';

import { getAdvAnswers } from '../../services/Answer';

import List from './List';

export default function index(props) {
  const { id, refresh } = props;

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getAdvAnswers(id).then((res) => {
      setAnswers(res.data);
    });
  }, []);

  useEffect(() => {
    if (refresh)
      getAdvAnswers(id).then((res) => {
        setAnswers(res.data);
      });
  }, [refresh]);

  return <List list={answers} />;
}
