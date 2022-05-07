describe('Test devWarning', () => {
  let spy: jest.SpyInstance;

  beforeAll(() => {
    spy = jest.spyOn(console, 'error');
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
    const { noop } = await import('../devWarning');
    const value = noop();

    expect(value).toBe(undefined);
    expect(spy).not.toHaveBeenCalled();
    expect(() => {
      noop();
    }).not.toThrow();
  });

  describe('process.env.NODE_ENV !== "production"', () => {
    it('If `false`, exec `console.error`', async () => {
      const devWarning = (await import('../devWarning')).default;
      devWarning(false, 'error');

      expect(spy).toHaveBeenCalled();
    });

    it('If `true`, do not exec `console.error`', async () => {
      const devWarning = (await import('../devWarning')).default;
      devWarning(true, 'error message');

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('process.env.NODE_ENV === "production"', () => {
    it('Whether `true` or `false`, do not exec `console.error`', async () => {
      const prevEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const { default: devWarning, noop } = await import('../devWarning');

      expect(devWarning).toEqual(noop);

      devWarning(false, 'error message');
      expect(spy).not.toHaveBeenCalled();

      devWarning(true, 'error message');
      expect(spy).not.toHaveBeenCalled();

      process.env.NODE_ENV = prevEnv;
    });
  });
});
