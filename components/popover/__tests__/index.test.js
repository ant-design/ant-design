import React from 'react';
import { mount } from 'enzyme';
import Popover from '..';

describe('Popover', () => {
  it('should show overlay when trigger is clicked', () => {
    const popover = mount(
      <Popover content="console.log('hello world')" title="code" trigger="click">
        <span>show me your code</span>
      </Popover>
    );

    expect(popover.node.getPopupDomNode()).toBe(null);

    popover.find('span').simulate('click');

    const popup = popover.node.getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.className).toContain('ant-popover-placement-top');
    expect(popup.innerHTML).toMatchSnapshot();
    expect(popup.innerHTML).toMatchSnapshot();
  });
});
