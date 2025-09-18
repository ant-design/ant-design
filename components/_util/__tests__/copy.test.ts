import { fireEvent } from '../../../tests/utils';
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

    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockImplementation(() => {
        fireEvent.copy(document.body);
      }),
      configurable: true,
      writable: true,
    });

    jest.spyOn(global.console, 'error');

    (global as any).ClipboardItem = class {
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

  it('format!=text/html use navigator.clipboard.writeText', async () => {
    const mockWriteText = jest.fn().mockImplementation(() => Promise.resolve());

    global.navigator.clipboard.writeText = mockWriteText;

    const result = await copy('Test Text', {});

    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Test Text');
  });

  it('format=text/html ,use navigator.clipboard.write', async () => {
    const mockWrite = jest.fn().mockImplementation(() => Promise.resolve());
    navigator.clipboard.write = mockWrite;
    const result = await copy('<div>Text</div>', {
      format: 'text/html',
    });

    expect(navigator.clipboard.write).toHaveBeenCalledWith([
      expect.objectContaining({
        types: ['text/html', 'text/plain'],
      }),
    ]);
    expect(result).toBe(true);
  });

  it('format!=text/html via execCommand, When there is no clipboard object', async () => {
    delete (global.navigator as any).clipboard;
    const result = await copy('test copy');
    expect(result).toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('format=text/html via execCommand, When there is no clipboard object', async () => {
    delete (global.navigator as any).clipboard;
    const result = await copy('<div>test copy</div>', {
      format: 'text/html',
    });
    expect(result).toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('copy failed, When the cutting object is not a string', async () => {
    const mockWrite = jest.fn().mockImplementation(() => Promise.resolve());
    navigator.clipboard.write = mockWrite;
    const result = await copy(0 as any);
    expect((console.error as any).mock.lastCall[0]).toContain(
      'The clipboard content must be of string type',
    );
    expect(result).toBe(false);
  });

  afterEach(() => {
    delete (global as any).navigator;
    delete (global as any).ClipboardItem;

    jest.restoreAllMocks();
  });
});
