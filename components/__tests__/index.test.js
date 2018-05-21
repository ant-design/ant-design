const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
const antd = require('..');

describe('antd', () => {
  it('exports modules correctly', () => {
    expect(Object.keys(antd)).toMatchSnapshot();
  });
});
