import capitalize from '../capitalize';

describe('capitalize', () => {
  it('should capitalize the first character of a string', () => {
    expect(capitalize('antd')).toBe('Antd');
    expect(capitalize('Antd')).toBe('Antd');
    expect(capitalize(' antd')).toBe(' antd');
    expect(capitalize('')).toBe('');
  });

  it('should return the original value when is not a string', () => {
    expect(capitalize(1 as any)).toBe(1);
    expect(capitalize(true as any)).toBe(true);
    expect(capitalize(undefined as any)).toBe(undefined);
    expect(capitalize(null as any)).toBe(null);
  });
});
