const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
const antd = require('..');

describe('antd', () => {
  it('exports modules correctly', () => {
    expect(Object.keys(antd)).toMatchSnapshot();
  });

  it('should hint when import all components', () => {
    expect(warnSpy).toBeCalledWith(
      'You are using a whole package of antd, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.'
    );
    warnSpy.mockRestore();
  });
});
