import scrollTo from '../scrollTo';
import { sleep } from '../../../tests/utils';

describe('Test ScrollTo function', () => {
  it('test scrollTo', async () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      const w = window;
      w.scrollY = y;
      w.pageYOffset = y;
    });
    scrollTo(1000);
    await sleep(1000);
    expect(window.pageYOffset).toBe(1000);
    scrollToSpy.mockRestore();
  });

  it('test callback - option', async () => {
    const cbMock = jest.fn();
    scrollTo(1000, {
      callback: cbMock,
    });
    await sleep(1000);
    expect(cbMock).toHaveBeenCalledTimes(1);
  });

  it('test getContainer - option', async () => {
    const div = document.createElement('div');
    scrollTo(1000, {
      getContainer: () => div,
    });
    await sleep(1000);
    expect(div.scrollTop).toBe(1000);
  });
});
