import { renderHook } from '../../../tests/utils';
import useMergedType from '../useMergedType';

describe('useMergedType', () => {
  it('returns the merged type', () => {
    const { result } = renderHook(() =>
      useMergedType({
        defaultType: 'default',
        itemList: [{ type: 'primary' }],
        itemIndex: 0,
      }),
    );
    expect(result.current).toBe('primary');
  });

  it('returns the default type', () => {
    const { result } = renderHook(() =>
      useMergedType({
        defaultType: 'default',
        itemList: [{}],
        itemIndex: 0,
      }),
    );
    expect(result.current).toBe('default');
  });

  it('returns the default type when index is invalid', () => {
    const { result } = renderHook(() =>
      useMergedType({
        defaultType: 'default',
        itemList: [],
        itemIndex: 0,
      }),
    );
    expect(result.current).toBe('default');
  });

  it('returns the default type when list is null', () => {
    const { result } = renderHook(() =>
      useMergedType({
        defaultType: 'default',
      }),
    );
    expect(result.current).toBe('default');
  });
});
