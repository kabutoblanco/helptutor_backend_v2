import React, { useState, useEffect } from 'react';

import MainLayout from '../../layout/MainLayout';
import List from './List';
import Form from './Form';

import { getTutorServices } from '../../../services/Tutor';
import { useSelector } from 'react-redux';

export default function index() {
  const [service, setService] = useState(null);
  const [services, setServices] = useState([]);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    getTutorServices(auth.user.id).then((res) => {
      setServices(res.data);
    });
  }, []);

  return (
    <MainLayout
      navLateral={
        <List list={services} setList={setServices} setData={setService} />
      }
      body={<Form list={services} setList={setServices} data={service} />}
    />
  );
}
