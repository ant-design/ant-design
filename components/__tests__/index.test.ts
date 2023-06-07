import * as antd from '..';

const OLD_NODE_ENV = process.env.NODE_ENV;
process.env.NODE_ENV = 'development';

describe('antd', () => {
  afterAll(() => {
    process.env.NODE_ENV = OLD_NODE_ENV;
  });

  it('exports modules correctly', () => {
    expect(Object.keys(antd)).toMatchSnapshot();
  });
});
