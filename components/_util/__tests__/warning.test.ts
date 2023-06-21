describe('Test warning', () => {
  let spy: jest.SpyInstance;

  beforeAll(() => {
    spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    spy.mockRestore();
  });

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    spy.mockReset();
  });

  it('Test noop', async () => {
    const { noop } = await import('../warning');
    const value = noop();

    expect(value).toBe(undefined);
    expect(spy).not.toHaveBeenCalled();
    expect(noop).not.toThrow();
  });

  describe('process.env.NODE_ENV !== "production"', () => {
    it('If `false`, exec `console.error`', async () => {
      const warning = (await import('../warning')).default;
      warning(false, 'error');

      expect(spy).toHaveBeenCalled();
    });

    it('If `true`, do not exec `console.error`', async () => {
      const warning = (await import('../warning')).default;
      warning(true, 'error message');

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('process.env.NODE_ENV === "production"', () => {
    it('Whether `true` or `false`, do not exec `console.error`', async () => {
      const prevEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const { default: warning, noop } = await import('../warning');

      expect(warning).toEqual(noop);

      warning(false, 'error message');
      expect(spy).not.toHaveBeenCalled();

      warning(true, 'error message');
      expect(spy).not.toHaveBeenCalled();

      process.env.NODE_ENV = prevEnv;
    });
  });
});
