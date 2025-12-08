type SizeUnit = number | undefined;

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

  // If all sizes are defined but don't sum to 1, scale them.
  if (ptgSizes.length && !undefinedIndexes.length && currentTotalPtg !== 1) {
    // Handle the case when all sizes are 0
    if (currentTotalPtg === 0) {
      const avg = 1 / ptgSizes.length;
      return ptgSizes.map(() => avg);
    }
    const scale = 1 / currentTotalPtg;
    // We know `size` is a number here because undefinedIndexes is empty.
    return ptgSizes.map((size) => (size as number) * scale);
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
