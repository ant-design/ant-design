import copy from '../copy';

describe('Test copy', () => {
  beforeEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: {
        clipboard: {
          writeText: jest.fn(),
          write: jest.fn(),
        },
      },
      configurable: true,
      writable: true,
    });

    jest.spyOn(global.console, 'warn');

    document.execCommand = jest.fn();

    global.ClipboardItem = class {
      static supports(): boolean {
        return true;
      }
      constructor(data: Record<string, string | Blob>) {
        this._data = data;
        this.types = Object.keys(data);
      }
      private _data: Record<string, string | Blob>;
      public types: string[];
      public presentationStyle: PresentationStyle = 'unspecified';
      async getType(): Promise<string> {
        return this.types[0];
      }

      async getBlob(type?: string): Promise<Blob> {
        const mimeType = type || this.types[0];
        return new Blob([this._data[mimeType]], { type: mimeType });
      }
    };
  });

  test('format!=text/html use navigator.clipboard.writeText', async () => {
    const mockWriteText = jest.fn().mockImplementation(() => Promise.resolve());

    global.navigator.clipboard.writeText = mockWriteText;

    const result = copy('Test Text', {});

    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Test Text');
  });

  it('format=text/html ,use navigator.clipboard.write', async () => {
    const mockWrite = jest.fn().mockImplementation(() => Promise.resolve());
    navigator.clipboard.write = mockWrite;
    const result = copy('<div>Text</div>', {
      format: 'text/html',
    });

    expect(navigator.clipboard.write).toHaveBeenCalledWith([
      expect.objectContaining({
        types: ['text/html', 'text/plain'],
      }),
    ]);
    expect(result).toBe(true);
  });

  test('use function fallbackCopy success', async () => {
    delete (global.navigator as any).clipboard;

    const execCommandSpy = jest.spyOn(document, 'execCommand').mockReturnValue(true);

    const createElementSpy = jest.spyOn(document, 'createElement');

    const result = await copy('Test Text', {});

    expect(createElementSpy).toHaveBeenCalled();
    expect(execCommandSpy).toHaveBeenCalledWith('copy');
    expect(result).toBe(true);

    expect(console.warn).toHaveBeenLastCalledWith('copy success');

    execCommandSpy.mockRestore();
    createElementSpy.mockRestore();
  });

  afterEach(() => {
    delete (global as any).navigator;
    delete (document as any).execCommand;
    delete (global as any).ClipboardItem;
    jest.restoreAllMocks();
  });
});
