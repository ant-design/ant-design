import React from 'react';
import { mount } from 'enzyme';
import Dropdown from '..';
import Menu from '../../menu';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Dropdown', () => {
  mountTest(() => (
    <Dropdown menu={<Menu />}>
      <span />
    </Dropdown>
  ));

  rtlTest(() => (
    <Dropdown menu={<Menu />}>
      <span />
    </Dropdown>
  ));

  it('overlay is function and has custom transitionName', () => {
    const wrapper = mount(
      <Dropdown overlay={() => <div>menu</div>} transitionName="move-up" visible>
        <button type="button">button</button>
      </Dropdown>,
    );
    expect(wrapper).toMatchRenderedSnapshot();
  });

  it('overlay is string', () => {
    const wrapper = mount(
      <Dropdown overlay="string" visible>
        <button type="button">button</button>
      </Dropdown>,
    );
    expect(wrapper).toMatchRenderedSnapshot();
  });
});
