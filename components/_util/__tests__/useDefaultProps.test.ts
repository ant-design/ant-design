import { renderHook } from '@testing-library/react';

import useFilledProps from '../hooks/useFilledProps';

describe('useFilledProps', () => {
  it('useFilledProps should merge originalProps and filledProps', () => {
    const originalProps = { a: 3, b: 4 };
    const filledProps = { a: 1, b: 2 };
    const { result } = renderHook(() => useFilledProps(originalProps, filledProps));
    expect(result.current).toEqual({ a: 1, b: 2 });
  });
  it('useFilledProps originalProps should throw warning', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useFilledProps(undefined as any, {}));
    expect(result.current).toEqual({});
    expect(spy).toHaveBeenCalledWith(
      'Warning: [antd: useFilledProps] originalProps should be a non-null object',
    );
    spy.mockRestore();
  });
  it('useFilledProps filledProps should throw warning', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useFilledProps({}, undefined as any));
    expect(result.current).toEqual({});
    expect(spy).toHaveBeenCalledWith(
      'Warning: [antd: useFilledProps] filledProps should be a non-null object',
    );
    spy.mockRestore();
  });
});
