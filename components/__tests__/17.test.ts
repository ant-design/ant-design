import { vi } from 'vitest';

vi.mock('../_util/getReactMajorVersionCanDelMe', () => {
  return {
    default: () => 17,
  };
});

describe('antd legacy', () => {
  it('should warn when React version is below 18', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.resetModules();
    await import('..');

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: version] antd v6 no longer supports React versions below 18. Please upgrade to React 18 or higher.',
    );
  });
});
