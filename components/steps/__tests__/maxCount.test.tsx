import React from 'react';
import { vi } from 'vitest';

import Steps from '..';
import type { StepsProps } from '..';
import { resetWarned } from '../../_util/warning';
import { fireEvent, render, screen } from '../../../tests/utils';

type StepItem = NonNullable<StepsProps['items']>[number];

describe('Steps maxCount', () => {
  const items: StepItem[] = Array.from({ length: 7 }, (_, index) => ({
    title: `Step ${index + 1}`,
  }));

  const cases: Array<Array<number | null>> = [
    [0, 1, 2, null, 5, 6],
    [0, 1, 2, null, 5, 6],
    [0, 1, 2, 3, null, 6],
    [0, null, 2, 3, 4, null, 6],
    [0, null, 3, 4, 5, 6],
    [0, 1, null, 4, 5, 6],
    [0, 1, null, 4, 5, 6],
  ];

  beforeEach(() => {
    resetWarned();
  });

  function getRenderedSteps(container: HTMLElement): Array<number | null> {
    return Array.from(container.querySelectorAll<HTMLElement>('.ant-steps-item')).map((step) => {
      const title = step.querySelector('.ant-steps-item-title')?.textContent;

      if (title) {
        return Number(title.replace('Step ', '')) - 1;
      }

      expect(step.querySelector('[aria-label="ellipsis"]')).toBeTruthy();
      return null;
    });
  }

  function getActiveStep(container: HTMLElement): number | null {
    const activeStep = container.querySelector<HTMLElement>('.ant-steps-item-active');
    const title = activeStep?.querySelector('.ant-steps-item-title')?.textContent;

    return title ? Number(title.replace('Step ', '')) - 1 : null;
  }

  cases.forEach((expected, current) => {
    it(`should be correct when current=${current}`, () => {
      const { container } = render(<Steps current={current} maxCount={5} items={items} />);

      expect(getRenderedSteps(container)).toEqual(expected);
      expect(getActiveStep(container)).toBe(current);
    });
  });

  it('renders original items when maxCount is not applied', () => {
    [undefined, 7].forEach((maxCount) => {
      const { container } = render(<Steps current={2} maxCount={maxCount} items={items} />);

      expect(getRenderedSteps(container)).toEqual([0, 1, 2, 3, 4, 5, 6]);
    });
  });

  it('warns and renders original items when maxCount is less than 3', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<Steps current={2} maxCount={2} items={items} />);

    expect(getRenderedSteps(container)).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Steps] `maxCount` should be greater than or equal to 3.',
    );
    errorSpy.mockRestore();
  });

  it('renders collapsed steps when current is out of range', () => {
    const { container } = render(<Steps current={9} maxCount={5} items={items} />);

    expect(getRenderedSteps(container)).toEqual([0, 1, null, 4, 5, 6]);
    expect(container.querySelector('.ant-steps-item-active')).toBeFalsy();
  });

  it('renders hidden error status on ellipsis', () => {
    const keyedItems = items.map((item, index) => ({
      ...item,
      key: `step-${index}`,
      status: index === 2 ? ('error' as const) : undefined,
    }));
    const { container } = render(<Steps current={6} maxCount={5} items={keyedItems} />);
    const ellipsisStep = container
      .querySelector<HTMLElement>('[aria-label="ellipsis"]')
      ?.closest('.ant-steps-item');

    expect(ellipsisStep).toHaveClass('ant-steps-item-error');
  });

  it('uses item key to reconcile visible steps', () => {
    const createItems = (prefix: string) =>
      items.map((item, index) => ({
        ...item,
        key: `${prefix}-${index}`,
        title: `${prefix} Step ${index + 1}`,
      }));
    const { rerender } = render(<Steps current={6} maxCount={5} items={createItems('Before')} />);
    const firstStep = screen.getByText('Before Step 1').closest('.ant-steps-item');

    rerender(<Steps current={6} maxCount={5} items={createItems('After')} />);

    expect(screen.getByText('After Step 1').closest('.ant-steps-item')).not.toBe(firstStep);
  });

  it('triggers onChange with original step index', () => {
    const onChange = vi.fn();

    render(<Steps current={3} maxCount={5} items={items} onChange={onChange} />);
    fireEvent.click(screen.getByText('Step 5'));

    expect(onChange).toHaveBeenCalledWith(4);
  });
});
