import React from 'react';
import { mount, render } from 'enzyme';
import Breadcrumb from '../index';

describe('Breadcrumb', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  // https://github.com/airbnb/enzyme/issues/875
  xit('warns on non-Breadcrumb.Item children', () => {
    const MyCom = () => <div>foo</div>;
    mount(
      <Breadcrumb>
        <MyCom />
      </Breadcrumb>
    );
    expect(errorSpy.mock.calls).toHaveLength(1);
    expect(errorSpy.mock.calls[0][0]).toMatch(
      'Breadcrumb only accepts Breadcrumb.Item as it\'s children'
    );
  });

  // https://github.com/ant-design/ant-design/issues/5015
  it('should allow Breadcrumb.Item is null or undefined', () => {
    const wrapper = render(
      <Breadcrumb>
        {null}
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        {undefined}
      </Breadcrumb>
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
      </Breadcrumb>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
