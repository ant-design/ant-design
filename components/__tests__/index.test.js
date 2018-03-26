const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
const antd = require('..');

describe('antd', () => {
  it('exports modules correctly', () => {
    expect(Object.keys(antd)).toMatchSnapshot();
  });

  it('should hint when import all components', () => {
    expect(warnSpy.mock.calls).toHaveLength(1);
    expect(warnSpy.mock.calls[0][0]).toMatch(
      'You are using a whole package of antd, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.'
    );
    warnSpy.mockRestore();
  });
});
