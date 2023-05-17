import React from 'react';
import { render } from '../../../tests/utils';
import useSize from '../hooks/useSize';

describe('useSize', () => {
  it('useSize', () => {
    const Demo: React.FC<{ size?: any }> = ({ size }) => <div>{useSize(size)}</div>;
    const { container, rerender } = render(<Demo />);
    expect(container.querySelector<HTMLDivElement>('div')?.textContent).toBe('');
    rerender(<Demo size="test-size1" />);
    expect(container.querySelector<HTMLDivElement>('div')?.textContent).toBe('test-size1');
    rerender(<Demo size={() => 'test-size2'} />);
    expect(container.querySelector<HTMLDivElement>('div')?.textContent).toBe('test-size2');
    rerender(<Demo size={1} />);
    expect(container.querySelector<HTMLDivElement>('div')?.textContent).toBe('');
  });
});
