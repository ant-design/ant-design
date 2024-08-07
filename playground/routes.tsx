import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Outlet as OriginOutlet } from 'react-router-dom';
import type { RouteObject } from 'react-router';
// eslint-disable-next-line import/no-unresolved
import routes from '~react-pages';
// eslint-disable-next-line import/no-extraneous-dependencies
import reduce from 'lodash/reduce';
// eslint-disable-next-line import/no-extraneous-dependencies
import flatMap from 'lodash/flatMap';

import CssVarProvider from './provider/CssVar';
import CompactProvider from './provider/Compact';
import DarkProvider from './provider/Dark';
import HomePage from './HomePage';

import GlobalStyle from './provider/GlobalStyle';
import Compose from './provider/Compose';

interface MatrixItem {
  key: string;
  value: React.ComponentType;
}

const mainMatrix: MatrixItem[] = [
  { key: '_dark', value: DarkProvider },
  { key: '_compact', value: CompactProvider },
  { key: '_default', value: React.Fragment },
];

const matrix: MatrixItem[][] = [mainMatrix, [{ key: '_cssvar', value: CssVarProvider }]];

function combineMatrix<T>(_matrix: T[][]): [...T[]] {
  return reduce<any[][], any[]>(
    _matrix,
    (acc, curr: any) => flatMap(acc, (x) => curr.map((y: any) => x.concat(y))),
    [[]],
  );
}

const combinedMatrix = combineMatrix(matrix);

const allMatrix = [...mainMatrix.map((item) => [item]), ...combinedMatrix];

const combinedRoute: RouteObject[] = allMatrix.map((matrixItem) => {
  const _item = Array.isArray(matrixItem) ? matrixItem : [matrixItem];
  const path = _item.map((item) => item.key).join('/');
  return {
    path: `/${path}`,
    children: routes,
    element: (
      <Compose components={_item.map((item) => item.value)}>
        <GlobalStyle />
        <OriginOutlet />
      </Compose>
    ),
  };
});

export { combinedRoute };
export default [
  // default
  ...routes,
  {
    path: '/',
    element: <HomePage />,
  },
  ...combinedRoute,
];
