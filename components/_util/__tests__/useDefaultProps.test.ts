import { renderHook } from '@testing-library/react';

import useDefaultProps from '../hooks/useDefaultProps';

describe('useDefaultProps', () => {
  it('useDefaultProps', () => {
    const originalProps = { a: 3 };
    const defaultProps = { a: 1, b: 2 };
    const { result } = renderHook(() => useDefaultProps(originalProps, defaultProps));
    expect(result.current).toEqual({ a: 3, b: 2 });
  });
});
