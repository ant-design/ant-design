import { renderHook } from '../../../tests/utils';
import useSizes from '../hooks/useSizes';

describe('useSizes', () => {
  const containerSize = 1000;

  it('case 1: mixed size, min, max values', () => {
    const items = [
      {
        size: 100,
        min: 100,
        max: 200,
      },
      {
        min: 100,
        max: 200,
      },
      {
        min: '20%',
      },
    ];

    const { result } = renderHook(() => useSizes(items, containerSize));
    const [, postPxSizes] = result.current;

    // Check post pixel sizes
    expect(postPxSizes).toEqual([100, 200, 700]);
  });

  it('case 2: all items with min values', () => {
    const items = [
      {
        min: 300,
      },
      {
        min: 100,
        max: 200,
      },
      {
        min: 600,
      },
    ];

    const { result } = renderHook(() => useSizes(items, containerSize));
    const [, postPxSizes] = result.current;

    // Check post pixel sizes
    expect(postPxSizes).toEqual([300, 100, 600]);
  });

  it('case 3: items with min and max values', () => {
    const items = [{ min: 100, max: 200 }, { min: 100, max: 200 }, { min: 400 }];

    const { result } = renderHook(() => useSizes(items, containerSize));
    const [, postPxSizes] = result.current;

    // Check post pixel sizes
    expect(postPxSizes).toEqual([200, 200, 600]);
  });

  it('case 4: impossible case, just average fill', () => {
    // This case triggers the impossible condition where sumMin > 1 and sumMax < 1
    // sumMin = 0.6 + 0.4 + 0.6 = 1.6 > 1
    // sumMax = 0.3 + 0.2 + 0.3 = 0.8 < 1
    const items = [
      { min: 600, max: 300 }, // min=0.6, max=0.3
      { min: 400, max: 200 }, // min=0.4, max=0.2
      { min: 600, max: 300 }, // min=0.6, max=0.3
    ];

    const { result } = renderHook(() => useSizes(items, containerSize));
    const [, postPxSizes] = result.current;

    // In impossible case, should average fill (1000 / 3 = 333.33... for each)
    expect(postPxSizes).toEqual([1000 / 3, 1000 / 3, 1000 / 3]);
  });
});
