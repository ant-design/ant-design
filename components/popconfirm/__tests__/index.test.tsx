import React from 'react';
import { spyElementPrototype, warning } from '@rc-component/util';
import { vi } from 'vitest';

import Popconfirm from '..';
import { TriggerMockContext } from '../../../tests/shared/demoTestContext';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';
import ConfigProvider from '../../config-provider';

const { resetWarned } = warning;

// TODO: Remove this. Mock for React 19
vi.mock('react-dom', async () => {
  const realReactDOM = await vi.importActual<typeof import('react-dom')>('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient =
      await vi.importActual<typeof import('react-dom/client')>('react-dom/client');
    return {
      ...realReactDOM,
      createRoot: realReactDOMClient.createRoot,
    };
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
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should popup Popconfirm dialog', () => {
    const onOpenChange = vi.fn();

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
    expect(wrapper.baseElement.querySelectorAll('.popconfirm-test').length).toBe(1);

    fireEvent.click(triggerNode);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('should show overlay when trigger is clicked', async () => {
    const popconfirm = render(
      <Popconfirm title="code" autoAdjustOverflow={false}>
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(popconfirm.baseElement.querySelector('.ant-popover')).toBe(null);

    const triggerNode = popconfirm.container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);

    await waitFakeTimer(100);

    expect(popconfirm.baseElement.querySelector('.ant-popover')).not.toBeNull();
    expect(popconfirm.baseElement.querySelector('.ant-popover')).toHaveClass(
      'ant-popover-placement-top',
    );
    expect(popconfirm.baseElement.querySelector('.ant-popover')).toMatchSnapshot();
  });

  it('shows content for render functions', async () => {
    const makeRenderFunction = (content: string) => () => content;

    const popconfirm = render(
      <Popconfirm title={makeRenderFunction('some-title')}>
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(popconfirm.baseElement.querySelector('.ant-popover')).toBe(null);

    const triggerNode = popconfirm.container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    await waitFakeTimer(100);

    expect(popconfirm.baseElement.querySelector('.ant-popover')).not.toBe(null);
    expect(popconfirm.baseElement.querySelector('.ant-popover')?.innerHTML).toContain('some-title');
    expect(popconfirm.baseElement.querySelector('.ant-popover')).toMatchSnapshot();
  });

  it('should be controlled by open', () => {
    vi.useFakeTimers();
    const popconfirm = render(
      <Popconfirm title="code">
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(popconfirm.baseElement.querySelector('.ant-popover')).toBe(null);
    popconfirm.rerender(
      <Popconfirm title="code" open>
        <span>show me your code</span>
      </Popconfirm>,
    );

    expect(popconfirm.baseElement.querySelector('.ant-popover')).not.toBe(null);
    expect(popconfirm.baseElement.querySelector('.ant-popover')).not.toHaveClass(
      'ant-popover-hidden',
    );

    popconfirm.rerender(
      <Popconfirm title="code" open={false}>
        <span>show me your code</span>
      </Popconfirm>,
    );
    act(() => {
      vi.runAllTimers();
    });
    expect(popconfirm.baseElement.querySelector('.ant-popover')).not.toBe(null);
    vi.useRealTimers();
  });

  it('should render title when it is the number 0', () => {
    const { baseElement } = render(
      <Popconfirm title={0} open>
        <span>show me your code</span>
      </Popconfirm>,
    );
    const titleNode = baseElement.querySelector('.ant-popconfirm-title');
    expect(titleNode).not.toBe(null);
    expect(titleNode?.textContent).toContain('0');
  });

  it('should trigger onConfirm and onCancel', async () => {
    const confirm = vi.fn();
    const cancel = vi.fn();
    const onOpenChange = vi.fn();
    const popconfirm = render(
      <Popconfirm title="code" onConfirm={confirm} onCancel={cancel} onOpenChange={onOpenChange}>
        <span>show me your code</span>
      </Popconfirm>,
    );
    const triggerNode = popconfirm.container.querySelector('span')!;
    fireEvent.click(triggerNode);
    await waitFakeTimer();

    fireEvent.click(popconfirm.baseElement.querySelector('.ant-btn-primary')!);
    expect(confirm).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);

    fireEvent.click(triggerNode);
    await waitFakeTimer();

    fireEvent.click(popconfirm.baseElement.querySelector('.ant-btn')!);
    expect(cancel).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('should support onConfirm to return Promise', async () => {
    const confirm = () =>
      new Promise((res) => {
        setTimeout(res, 300);
      });
    const onOpenChange = vi.fn();
    const popconfirm = render(
      <Popconfirm title="code" onConfirm={confirm} onOpenChange={onOpenChange}>
        <span>show me your code</span>
      </Popconfirm>,
    );

    const triggerNode = popconfirm.container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    expect(onOpenChange).toHaveBeenCalledTimes(1);

    fireEvent.click(popconfirm.baseElement.querySelectorAll('.ant-btn')[0]);
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
    expect(popconfirm.baseElement.querySelectorAll('.customize-icon').length).toBe(1);
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

    expect(wrapper.baseElement.querySelectorAll('.custom-popconfirm').length).toBeGreaterThan(0);
    expect(wrapper.baseElement.querySelectorAll('.custom-btn').length).toBeGreaterThan(0);
  });

  it('should support defaultOpen', () => {
    const wrapper = render(
      <Popconfirm title="code" defaultOpen>
        <span>show me your code</span>
      </Popconfirm>,
    );
    expect(wrapper.baseElement.querySelector('.ant-popover')).toBeTruthy();
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
    const onOpenChange = vi.fn();
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
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

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

    const { container, baseElement } = render(
      <div>
        <Test />
      </div>,
    );

    expect(container.textContent).toBe('Test');

    fireEvent.click(container.querySelector('.clickTarget')!);
    fireEvent.click(baseElement.querySelector('.ant-btn-primary')!);

    await waitFakeTimer(500);
    // expect(container.textContent).toEqual('Unmounted');
    expect(error).not.toHaveBeenCalled();
  });

  it('should trigger onPopupClick', async () => {
    const onPopupClick = vi.fn();

    const popconfirm = render(
      <Popconfirm title={<div className="bamboo" />} onPopupClick={onPopupClick}>
        <span>show me your code</span>
      </Popconfirm>,
    );
    const triggerNode = popconfirm.container.querySelector('span')!;
    fireEvent.click(triggerNode);
    await waitFakeTimer();
    fireEvent.click(popconfirm.baseElement.querySelector('.bamboo')!);
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

    const { baseElement } = render(
      <Popconfirm classNames={customClassNames} title="" styles={customStyles} open>
        <span />
      </Popconfirm>,
    );

    const popconfirmElement = baseElement.querySelector('.ant-popconfirm');
    const popconfirmBodyElement = baseElement.querySelector('.ant-popover-container');

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
    const { container, baseElement } = render(<TooltipTestComponent />);
    const getTooltipArrow = () => baseElement.querySelector('.ant-popover-arrow');
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

    const { container, baseElement } = render(<TooltipTestComponent />);

    const getTooltipArrow = () => baseElement.querySelector('.ant-popover-arrow');
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
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const onOpenChange = (_open: boolean, _e?: React.MouseEvent) => {};
    render(
      <Popconfirm title="test" onOpenChange={onOpenChange}>
        <span>Delete</span>
      </Popconfirm>,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Popconfirm] The second `onOpenChange` parameter is internal and unsupported. Please lock to a previous version if needed.',
    );

    errorSpy.mockRestore();
  });

  // Test `styles` (useMergeSemantic path) and `className` (direct injection path)
  // to cover both ConfigProvider tooltip injection mechanisms
  it('ConfigProvider tooltip config should not leak into Popconfirm', () => {
    const { baseElement } = render(
      <ConfigProvider
        tooltip={{
          className: 'custom-tooltip-root',
          styles: {
            arrow: { background: 'red' },
          },
        }}
      >
        <Popconfirm title="Are you sure?" open>
          <span>Delete</span>
        </Popconfirm>
      </ConfigProvider>,
    );

    const popconfirm = baseElement.querySelector('.ant-popover');
    expect(popconfirm).not.toHaveClass('custom-tooltip-root');

    const arrow = baseElement.querySelector('.ant-popover-arrow');
    expect(arrow).not.toHaveStyle({ background: 'red' });
  });
});
