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

  it('getScroll document without global Document constructor', () => {
    const DocumentConstructor = globalThis.Document;
    const scrollTop = document.documentElement.scrollTop;

    document.documentElement.scrollTop = 400;
    Reflect.deleteProperty(globalThis, 'Document');

    try {
      expect(getScroll(document)).toBe(400);
    } finally {
      globalThis.Document = DocumentConstructor;
      document.documentElement.scrollTop = scrollTop;
    }
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
});
