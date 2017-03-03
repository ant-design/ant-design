import React from 'react';
import { mount, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Breadcrumb from '../index';

describe('Breadcrumb', () => {
  it('warns on non-Breadcrumb.Item children', () => {
    const MyCom = () => <div>foo</div>;
    spyOn(console, 'error');
    mount(
      <Breadcrumb>
        <MyCom />
      </Breadcrumb>
    );
    // eslint-disable-next-line
    expect(console.error.calls.count()).toBe(1);
    // eslint-disable-next-line
    expect(console.error.calls.argsFor(0)[0]).toContain(
      'Breadcrumb only accetps Breadcrumb.Item as it\'s children'
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
    // eslint-disable-next-line
    expect(console.error.calls).toBe(undefined);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
});
