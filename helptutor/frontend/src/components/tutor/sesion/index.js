import React from 'react';

import MainLayout from '../../layout/MainLayout';
import List from './List';
import Form from './Form';

export default function index() {
  return <MainLayout navLateral={<List />} body={<Form />} />;
}
