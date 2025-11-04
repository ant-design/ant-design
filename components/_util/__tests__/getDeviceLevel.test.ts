import getDeviceLevel from '../getDeviceLevel';

describe('getDeviceLevel', () => {
  const originalNavigator = { ...navigator };

  function mockNavigator({ cpu = 1, memory = 1, gpu = false, webgl = false }) {
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: cpu,
      configurable: true,
    });

    Object.defineProperty(navigator, 'deviceMemory', {
      value: memory,
      configurable: true,
    });

    if (gpu) {
      Object.defineProperty(navigator, 'gpu', {
        value: {},
        configurable: true,
      });
    } else {
      delete (navigator as any).gpu;
    }

    const getContextMock = jest.fn(() => (webgl ? {} : null));
    jest.spyOn(document, 'createElement').mockImplementation(
      () =>
        ({
          getContext: getContextMock,
        }) as any,
    );
  }

  afterEach(() => {
    Object.assign(navigator, originalNavigator);
    jest.restoreAllMocks();
  });

  it('High-end device: 8 cores, 8GB, has GPU → high', () => {
    mockNavigator({ cpu: 8, memory: 8, gpu: true });
    expect(getDeviceLevel()).toBe('high');
  });

  it('Mid-range device: 4 cores, 4GB, no GPU → medium', () => {
    mockNavigator({ cpu: 4, memory: 4, gpu: false });
    expect(getDeviceLevel()).toBe('medium');
  });

  it('Low-end device: 2 cores, 1GB, no GPU → basic', () => {
    mockNavigator({ cpu: 2, memory: 1, gpu: false });
    expect(getDeviceLevel()).toBe('basic');
  });

  it('GPU detected through WebGL → score increased', () => {
    mockNavigator({ cpu: 4, memory: 2, webgl: true });
    expect(getDeviceLevel()).toBe('medium');
  });

  it('Should not throw when navigator fields are missing', () => {
    mockNavigator({ cpu: undefined as any, memory: undefined as any });
    expect(() => getDeviceLevel()).not.toThrow();
  });
});
