import React from 'react';
import { warning } from '@rc-component/util';
import { spyElementPrototype } from '@rc-component/util/lib/test/domHook';

import type { TooltipPlacement, TooltipProps } from '..';
import Tooltip from '..';
import getPlacements from '../../_util/placements';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';
import ConfigProvider from '../../config-provider';
import DatePicker from '../../date-picker';
import Input from '../../input';
import Group from '../../input/Group';
import Radio from '../../radio';
import Switch from '../../switch';
import { parseColor } from '../util';
import { isTooltipOpen } from './util';

const { resetWarned } = warning;

describe('Tooltip', () => {
  mountTest(Tooltip);
  rtlTest(Tooltip);

  beforeAll(() => {
    spyElementPrototype(HTMLElement, 'offsetParent', {
      get: () => ({}),
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  it('check `onOpenChange` arguments', async () => {
    const onOpenChange = jest.fn();
    const ref = React.createRef<any>();

    const { container, rerender } = render(
      <Tooltip
        title=""
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onOpenChange={onOpenChange}
        ref={ref}
      >
        <div id="hello">Hello world!</div>
      </Tooltip>,
    );

    // `title` is empty.
    const divElement = container.querySelector('#hello');
    fireEvent.mouseEnter(divElement!);
    await waitFakeTimer();
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(isTooltipOpen()).toBeFalsy();
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();

    fireEvent.mouseLeave(divElement!);
    await waitFakeTimer();
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(isTooltipOpen()).toBeFalsy();
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();

    // update `title` value.
    rerender(
      <Tooltip
        title="Have a nice day!"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onOpenChange={onOpenChange}
        ref={ref}
      >
        <div id="hello">Hello world!</div>
      </Tooltip>,
    );
    fireEvent.mouseEnter(divElement!);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(isTooltipOpen()).toBeTruthy();
    expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();

    fireEvent.mouseLeave(divElement!);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(isTooltipOpen()).toBeFalsy();
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();

    // add `open` props.
    rerender(
      <Tooltip
        title="Have a nice day!"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onOpenChange={onOpenChange}
        ref={ref}
        open={false}
      >
        <div id="hello">Hello world!</div>
      </Tooltip>,
    );
    fireEvent.mouseEnter(divElement!);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    const lastCount = onOpenChange.mock.calls.length;
    expect(isTooltipOpen()).toBeFalsy();
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();

    // always trigger onOpenChange
    fireEvent.mouseLeave(divElement!);
    await waitFakeTimer();
    expect(onOpenChange.mock.calls.length).toBe(lastCount); // no change with lastCount
    expect(isTooltipOpen()).toBeFalsy();
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();
  });

  it('should hide when mouse leave native disabled button', async () => {
    const onOpenChange = jest.fn();
    const ref = React.createRef<any>();

    const { container } = render(
      <Tooltip
        title="xxxxx"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onOpenChange={onOpenChange}
        ref={ref}
      >
        <button type="button" disabled>
          Hello world!
        </button>
      </Tooltip>,
    );

    const button = container.getElementsByTagName('button')[0];

    fireEvent.pointerEnter(button);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(isTooltipOpen()).toBeTruthy();
    expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();

    fireEvent.pointerLeave(button);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(isTooltipOpen()).toBeFalsy();
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();
  });

  describe('should hide when mouse leave antd disabled component', () => {
    function testComponent(name: string, Component: typeof Button | typeof Switch) {
      it(name, async () => {
        const onOpenChange = jest.fn();
        const ref = React.createRef<any>();
        const { container } = render(
          <Tooltip
            title="xxxxx"
            mouseEnterDelay={0}
            mouseLeaveDelay={0}
            onOpenChange={onOpenChange}
            ref={ref}
          >
            <Component disabled />
          </Tooltip>,
        );

        expect(container.children[0]).toMatchSnapshot();

        const button = container.getElementsByTagName('button')[0];

        fireEvent.pointerEnter(button);
        await waitFakeTimer();
        expect(onOpenChange).toHaveBeenCalledWith(true);
        expect(isTooltipOpen()).toBeTruthy();
        expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();

        fireEvent.pointerLeave(button);
        await waitFakeTimer();
        expect(onOpenChange).toHaveBeenCalledWith(false);
        expect(isTooltipOpen()).toBeFalsy();
        expect(container.querySelector('.ant-tooltip-open')).toBeNull();
      });
    }

    testComponent('Button', Button);
    testComponent('Switch', Switch);
  });

  it('should render disabled Button style properly', () => {
    const { container: containerInline } = render(
      <Tooltip title="xxxxx">
        <Button disabled>Hello world!</Button>
      </Tooltip>,
    );
    const { container: containerBlock } = render(
      <Tooltip title="xxxxx">
        <Button disabled style={{ display: 'block' }}>
          Hello world!
        </Button>
      </Tooltip>,
    );
    expect(getComputedStyle(containerInline.querySelector('button')!)?.display).toBe('inline-flex');
    expect(getComputedStyle(containerBlock.querySelector('button')!)?.display).toBe('block');
  });

  it('should works for date picker', async () => {
    const onOpenChange = jest.fn();
    const ref = React.createRef<any>();

    const { container } = render(
      <Tooltip title="date picker" onOpenChange={onOpenChange} ref={ref}>
        <DatePicker />
      </Tooltip>,
    );

    expect(container.getElementsByClassName('ant-picker')).toHaveLength(1);
    const picker = container.getElementsByClassName('ant-picker')[0];

    fireEvent.mouseEnter(picker);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(isTooltipOpen()).toBeTruthy();
    expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();

    fireEvent.mouseLeave(picker);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(isTooltipOpen()).toBeFalsy();
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();
  });

  it('should works for input group', async () => {
    const onOpenChange = jest.fn();
    const ref = React.createRef<any>();
    const { container } = render(
      <Tooltip title="hello" onOpenChange={onOpenChange} ref={ref}>
        <Group>
          <Input style={{ width: '50%' }} />
          <Input style={{ width: '50%' }} />
        </Group>
      </Tooltip>,
    );

    expect(container.getElementsByClassName('ant-input-group')).toHaveLength(1);
    const inputGroup = container.getElementsByClassName('ant-input-group')[0];
    fireEvent.mouseEnter(inputGroup);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(isTooltipOpen()).toBeTruthy();
    expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();

    fireEvent.mouseLeave(inputGroup);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(isTooltipOpen()).toBeFalsy();
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();
  });

  // https://github.com/ant-design/ant-design/issues/20891
  it('should display zero', () => {
    const { container } = render(
      <Tooltip title={0} open>
        <div />
      </Tooltip>,
    );
    expect(container.querySelector('.ant-tooltip-container')?.innerHTML).toBe('0');
  });

  it('autoAdjustOverflow should be object or undefined', () => {
    expect(() => {
      render(
        <Tooltip title={0} open autoAdjustOverflow={{ adjustX: 0, adjustY: 0 }}>
          <div />
        </Tooltip>,
      );
    }).not.toThrow();

    expect(() => {
      render(
        <Tooltip title={0} open autoAdjustOverflow={undefined}>
          <div />
        </Tooltip>,
      );
    }).not.toThrow();
  });

  describe('support other placement when mouse enter', () => {
    const placementList = [
      'top',
      'left',
      'right',
      'bottom',
      'topLeft',
      'topRight',
      'bottomLeft',
      'bottomRight',
      'leftTop',
      'leftBottom',
      'rightTop',
      'rightBottom',
    ] as const;

    const testPlacement = (name: string, placement: TooltipPlacement) => {
      it(name, async () => {
        const { container } = render(
          <Tooltip
            title="xxxxx"
            motion={{ motionName: '' }}
            mouseEnterDelay={0}
            placement={placement}
            autoAdjustOverflow={false}
          >
            <span>Hello world!</span>
          </Tooltip>,
        );
        expect(container.getElementsByTagName('span')).toHaveLength(1);
        const element = container.getElementsByTagName('span')[0];
        fireEvent.mouseEnter(element);
        await waitFakeTimer();
        expect(document.querySelector(`.ant-tooltip-placement-${placement}`)).toBeTruthy();
      });

      it(`${name} with arrowPointAtCenter`, async () => {
        const placementInfo: Record<string, any> = getPlacements({
          arrowPointAtCenter: true,
          autoAdjustOverflow: false,
          arrowWidth: 0,
          borderRadius: 10,
          offset: 0,
        });

        // Safe to rewrite follow all check
        const { offset } = placementInfo[placement];

        const existO = offset[0] !== 0 || offset[1] !== 0;

        if (['left', 'right', 'top', 'bottom'].includes(placement)) {
          expect(existO).toBeFalsy();
        } else {
          expect(existO).toBeTruthy();
        }
      });
    };

    placementList.forEach((placement) => testPlacement(`Placement ${placement}`, placement));
  });

  it('should works for mismatch placement', async () => {
    const { container } = render(
      <Tooltip
        title="xxxxx"
        align={{
          points: ['bc', 'tl'],
        }}
        mouseEnterDelay={0}
      >
        <span>Hello world!</span>
      </Tooltip>,
    );
    const button = container.getElementsByTagName('span')[0];
    fireEvent.mouseEnter(button);
    await waitFakeTimer();
    expect(document.querySelector('.ant-tooltip')).not.toBeNull();
  });

  it('should pass styles.container through to the inner component', () => {
    const { container } = render(
      <Tooltip styles={{ container: { color: 'red' } }} title="xxxxx" open>
        <div />
      </Tooltip>,
    );
    expect(container.querySelector<HTMLDivElement>('.ant-tooltip-container')).toHaveStyle({
      color: 'rgb(255, 0, 0)',
    });
  });

  it('should work with loading switch', () => {
    const onOpenChange = jest.fn();
    const { container } = render(
      <Tooltip
        title="loading tips"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onOpenChange={onOpenChange}
      >
        <Switch loading defaultChecked />
      </Tooltip>,
    );

    fireEvent.pointerEnter(container.getElementsByTagName('button')[0]);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();
  });

  it('should work with disabled Radio', () => {
    const onOpenChange = jest.fn();
    const { container } = render(
      <Tooltip
        title="loading tips"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onOpenChange={onOpenChange}
      >
        <Radio disabled />
      </Tooltip>,
    );

    fireEvent.pointerEnter(container.getElementsByTagName('input')[0]);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();
  });

  it('should work with Fragment children', async () => {
    const onOpenChange = jest.fn();
    const ref = React.createRef<any>();

    const { container } = render(
      <Tooltip
        title="Have a nice day!"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onOpenChange={onOpenChange}
        ref={ref}
      >
        <>
          <div className="hello">Hello world!</div>
          <div className="hello">Hello world!</div>
        </>
      </Tooltip>,
    );

    const divElement = container.querySelector('.hello');
    fireEvent.mouseEnter(divElement!);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    await waitFakeTimer();
    expect(isTooltipOpen()).toBeTruthy();
    expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();

    fireEvent.mouseLeave(divElement!);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    await waitFakeTimer();
    expect(isTooltipOpen()).toBeFalsy();
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();
  });

  it('deprecated warning', async () => {
    resetWarned();
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { rerender } = render(
      <Tooltip open title="bamboo">
        <a />
      </Tooltip>,
    );
    await waitFakeTimer();

    rerender(
      <Tooltip destroyTooltipOnHide title="bamboo">
        test
      </Tooltip>,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Tooltip] `destroyTooltipOnHide` is deprecated. Please use `destroyOnHidden` instead.',
    );

    errSpy.mockRestore();
  });

  it('not inject className when children className is not string type', () => {
    const HOC = ({ className }: { className: () => string }) => <span className={className()} />;
    const { container } = render(
      <Tooltip open>
        <HOC className={() => 'bamboo'} />
      </Tooltip>,
    );

    expect(container.querySelector('.bamboo')).toBeTruthy();
    expect(container.querySelector('.ant-tooltip')).toBeTruthy();
  });

  it('support arrow props pass false to hide arrow', () => {
    const { container } = render(
      <Tooltip open arrow={false}>
        <div className="target">target</div>
      </Tooltip>,
    );
    expect(container).toMatchSnapshot();
  });

  it('support arrow props by default', () => {
    const { container } = render(
      <Tooltip open>
        <div className="target">target</div>
      </Tooltip>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should apply custom styles to Tooltip', () => {
    const customClassNames = {
      container: 'custom-container',
      root: 'custom-root',
    };

    const customStyles = {
      container: { color: 'red' },
      root: { backgroundColor: 'blue' },
    };

    const { container } = render(
      <Tooltip classNames={customClassNames} overlay={<div />} styles={customStyles} open>
        <button type="button">button</button>
      </Tooltip>,
    );

    const tooltipElement = container.querySelector('.ant-tooltip') as HTMLElement;
    const tooltipContainerElement = container.querySelector(
      '.ant-tooltip-container',
    ) as HTMLElement;

    // 验证 classNames
    expect(tooltipElement.classList).toContain('custom-root');
    expect(tooltipContainerElement.classList).toContain('custom-container');

    // 验证 styles
    expect(tooltipElement.style.backgroundColor).toBe('blue');
    expect(tooltipContainerElement.style.color).toBe('red');
  });

  it('ConfigProvider support arrow props', () => {
    const TooltipTestComponent = () => {
      const [configArrow, setConfigArrow] = React.useState(true);

      return (
        <ConfigProvider
          tooltip={{
            arrow: configArrow,
          }}
        >
          <button onClick={() => setConfigArrow(false)} className="configArrow" type="button">
            showconfigArrow
          </button>
          <Tooltip open>
            <div className="target">target</div>
          </Tooltip>
        </ConfigProvider>
      );
    };
    const { container } = render(<TooltipTestComponent />);
    const getTooltipArrow = () => container.querySelector('.ant-tooltip-arrow');
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
          tooltip={{
            arrow: false,
          }}
        >
          <button onClick={() => setArrow(!arrow)} className="toggleArrow" type="button">
            toggleArrow
          </button>
          <Tooltip open arrow={arrow}>
            <div className="target">target</div>
          </Tooltip>
        </ConfigProvider>
      );
    };

    const { container } = render(<TooltipTestComponent />);
    const getTooltipArrow = () => container.querySelector('.ant-tooltip-arrow');
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
  describe('parseColor', () => {
    const prefixCls = 'ant-tooltip';
    it('should set white text for dark backgrounds', () => {
      const darkColor = '#003366'; // 深色
      const { overlayStyle } = parseColor(prefixCls, darkColor);

      expect(overlayStyle.background).toBe(darkColor);
      expect(overlayStyle['--ant-tooltip-color']).toBe('#FFF');
    });

    it('should set black text for light backgrounds', () => {
      const lightColor = '#f8f8f8';
      const { overlayStyle } = parseColor(prefixCls, lightColor);

      expect(overlayStyle.background).toBe(lightColor);
      expect(overlayStyle['--ant-tooltip-color']).toBe('#000');
    });
    it('actual tooltip color rendering (default)', () => {
      const { container } = render(
        <Tooltip title="Test" color="#003366" open>
          <span>Hover me</span>
        </Tooltip>,
      );

      const tooltipContainer = container.querySelector('.ant-tooltip-container');

      expect(tooltipContainer).toHaveStyle('--ant-tooltip-color: #FFF');
    });
    it('actual tooltip color rendering (styles)', () => {
      const { container } = render(
        <Tooltip
          title="Test"
          open
          color="#003366"
          styles={{ container: { color: 'rgb(0, 255, 255)' } }}
        >
          <span>Hover me</span>
        </Tooltip>,
      );

      const tooltipContainer = container.querySelector('.ant-tooltip-container');
      expect(tooltipContainer!).toHaveStyle({
        color: 'rgb(0, 255, 255)',
      });
    });
  });

  describe('semantic structure', () => {
    it('should support static classNames and styles', () => {
      const classNames: TooltipProps['classNames'] = {
        root: 'custom-root',
        body: 'custom-body',
      };

      const styles: TooltipProps['styles'] = {
        root: { backgroundColor: 'red' },
        body: { color: 'blue' },
      };

      const { container } = render(
        <Tooltip title="Test tooltip" classNames={classNames} styles={styles} open>
          Test
        </Tooltip>,
      );

      const tooltipElement = container.querySelector('.ant-tooltip');
      const tooltipInner = container.querySelector('.ant-tooltip-inner');

      expect(tooltipElement).toHaveClass('custom-root');
      expect(tooltipInner).toHaveClass('custom-body');
      expect(tooltipElement).toHaveStyle('background-color: rgb(255, 0, 0)');
      expect(tooltipInner).toHaveStyle('color: rgb(0, 0, 255)');
    });

    it('should support function-based classNames and styles', () => {
      const classNames: TooltipProps['classNames'] = (info) => {
        if (info.props.color === 'blue') {
          return { root: 'blue-tooltip' };
        }
        return { root: 'default-tooltip' };
      };

      const styles: TooltipProps['styles'] = (info) => {
        if (info.props.placement === 'top') {
          return { body: { fontSize: '16px' } };
        }
        return { body: { fontSize: '14px' } };
      };

      const { container } = render(
        <Tooltip
          title="Test tooltip"
          color="blue"
          placement="top"
          classNames={classNames}
          styles={styles}
          open
        >
          Test
        </Tooltip>,
      );

      const tooltipElement = container.querySelector('.ant-tooltip');
      const tooltipInner = container.querySelector('.ant-tooltip-inner');

      expect(tooltipElement).toHaveClass('blue-tooltip');
      expect(tooltipInner).toHaveStyle('font-size: 16px');
    });
  });
});
