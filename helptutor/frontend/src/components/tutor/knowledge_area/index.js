import React, { useState, useEffect } from 'react';

// REDUX
import { useSelector } from 'react-redux';

// SERVICES
import { getTutorKnowledgeAreas } from '../../../services/Tutor';

// COMPONENTS
import MainLayout from '../../layout/MainLayout';
import FormLayout from '../../layout/FormLayout';
import List from './List';
import Form from './Form';

export default function index() {
  const [knowledgeAreas, setKnowledgeAreas] = useState([]);
  const [knowledgeAreaTutor, setKnowledgeAreaTutor] = useState(null);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    getTutorKnowledgeAreas(auth.user.id).then((res) => {
      setKnowledgeAreas(res.data);
    });
  }, []);

  const form = (
    <>
      <span className='title-component'>INFORMACIÓN</span>
      <FormLayout
        form={<Form list={knowledgeAreas} setList={setKnowledgeAreas} data={knowledgeAreaTutor} />}
      />
    </>
  );

  return (
    <MainLayout
      navLateral={
        <List list={knowledgeAreas} setList={setKnowledgeAreas} setData={setKnowledgeAreaTutor} />
      }
      body={form}
    />
  );
}
