type SizeUnit = number | undefined;

export function autoPtgSizes(
  ptgSizes: SizeUnit[],
  minPtgSizes: SizeUnit[],
  maxPtgSizes: SizeUnit[],
): number[] {
  const result = [...ptgSizes] as number[];

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

  // Fill if exceed
  if (restPtg < 0) {
    const scale = 1 / currentTotalPtg;
    return ptgSizes.map((size) => (size === undefined ? 0 : size * scale));
  }

  // Check if limit exists
  let sumMin = 0;
  let sumMax = 0;
  for (const index of undefinedIndexes) {
    const min = minPtgSizes[index] || 0;
    const max = maxPtgSizes[index] || 1;
    sumMin += min;
    sumMax += max;
  }

  // Impossible case, just average fill
  if (sumMin > 1 && sumMax < 1) {
    const avg = 1 / undefinedIndexes.length;
    return ptgSizes.map((size) => (size === undefined ? avg : size));
  }

  // Greedy algorithm
  let remain = restPtg - sumMin;

  for (let i = 0; i < undefinedIndexes.length; i += 1) {
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
