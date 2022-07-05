import React from 'react';
import { Link, MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { fireEvent, render } from '../../../tests/utils';
import Breadcrumb from '../index';

const Apps = () => (
  <ul className="app-list">
    <li>
      <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
    </li>
    <li>
      <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail">Detail</Link>
    </li>
  </ul>
);

const breadcrumbNameMap = {
  '/apps': 'Application List',
  '/apps/1': 'Application1',
  '/apps/2': 'Application2',
  '/apps/1/detail': 'Detail',
  '/apps/2/detail': 'Detail',
};

describe('react router', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // https://github.com/airbnb/enzyme/issues/875
  it('react router 6', () => {
    const Home = () => {
      const location = useLocation();
      const navigate = useNavigate();
      const pathSnippets = location.pathname.split('/').filter(i => i);
      const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{breadcrumbNameMap[url]}</Link>
          </Breadcrumb.Item>
        );
      });
      const breadcrumbItems = [
        <Breadcrumb.Item key="home">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>,
      ].concat(extraBreadcrumbItems);
      return (
        <div className="demo">
          <div className="demo-nav">
            <a onClick={() => navigate('/')}>Home</a>
            <a onClick={() => navigate('/apps')}>Application List</a>
          </div>
          <Routes>
            <Route path="/apps" component={Apps} />
            <Route render={() => <span>Home Page</span>} />
          </Routes>
          <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </div>
      );
    };
    const { container } = render(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Home />
      </MemoryRouter>,
    );
    expect(container.querySelectorAll('.ant-breadcrumb-link').length).toBe(1);
    expect(container.querySelectorAll('.ant-breadcrumb-link')[0].textContent).toBe('Home');

    fireEvent.click(container.querySelectorAll('.demo-nav a')[1]);

    expect(container.querySelectorAll('.ant-breadcrumb-link').length).toBe(2);
    expect(container.querySelectorAll('.ant-breadcrumb-link')[1].textContent).toBe(
      'Application List',
    );
  });

  it('react router 3', () => {
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
