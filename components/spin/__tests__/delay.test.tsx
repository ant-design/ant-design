import React from 'react';
import { render } from '@testing-library/react';
import debounce from 'lodash/debounce';
import Spin from '..';
import { waitFakeTimer } from '../../../tests/utils';

jest.mock('lodash/debounce');
(debounce as jest.Mock).mockImplementation((...args: any[]) =>
  jest.requireActual('lodash/debounce')(...args),
);

describe('delay spinning', () => {
  it("should render with delay when it's mounted with spinning=true and delay", () => {
    const { container } = render(<Spin spinning delay={500} />);
    expect(container.querySelector('.ant-spin')?.classList.contains('ant-spin-spinning')).toEqual(
      false,
    );
  });

  it('should render when delay is init set', async () => {
    jest.useFakeTimers();
    const { container } = render(<Spin spinning delay={100} />);

    expect(container.querySelector('.ant-spin-spinning')).toBeFalsy();

    await waitFakeTimer();

    expect(container.querySelector('.ant-spin-spinning')).toBeTruthy();

    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should cancel debounce function when unmount', () => {
    const debouncedFn = jest.fn();
    const cancel = jest.fn();
    (debouncedFn as any).cancel = cancel;
    (debounce as jest.Mock).mockReturnValueOnce(debouncedFn);
    const { unmount } = render(<Spin spinning delay={100} />);

    expect(cancel).not.toHaveBeenCalled();
    unmount();
    expect(cancel).toHaveBeenCalled();
  });
});
