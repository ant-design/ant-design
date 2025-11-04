export type DeviceLevel = 'high' | 'medium' | 'basic';

function getDeviceLevel(): DeviceLevel {
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
  } else {
    score += 0;
  }

  // GPU
  if (gpu) score += 2;

  if (score >= 7) {
    return 'high';
  } else if (score >= 4) {
    return 'medium';
  } else {
    return 'basic';
  }
}

function hasGPU(): boolean {
  try {
    if ((navigator as any).gpu) {
      return true;
    }
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

export default getDeviceLevel;
