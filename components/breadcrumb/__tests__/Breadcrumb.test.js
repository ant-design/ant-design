import React from 'react';
import { mount, render } from 'enzyme';
import Breadcrumb from '../index';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Breadcrumb', () => {
  mountTest(Breadcrumb);
  rtlTest(Breadcrumb);

  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  // https://github.com/airbnb/enzyme/issues/875
  it('warns on non-Breadcrumb.Item and non-Breadcrumb.Separator children', () => {
    const MyCom = () => <div>foo</div>;
    mount(
      <Breadcrumb>
        <MyCom />
      </Breadcrumb>,
    );
    expect(errorSpy.mock.calls).toHaveLength(1);
    expect(errorSpy.mock.calls[0][0]).toMatch(
      "Warning: [antd: Breadcrumb] Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children",
    );
  });

  // https://github.com/ant-design/ant-design/issues/5015
  it('should allow Breadcrumb.Item is null or undefined', () => {
    const wrapper = render(
      <Breadcrumb>
        {null}
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        {undefined}
      </Breadcrumb>,
    );
    expect(errorSpy).not.toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/5542
  it('should not display Breadcrumb Item when its children is falsy', () => {
    const wrapper = render(
      <Breadcrumb>
        <Breadcrumb.Item />
        <Breadcrumb.Item>xxx</Breadcrumb.Item>
        <Breadcrumb.Item>yyy</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/18260
  it('filter React.Fragment', () => {
    const wrapper = render(
      <Breadcrumb separator="">
        <Breadcrumb.Item>Location</Breadcrumb.Item>
        <Breadcrumb.Separator>:</Breadcrumb.Separator>
        <>
          <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
          <Breadcrumb.Separator />
        </>
      </Breadcrumb>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a menu', () => {
    const routes = [
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
      },
    ];
    const wrapper = render(<Breadcrumb routes={routes} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should accept undefined routes', () => {
    const wrapper = render(<Breadcrumb routes={undefined} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support custom attribute', () => {
    const wrapper = render(
      <Breadcrumb data-custom="custom">
        <Breadcrumb.Item data-custom="custom-item">xxx</Breadcrumb.Item>
        <Breadcrumb.Item>yyy</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support React.Fragment and falsy children', () => {
    const wrapper = render(
      <Breadcrumb>
        <>
          <Breadcrumb.Item>yyy</Breadcrumb.Item>
          <Breadcrumb.Item>yyy</Breadcrumb.Item>
        </>
        <Breadcrumb.Item>yyy</Breadcrumb.Item>
        {0}
        {null}
        {undefined}
      </Breadcrumb>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/25975
  it('should support Breadcrumb.Item default separator', () => {
    const MockComponent = () => {
      return (
        <span>
          <Breadcrumb.Item>Mock Node</Breadcrumb.Item>
        </span>
      );
    };
    const wrapper = render(
      <Breadcrumb>
        <Breadcrumb.Item>Location</Breadcrumb.Item>
        <MockComponent />
        <Breadcrumb.Item>Application Center</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
