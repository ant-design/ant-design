import { act, renderHook } from '../../../tests/utils';
import useMergedType from '../useMergedType';

describe('useMergedType', () => {
  it('returns the merged type', () => {
    const { result } = renderHook(() =>
      useMergedType({
        defaultType: 'default',
        steps: [{ type: 'primary', title: 'Step 1' }],
        current: 0,
      }),
    );
    expect(result.current?.currentMergedType).toBe('primary');
  });

  it('returns the default type', () => {
    const { result } = renderHook(() =>
      useMergedType({
        defaultType: 'default',
        steps: [],
        current: 0,
      }),
    );
    expect(result.current?.currentMergedType).toBe('default');
  });

  it('returns the default type when index is invalid', () => {
    const { result } = renderHook(() =>
      useMergedType({
        defaultType: 'default',
        steps: [],
        current: 0,
      }),
    );
    expect(result.current?.currentMergedType).toBe('default');
  });

  it('returns the default type when list is null', () => {
    const { result } = renderHook(() =>
      useMergedType({
        defaultType: 'default',
      }),
    );
    expect(result.current?.currentMergedType).toBe('default');
  });

  it('returns type of new step after onChange from rc-tour', () => {
    const { result } = renderHook(() =>
      useMergedType({
        defaultType: 'default',
        steps: [{ title: 'Step 1' }, { type: 'primary', title: 'Step 1' }],
      }),
    );
    act(() => {
      result.current?.updateInnerCurrent?.(1);
    });

    expect(result.current?.currentMergedType).toBe('primary');
  });
});
