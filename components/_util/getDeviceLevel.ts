export type DeviceLevel = 'high' | 'medium' | 'basic';

let memoizedLevel: DeviceLevel | null = null;
let memoizedHasGPU: boolean | null = null;

function getDeviceLevel(): DeviceLevel {
  // SSR
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return 'basic';
  }

  if (memoizedLevel !== null) {
    return memoizedLevel;
  }

  const cpuCores = navigator.hardwareConcurrency ?? 1;
  const memory = (navigator as any).deviceMemory ?? 1;

  const gpu = hasGPU();

  let score = 0;

  // CPU
  if (cpuCores >= 8) {
    score += 3;
  } else if (cpuCores >= 4) {
    score += 2;
  } else {
    score += 1;
  }

  // Memory(A floating point number; one of 0.25, 0.5, 1, 2, 4, 8)
  if (memory >= 8) {
    score += 3;
  } else if (memory >= 4) {
    score += 2;
  } else if (memory >= 2) {
    score += 1;
  }

  // GPU
  if (gpu) score += 2;

  if (score >= 7) {
    memoizedLevel = 'high';
  } else if (score >= 4) {
    memoizedLevel = 'medium';
  } else {
    memoizedLevel = 'basic';
  }

  return memoizedLevel;
}

function hasGPU(): boolean {
  if (memoizedHasGPU !== null) {
    return memoizedHasGPU;
  }

  try {
    if (typeof navigator !== 'undefined' && (navigator as any).gpu) {
      memoizedHasGPU = true;
      return true;
    }

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    memoizedHasGPU = !!gl;
    return memoizedHasGPU;
  } catch {
    memoizedHasGPU = false;
    return false;
  }
}

export default getDeviceLevel;
