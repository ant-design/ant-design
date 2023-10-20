import { spyElementPrototype } from 'rc-util/lib/test/domHook';
import React from 'react';
import Popconfirm from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';

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

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should popup Popconfirm dialog', () => {
    const onOpenChange = jest.fn();

    const wrapper = render(
      <Popconfirm
        title={<span className="popconfirm-test">Are you sure delete this task?</span>}
        okText="Yes"
        cancelText="No"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onOpenChange={onOpenChange}
      >
        <span>Delete</span>
      </Popconfirm>,
    );

    const triggerNode = wrapper.container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    expect(onOpenChange).toHaveBeenLastCalledWith(true, undefined);
    expect(wrapper.container.querySelectorAll('.popconfirm-test').length).toBe(1);

    fireEvent.click(triggerNode);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, undefined);
  });

  it('should show overlay when trigger is clicked', async () => {
    const popconfirm = render(
      <Popconfirm title="code" autoAdjustOverflow={false}>
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(popconfirm.container.querySelector('.ant-popover')).toBe(null);

    const triggerNode = popconfirm.container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);

    await waitFakeTimer(100);

    expect(popconfirm.container.querySelector('.ant-popover')).not.toBeNull();
    expect(popconfirm.container.querySelector('.ant-popover')?.className).toContain(
      'ant-popover-placement-top',
    );
    expect(popconfirm.container.querySelector('.ant-popover')).toMatchSnapshot();
  });

  it('shows content for render functions', async () => {
    const makeRenderFunction = (content: string) => () => content;

    const popconfirm = render(
      <Popconfirm title={makeRenderFunction('some-title')}>
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(popconfirm.container.querySelector('.ant-popover')).toBe(null);

    const triggerNode = popconfirm.container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    await waitFakeTimer(100);

    expect(popconfirm.container.querySelector('.ant-popover')).not.toBe(null);
    expect(popconfirm.container.querySelector('.ant-popover')?.innerHTML).toContain('some-title');
    expect(popconfirm.container.querySelector('.ant-popover')).toMatchSnapshot();
  });

  it('should be controlled by open', () => {
    jest.useFakeTimers();
    const popconfirm = render(
      <Popconfirm title="code">
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(popconfirm.container.querySelector('.ant-popover')).toBe(null);
    popconfirm.rerender(
      <Popconfirm title="code" open>
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(popconfirm.container.querySelector('.ant-popover')).not.toBe(null);
    expect(popconfirm.container.querySelector('.ant-popover')?.className).not.toContain(
      'ant-popover-hidden',
    );

    popconfirm.rerender(
      <Popconfirm title="code" open={false}>
        <span>show me your code</span>
      </Popconfirm>,
    );
    act(() => {
      jest.runAllTimers();
    });
    expect(popconfirm.container.querySelector('.ant-popover')).not.toBe(null);
    jest.useRealTimers();
  });

  it('should trigger onConfirm and onCancel', async () => {
    const confirm = jest.fn();
    const cancel = jest.fn();
    const onOpenChange = jest.fn((_, e) => {
      e?.persist?.();
    });
    const popconfirm = render(
      <Popconfirm title="code" onConfirm={confirm} onCancel={cancel} onOpenChange={onOpenChange}>
        <span>show me your code</span>
      </Popconfirm>,
    );
    const triggerNode = popconfirm.container.querySelector('span')!;
    fireEvent.click(triggerNode);
    await waitFakeTimer();

    fireEvent.click(popconfirm.container.querySelector('.ant-btn-primary')!);
    expect(confirm).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenLastCalledWith(false, eventObject);

    fireEvent.click(triggerNode);
    await waitFakeTimer();

    fireEvent.click(popconfirm.container.querySelector('.ant-btn')!);
    expect(cancel).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenLastCalledWith(false, eventObject);
  });

  it('should support onConfirm to return Promise', async () => {
    const confirm = () =>
      new Promise((res) => {
        setTimeout(res, 300);
      });
    const onOpenChange = jest.fn((_, e) => {
      e?.persist?.();
    });
    const popconfirm = render(
      <Popconfirm title="code" onConfirm={confirm} onOpenChange={onOpenChange}>
        <span>show me your code</span>
      </Popconfirm>,
    );

    const triggerNode = popconfirm.container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    expect(onOpenChange).toHaveBeenCalledTimes(1);

    fireEvent.click(popconfirm.container.querySelectorAll('.ant-btn')[0]);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenCalledWith(false, eventObject);
  });

  it('should support customize icon', () => {
    const popconfirm = render(
      <Popconfirm title="code" icon={<span className="customize-icon">custom-icon</span>}>
        <span>show me your code</span>
      </Popconfirm>,
    );

    const triggerNode = popconfirm.container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    expect(popconfirm.container.querySelectorAll('.customize-icon').length).toBe(1);
  });

  it('should prefixCls correctly', () => {
    const btnPrefixCls = 'custom-btn';
    const wrapper = render(
      <Popconfirm
        open
        title="x"
        prefixCls="custom-popconfirm"
        okButtonProps={{ prefixCls: btnPrefixCls }}
        cancelButtonProps={{ prefixCls: btnPrefixCls }}
      >
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(wrapper.container.querySelectorAll('.custom-popconfirm').length).toBeGreaterThan(0);
    expect(wrapper.container.querySelectorAll('.custom-btn').length).toBeGreaterThan(0);
  });

  it('should support defaultOpen', () => {
    const wrapper = render(
      <Popconfirm title="code" defaultOpen>
        <span>show me your code</span>
      </Popconfirm>,
    );
    expect(wrapper.container.querySelector('.ant-popover')).toBeTruthy();
  });

  it('should not open in disabled', () => {
    const wrapper = render(
      <Popconfirm title="code" disabled>
        <span>click me</span>
      </Popconfirm>,
    );
    const triggerNode = wrapper.container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    expect(wrapper.container.querySelector('.ant-popover')).toBeFalsy();
  });

  it('should be closed by pressing ESC', () => {
    const onOpenChange = jest.fn((_, e) => {
      e?.persist?.();
    });
    const wrapper = render(
      <Popconfirm title="title" mouseEnterDelay={0} mouseLeaveDelay={0} onOpenChange={onOpenChange}>
        <span>Delete</span>
      </Popconfirm>,
    );
    const triggerNode = wrapper.container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    expect(onOpenChange).toHaveBeenLastCalledWith(true, undefined);
    fireEvent.keyDown(triggerNode, { key: 'Escape', keyCode: 27 });
    expect(onOpenChange).toHaveBeenLastCalledWith(false, eventObject);
  });

  it('should not warn memory leaking if setState in async callback', async () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});

    const Test = () => {
      const [show, setShow] = React.useState(true);

      if (show) {
        return (
          <Popconfirm
            title="will unmount"
            onConfirm={() =>
              new Promise((resolve) => {
                setTimeout(() => {
                  setShow(false);
                  resolve(true);
                }, 300);
              })
            }
          >
            <Button className="clickTarget">Test</Button>
          </Popconfirm>
        );
      }
      return <Button>Unmounted</Button>;
    };

    const { container } = render(
      <div>
        <Test />
      </div>,
    );

    expect(container.textContent).toEqual('Test');

    fireEvent.click(container.querySelector('.clickTarget')!);
    fireEvent.click(container.querySelector('.ant-btn-primary')!);

    await waitFakeTimer(500);
    // expect(container.textContent).toEqual('Unmounted');
    expect(error).not.toHaveBeenCalled();
  });

  it('should trigger onPopupClick', async () => {
    const onPopupClick = jest.fn();

    const popconfirm = render(
      <Popconfirm title="pop test" onPopupClick={onPopupClick}>
        <span>show me your code</span>
      </Popconfirm>,
    );
    const triggerNode = popconfirm.container.querySelector('span')!;
    fireEvent.click(triggerNode);
    await waitFakeTimer();
    fireEvent.click(popconfirm.container.querySelector('.ant-popover-inner-content')!);
    expect(onPopupClick).toHaveBeenCalled();
  });

  // https://github.com/ant-design/ant-design/issues/42314
  it('legacy onVisibleChange should only trigger once', async () => {
    const onOpenChange = jest.fn();
    const onVisibleChange = jest.fn();

    const { container } = render(
      <Popconfirm
        title="will unmount"
        onOpenChange={onOpenChange}
        onVisibleChange={onVisibleChange}
      >
        <span className="target" />
      </Popconfirm>,
    );

    fireEvent.click(container.querySelector('.target')!);
    await waitFakeTimer();

    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onVisibleChange).toHaveBeenCalledTimes(1);
  });
});
