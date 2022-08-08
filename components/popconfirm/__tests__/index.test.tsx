import { spyElementPrototype } from 'rc-util/lib/test/domHook';
import React from 'react';
import Popconfirm from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, sleep, act } from '../../../tests/utils';
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

  it('should popup Popconfirm dialog', () => {
    const onVisibleChange = jest.fn();

    const { container } = render(
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

    const triggerNode = container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    expect(onVisibleChange).toHaveBeenLastCalledWith(true, undefined);
    expect(container.querySelectorAll('.popconfirm-test')!.length).toBe(1);

    fireEvent.click(triggerNode);
    expect(onVisibleChange).toHaveBeenLastCalledWith(false, undefined);
  });

  it('should show overlay when trigger is clicked', async () => {
    const ref = React.createRef<any>();
    const { container } = render(
      <Popconfirm ref={ref} title="code">
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(ref.current.getPopupDomNode()).toBe(null);

    const triggerNode = container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    await sleep(100);

    const popup = ref.current.getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.className).toContain('ant-popover-placement-top');
    expect(popup.innerHTML).toMatchSnapshot();
    expect(popup.innerHTML).toMatchSnapshot();
  });

  it('shows content for render functions', async () => {
    const makeRenderFunction = (content: string) => () => content;
    const ref = React.createRef<any>();

    const { container } = render(
      <Popconfirm ref={ref} title={makeRenderFunction('some-title')}>
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(ref.current.getPopupDomNode()).toBe(null);

    const triggerNode = container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);

    await sleep(100);

    const popup = ref.current.getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.innerHTML).toContain('some-title');
    expect(popup.innerHTML).toMatchSnapshot();
  });

  it('should be controlled by visible', () => {
    const ref = React.createRef<any>();
    jest.useFakeTimers();

    const renderPopconfirm = (visible?: boolean) => (
      <Popconfirm ref={ref} title="code" visible={visible}>
        <span>show me your code</span>
      </Popconfirm>
    );

    const popconfirm = render(renderPopconfirm());
    expect(ref.current.getPopupDomNode()).toBeFalsy();

    popconfirm.rerender(renderPopconfirm(true));

    expect(ref.current.getPopupDomNode()).toBeTruthy();
    expect(ref.current.getPopupDomNode().className).not.toContain('ant-popover-hidden');
    popconfirm.rerender(renderPopconfirm(false));
    act(() => {
      jest.runAllTimers();
    });
    expect(ref.current.props.visible).toBe(false);
    jest.useRealTimers();
  });

  it('should trigger onConfirm and onCancel', () => {
    const confirm = jest.fn();
    const cancel = jest.fn();
    const onVisibleChange = jest.fn();
    const { container } = render(
      <Popconfirm
        title="code"
        onConfirm={confirm}
        onCancel={cancel}
        onVisibleChange={onVisibleChange}
      >
        <span>show me your code</span>
      </Popconfirm>,
    );
    const triggerNode = container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    fireEvent.click(container.querySelector('.ant-btn-primary')!);
    expect(confirm).toHaveBeenCalled();
    expect(onVisibleChange).toHaveBeenLastCalledWith(false, eventObject);
    fireEvent.click(triggerNode);
    fireEvent.click(container.querySelectorAll('.ant-btn')[0]);
    expect(cancel).toHaveBeenCalled();
    expect(onVisibleChange).toHaveBeenLastCalledWith(false, eventObject);
  });

  it('should support onConfirm to return Promise', async () => {
    const confirm = () =>
      new Promise(res => {
        setTimeout(res, 300);
      });
    const onVisibleChange = jest.fn();
    const { container } = render(
      <Popconfirm title="code" onConfirm={confirm} onVisibleChange={onVisibleChange}>
        <span>show me your code</span>
      </Popconfirm>,
    );

    const triggerNode = container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    expect(onVisibleChange).toHaveBeenCalledTimes(1);

    fireEvent.click(container.querySelectorAll('.ant-btn')[0]);
    await sleep(400);
    expect(onVisibleChange).toHaveBeenCalledWith(false, eventObject);
  });

  it('should support customize icon', () => {
    const { container } = render(
      <Popconfirm title="code" icon={<span className="customize-icon">custom-icon</span>}>
        <span>show me your code</span>
      </Popconfirm>,
    );

    const triggerNode = container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    expect(container.querySelectorAll('.customize-icon').length).toBe(1);
  });

  it('should prefixCls correctly', () => {
    const btnPrefixCls = 'custom-btn';
    const { container } = render(
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

    expect(container.querySelectorAll('.custom-popconfirm').length).toBeGreaterThan(0);
    expect(container.querySelectorAll('.custom-btn').length).toBeGreaterThan(0);
  });

  it('should support defaultVisible', () => {
    const ref = React.createRef<any>();
    render(
      <Popconfirm ref={ref} title="code" defaultVisible>
        <span>show me your code</span>
      </Popconfirm>,
    );
    expect(ref.current.getPopupDomNode()).toBeTruthy();
  });

  it('should not open in disabled', () => {
    const ref = React.createRef<any>();

    const { container } = render(
      <Popconfirm ref={ref} title="code" disabled>
        <span>click me</span>
      </Popconfirm>,
    );
    const triggerNode = container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    expect(ref.current.getPopupDomNode()).toBeFalsy();
  });

  it('should be closed by pressing ESC', () => {
    const onVisibleChange = jest.fn();
    const { container } = render(
      <Popconfirm
        title="title"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onVisibleChange={onVisibleChange}
      >
        <span>Delete</span>
      </Popconfirm>,
    );
    const triggerNode = container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    expect(onVisibleChange).toHaveBeenLastCalledWith(true, undefined);
    fireEvent.keyDown(triggerNode, { key: 'Escape', keyCode: 27 });
    expect(onVisibleChange).toHaveBeenLastCalledWith(false, eventObject);
  });

  it('should not warn memory leaking if setState in async callback', async () => {
    const error = jest.spyOn(console, 'error');

    const Test = () => {
      const [show, setShow] = React.useState(true);

      if (show) {
        return (
          <Popconfirm
            title="will unmount"
            onConfirm={() =>
              new Promise(resolve => {
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

    await sleep(500);
    // expect(container.textContent).toEqual('Unmounted');
    expect(error).not.toHaveBeenCalled();
  });
});
