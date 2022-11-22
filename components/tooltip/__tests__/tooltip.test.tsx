import { spyElementPrototype } from 'rc-util/lib/test/domHook';
import React from 'react';
import type { TooltipPlacement } from '..';
import Tooltip from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, waitFakeTimer, waitFor, act } from '../../../tests/utils';
import Button from '../../button';
import DatePicker from '../../date-picker';
import Input from '../../input';
import Group from '../../input/Group';
import Switch from '../../switch';
import Radio from '../../radio';
import { resetWarned } from '../../_util/warning';

describe('Tooltip', () => {
  mountTest(Tooltip);
  rtlTest(Tooltip);

  beforeAll(() => {
    spyElementPrototype(HTMLElement, 'offsetParent', {
      get: () => ({}),
    });
  });

  it('check `onOpenChange` arguments', () => {
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
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(ref.current.props.visible).toBe(false);
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();

    fireEvent.mouseLeave(divElement!);
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(ref.current.props.visible).toBe(false);
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
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(ref.current.props.visible).toBe(true);
    expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();

    fireEvent.mouseLeave(divElement!);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(ref.current.props.visible).toBe(false);
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
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    const lastCount = onOpenChange.mock.calls.length;
    expect(ref.current.props.visible).toBe(false);
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();

    // always trigger onOpenChange
    fireEvent.mouseLeave(divElement!);
    expect(onOpenChange.mock.calls.length).toBe(lastCount); // no change with lastCount
    expect(ref.current.props.visible).toBe(false);
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();
  });

  it('should hide when mouse leave native disabled button', () => {
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

    expect(container.getElementsByTagName('span')).toHaveLength(1);
    const button = container.getElementsByTagName('span')[0];

    fireEvent.mouseEnter(button);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(ref.current?.props.visible).toBe(true);
    expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();

    fireEvent.mouseLeave(button);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(ref.current?.props.visible).toBe(false);
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();
  });

  describe('should hide when mouse leave antd disabled component', () => {
    function testComponent(name: string, Component: typeof Button | typeof Switch) {
      it(name, () => {
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
        const button = container.getElementsByTagName('span')[0];

        fireEvent.mouseEnter(button);
        expect(onOpenChange).toHaveBeenCalledWith(true);
        expect(ref.current.props.visible).toBe(true);
        expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();

        fireEvent.mouseLeave(button);
        expect(onOpenChange).toHaveBeenCalledWith(false);
        expect(ref.current.props.visible).toBe(false);
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
    expect(containerInline.getElementsByTagName('span')[0].style.display).toBe('inline-block');
    expect(containerBlock.getElementsByTagName('span')[0].style.display).toBe('block');
  });

  it('should works for arrowPointAtCenter', () => {
    const arrowWidth = 5;
    const horizontalArrowShift = 16;
    const triggerWidth = 200;

    const suit = () => {
      const { container } = render(
        <Tooltip
          title="xxxxx"
          trigger="click"
          mouseEnterDelay={0}
          mouseLeaveDelay={0}
          placement="bottomLeft"
          overlayClassName="default-element"
        >
          <button type="button" style={{ width: triggerWidth }}>
            Hello world!
          </button>
        </Tooltip>,
      );
      fireEvent.click(container.getElementsByTagName('button')[0]);
      const popupLeftDefault = parseInt(
        container.querySelector<HTMLDivElement>('.default-element')?.style?.left!,
        10,
      );

      const { container: container2 } = render(
        <Tooltip
          title="xxxxx"
          trigger="click"
          mouseEnterDelay={0}
          mouseLeaveDelay={0}
          placement="bottomLeft"
          arrowPointAtCenter
          overlayClassName="point-center-element"
        >
          <button type="button" style={{ width: triggerWidth }}>
            Hello world!
          </button>
        </Tooltip>,
      );
      fireEvent.click(container2.getElementsByTagName('button')[0]);
      const popupLeftArrowPointAtCenter = parseInt(
        container.querySelector<HTMLDivElement>('.point-center-element')?.style?.left!,
        10,
      );

      expect(popupLeftArrowPointAtCenter - popupLeftDefault).toBe(
        triggerWidth / 2 - horizontalArrowShift - arrowWidth,
      );
    };

    (jest.dontMock as any)('rc-trigger', suit);
  });

  it('should works for date picker', async () => {
    jest.useFakeTimers();
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
    expect(ref.current?.props.visible).toBe(true);
    expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();

    fireEvent.mouseLeave(picker);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(ref.current?.props.visible).toBe(false);
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should works for input group', async () => {
    jest.useFakeTimers();
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
    expect(ref.current.props.visible).toBe(true);
    expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();

    fireEvent.mouseLeave(inputGroup);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(ref.current.props.visible).toBe(false);
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  // https://github.com/ant-design/ant-design/issues/20891
  it('should display zero', () => {
    const { container } = render(
      <Tooltip title={0} open>
        <div />
      </Tooltip>,
    );
    expect(container.querySelector('.ant-tooltip-inner')?.innerHTML).toBe('0');
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
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });
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
          <Tooltip title="xxxxx" transitionName="" mouseEnterDelay={0} placement={placement}>
            <span>Hello world!</span>
          </Tooltip>,
        );
        expect(container.getElementsByTagName('span')).toHaveLength(1);
        const element = container.getElementsByTagName('span')[0];
        fireEvent.mouseEnter(element);
        await waitFakeTimer();
        await waitFor(() => {
          expect(document.querySelector(`.ant-tooltip-placement-${placement}`)).not.toBeNull();
        });
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

  it('should pass overlayInnerStyle through to the inner component', () => {
    const { container } = render(
      <Tooltip overlayInnerStyle={{ color: 'red' }} title="xxxxx" open>
        <div />
      </Tooltip>,
    );
    expect(container.querySelector<HTMLDivElement>('.ant-tooltip-inner')?.style?.color).toBe('red');
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
    const wrapperEl = container.querySelectorAll('.ant-tooltip-disabled-compatible-wrapper');
    expect(wrapperEl).toHaveLength(1);
    fireEvent.mouseEnter(container.getElementsByTagName('span')[0]);
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
    const wrapperEl = container.querySelectorAll('.ant-tooltip-disabled-compatible-wrapper');
    expect(wrapperEl).toHaveLength(1);
    fireEvent.mouseEnter(container.getElementsByTagName('span')[0]);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();
  });

  it('should work with Fragment children', () => {
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
    expect(ref.current.props.visible).toBe(true);
    expect(container.querySelector('.ant-tooltip-open')).not.toBeNull();

    fireEvent.mouseLeave(divElement!);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(ref.current.props.visible).toBe(false);
    expect(container.querySelector('.ant-tooltip-open')).toBeNull();
  });

  it('deprecated warning', () => {
    resetWarned();
    jest.useFakeTimers();
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // defaultVisible
    const { container, rerender } = render(
      <Tooltip defaultVisible title="bamboo">
        <a />
      </Tooltip>,
    );
    act(() => {
      jest.runAllTimers();
    });

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Tooltip] `defaultVisible` is deprecated, please use `defaultOpen` instead.',
    );
    expect(document.querySelector('.ant-tooltip')).toBeTruthy();

    // visible
    rerender(
      <Tooltip visible title="bamboo">
        <a />
      </Tooltip>,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Tooltip] `visible` is deprecated, please use `open` instead.',
    );

    rerender(
      <Tooltip visible={false} title="bamboo">
        <a />
      </Tooltip>,
    );
    act(() => {
      jest.runAllTimers();
    });
    if (container.querySelector('.ant-zoom-big-fast-leave-active')) {
      fireEvent.animationEnd(container.querySelector('.ant-zoom-big-fast-leave-active')!);
    }
    expect(document.querySelector('.ant-tooltip-hidden')).toBeTruthy();

    // onVisibleChange
    rerender(
      <Tooltip onVisibleChange={() => {}} title="bamboo">
        <a />
      </Tooltip>,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Tooltip] `onVisibleChange` is deprecated, please use `onOpenChange` instead.',
    );

    // afterVisibleChange
    rerender(
      <Tooltip afterVisibleChange={() => {}} title="bamboo">
        <a />
      </Tooltip>,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Tooltip] `afterVisibleChange` is deprecated, please use `afterOpenChange` instead.',
    );

    // Event Trigger
    const onVisibleChange = jest.fn();
    const afterVisibleChange = jest.fn();
    rerender(
      <Tooltip
        visible
        onVisibleChange={onVisibleChange}
        afterVisibleChange={afterVisibleChange}
        title="bamboo"
      >
        <a />
      </Tooltip>,
    );

    fireEvent.mouseLeave(container.querySelector('a')!);
    act(() => {
      jest.runAllTimers();
    });
    expect(onVisibleChange).toHaveBeenCalled();
    expect(afterVisibleChange).toHaveBeenCalled();

    jest.useRealTimers();
    errSpy.mockRestore();
  });

  it('not inject className when children className is not string type', () => {
    const HOC = ({ className }: { className: Function }) => <span className={className()} />;
    const { container } = render(
      <Tooltip open>
        <HOC className={() => 'bamboo'} />
      </Tooltip>,
    );

    expect(container.querySelector('.bamboo')).toBeTruthy();
    expect(container.querySelector('.ant-tooltip')).toBeTruthy();
  });
});
