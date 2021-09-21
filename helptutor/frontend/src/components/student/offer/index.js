import React, { useState, useEffect } from 'react';

import MainLayout from '../../layout/MainLayout';
import FormLayout from '../../layout/FormLayout';
import List from './List';
import Form from './Form';

import { getStudentOffers } from '../../../services/Student';
import { useSelector } from 'react-redux';

export default function index() {
  const [offer, setOffer] = useState(null);
  const [offers, setOffers] = useState([]);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    getStudentOffers(auth.user.id).then((res) => {
      setOffers(res.data);
    });
  }, []);

  const form = (
    <>
      <span className='title-component'>INFORMACIÓN</span>
      <FormLayout form={<Form list={offers} setList={setOffers} data={offer} />} />
    </>
  );

  return (
    <MainLayout
      navLateral={<List list={offers} setList={setOffers} setData={setOffer} />}
      body={form}
    />
  );
}
