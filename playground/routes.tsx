import React from 'react';
import type { RouteObject } from 'react-router';
// eslint-disable-next-line import/no-unresolved
import autoRoutes from '~react-pages';
import HomePage from './HomePage';

const router: RouteObject[] = [
  ...autoRoutes,
  {
    path: '/',
    element: <HomePage />,
  },
];

export default router;
