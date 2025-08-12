import isPrimitive from '../isPrimitive';

describe('isPrimitive', () => {
  it('should return true for primitive types', () => {
    expect(isPrimitive('string')).toBe(true);
    expect(isPrimitive('')).toBe(true);
    expect(isPrimitive(123)).toBe(true);
    expect(isPrimitive(0)).toBe(true);
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(false)).toBe(true);
    expect(isPrimitive(null)).toBe(true);
    expect(isPrimitive(undefined)).toBe(true);
    expect(isPrimitive(Symbol('test'))).toBe(true);
    expect(isPrimitive(BigInt(123))).toBe(true);
  });

  it('should return false for non-primitive types', () => {
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(new Date())).toBe(false);
    expect(isPrimitive(/regex/)).toBe(false);
    expect(isPrimitive(() => {})).toBe(false);
    expect(isPrimitive(() => {})).toBe(false);
    expect(isPrimitive(new Map())).toBe(false);
    expect(isPrimitive(new Set())).toBe(false);
  });
});
