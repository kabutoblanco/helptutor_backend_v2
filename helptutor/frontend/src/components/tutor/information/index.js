import React from 'react';

import MainLayout from '../../layout/MainLayout';
import List from '../profile/List';
import Form from './Form';

export default function Profile() {
  return <MainLayout navLateral={<List />} body={<Form />} />;
}
