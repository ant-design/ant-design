/* eslint-disable unicorn/new-for-builtins */
/* eslint-disable no-new-wrappers */
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
    expect(isPrimitive(NaN)).toBe(true);
    expect(isPrimitive(Infinity)).toBe(true);
    expect(isPrimitive(Symbol('test'))).toBe(true);
    expect(isPrimitive(BigInt(123))).toBe(true);
    expect(isPrimitive(Symbol.for('test'))).toBe(true);
  });

  it('should return false for non-primitive types', () => {
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(new Date())).toBe(false);
    expect(isPrimitive(/regex/)).toBe(false);
    expect(isPrimitive(() => {})).toBe(false);
    expect(isPrimitive(new Map())).toBe(false);
    expect(isPrimitive(new Set())).toBe(false);
    expect(isPrimitive(new WeakMap())).toBe(false);
    expect(isPrimitive(new WeakSet())).toBe(false);
    expect(isPrimitive(new String())).toBe(false);
    expect(isPrimitive(new Number())).toBe(false);
    expect(isPrimitive(new Boolean())).toBe(false);
    expect(isPrimitive(class A {})).toBe(false);
    expect(isPrimitive(Intl)).toBe(false);
  });
});
