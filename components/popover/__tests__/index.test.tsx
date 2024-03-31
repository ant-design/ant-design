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
      <Popover ref={ref} content="console.log('hello world')" title="code" trigger="click">
        <span>show me your code</span>
      </Popover>,
    );
    expect(container.querySelector('.ant-popover-inner-content')).toBeFalsy();
    fireEvent.click(container.querySelector('span')!);
    expect(container.querySelector('.ant-popover-inner-content')).toBeTruthy();
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
});
