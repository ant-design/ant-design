import React from 'react';
import { mount } from 'enzyme';
import Popover from '..';
import mountTest from '../../../tests/shared/mountTest';

describe('Popover', () => {
  mountTest(Popover);

  it('should show overlay when trigger is clicked', () => {
    const popover = mount(
      <Popover content="console.log('hello world')" title="code" trigger="click">
        <span>show me your code</span>
      </Popover>,
    );

    expect(popover.instance().getPopupDomNode()).toBe(null);

    popover.find('span').simulate('click');

    const popup = popover.instance().getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.className).toContain('ant-popover-placement-top');
    expect(popup.innerHTML).toMatchSnapshot();
    expect(popup.innerHTML).toMatchSnapshot();
  });
});
