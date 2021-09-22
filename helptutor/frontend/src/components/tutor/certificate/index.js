import React, { useState, useEffect } from 'react';

// REDUX
import { useSelector } from 'react-redux';

// SERVICES
import { getKnowledgeAreaCertificate } from '../../../services/KnowledgeArea';

// COMPONENTS
import List from './List';

export default function index(props) {
  const { id } = props;

  const [certificates, setCertificates] = useState([]);
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    if (id) {
      getKnowledgeAreaCertificate(id).then((res) => {
        setCertificates(res.data);
      });
    }
  }, [id]);

  return <List list={certificates} setList={setCertificates} setData={certificate} />;
}
