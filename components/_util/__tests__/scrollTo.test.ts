import { waitFakeTimer } from '../../../tests/utils';
import scrollTo from '../scrollTo';

describe('Test ScrollTo function', () => {
  const dateNowMock = vi.spyOn(Date, 'now');

  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    dateNowMock.mockReturnValueOnce(0).mockReturnValueOnce(1000);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    dateNowMock.mockClear();
  });

  it('test scrollTo', async () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
    });

    scrollTo(1000);
    await waitFakeTimer();

    expect(window.pageYOffset).toBe(1000);

    scrollToSpy.mockRestore();
  });

  it('test callback - option', async () => {
    const cbMock = vi.fn();
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
});
