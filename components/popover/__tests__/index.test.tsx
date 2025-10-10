import React from 'react';

import Popover from '..';
import mountTest from '../../../tests/shared/mountTest';
import { fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { TooltipRef } from '../../tooltip';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanelDoNotUseOrYouWillBeFired } = Popover;

describe('Popover', () => {
  mountTest(Popover);

  const eventObject = expect.objectContaining({
    target: expect.anything(),
    preventDefault: expect.any(Function),
  });

  it('should show overlay when trigger is clicked', () => {
    const ref = React.createRef<TooltipRef>();
    const { container } = render(
      <Popover ref={ref} content={<div className="bamboo" />} title="code" trigger="click">
        <span>show me your code</span>
      </Popover>,
    );
    expect(container.querySelector('.bamboo')).toBeFalsy();
    fireEvent.click(container.querySelector('span')!);
    expect(container.querySelector('.bamboo')).toBeTruthy();
  });

  it('should support defaultOpen', () => {
    const { container } = render(
      <Popover title="code" defaultOpen>
        <span>show me your code</span>
      </Popover>,
    );
    expect(container.querySelector('.ant-popover')).toBeTruthy();
  });

  it('shows content for render functions', () => {
    const renderTitle = () => 'some-title';
    const renderContent = () => 'some-content';
    const ref = React.createRef<TooltipRef>();
    const { container } = render(
      <Popover ref={ref} content={renderContent} title={renderTitle} trigger="click">
        <span>show me your code </span>
      </Popover>,
    );
    fireEvent.click(container.querySelector('span')!);
    const popup = document.querySelector('.ant-popover')!;
    expect(popup).not.toBe(null);
    expect(popup.innerHTML).toContain('some-title');
    expect(popup.innerHTML).toContain('some-content');
    expect(popup.innerHTML).toMatchSnapshot();
  });

  it('handles empty title/content props safely', () => {
    const { container } = render(
      <Popover trigger="click">
        <span>show me your code</span>
      </Popover>,
    );
    fireEvent.click(container.querySelector('span')!);

    const popup = document.querySelector('.ant-popover');
    expect(popup).toBe(null);
  });

  it('should not render popover when the title & content props is empty', () => {
    const { container } = render(
      <Popover trigger="click">
        <span>show me your code</span>
      </Popover>,
    );
    fireEvent.click(container.querySelector('span')!);

    const popup = document.querySelector('.ant-popover');
    expect(popup).toBe(null);
  });

  it('props#overlay do not warn anymore', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const overlay = jest.fn();
    render(
      <Popover content="console.log('hello world')" title="code" trigger="click">
        <span>show me your code</span>
      </Popover>,
    );

    expect(errorSpy).not.toHaveBeenCalled();
    expect(overlay).not.toHaveBeenCalled();
  });

  describe('semantic structure', () => {
    it('should support static classNames and styles', () => {
      const { container } = render(
        <Popover
          title="Test"
          content="Content"
          open
          classNames={{ root: 'custom-root', container: 'custom-container' }}
          styles={{ root: { backgroundColor: 'red' }, container: { padding: '20px' } }}
        >
          <span>Static Test</span>
        </Popover>,
      );

      const popoverElement = container.querySelector('.ant-popover');
      const contentElement = container.querySelector('.ant-popover-container');

      expect(popoverElement).toHaveClass('custom-root');
      expect(contentElement).toHaveClass('custom-container');
      expect(window.getComputedStyle(popoverElement!).backgroundColor).toBe('rgb(255, 0, 0)');
      expect(window.getComputedStyle(contentElement!).padding).toBe('20px');
    });

    it('should support function-based classNames and styles', () => {
      const { container } = render(
        <Popover
          title="Test"
          content="Content"
          open
          placement="top"
          classNames={({ props }) => ({
            root: props.placement === 'top' ? 'top-root' : 'default-root',
            container: 'custom-container',
          })}
          styles={({ props }) => ({
            root: { backgroundColor: props.open ? 'blue' : 'transparent' },
            container: { padding: '16px' },
          })}
        >
          <span>Dynamic Test</span>
        </Popover>,
      );

      const popoverElement = container.querySelector('.ant-popover');
      const contentElement = container.querySelector('.ant-popover-container');

      expect(popoverElement).toHaveClass('top-root');
      expect(contentElement).toHaveClass('custom-container');
      expect(window.getComputedStyle(popoverElement!).backgroundColor).toBe('rgb(0, 0, 255)');
      expect(window.getComputedStyle(contentElement!).padding).toBe('16px');
    });
  });

  it(`should be rendered correctly in RTL direction`, () => {
    const { container } = render(
      <ConfigProvider direction="rtl">
        <Popover title="RTL" open>
          <span>show me your Rtl demo</span>
        </Popover>
      </ConfigProvider>,
    );
    expect(Array.from<Element>(container.children)).toMatchSnapshot();
  });

  it('should right work when content is null & title is null', () => {
    expect(() => {
      render(<InternalPanelDoNotUseOrYouWillBeFired content={null} title={null} trigger="click" />);
    }).not.toThrow();
  });

  it('should be closed by pressing ESC', () => {
    const onOpenChange = jest.fn((_, e) => {
      e?.persist?.();
    });
    const wrapper = render(
      <Popover title="Title" trigger="click" onOpenChange={onOpenChange}>
        <span>Delete</span>
      </Popover>,
    );
    const triggerNode = wrapper.container.querySelectorAll('span')[0];
    fireEvent.click(triggerNode);
    expect(onOpenChange).toHaveBeenLastCalledWith(true, undefined);
    fireEvent.keyDown(triggerNode, { key: 'Escape', keyCode: 27 });
    expect(onOpenChange).toHaveBeenLastCalledWith(false, eventObject);
  });

  it('should not display overlay when the content is null/undefined', () => {
    [null, undefined].forEach((item) => {
      const { container } = render(
        <Popover title={() => item} content={() => item} trigger="click">
          <span>show me your code</span>
        </Popover>,
      );
      fireEvent.click(container.querySelector<HTMLSpanElement>('span')!);
      const popup = document.querySelector('.ant-popover');
      expect(popup).toBe(null);
    });
  });

  it('should apply custom styles to Popover', () => {
    const customClassNames = {
      container: 'custom-container',
      root: 'custom-root',
    };

    const customStyles = {
      container: { color: 'red' },
      root: { backgroundColor: 'blue' },
    };

    const { container } = render(
      <Popover classNames={customClassNames} overlay={<div />} styles={customStyles} open>
        <button type="button">button</button>
      </Popover>,
    );

    const popoverElement = container.querySelector('.ant-popover') as HTMLElement;
    const popoverBodyElement = container.querySelector('.ant-popover-container') as HTMLElement;

    // 验证 classNames
    expect(popoverElement.classList).toContain('custom-root');
    expect(popoverBodyElement.classList).toContain('custom-container');

    // 验证 styles
    expect(popoverElement.style.backgroundColor).toBe('blue');
    expect(popoverBodyElement.style.color).toBe('red');
  });
  it('ConfigProvider support arrow props', () => {
    const TooltipTestComponent = () => {
      const [configArrow, setConfigArrow] = React.useState(true);

      return (
        <ConfigProvider
          popover={{
            arrow: configArrow,
          }}
        >
          <button onClick={() => setConfigArrow(false)} className="configArrow" type="button">
            showconfigArrow
          </button>
          <Popover open>
            <div className="target">target</div>
          </Popover>
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
          <Popover open arrow={arrow}>
            <div className="target">target</div>
          </Popover>
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
});
