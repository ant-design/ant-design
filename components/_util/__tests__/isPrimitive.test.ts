import isPrimitive from '../isPrimitive';

describe('isPrimitive', () => {
  it.each(['string', '', 123, 0, true, false, null, undefined, Symbol('test'), BigInt(123)])(
    'should return true for primitive type: %p',
    (primitive) => {
      expect(isPrimitive(primitive)).toBe(true);
    },
  );

  it.each([{}, [], new Date(), /regex/, () => {}, new Map(), new Set()])(
    'should return false for non-primitive type: %p',
    (nonPrimitive) => {
      expect(isPrimitive(nonPrimitive)).toBe(false);
    },
  );
});
