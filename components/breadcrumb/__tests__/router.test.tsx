import React from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import type { Location as ReactRouterLocation } from 'react-router-dom';

import { render } from '../../../tests/utils';
import Breadcrumb from '../index';

describe('react router', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('memoizes the current location', () => {
    let location1: ReactRouterLocation | undefined;
    const CaptureLocation1: React.FC = () => {
      location1 = useLocation();
      return null;
    };
    const { container: container1 } = render(
      <MemoryRouter>
        <CaptureLocation1 />
      </MemoryRouter>,
    );
    expect(container1).toBeTruthy();
    expect(location1).toBeDefined();

    let location2: ReactRouterLocation | undefined;
    const CaptureLocation2: React.FC = () => {
      location2 = useLocation();
      return null;
    };
    const { container: container2 } = render(
      <MemoryRouter>
        <CaptureLocation2 />
      </MemoryRouter>,
    );
    expect(container2).toBeTruthy();
    expect(location2).toBeDefined();

    expect(location1).toEqual(location2);
  });

  it('react router legacy', () => {
    const routes = [
      {
        name: 'home',
        breadcrumbName: 'Home',
        path: '/',
        childRoutes: [
          {
            name: 'apps',
            breadcrumbName: 'Application List',
            path: 'apps',
            childRoutes: [
              {
                name: 'app',
                breadcrumbName: 'Application:id',
                path: ':id',
                childRoutes: [
                  {
                    name: 'detail',
                    breadcrumbName: 'Detail',
                    path: 'detail',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'apps',
        breadcrumbName: 'Application List',
        path: 'apps',
        childRoutes: [
          {
            name: 'app',
            breadcrumbName: 'Application:id',
            path: ':id',
            childRoutes: [
              {
                name: 'detail',
                breadcrumbName: 'Detail',
                path: 'detail',
              },
            ],
          },
        ],
      },
      {
        name: 'app',
        breadcrumbName: 'Application:id',
        path: ':id',
        childRoutes: [
          {
            name: 'detail',
            breadcrumbName: 'Detail',
            path: 'detail',
          },
        ],
      },
      {
        name: 'detail',
        breadcrumbName: 'Detail',
        path: 'detail',
      },
    ];
    const { asFragment } = render(<Breadcrumb routes={routes} params={{ id: 1 }} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });
});
