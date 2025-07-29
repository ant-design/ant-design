import { renderHook } from '../../../tests/utils';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

describe('useIsomorphicLayoutEffect', () => {
  const callback = jest.fn();
  const { result } = renderHook(() => useIsomorphicLayoutEffect(callback));

  it('cheak return value', () => {
    expect(result.current).toBeUndefined();
  });
});
