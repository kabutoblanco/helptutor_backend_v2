import React, { useEffect, useState } from 'react';

// REDUX

// SERVICES
import { getAdvertisements } from '../../../services/Advertisement';

// COMPONENTS
import MainLayout from '../../layout/MainLayout';
import List from './List';

export default function index() {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    getAdvertisements().then((res) => {
      setAdvertisements(res.data);
    });
  }, []);

  console.log(advertisements)

  return (
    <div>
      <MainLayout body={<List list={advertisements} />} />
    </div>
  );
}
