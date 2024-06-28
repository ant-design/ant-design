import React from 'react';

import { act, render } from '../../../tests/utils';
import useUniqueMemo from '../hooks/useUniqueMemo';

describe('Table', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('useSyncState', () => {
    const sharedObjDeps1 = {};
    const sharedObjDeps2 = {};

    let calledTimes = 0;

    const Test: React.FC<{ depName?: string }> = ({ depName }) => {
      useUniqueMemo(() => {
        calledTimes += 1;
        return depName;
      }, [depName, sharedObjDeps1, 'bamboo', sharedObjDeps2]);
      return null;
    };

    // Reuse the same memo
    const { rerender } = render(
      <>
        <Test depName="light" />
        <Test depName="light" />
        <Test depName="light" />
      </>,
    );

    expect(calledTimes).toBe(1);

    // Different deps should clean up the cache
    act(() => {
      jest.advanceTimersByTime(1000 * 60 * 20);
    });

    for (let i = 0; i < 20000; i += 1) {
      rerender(<Test depName="diff" key={i} />);
    }
    rerender(<Test depName="clear" />);
    calledTimes = 0;

    // Back should recompute
    rerender(<Test depName="light" />);
    expect(calledTimes).toBe(1);
  });
});
