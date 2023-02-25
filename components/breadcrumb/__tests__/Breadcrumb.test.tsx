import React from 'react';
import accessibilityTest from '../../../tests/shared/accessibilityTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';
import type { Route } from '../Breadcrumb';
import Breadcrumb from '../index';

describe('Breadcrumb', () => {
  mountTest(Breadcrumb);
  rtlTest(Breadcrumb);
  accessibilityTest(Breadcrumb);

  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('warns on non-Breadcrumb.Item and non-Breadcrumb.Separator children', () => {
    const MyCom: React.FC = () => <div>foo</div>;
    render(
      <Breadcrumb>
        <MyCom />
      </Breadcrumb>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "Warning: [antd: Breadcrumb] Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children",
    );
  });

  it('overlay deprecation warning', () => {
    render(
      <Breadcrumb
        routes={[
          {
            overlay: <div>menu</div>,
            breadcrumbName: <a href="">General</a>,
          },
        ]}
      />,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Breadcrumb.Item] `overlay` is deprecated. Please use `menu` instead.',
    );
  });

  it('Breadcrumb.Item deprecation warning', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item>Location</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Breadcrumb] `Breadcrumb.Item and Breadcrumb.Separator` is deprecated. Please use `routes` instead.',
    );
  });

  it('Breadcrumb.separator deprecation warning', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Separator>:</Breadcrumb.Separator>
      </Breadcrumb>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Breadcrumb] `Breadcrumb.Item and Breadcrumb.Separator` is deprecated. Please use `routes` instead.',
    );
  });

  // https://github.com/ant-design/ant-design/issues/40204
  it('wrong overlay deprecation warning in Dropdown', () => {
    const menuItems = [
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            General
          </a>
        ),
      },
    ];
    render(
      <Breadcrumb
        routes={[
          {
            menu: { items: menuItems },
            breadcrumbName: <a href="">General</a>,
          },
        ]}
      />,
    );
    expect(errorSpy).not.toHaveBeenCalledWith(
      'Warning: [antd: Dropdown] `overlay` is deprecated. Please use `menu` instead.',
    );
  });

  // https://github.com/ant-design/ant-design/issues/5015
  it('should allow Breadcrumb.Item is null or undefined', () => {
    const { asFragment } = render(
      <Breadcrumb
        routes={[
          {
            breadcrumbName: 'Home',
          },
        ]}
      >
        {null}
        {undefined}
      </Breadcrumb>,
    );
    expect(errorSpy).not.toHaveBeenCalled();
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/5542
  it('should not display Breadcrumb Item when its children is falsy', () => {
    const { asFragment } = render(
      <Breadcrumb
        routes={[
          {},
          {
            breadcrumbName: 'xxx',
          },
          {
            breadcrumbName: 'yyy',
          },
        ]}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should render correct', () => {
    const { asFragment } = render(
      <Breadcrumb
        routes={[
          {
            path: '',
            breadcrumbName: <span>xxx</span>,
          },
          {
            breadcrumbName: 'yyy',
          },
        ]}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/18260
  it('filter React.Fragment', () => {
    const { asFragment } = render(
      <Breadcrumb
        separator=""
        routes={[
          {
            breadcrumbName: 'Location',
          },
          {
            separator: ':',
          },
          {
            href: '',
            breadcrumbName: 'Application Center',
          },
          {
            separator: '/',
          },
        ]}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should render a menu', () => {
    const routes: Route[] = [
      {
        path: 'index',
        breadcrumbName: 'home',
      },
      {
        path: 'first',
        breadcrumbName: 'first',
        children: [
          {
            path: '/general',
            breadcrumbName: 'General',
          },
          {
            path: '/layout',
            breadcrumbName: 'Layout',
          },
          {
            path: '/navigation',
            breadcrumbName: 'Navigation',
          },
        ],
      },
      {
        path: 'second',
        breadcrumbName: 'second',
      },
      {
        path: 'third',
        breadcrumbName: '',
      },
    ];
    const { asFragment } = render(<Breadcrumb routes={routes} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should accept undefined routes', () => {
    const { asFragment } = render(<Breadcrumb routes={undefined} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should support custom attribute', () => {
    const { asFragment } = render(
      (
        <Breadcrumb
          routes={[
            {
              breadcrumbName: 'xxx',
              // @ts-ignore
              'data-custom': 'custom-item',
            },
            {
              breadcrumbName: 'yyy',
            },
          ]}
          data-custom="custom"
        />
      ) as React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should support React.Fragment and falsy children', () => {
    const { asFragment } = render(
      <Breadcrumb
        routes={[
          {
            breadcrumbName: 'yyy',
          },
          {
            breadcrumbName: 'yyy',
          },
          {
            breadcrumbName: 0,
          },
        ]}
      >
        {null}
        {undefined}
      </Breadcrumb>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/25975
  it('should support Breadcrumb.Item default separator', () => {
    const MockComponent: React.FC = () => (
      <span>
        <Breadcrumb.Item>Mock Node</Breadcrumb.Item>
      </span>
    );
    const { asFragment } = render(
      <Breadcrumb
        routes={[
          {
            breadcrumbName: 'Location',
          },
          {
            breadcrumbName: <MockComponent />,
          },
          {
            breadcrumbName: 'Application Center',
          },
        ]}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });
  it('should support string `0` and number `0`', () => {
    const { container } = render(
      <Breadcrumb
        routes={[
          {
            breadcrumbName: 0,
          },
          {
            breadcrumbName: '0',
          },
        ]}
      />,
    );
    expect(container.querySelectorAll('.ant-breadcrumb-link')[0].textContent).toBe('0');
    expect(container.querySelectorAll('.ant-breadcrumb-link')[1].textContent).toBe('0');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should console Error when `overlay` in props', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <Breadcrumb
        routes={[
          {
            overlay: <div>test</div>,
          },
        ]}
      />,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Breadcrumb.Item] `overlay` is deprecated. Please use `menu` instead.',
    );
    errSpy.mockRestore();
  });

  it('should not console Error when `overlay` not in props', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Breadcrumb routes={[{ path: '/', breadcrumbName: 'Test' }]} />);
    expect(errSpy).not.toHaveBeenCalled();
    errSpy.mockRestore();
  });
});
