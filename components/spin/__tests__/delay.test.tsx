import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import { render } from '@testing-library/react';
import debounce from 'lodash/debounce';
import Spin from '..';
import { sleep } from '../../../tests/utils';

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
    const { container } = render(<Spin spinning delay={100} />);

    expect(container.querySelector('.ant-spin')?.classList.contains('ant-spin-spinning')).toEqual(
      false,
    );

    // use await not jest.runAllTimers()
    // because of https://github.com/facebook/jest/issues/3465
    await sleep(500);

    expect(container.querySelector('.ant-spin')?.classList.contains('ant-spin-spinning')).toEqual(
      true,
    );
  });

  it('should cancel debounce function when unmount', async () => {
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
