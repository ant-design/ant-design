import React from 'react';
import { spyElementPrototype } from '@rc-component/util/lib/test/domHook';
import { warning } from '@rc-component/util';

import Popconfirm from '..';
import { TriggerMockContext } from '../../../tests/shared/demoTestContext';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';
import ConfigProvider from '../../config-provider';

const { resetWarned } = warning;

// TODO: Remove this. Mock for React 19
jest.mock('react-dom', () => {
  const realReactDOM = jest.requireActual('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient = jest.requireActual('react-dom/client');
    realReactDOM.createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

describe('Popconfirm', () => {
  mountTest(() => <Popconfirm title="test" />);
  rtlTest(() => <Popconfirm title="test" />);

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
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(wrapper.container.querySelectorAll('.popconfirm-test').length).toBe(1);

    fireEvent.click(triggerNode);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
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
    expect(popconfirm.container.querySelector('.ant-popover')).toHaveClass(
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
    expect(popconfirm.container.querySelector('.ant-popover')).not.toHaveClass(
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
    const onOpenChange = jest.fn();
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
    expect(onOpenChange).toHaveBeenLastCalledWith(false);

    fireEvent.click(triggerNode);
    await waitFakeTimer();

    fireEvent.click(popconfirm.container.querySelector('.ant-btn')!);
    expect(cancel).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('should support onConfirm to return Promise', async () => {
    const confirm = () =>
      new Promise((res) => {
        setTimeout(res, 300);
      });
    const onOpenChange = jest.fn();
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
    expect(onOpenChange).toHaveBeenCalledWith(false);
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
    const onOpenChange = jest.fn();
    const wrapper = render(
      <TriggerMockContext.Provider value={{ mock: false }}>
        <Popconfirm
          title="title"
          mouseEnterDelay={0}
          mouseLeaveDelay={0}
          onOpenChange={onOpenChange}
        >
          <span>Delete</span>
        </Popconfirm>
      </TriggerMockContext.Provider>,
    );
    const triggerNode = wrapper.container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
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
      <Popconfirm title={<div className="bamboo" />} onPopupClick={onPopupClick}>
        <span>show me your code</span>
      </Popconfirm>,
    );
    const triggerNode = popconfirm.container.querySelector('span')!;
    fireEvent.click(triggerNode);
    await waitFakeTimer();
    fireEvent.click(popconfirm.container.querySelector('.bamboo')!);
    expect(onPopupClick).toHaveBeenCalled();
  });

  it('okText & cancelText could be empty', () => {
    render(
      <Popconfirm title="" okText="" cancelText="" open>
        <span />
      </Popconfirm>,
    );

    expect(document.body.querySelectorAll('.ant-btn')[0].textContent).toBe('Cancel');
    expect(document.body.querySelectorAll('.ant-btn')[1].textContent).toBe('OK');
  });

  it('should apply custom styles to Popconfirm', () => {
    const customClassNames = {
      container: 'custom-container',
      root: 'custom-root',
    };

    const customStyles = {
      container: { padding: 10 },
      root: { padding: 20 },
    };

    const { container } = render(
      <Popconfirm classNames={customClassNames} title="" styles={customStyles} open>
        <span />
      </Popconfirm>,
    );

    const popconfirmElement = container.querySelector('.ant-popconfirm');
    const popconfirmBodyElement = container.querySelector('.ant-popover-container');

    // 验证 classNames
    expect(popconfirmElement).toHaveClass('custom-root');
    expect(popconfirmBodyElement).toHaveClass('custom-container');

    // 验证 styles
    expect(popconfirmElement).toHaveStyle({ padding: '20px' });
    expect(popconfirmBodyElement).toHaveStyle({ padding: '10px' });
  });
  it('ConfigProvider support arrow props', () => {
    const TooltipTestComponent = () => {
      const [configArrow, setConfigArrow] = React.useState(true);

      return (
        <ConfigProvider
          popconfirm={{
            arrow: configArrow,
          }}
        >
          <button onClick={() => setConfigArrow(false)} className="configArrow" type="button">
            showconfigArrow
          </button>
          <Popconfirm open title>
            <div className="target">target</div>
          </Popconfirm>
        </ConfigProvider>
      );
    };
    const { container } = render(<TooltipTestComponent />);
    const getTooltipArrow = () => container.querySelector('.ant-popover-arrow');
    const configbtn = container.querySelector('.configArrow');

    expect(getTooltipArrow()).not.toBeNull();
    fireEvent.click(configbtn!);
    expect(getTooltipArrow()).toBeNull();
  });
  it('ConfigProvider with arrow set to false, Tooltip arrow controlled by prop', () => {
    const TooltipTestComponent = () => {
      const [arrow, setArrow] = React.useState(true);

      return (
        <ConfigProvider
          popover={{
            arrow: false,
          }}
        >
          <button onClick={() => setArrow(!arrow)} className="toggleArrow" type="button">
            toggleArrow
          </button>
          <Popconfirm open arrow={arrow} title>
            <div className="target">target</div>
          </Popconfirm>
        </ConfigProvider>
      );
    };

    const { container } = render(<TooltipTestComponent />);

    const getTooltipArrow = () => container.querySelector('.ant-popover-arrow');
    const toggleArrowBtn = container.querySelector('.toggleArrow');

    // Initial render, arrow should be visible because Tooltip's arrow prop is true
    expect(getTooltipArrow()).not.toBeNull();

    // Click the toggleArrow button to hide the arrow
    fireEvent.click(toggleArrowBtn!);
    expect(getTooltipArrow()).toBeNull();

    // Click the toggleArrow button again to show the arrow
    fireEvent.click(toggleArrowBtn!);
    expect(getTooltipArrow()).not.toBeNull();
  });

  it('should warn when onOpenChange has more than one argument', () => {
    resetWarned();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const onOpenChange = (_open: boolean, _e?: React.MouseEvent) => {};
    render(
      <Popconfirm title="test" onOpenChange={onOpenChange}>
        <span>Delete</span>
      </Popconfirm>,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Popconfirm] `onOpenChange` only accept `open` argument. The second event argument is internal usage and not support.',
    );

    errorSpy.mockRestore();
  });
});
