import React from 'react';
import { mount } from 'enzyme';
import Popconfirm from '..';

describe('Popconfirm', () => {
  const eventObject = expect.objectContaining({
    target: expect.anything(),
    preventDefault: expect.any(Function),
  });

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
      </Popconfirm>,
    );

    const triggerNode = wrapper.find('span').at(0);
    triggerNode.simulate('click');
    expect(onVisibleChange).toHaveBeenLastCalledWith(true, undefined);
    expect(wrapper.find('.popconfirm-test').length).toBe(1);

    triggerNode.simulate('click');
    expect(onVisibleChange).toHaveBeenLastCalledWith(false, undefined);
  });

  it('should show overlay when trigger is clicked', () => {
    const popconfirm = mount(
      <Popconfirm title="code">
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(popconfirm.instance().getPopupDomNode()).toBe(null);

    popconfirm.find('span').simulate('click');

    const popup = popconfirm.instance().getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.className).toContain('ant-popover-placement-top');
    expect(popup.innerHTML).toMatchSnapshot();
    expect(popup.innerHTML).toMatchSnapshot();
  });

  it('should be controlled by visible', () => {
    jest.useFakeTimers();
    const popconfirm = mount(
      <Popconfirm title="code">
        <span>show me your code</span>
      </Popconfirm>,
    );
    expect(popconfirm.instance().getPopupDomNode()).toBeFalsy();
    popconfirm.setProps({ visible: true });
    expect(popconfirm.instance().getPopupDomNode()).toBeTruthy();
    expect(popconfirm.instance().getPopupDomNode().className).not.toContain('ant-popover-hidden');
    popconfirm.setProps({ visible: false });
    jest.runAllTimers();
    expect(popconfirm.instance().getPopupDomNode().className).toContain('ant-popover-hidden');
    jest.useRealTimers();
  });

  it('should trigger onConfirm and onCancel', () => {
    const confirm = jest.fn();
    const cancel = jest.fn();
    const onVisibleChange = jest.fn();
    const popconfirm = mount(
      <Popconfirm
        title="code"
        onConfirm={confirm}
        onCancel={cancel}
        onVisibleChange={onVisibleChange}
      >
        <span>show me your code</span>
      </Popconfirm>,
    );
    const triggerNode = popconfirm.find('span').at(0);
    triggerNode.simulate('click');
    popconfirm.find('.ant-btn-primary').simulate('click');
    expect(confirm).toHaveBeenCalled();
    expect(onVisibleChange).toHaveBeenLastCalledWith(false, eventObject);
    triggerNode.simulate('click');
    popconfirm
      .find('.ant-btn')
      .at(0)
      .simulate('click');
    expect(cancel).toHaveBeenCalled();
    expect(onVisibleChange).toHaveBeenLastCalledWith(false, eventObject);
  });

  it('should support customize icon', () => {
    const wrapper = mount(
      <Popconfirm title="code" icon={<span className="customize-icon">custom-icon</span>}>
        <span>show me your code</span>
      </Popconfirm>,
    );

    const triggerNode = wrapper.find('span').at(0);
    triggerNode.simulate('click');
    expect(wrapper.find('.customize-icon').length).toBe(1);
  });

  it('should prefixCls correctly', () => {
    const btnPrefixCls = 'custom-btn';
    const wrapper = mount(
      <Popconfirm
        visible
        title="x"
        prefixCls="custom-popconfirm"
        okButtonProps={{ prefixCls: btnPrefixCls }}
        cancelButtonProps={{ prefixCls: btnPrefixCls }}
      >
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(wrapper.find('.custom-popconfirm').length).toBeGreaterThan(0);
    expect(wrapper.find('.custom-btn').length).toBeGreaterThan(0);
  });

  it('should support defaultVisible', () => {
    const popconfirm = mount(
      <Popconfirm title="code" defaultVisible>
        <span>show me your code</span>
      </Popconfirm>,
    );
    expect(popconfirm.instance().getPopupDomNode()).toBeTruthy();
  });

  it('should not open in disabled', () => {
    const popconfirm = mount(
      <Popconfirm title="code" disabled>
        <span>click me</span>
      </Popconfirm>,
    );
    const triggerNode = popconfirm.find('span').at(0);
    triggerNode.simulate('click');
    expect(popconfirm.instance().getPopupDomNode()).toBeFalsy();
  });
});
