jest.mock('../_util/getReactMajorVersionCanDelMe', () => {
  return () => 17;
});

describe('antd legacy', () => {
  it('should warn when React version is below 18', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    require('..');

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: version] antd v6 no longer supports React versions below 18. Please upgrade to React 18 or higher.',
    );
  });
});
