import React from 'react';

import { fireEvent, render } from '../../../tests/utils';
import useSyncState from '../hooks/useSyncState';

describe('Table', () => {
  it('useSyncState', () => {
    const Test = () => {
      const [getVal, setVal] = useSyncState('light');
      return <span onClick={() => setVal('bamboo')}>{getVal()}</span>;
    };

    const { container } = render(<Test />);
    expect(container.querySelector('span')?.innerHTML).toBe('light');
    fireEvent.click(container.querySelector('span')!);
    expect(container.querySelector('span')?.innerHTML).toBe('bamboo');
  });
});
