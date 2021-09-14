import React from 'react';

// ROUTER
import { Route, Redirect } from 'react-router-dom';

// REDUX
import { useSelector } from 'react-redux';

export default function PrivateRoute({ component: Component, ...rest }) {
  // REDUX
  const auth = useSelector((state) => state.auth);

  return auth.isLoading ? (
    <div>Cargando...</div>
  ) : (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
}
