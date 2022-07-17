import React from 'react';
import { mount } from 'enzyme';
import { spyElementPrototype } from 'rc-util/lib/test/domHook';
import Popconfirm from '..';
import mountTest from '../../../tests/shared/mountTest';
import { sleep } from '../../../tests/utils';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Popconfirm', () => {
  mountTest(Popconfirm);
  rtlTest(Popconfirm);

  const eventObject = expect.objectContaining({
    target: expect.anything(),
    preventDefault: expect.any(Function),
  });

  beforeAll(() => {
    spyElementPrototype(HTMLElement, 'offsetParent', {
      get: () => ({}),
    });
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

  it('should show overlay when trigger is clicked', async () => {
    const ref = React.createRef();
    const popconfirm = mount(
      <Popconfirm ref={ref} title="code">
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(ref.current.getPopupDomNode()).toBe(null);

    popconfirm.find('span').simulate('click');
    await sleep(100);

    const popup = ref.current.getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.className).toContain('ant-popover-placement-top');
    expect(popup.innerHTML).toMatchSnapshot();
    expect(popup.innerHTML).toMatchSnapshot();
  });

  it('shows content for render functions', async () => {
    const makeRenderFunction = content => () => content;
    const ref = React.createRef();

    const popconfirm = mount(
      <Popconfirm ref={ref} title={makeRenderFunction('some-title')}>
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(ref.current.getPopupDomNode()).toBe(null);

    popconfirm.find('span').simulate('click');
    await sleep(100);

    const popup = ref.current.getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.innerHTML).toContain('some-title');
    expect(popup.innerHTML).toMatchSnapshot();
  });

  it('should be controlled by visible', () => {
    const ref = React.createRef();
    jest.useFakeTimers();
    const popconfirm = mount(
      <Popconfirm ref={ref} title="code">
        <span>show me your code</span>
      </Popconfirm>,
    );
    expect(ref.current.getPopupDomNode()).toBeFalsy();
    popconfirm.setProps({ visible: true });
    expect(ref.current.getPopupDomNode()).toBeTruthy();
    expect(ref.current.getPopupDomNode().className).not.toContain('ant-popover-hidden');
    popconfirm.setProps({ visible: false });
    popconfirm.update(); // https://github.com/enzymejs/enzyme/issues/2305
    jest.runAllTimers();
    expect(popconfirm.find('Trigger').props().popupVisible).toBe(false);
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
    popconfirm.find('.ant-btn').at(0).simulate('click');
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
    const ref = React.createRef();
    mount(
      <Popconfirm ref={ref} title="code" defaultVisible>
        <span>show me your code</span>
      </Popconfirm>,
    );
    expect(ref.current.getPopupDomNode()).toBeTruthy();
  });

  it('should not open in disabled', () => {
    const ref = React.createRef();

    const popconfirm = mount(
      <Popconfirm ref={ref} title="code" disabled>
        <span>click me</span>
      </Popconfirm>,
    );
    const triggerNode = popconfirm.find('span').at(0);
    triggerNode.simulate('click');
    expect(ref.current.getPopupDomNode()).toBeFalsy();
  });

  it('should be closed by pressing ESC', () => {
    const onVisibleChange = jest.fn();
    const wrapper = mount(
      <Popconfirm
        title="title"
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
    triggerNode.simulate('keydown', { key: 'Escape', keyCode: 27 });
    expect(onVisibleChange).toHaveBeenLastCalledWith(false, eventObject);
  });
});
