const OLD_NODE_ENV = process.env.NODE_ENV;
process.env.NODE_ENV = 'development';
const antd = require('..');

describe('antd', () => {
  afterAll(() => {
    process.env.NODE_ENV = OLD_NODE_ENV;
  });

  it('exports modules correctly', () => {
    expect(Object.keys(antd)).toMatchSnapshot();
  });

  it('unstableSetRender should show correct warning message', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    antd.unstableSetRender();

    expect(errorSpy).toHaveBeenCalledWith(
      "Warning: [antd: compatible] antd v6 support React 19 already, it's no need to call the compatible function or just remove `@ant-design/v5-patch-for-react-19`",
    );

    errorSpy.mockRestore();
  });
});
