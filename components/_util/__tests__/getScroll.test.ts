import getScroll from '../getScroll';

describe('getScroll', () => {
  it('getScroll target null', () => {
    expect(getScroll(null)).toBe(0);
  });

  it('getScroll window', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      window.pageXOffset = x;
      window.pageYOffset = y;
    });
    window.scrollTo(0, 400);
    expect(getScroll(window)).toBe(400);
    scrollToSpy.mockRestore();
  });

  it('getScroll document', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      document.documentElement.scrollLeft = x;
      document.documentElement.scrollTop = y;
    });
    window.scrollTo(0, 400);
    expect(getScroll(document)).toBe(400);
    scrollToSpy.mockRestore();
  });

  it('getScroll div', () => {
    const div = document.createElement('div');
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      div.scrollLeft = x;
      div.scrollTop = y;
    });
    window.scrollTo(0, 400);
    expect(getScroll(div)).toBe(400);
    scrollToSpy.mockRestore();
  });

  it('getScroll documentElement', () => {
    const div: any = {};
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      div.scrollLeft = null;
      div.scrollTop = null;
      div.documentElement = {};
      div.documentElement.scrollLeft = x;
      div.documentElement.scrollTop = y;
    });
    window.scrollTo(0, 400);
    expect(getScroll(div)).toBe(400);
    scrollToSpy.mockRestore();
  });

  it('When window is undef, getScroll value is zero', () => {
    const spy = jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined as any);
    expect(getScroll(null)).toBe(0);
    spy.mockRestore();
  });
});
