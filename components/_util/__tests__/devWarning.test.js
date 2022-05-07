describe('Test devWarning', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    console.error.mockClear();
  });

  describe('process.env.NODE_ENV !== "production"', () => {
    it('If `false`, exec `console.error`', async () => {
      const devWarning = (await import('../devWarning')).default;
      devWarning(false, 'error');

      expect(console.error).toHaveBeenCalled();
    });

    it('If `true`, do not exec `console.error`', async () => {
      const devWarning = (await import('../devWarning')).default;
      devWarning(true, 'error message');

      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe('process.env.NODE_ENV === "production"', () => {
    it('Whether `true` or `false`, do not exec `console.error`', async () => {
      const prevEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const { default: devWarning, noop } = await import('../devWarning');

      expect(devWarning).toEqual(noop);

      devWarning(false, 'error message');
      expect(console.error).not.toHaveBeenCalled();

      devWarning(true, 'error message');
      expect(console.error).not.toHaveBeenCalled();

      process.env.NODE_ENV = prevEnv;
    });
  });
});
