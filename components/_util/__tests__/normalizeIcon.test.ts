import normalizeIcon from '../normalizeIcon';

describe('normalizeIcon', () => {
  it('should return value icon', () => {
    const value = { icon: 'icon' };
    expect(normalizeIcon(value, 'icon', 'default')).toBe('icon');
  });

  it('should return fallback if value does not include prop', () => {
    const value = { icon: undefined };
    expect(normalizeIcon(value, 'icon', 'default')).toBe('default');
  });

  it('should return null if value icon is null', () => {
    const value = { icon: null };
    expect(normalizeIcon(value, 'icon', 'default')).toBe(null);
  });

  it('should return fallback if value is true', () => {
    expect(normalizeIcon(true, 'icon', 'default')).toBe('default');
  });

  it('should return fallback if value is undefined', () => {
    expect(normalizeIcon(undefined, 'icon', 'default')).toBe('default');
  });

  it('should return undefined if value is false', () => {
    expect(normalizeIcon(false, 'icon', 'default')).toBe(undefined);
  });

  it('should return undefined if neither value nor fallback is provided', () => {
    expect(normalizeIcon(undefined, 'icon', undefined)).toBe(undefined);
  });
});
