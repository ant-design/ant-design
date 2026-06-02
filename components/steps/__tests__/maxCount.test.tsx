import useDisplaySteps from '../useDisplaySteps';
import { renderHook } from '../../../tests/utils';

describe('Steps maxCount', () => {
  const items = Array.from({ length: 7 }, (_, index) => ({ title: `Step ${index + 1}` }));

  it('collapses by current index', () => {
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
      const { result } = renderHook(() => useDisplaySteps(items, current, 0, 5, 'ant-steps'));

      expect(
        result.current.displaySteps.map(({ originIndex }) =>
          originIndex === -1 ? null : originIndex,
        ),
      ).toEqual(expected);
    });
  });
});
