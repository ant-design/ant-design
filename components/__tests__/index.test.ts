const OLD_NODE_ENV = process.env.NODE_ENV;
process.env.NODE_ENV = 'development';

describe('antd', () => {
  afterAll(() => {
    process.env.NODE_ENV = OLD_NODE_ENV;
  });

  it('exports modules correctly', async () => {
    const antd = await import('../index');
    expect(Object.keys(antd)).toMatchSnapshot();
  });
});
