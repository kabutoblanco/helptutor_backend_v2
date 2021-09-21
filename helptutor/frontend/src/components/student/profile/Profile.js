import React from 'react';

import MainLayout from '../../layout/MainLayout';
import List from './List';

export default function Profile() {
  return (
    <MainLayout
      navLateral={<List />}
      //   body={<Form list={knowledgeAreas} setList={setKnowledgeAreas} data={knowledgeAreaTutor} />}
    />
  );
}
