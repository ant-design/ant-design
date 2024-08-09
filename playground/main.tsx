import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Skeleton } from 'antd';
// eslint-disable-next-line import/no-unresolved
import 'antd/style/reset.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, useRoutes, Outlet } from 'react-router-dom';
import routes from './routes';

import Provider from './Provider';
import GlobalStyle from './GlobalStyle';

const rootRoutes = [
  {
    path: '/',
    children: routes,
    element: (
      <Provider>
        <GlobalStyle />
        <Outlet />
      </Provider>
    ),
  },
];

const App = (function _App() {
  const C = () => <>{useRoutes(rootRoutes as any)}</>;
  if (__IMPORT_MODE__ === 'sync') return C;
  return () => (
    <Suspense fallback={<Skeleton active />}>
      <C />
    </Suspense>
  );
})();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router basename={import.meta.env.BASE_URL}>
      <App />
    </Router>
  </React.StrictMode>,
);
