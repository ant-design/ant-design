import React from 'react';

import TextTooltip from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';

describe('TextTooltip', () => {
  mountTest(TextTooltip);
  rtlTest(TextTooltip);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  it('supports hover trigger', async () => {
    const { container } = render(
      <TextTooltip title="hint" mouseEnterDelay={0} mouseLeaveDelay={0}>
        <button type="button">trigger</button>
      </TextTooltip>,
    );

    const tooltip = container.querySelector('.ant-text-tooltip');
    expect(tooltip).not.toHaveClass('ant-text-tooltip-open');

    fireEvent.mouseEnter(tooltip!);
    await waitFakeTimer();
    expect(tooltip).toHaveClass('ant-text-tooltip-open');

    fireEvent.mouseLeave(tooltip!);
    await waitFakeTimer();
    expect(tooltip).not.toHaveClass('ant-text-tooltip-open');
  });

  it('supports focus trigger', async () => {
    const { container } = render(
      <TextTooltip title="hint" trigger="focus" mouseEnterDelay={0} mouseLeaveDelay={0}>
        <button type="button">trigger</button>
      </TextTooltip>,
    );

    const tooltip = container.querySelector('.ant-text-tooltip');
    const button = container.querySelector('button');

    fireEvent.focus(button!);
    await waitFakeTimer();
    expect(tooltip).toHaveClass('ant-text-tooltip-open');

    fireEvent.blur(button!);
    await waitFakeTimer();
    expect(tooltip).not.toHaveClass('ant-text-tooltip-open');
  });

  it('injects aria description to valid child', () => {
    const { container } = render(
      <TextTooltip title="accessible hint">
        <button type="button">trigger</button>
      </TextTooltip>,
    );

    const button = container.querySelector('button')!;
    const describedBy = button.getAttribute('aria-describedby');
    const descriptionNode = describedBy ? document.getElementById(describedBy) : null;

    expect(button.getAttribute('aria-description')).toBe('accessible hint');
    expect(descriptionNode).toHaveTextContent('accessible hint');
  });

  it('supports defaultOpen', () => {
    const { container } = render(
      <TextTooltip title="hint" defaultOpen>
        <span>trigger</span>
      </TextTooltip>,
    );

    expect(container.querySelector('.ant-text-tooltip')).toHaveClass('ant-text-tooltip-open');
  });

  it('supports controlled open', async () => {
    const onOpenChange = jest.fn();
    const { container, rerender } = render(
      <TextTooltip title="hint" open={false} onOpenChange={onOpenChange} mouseEnterDelay={0}>
        <button type="button">trigger</button>
      </TextTooltip>,
    );

    const tooltip = container.querySelector('.ant-text-tooltip');
    expect(tooltip).not.toHaveClass('ant-text-tooltip-open');

    fireEvent.mouseEnter(tooltip!);
    await waitFakeTimer();
    expect(tooltip).not.toHaveClass('ant-text-tooltip-open');
    expect(onOpenChange).toHaveBeenLastCalledWith(true);

    rerender(
      <TextTooltip title="hint" open onOpenChange={onOpenChange} mouseEnterDelay={0}>
        <button type="button">trigger</button>
      </TextTooltip>,
    );
    expect(container.querySelector('.ant-text-tooltip')).toHaveClass('ant-text-tooltip-open');
  });

  it('calls onOpenChange for visibility changes', async () => {
    const onOpenChange = jest.fn();
    const { container } = render(
      <TextTooltip title="hint" onOpenChange={onOpenChange} mouseEnterDelay={0} mouseLeaveDelay={0}>
        <button type="button">trigger</button>
      </TextTooltip>,
    );

    const tooltip = container.querySelector('.ant-text-tooltip');

    fireEvent.mouseEnter(tooltip!);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenLastCalledWith(true);

    fireEvent.mouseLeave(tooltip!);
    await waitFakeTimer();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('supports custom placement and color', () => {
    const { container } = render(
      <TextTooltip title="hint" placement="bottomRight" color="#1677ff" defaultOpen>
        <span>trigger</span>
      </TextTooltip>,
    );

    const tooltip = container.querySelector('.ant-text-tooltip');
    expect(tooltip).toHaveClass('ant-text-tooltip-placement-bottomRight');
    expect(tooltip).toHaveAttribute('data-text-tooltip', 'hint');
    expect((tooltip as HTMLElement).style.getPropertyValue('--ant-text-tooltip-background')).toBe(
      '#1677ff',
    );
  });

  it('throws for non-string title', () => {
    expect(() => {
      render(
        <TextTooltip {...({ title: <span>hint</span> } as any)}>
          <span>trigger</span>
        </TextTooltip>,
      );
    }).toThrow('TextTooltip only supports string `title`.');
  });
});
