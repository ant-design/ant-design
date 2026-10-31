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

  it('should average if size total is not 100%', () => {
    const items = [
      {
        size: '20%',
      },
      {
        size: '30%',
      },
    ];

    const { result } = renderHook(() => useSizes(items, containerSize));
    const [sizes] = result.current;

    // Check sizes
    expect(sizes).toEqual([400, 600]);
  });

  it('should respect min when container shrinks', () => {
    const items = [
      {
        size: 200,
        min: 200,
      },
      {
        size: 800,
      },
    ];

    const { result } = renderHook(() => useSizes(items, 600));
    const [, postPxSizes] = result.current;

    expect(postPxSizes[0]).toBeCloseTo(200);
    expect(postPxSizes[1]).toBeCloseTo(400);
  });

  it('should respect percentage min when container shrinks', () => {
    const items = [
      {
        size: 200,
        min: '40%',
      },
      {
        size: 800,
      },
    ];

    const { result } = renderHook(() => useSizes(items, 600));
    const [, postPxSizes] = result.current;

    expect(postPxSizes[0]).toBeCloseTo(240);
    expect(postPxSizes[1]).toBeCloseTo(360);
  });

  it('should respect max when container grows', () => {
    const items = [
      {
        size: 100,
        max: 200,
      },
      {
        size: 100,
      },
    ];

    const { result } = renderHook(() => useSizes(items, containerSize));
    const [, postPxSizes] = result.current;

    expect(postPxSizes).toEqual([200, 800]);
  });

  it('should keep collapsed panel at zero when container changes', () => {
    const items = [
      {
        size: 0,
        min: 200,
      },
      {
        size: 1000,
      },
    ];

    const { result } = renderHook(() => useSizes(items, 600));
    const [, postPxSizes] = result.current;

    expect(postPxSizes).toEqual([0, 600]);
  });

  it('should preserve proportions when limits cannot fit the container', () => {
    const items = [
      {
        size: 200,
        min: 400,
      },
      {
        size: 800,
        min: 400,
      },
    ];

    const { result } = renderHook(() => useSizes(items, 600));
    const [, postPxSizes] = result.current;

    expect(postPxSizes).toEqual([120, 480]);
  });

  it('should correct when all size is 0', () => {
    const items = [
      {
        size: 0,
      },
      {
        size: 0,
      },
    ];

    const { result } = renderHook(() => useSizes(items, containerSize));
    const [, postPxSizes] = result.current;

    expect(postPxSizes).toEqual([500, 500]);
  });

  it('should set defined panel sizes correctly when some panels have undefined `size`', () => {
    const items = [
      {
        size: '60%',
      },
      {
        size: undefined,
        defaultSize: 700, // This sets the second panel's value in innerSizes
      },
    ];

    const { result } = renderHook(() => useSizes(items, containerSize));
    const [, postPxSizes] = result.current;

    // Check if the `size` of the first panel gets priority.
    expect(postPxSizes).toEqual([600, 400]);
  });

  it('should not produce negative sizes when minimums exceed the remaining space', () => {
    // `size` leaves 10% for the other panels while their minimums add up to 70%
    const items = [{ size: '90%' }, { min: '20%' }, { min: '50%' }];

    const { result } = renderHook(() => useSizes(items, containerSize));
    const [, postPxSizes] = result.current;

    // The constraints cannot be satisfied, so the remaining 100px is shared evenly.
    expect(postPxSizes[0]).toBeCloseTo(900);
    expect(postPxSizes[1]).toBeCloseTo(50);
    expect(postPxSizes[2]).toBeCloseTo(50);
    expect(postPxSizes.reduce((sum, size) => sum + size, 0)).toBeCloseTo(containerSize);
  });

  it('should share the remaining space when maximums cannot fill it', () => {
    // `size` leaves 90% while the other panels accept at most 40% in total
    const items = [{ size: '10%' }, { max: '20%' }, { max: '20%' }];

    const { result } = renderHook(() => useSizes(items, containerSize));
    const [, postPxSizes] = result.current;

    expect(postPxSizes[0]).toBeCloseTo(100);
    expect(postPxSizes[1]).toBeCloseTo(450);
    expect(postPxSizes[2]).toBeCloseTo(450);
  });

  it('should not treat floating point noise as unsatisfiable minimums', () => {
    // 800px leaves exactly 200px for minimums of 50px + 150px, but `1 - 0.8`
    // is 0.19999999999999996, which used to take the average-fill branch.
    const items = [{ size: 800 }, { min: 50 }, { min: 150 }];

    const { result } = renderHook(() => useSizes(items, 1000));
    const [, postPxSizes] = result.current;

    expect(postPxSizes[0]).toBeCloseTo(800);
    expect(postPxSizes[1]).toBeCloseTo(50);
    expect(postPxSizes[2]).toBeCloseTo(150);
  });
});
