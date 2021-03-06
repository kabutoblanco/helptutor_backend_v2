import React, { useEffect, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';

// // ADMINISTRATION
const Alert = lazy(() => import('./layout/Alert'));
import ProgressAction from './layout/ProgressAction';

// //REDUX
import { loadUser } from '../redux/actions/auth';
import { Provider } from 'react-redux';
import store from '../redux/store';

// //ALERTS
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// // LOCAL COMPONENTS
import Routing from './routing';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// CSS
import './App.css';

const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <ProgressAction />
            <Alert />
            <Routing />
          </AlertProvider>
        </Suspense>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
