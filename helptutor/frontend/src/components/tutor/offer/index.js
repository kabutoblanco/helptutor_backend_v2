import React, { useEffect, useState } from 'react';

// REDUX

// SERVICES
import { getTutorOffers } from '../../../services/Tutor';

// COMPONENTS
import MainLayout from '../../layout/MainLayout';
import List from './List';

export default function index() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getTutorOffers().then((res) => {
      setOffers(res.data);
    });
  }, []);

  return (
    <div>
      <MainLayout body={<List list={offers} />} />
    </div>
  );
}
