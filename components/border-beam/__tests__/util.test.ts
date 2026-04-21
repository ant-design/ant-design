import {
  compactRadiusTokens,
  expandRadiusTokens,
  formatRadiusValue,
  getBorderBeamGradient,
  getComputedRadius,
  getDefinedRadius,
  getMotionPathRadius,
  getRadiusTokenValue,
  parseRadiusCorner,
  parseRadiusValue,
  toCSSLength,
} from '../util';

const createStyleDeclaration = (
  style: Partial<
    Pick<
      CSSStyleDeclaration,
      | 'borderTopLeftRadius'
      | 'borderTopRightRadius'
      | 'borderBottomRightRadius'
      | 'borderBottomLeftRadius'
      | 'borderRadius'
    >
  >,
) => style as CSSStyleDeclaration;

describe('BorderBeam util', () => {
  it('should resolve configured radius values', () => {
    expect(toCSSLength(12, '0px')).toBe('12px');
    expect(toCSSLength('24px', '0px')).toBe('24px');
    expect(toCSSLength(undefined, '0px')).toBe('0px');

    expect(getDefinedRadius(undefined, '   ', 16, '24px')).toBe(16);
    expect(getDefinedRadius(undefined, '   ', '24px')).toBe('24px');
    expect(getDefinedRadius(undefined, '   ')).toBeUndefined();
  });

  it('should normalize beam colors into gradient strings', () => {
    expect(getBorderBeamGradient(undefined, '#1677ff', '#4096ff')).toBe(
      'linear-gradient(to left, #1677ff, #4096ff, transparent)',
    );
    expect(getBorderBeamGradient('   ', '#1677ff', '#4096ff')).toBe(
      'linear-gradient(to left, #1677ff, #4096ff, transparent)',
    );
    expect(getBorderBeamGradient('#36cfc9', '#1677ff', '#4096ff')).toBe(
      'linear-gradient(to left, #36cfc9, #36cfc9, transparent)',
    );
    expect(
      getBorderBeamGradient(
        [
          { color: '#95de64', percent: 100 },
          { color: '#1677ff', percent: 0 },
          { color: '#36cfc9', percent: 55 },
        ],
        '#1677ff',
        '#4096ff',
      ),
    ).toBe('linear-gradient(to left, #1677ff 0%, #36cfc9 55%, #95de64 100%, transparent)');
    expect(getBorderBeamGradient([{ color: '   ', percent: 20 }], '#1677ff', '#4096ff')).toBe(
      'linear-gradient(to left, #1677ff, #4096ff, transparent)',
    );
  });

  it('should parse radius tokens', () => {
    expect(getRadiusTokenValue('')).toBeUndefined();
    expect(getRadiusTokenValue('12')).toBe(12);
    expect(getRadiusTokenValue('12px')).toBe(12);
    expect(getRadiusTokenValue('var(--radius)')).toBeUndefined();

    expect(expandRadiusTokens(['8px'])).toEqual(['8px', '8px', '8px', '8px']);
    expect(expandRadiusTokens(['8px', '16px'])).toEqual(['8px', '16px', '8px', '16px']);
    expect(expandRadiusTokens(['8px', '16px', '24px'])).toEqual(['8px', '16px', '24px', '16px']);
    expect(expandRadiusTokens(['8px', '16px', '24px', '32px'])).toEqual([
      '8px',
      '16px',
      '24px',
      '32px',
    ]);
    expect(expandRadiusTokens(['8px', '16px', '24px', '32px', '40px'])).toBeUndefined();
  });

  it('should compact radius tokens when formatting values', () => {
    expect(compactRadiusTokens(['8px', '8px', '8px', '8px'])).toEqual(['8px']);
    expect(compactRadiusTokens(['8px', '16px', '8px', '16px'])).toEqual(['8px', '16px']);
    expect(compactRadiusTokens(['8px', '16px', '24px', '16px'])).toEqual(['8px', '16px', '24px']);
    expect(compactRadiusTokens(['8px', '16px', '24px', '32px'])).toEqual([
      '8px',
      '16px',
      '24px',
      '32px',
    ]);

    expect(
      formatRadiusValue({
        horizontal: ['8px', '16px', '8px', '16px'],
        vertical: ['8px', '16px', '8px', '16px'],
      }),
    ).toBe('8px 16px');
    expect(
      formatRadiusValue({
        horizontal: ['8px', '16px', '8px', '16px'],
        vertical: ['20px', '24px', '20px', '24px'],
      }),
    ).toBe('8px 16px / 20px 24px');
  });

  it('should parse radius corners and values', () => {
    expect(parseRadiusCorner('12px')).toEqual(['12px', '12px']);
    expect(parseRadiusCorner('12px 16px')).toEqual(['12px', '16px']);
    expect(parseRadiusCorner('12px 16px 20px')).toBeUndefined();

    expect(parseRadiusValue(12)).toEqual({
      horizontal: ['12px', '12px', '12px', '12px'],
      vertical: ['12px', '12px', '12px', '12px'],
    });
    expect(parseRadiusValue('12px 16px / 20px 24px')).toEqual({
      horizontal: ['12px', '16px', '12px', '16px'],
      vertical: ['20px', '24px', '20px', '24px'],
    });
    expect(parseRadiusValue('12px / ')).toBeUndefined();
    expect(parseRadiusValue('12px / 20px / 24px')).toBeUndefined();
    expect(parseRadiusValue('12px 16px 20px 24px 28px')).toBeUndefined();
  });

  it('should read computed radius from longhands or fallback shorthand', () => {
    expect(
      getComputedRadius(
        createStyleDeclaration({
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '16px 20px',
          borderBottomRightRadius: '24px',
          borderBottomLeftRadius: '28px 32px',
          borderRadius: '',
        }),
      ),
    ).toBe('12px 16px 24px 28px / 12px 20px 24px 32px');

    expect(
      getComputedRadius(
        createStyleDeclaration({
          borderTopLeftRadius: '',
          borderTopRightRadius: '',
          borderBottomRightRadius: '',
          borderBottomLeftRadius: '',
          borderRadius: '12px 16px / 20px 24px',
        }),
      ),
    ).toBe('12px 16px / 20px 24px');

    expect(
      getComputedRadius(
        createStyleDeclaration({
          borderTopLeftRadius: '',
          borderTopRightRadius: '',
          borderBottomRightRadius: '',
          borderBottomLeftRadius: '',
          borderRadius: '12px / ',
        }),
      ),
    ).toBeUndefined();
  });

  it('should normalize motion path radius', () => {
    expect(getMotionPathRadius(12, 60)).toBe('60px');
    expect(getMotionPathRadius('80px 100px', 60)).toBe('80px 100px');
    expect(getMotionPathRadius('80px 100px 120px', 60)).toBe('80px 100px 120px');
    expect(getMotionPathRadius('80px 100px / 120px 140px', 60)).toBe('80px 100px / 120px 140px');
    expect(getMotionPathRadius('var(--radius) 12px', 60)).toBe('var(--radius) 60px');
    expect(getMotionPathRadius('12px / ', 60)).toBeUndefined();
  });
});
