import { renderHook } from '../../../tests/utils';
import useMergedType from '../hooks/useMergedType';

describe('useMergedType', () => {
  it('returns the merged type', () => {
    const { result } = renderHook(() =>
      useMergedType(
        {
          type: 'default',
          list: [{ type: 'primary' }],
        },
        'list',
        0,
      ),
    );
    expect(result.current).toBe('primary');
  });

  it('returns the default type', () => {
    const { result } = renderHook(() =>
      useMergedType(
        {
          type: 'default',
          steps: [{}],
        },
        'steps',
        0,
      ),
    );
    expect(result.current).toBe('default');
  });

  it('returns the default type when index is undefined', () => {
    const { result } = renderHook(() =>
      useMergedType(
        {
          type: 'default',
          steps: [{ type: 'primary' }],
        },
        'steps',
      ),
    );
    expect(result.current).toBe('default');
  });

  it('returns the default type when list is null', () => {
    const { result } = renderHook(() =>
      useMergedType(
        {
          type: 'default',
        },
        'steps',
      ),
    );
    expect(result.current).toBe('default');
  });
});
