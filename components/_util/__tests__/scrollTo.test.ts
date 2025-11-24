import { waitFakeTimer } from '../../../tests/utils';
import scrollTo from '../scrollTo';

describe('Test ScrollTo function', () => {
  const dateNowMock = jest.spyOn(Date, 'now');

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    dateNowMock.mockReturnValueOnce(0).mockReturnValueOnce(1000);
  });

  afterEach(() => {
    jest.clearAllTimers();
    dateNowMock.mockClear();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('test scrollTo', async () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
    });

    scrollTo(1000);
    await waitFakeTimer();

    expect(window.pageYOffset).toBe(1000);

    scrollToSpy.mockRestore();
  });

  it('test callback - option', async () => {
    const cbMock = jest.fn();
    scrollTo(1000, {
      callback: cbMock,
    });
    await waitFakeTimer();
    expect(cbMock).toHaveBeenCalledTimes(1);
  });

  it('test getContainer - option', async () => {
    const div = document.createElement('div');
    scrollTo(1000, {
      getContainer: () => div,
    });
    await waitFakeTimer();
    expect(div.scrollTop).toBe(1000);
  });

  it('test getContainer document - option', async () => {
    scrollTo(1000, {
      getContainer: () => document,
    });
    await waitFakeTimer();
    expect(document.documentElement.scrollTop).toBe(1000);
  });

  it('test duration - option', async () => {
    scrollTo(1000, {
      duration: 1100,
      getContainer: () => document,
    });
    await waitFakeTimer();
    expect(document.documentElement.scrollTop).toBe(1000);
  });

  it('test cancel scroll animation', async () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
    });

    const cancel = scrollTo(1000);
    jest.advanceTimersByTime(50);
    cancel();
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenCalled();
    scrollToSpy.mockRestore();
  });

  it('test cancel scroll animation with callback', async () => {
    const cbMock = jest.fn();

    const cancel = scrollTo(1000, {
      callback: cbMock,
    });
    jest.advanceTimersByTime(100);
    cancel();
    await waitFakeTimer();
    expect(cbMock).not.toHaveBeenCalled();
  });

  it('test multiple scrollTo calls with cancellation', async () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
    });

    const cancel1 = scrollTo(1000);
    jest.advanceTimersByTime(50);
    cancel1();
    const cancel2 = scrollTo(2000);
    await waitFakeTimer();
    expect(window.pageYOffset).toBe(2000);
    cancel2();
    scrollToSpy.mockRestore();
  });

  it('test cancel function returns undefined', () => {
    const cancel = scrollTo(1000);

    expect(() => cancel()).not.toThrow();
    expect(cancel()).toBeUndefined();
  });
});
