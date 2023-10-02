import getScroll from '../getScroll';

describe('getScroll', () => {
  it('getScroll target null', async () => {
    expect(getScroll(null, true)).toBe(0);
    expect(getScroll(null, false)).toBe(0);
  });

  it('getScroll window', async () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      window.pageXOffset = x;
      window.pageYOffset = y;
    });
    window.scrollTo(200, 400);
    expect(getScroll(window, true)).toBe(400);
    expect(getScroll(window, false)).toBe(200);
    scrollToSpy.mockRestore();
  });

  it('getScroll document', async () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      document.documentElement.scrollLeft = x;
      document.documentElement.scrollTop = y;
    });
    window.scrollTo(200, 400);
    expect(getScroll(document, true)).toBe(400);
    expect(getScroll(document, false)).toBe(200);
    scrollToSpy.mockRestore();
  });

  it('getScroll div', async () => {
    const div = document.createElement('div');
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      div.scrollLeft = x;
      div.scrollTop = y;
    });
    window.scrollTo(200, 400);
    expect(getScroll(div, true)).toBe(400);
    expect(getScroll(div, false)).toBe(200);
    scrollToSpy.mockRestore();
  });

  it('getScroll documentElement', async () => {
    const div: any = {};
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      div.scrollLeft = null;
      div.scrollTop = null;
      div.documentElement = {};
      div.documentElement.scrollLeft = x;
      div.documentElement.scrollTop = y;
    });
    window.scrollTo(200, 400);
    expect(getScroll(div, true)).toBe(400);
    expect(getScroll(div, false)).toBe(200);
    scrollToSpy.mockRestore();
  });
});
