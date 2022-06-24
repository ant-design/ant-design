import { mount } from 'enzyme';
import React from 'react';
import accessibilityTest from '../../../tests/shared/accessibilityTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';
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

  // https://github.com/airbnb/enzyme/issues/875
  it('warns on non-Breadcrumb.Item and non-Breadcrumb.Separator children', () => {
    const MyCom = () => <div>foo</div>;
    render(
      <Breadcrumb>
        <MyCom />
      </Breadcrumb>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "Warning: [antd: Breadcrumb] Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children",
    );
  });

  // https://github.com/ant-design/ant-design/issues/5015
  it('should allow Breadcrumb.Item is null or undefined', () => {
    const { asFragment } = render(
      <Breadcrumb>
        {null}
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        {undefined}
      </Breadcrumb>,
    );
    expect(errorSpy).not.toHaveBeenCalled();
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/5542
  it('should not display Breadcrumb Item when its children is falsy', () => {
    const wrapper = mount(
      <Breadcrumb>
        <Breadcrumb.Item />
        <Breadcrumb.Item>xxx</Breadcrumb.Item>
        <Breadcrumb.Item>yyy</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/18260
  it('filter React.Fragment', () => {
    const wrapper = mount(
      <Breadcrumb separator="">
        <Breadcrumb.Item>Location</Breadcrumb.Item>
        <Breadcrumb.Separator>:</Breadcrumb.Separator>
        <>
          <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
          <Breadcrumb.Separator />
        </>
      </Breadcrumb>,
    );
    expect(wrapper.render()).toMatchSnapshot();
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
    const wrapper = mount(<Breadcrumb routes={routes} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should accept undefined routes', () => {
    const wrapper = mount(<Breadcrumb routes={undefined} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support custom attribute', () => {
    const wrapper = mount(
      <Breadcrumb data-custom="custom">
        <Breadcrumb.Item data-custom="custom-item">xxx</Breadcrumb.Item>
        <Breadcrumb.Item>yyy</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support React.Fragment and falsy children', () => {
    const wrapper = mount(
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
    expect(wrapper.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/25975
  it('should support Breadcrumb.Item default separator', () => {
    const MockComponent = () => (
      <span>
        <Breadcrumb.Item>Mock Node</Breadcrumb.Item>
      </span>
    );
    const wrapper = mount(
      <Breadcrumb>
        <Breadcrumb.Item>Location</Breadcrumb.Item>
        <MockComponent />
        <Breadcrumb.Item>Application Center</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
