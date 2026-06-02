import useDisplaySteps from '../useDisplaySteps';
import { renderHook } from '../../../tests/utils';

describe('Steps maxCount', () => {
  const items = Array.from({ length: 7 }, (_, index) => ({ title: `Step ${index + 1}` }));

  const cases: Array<Array<number | null>> = [
    [0, 1, 2, null, 5, 6],
    [0, 1, 2, null, 5, 6],
    [0, 1, 2, 3, null, 6],
    [0, null, 2, 3, 4, null, 6],
    [0, null, 3, 4, 5, 6],
    [0, 1, null, 4, 5, 6],
    [0, 1, null, 4, 5, 6],
  ];

  cases.forEach((expected, current) => {
    it(`should be correct when current=${current}`, () => {
      const { result } = renderHook(() => useDisplaySteps(items, current, 0, 5, 'ant-steps'));

      expect(
        result.current.displaySteps.map(({ originIndex }) =>
          originIndex === -1 ? null : originIndex,
        ),
      ).toEqual(expected);
      expect(result.current.mappedDisplayCurrent).toBe(expected.indexOf(current));
    });
  });

  it('keeps original items when maxCount is not applied', () => {
    [undefined, 2, 7].forEach((maxCount) => {
      const { result } = renderHook(() => useDisplaySteps(items, 2, 0, maxCount, 'ant-steps'));

      expect(result.current.canApplyMaxCount).toBe(false);
      expect(result.current.displayItems[0]).toBe(items[0]);
      expect('key' in result.current.displayItems[0]).toBe(false);
    });
  });

  it('keeps out-of-range current', () => {
    const { result } = renderHook(() => useDisplaySteps(items, 9, 0, 5, 'ant-steps'));

    expect(result.current.mappedDisplayCurrent).toBe(9);
  });

  it('keeps item keys and hidden error status', () => {
    const keyedItems = items.map((item, index) => ({
      ...item,
      key: `step-${index}`,
      status: index === 2 ? ('error' as const) : undefined,
    }));
    const { result } = renderHook(() => useDisplaySteps(keyedItems, 6, 0, 5, 'ant-steps'));

    expect(result.current.displayItems.map((item) => item.key)).toEqual([
      'step-0',
      'step-1',
      'ellipsis-step-1-step-4',
      'step-4',
      'step-5',
      'step-6',
    ]);
    expect(result.current.displayItems[2].status).toBe('error');
  });
});
