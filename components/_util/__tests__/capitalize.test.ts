import capitalize from '../capitalize';

describe('capitalize', () => {
  it('should capitalize the first character of a string', () => {
    expect(capitalize('antd')).toBe('Antd');
    expect(capitalize('Antd')).toBe('Antd');
    expect(capitalize(' antd')).toBe(' antd');
  });
});
