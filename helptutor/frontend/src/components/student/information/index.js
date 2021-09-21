import React from 'react';

import MainLayout from '../../layout/MainLayout';
import FormLayout from '../../layout/FormLayout'
import List from '../profile/List';
import Form from './Form';

export default function Profile() {
  const form = (
    <>
      <span className='title-component'>INFORMACIÓN</span>
      <FormLayout
        form={<Form />}
      />
    </>
  );

  return <MainLayout navLateral={<List />} body={form} />;
}
