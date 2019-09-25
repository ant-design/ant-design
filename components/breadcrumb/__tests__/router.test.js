import React from 'react';
import { Route, Switch, Link, withRouter, MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
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
  (process.env.REACT === '15' ? it.skip : it)('react router 4', () => {
    const Home = withRouter(props => {
      const { location, history } = props;
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
            <a onClick={() => history.push('/')}>Home</a>
            <a onClick={() => history.push('/apps')}>Application List</a>
          </div>
          <Switch>
            <Route path="/apps" component={Apps} />
            <Route render={() => <span>Home Page</span>} />
          </Switch>
          <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </div>
      );
    });
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Home />
      </MemoryRouter>,
    );
    expect(wrapper.find('BreadcrumbItem').length).toBe(1);
    expect(
      wrapper
        .find('BreadcrumbItem .ant-breadcrumb-link')
        .at(0)
        .text(),
    ).toBe('Home');
    wrapper
      .find('.demo-nav a')
      .at(1)
      .simulate('click');
    expect(wrapper.find('BreadcrumbItem').length).toBe(2);
    expect(
      wrapper
        .find('BreadcrumbItem .ant-breadcrumb-link')
        .at(1)
        .text(),
    ).toBe('Application List');
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
    const wrapper = mount(<Breadcrumb routes={routes} params={{ id: 1 }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
