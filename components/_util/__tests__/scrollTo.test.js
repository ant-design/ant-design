import scrollTo from '../scrollTo';
import { sleep } from '../../../tests/utils';

describe('Test ScrollTo function', () => {
  let dateNowMock;

  beforeEach(() => {
    dateNowMock = jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 1000);
  });

  afterEach(() => {
    dateNowMock.mockRestore();
  });

  it('test scrollTo', async () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
    });

    scrollTo(1000);
    await sleep(20);

    expect(window.pageYOffset).toBe(1000);

    scrollToSpy.mockRestore();
  });

  it('test callback - option', async () => {
    const cbMock = jest.fn();
    scrollTo(1000, {
      callback: cbMock,
    });
    await sleep(20);
    expect(cbMock).toHaveBeenCalledTimes(1);
  });

  it('test getContainer - option', async () => {
    const div = document.createElement('div');
    scrollTo(1000, {
      getContainer: () => div,
    });
    await sleep(20);
    expect(div.scrollTop).toBe(1000);
  });

  it('test getContainer document - option', async () => {
    scrollTo(1000, {
      getContainer: () => document,
    });
    await sleep(20);
    expect(document.documentElement.scrollTop).toBe(1000);
  });

  it('test duration - option', async () => {
    scrollTo(1000, {
      duration: 1100,
      getContainer: () => document,
    });
    await sleep(20);
    expect(document.documentElement.scrollTop).toBe(1000);
  });
});
