import React from 'react';
import { mount } from 'enzyme';
import Breadcrumb from '../Breadcrumb';

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
});
