import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/no-unresolved
import 'antd/style/reset.css';
import { Skeleton } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes';

/**
 * CI environment sync load all pages
 */
const App = (function _App() {
  const C = () => <>{useRoutes(routes as any)}</>;
  if (__CI__) return C;
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
