import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/rol');
    }
  }, []);

  return <div>Home</div>;
}
