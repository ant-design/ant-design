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
    expect(document.querySelectorAll('.popconfirm-test').length).toBe(1);

    triggerNode.simulate('click');
    expect(onVisibleChange).toBeCalledWith(false);
  });
});
