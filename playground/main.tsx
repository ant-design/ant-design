import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/no-unresolved
import 'antd/style/reset.css';
import { Skeleton } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes';

const App = () => <Suspense fallback={<Skeleton active />}>{useRoutes(routes as any)}</Suspense>;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router basename={import.meta.env.BASE_URL}>
      <App />
    </Router>
  </React.StrictMode>,
);
