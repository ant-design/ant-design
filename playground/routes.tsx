import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Outlet as OriginOutlet } from 'react-router-dom';
import type { RouteObject } from 'react-router';
// eslint-disable-next-line import/no-unresolved
import routes from '~react-pages';

import CssVarProvider from './provider/CssVar';
import CompactProvider from './provider/Compact';
import DarkProvider from './provider/Dark';
import HomePage from './HomePage';

import GlobalStyle from './provider/GlobalStyle';

const Outlet = (props: any) => (
  <>
    <GlobalStyle />
    <OriginOutlet {...props} />
  </>
);

const combinedRoute: RouteObject[] = [
  // default
  ...routes,
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/_dark',
    children: routes,
    element: (
      <DarkProvider>
        <Outlet />
      </DarkProvider>
    ),
  },
  {
    path: '/_compact',
    children: routes,
    element: (
      <CompactProvider>
        <Outlet />
      </CompactProvider>
    ),
  },
  {
    path: '/_cssvar',
    children: routes,
    element: (
      <CssVarProvider>
        <Outlet />
      </CssVarProvider>
    ),
  },
  {
    path: '/_dark/_cssvar',
    children: routes,
    element: (
      <DarkProvider>
        <CssVarProvider>
          <Outlet />
        </CssVarProvider>
      </DarkProvider>
    ),
  },
  {
    path: '/_compact/_cssvar',
    children: routes,
    element: (
      <CompactProvider>
        <CssVarProvider>
          <Outlet />
        </CssVarProvider>
      </CompactProvider>
    ),
  },
];

export default combinedRoute;
