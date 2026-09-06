type SizeUnit = number | undefined;

/**
 * Clamp every defined percentage size into its `[min, max]` range.
 *
 * This guards the container-resize path: dragging stores absolute px sizes
 * which are re-based on the new container size, and without re-clamping a
 * stale size can be scaled below `min` (see #59083).
 *
 * Two cases are deliberately left untouched so pre-existing behavior is
 * preserved:
 *
 * - An explicit `0` is a collapsed panel — clamping it to `min` would break
 *   collapse/expand.
 * - A `max`-only clamp (no `min` bound involved) would rewrite
 *   collapse-restore snapshots that intentionally sit at a panel `max`
 *   (verified by the `collapsible with fallback` / `collapsible with min`
 *   suites), so only the `min` side is enforced here. An over-`max` value
 *   keeps flowing into `autoPtgSizes`, which rebalances it as before.
 *
 * `undefined` (auto) entries are left for `autoPtgSizes` to fill.
 */
export function limitPtgSizes(
  ptgSizes: SizeUnit[],
  minPtgSizes: SizeUnit[],
  _maxPtgSizes: SizeUnit[],
): SizeUnit[] {
  return ptgSizes.map((size, index) => {
    if (size === undefined || size === 0) {
      return size;
    }
    const min = minPtgSizes[index] || 0;
    if (size < min) {
      return min;
    }
    return size;
  });
}

export function autoPtgSizes(
  ptgSizes: SizeUnit[],
  minPtgSizes: SizeUnit[],
  maxPtgSizes: SizeUnit[],
): number[] {
  // Static current data
  let currentTotalPtg = 0;
  const undefinedIndexes: number[] = [];
  ptgSizes.forEach((size, index) => {
    if (size === undefined) {
      undefinedIndexes.push(index);
    } else {
      currentTotalPtg += size;
    }
  });

  const restPtg = 1 - currentTotalPtg;
  const undefinedCount = undefinedIndexes.length;

  // If all sizes are defined but don't sum to 1, scale them — but never
  // below `min`: sizes re-based on a shrunken container arrive here already
  // over `1` in total, and plain scaling would push clamped panels back
  // under `min` (see #59083). Shrink only the part above `min`,
  // proportionally; an explicit `0` (collapsed) is left alone. The
  // `floorTotal > 1` boundary is strict: when mins exactly fill the
  // container (`floorTotal === 1`), the reducible-space branch below still
  // applies and pins every panel at its `min` instead of scaling (see
  // #59232 review).
  if (ptgSizes.length && !undefinedIndexes.length && currentTotalPtg !== 1) {
    // Handle the case when all sizes are 0
    if (currentTotalPtg === 0) {
      const avg = 1 / ptgSizes.length;
      return ptgSizes.map(() => avg);
    }
    let floorTotal = 0;
    let reducible = 0;
    ptgSizes.forEach((size, index) => {
      const num = size as number;
      if (num === 0) {
        return;
      }
      const floor = minPtgSizes[index] || 0;
      floorTotal += floor;
      reducible += num - floor;
    });
    if (reducible <= 0 || floorTotal > 1) {
      // Impossible case (mins alone overflow the container, or nothing to
      // shrink): keep the previous proportional behavior.
      const scale = 1 / currentTotalPtg;
      // We know `size` is a number here because undefinedIndexes is empty.
      return ptgSizes.map((size) => (size as number) * scale);
    }
    const deficit = currentTotalPtg - 1;
    return ptgSizes.map((size, index) => {
      const num = size as number;
      if (num === 0) {
        return num;
      }
      const floor = minPtgSizes[index] || 0;
      return num - (deficit * (num - floor)) / reducible;
    });
  }

  // Fill if exceed
  if (restPtg < 0) {
    const scale = 1 / currentTotalPtg;
    return ptgSizes.map((size) => (size === undefined ? 0 : size * scale));
  }

  // Check if limit exists
  let sumMin = 0;
  let sumMax = 0;
  let limitMin = 0;
  let limitMax = 1;
  for (const index of undefinedIndexes) {
    const min = minPtgSizes[index] || 0;
    const max = maxPtgSizes[index] || 1;
    sumMin += min;
    sumMax += max;
    limitMin = Math.max(limitMin, min);
    limitMax = Math.min(limitMax, max);
  }

  // Impossible case, just average fill
  if (sumMin > 1 && sumMax < 1) {
    const avg = 1 / undefinedCount;
    return ptgSizes.map((size) => (size === undefined ? avg : size));
  }

  // Quickly fill if can
  const restAvg = restPtg / undefinedCount;
  if (limitMin <= restAvg && restAvg <= limitMax) {
    return ptgSizes.map((size) => (size === undefined ? restAvg : size));
  }

  // Greedy algorithm
  const result = [...ptgSizes] as number[];
  let remain = restPtg - sumMin;

  for (let i = 0; i < undefinedCount; i += 1) {
    const index = undefinedIndexes[i];
    const min = minPtgSizes[index] || 0;
    const max = maxPtgSizes[index] || 1;

    result[index] = min;

    const canAdd = max - min;
    const add = Math.min(canAdd, remain);
    result[index] += add;
    remain -= add;
  }

  return result;
}
