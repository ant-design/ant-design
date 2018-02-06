import React from 'react';
import { mount } from 'enzyme';
import Popconfirm from '..';

describe('Popconfirm', () => {
  it('should popup Popconfirm dialog', () => {
    const onVisibleChange = jest.fn();

    const wrapper = mount(
      <Popconfirm
        title={<span className="popconfirm-test">Are you sure delete this task?</span>}
        okText="Yes"
        cancelText="No"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onVisibleChange={onVisibleChange}
      >
        <span>Delete</span>
      </Popconfirm>
    );

    const triggerNode = wrapper.find('span').at(0);
    triggerNode.simulate('click');
    expect(onVisibleChange).toBeCalledWith(true);
    expect(wrapper.find('.popconfirm-test').length).toBe(1);

    triggerNode.simulate('click');
    expect(onVisibleChange).toBeCalledWith(false);
  });

  it('should show overlay when trigger is clicked', () => {
    const popconfirm = mount(
      <Popconfirm title="code">
        <span>show me your code</span>
      </Popconfirm>
    );

    expect(popconfirm.instance().getPopupDomNode()).toBe(null);

    popconfirm.find('span').simulate('click');

    const popup = popconfirm.instance().getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.className).toContain('ant-popover-placement-top');
    expect(popup.innerHTML).toMatchSnapshot();
    expect(popup.innerHTML).toMatchSnapshot();
  });
});
