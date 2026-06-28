import { vi } from 'vitest';

const OLD_NODE_ENV = process.env.NODE_ENV;
process.env.NODE_ENV = 'development';

describe('antd', () => {
  let antd: typeof import('..');

  beforeAll(async () => {
    vi.resetModules();
    antd = await import('..');
  });

  afterAll(() => {
    process.env.NODE_ENV = OLD_NODE_ENV;
  });

  it('exports modules correctly', () => {
    expect(Object.keys(antd)).toMatchSnapshot();
  });

  it('unstableSetRender should show correct warning message', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    antd.unstableSetRender();

    expect(errorSpy).toHaveBeenCalledWith(
      "Warning: [antd: compatible] antd v6 support React 19 already, it's no need to call the compatible function or just remove `@ant-design/v5-patch-for-react-19`",
    );

    errorSpy.mockRestore();
  });
});
