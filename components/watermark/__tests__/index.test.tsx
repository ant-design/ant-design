import React from 'react';
import { spyElementPrototypes } from '@rc-component/util';

import Watermark from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, render, waitFakeTimer } from '../../../tests/utils';
import Drawer from '../../drawer';
import Modal from '../../modal';

describe('Watermark', () => {
  mountTest(Watermark);
  rtlTest(Watermark);

  const mockSrcSet = jest.spyOn(Image.prototype, 'src', 'set');

  beforeAll(() => {
    mockSrcSet.mockImplementation(function fn() {
      // @ts-ignore
      this.onload?.();
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  afterAll(() => {
    mockSrcSet.mockRestore();
  });

  it('should support nativeElement ref', () => {
    const ref = React.createRef<React.ComponentRef<typeof Watermark>>();
    const { container } = render(
      <Watermark ref={ref} className="watermark-ref" content="Ant Design" />,
    );

    expect(ref.current?.nativeElement).toBe(container.querySelector('.watermark-ref'));
  });

  it('The watermark should render successfully', () => {
    const { container } = render(<Watermark className="watermark" content="Ant Design" />);
    expect(container.querySelector('.watermark div')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('The offset should be correct', () => {
    const { container } = render(
      <Watermark
        className="watermark"
        offset={[200, 200]}
        content={['Ant Design', 'Ant Design Pro']}
      />,
    );
    const target = container.querySelector<HTMLDivElement>('.watermark div');
    expect(target).toHaveStyle({
      left: '150px',
      top: '150px',
      width: 'calc(100% - 150px)',
      height: 'calc(100% - 150px)',
    });
    expect(container).toMatchSnapshot();
  });

  it('supports custom font for each content line', async () => {
    const fillText = jest.spyOn(CanvasRenderingContext2D.prototype, 'fillText');
    const fonts: string[] = [];
    const spyCanvas = spyElementPrototypes(CanvasRenderingContext2D, {
      font: {
        set(this: CanvasRenderingContext2D, ...args: any[]) {
          const [originDescriptor, value] = args as [PropertyDescriptor, string];
          fonts.push(value);
          return originDescriptor.set?.call(this, value);
        },
      },
    });

    try {
      render(
        <Watermark
          content={[
            { text: 'Ant Design', font: { fontSize: 20, fontWeight: 700 } },
            {
              text: 'Happy Working',
              font: { fontFamily: 'serif', fontSize: 12, fontStyle: 'italic' },
            },
            {
              text: 'Fallback',
              font: { fontFamily: 'monospace', fontSize: undefined },
            },
          ]}
        />,
      );
      await waitFakeTimer();

      expect(fonts).toEqual(
        expect.arrayContaining([
          'normal normal 700 20px sans-serif',
          'italic normal 400 12px serif',
          'normal normal 400 16px monospace',
        ]),
      );
      const textCalls = fillText.mock.calls.filter(([text]) =>
        ['Ant Design', 'Happy Working', 'Fallback'].includes(text as string),
      );
      expect(textCalls.map(([text]) => text)).toEqual(['Ant Design', 'Happy Working', 'Fallback']);
      textCalls.forEach(([, x, y]) => {
        expect(Number.isFinite(x)).toBeTruthy();
        expect(Number.isFinite(y)).toBeTruthy();
      });
    } finally {
      fillText.mockRestore();
      spyCanvas.mockRestore();
    }
  });

  it('Interleaved watermark backgroundSize is correct', () => {
    const { container } = render(
      <Watermark
        className="watermark"
        width={200}
        height={200}
        content="Ant Design"
        gap={[100, 100]}
      />,
    );
    const target = container.querySelector<HTMLDivElement>('.watermark div');
    expect(target).toHaveStyle({ backgroundSize: '720px' });
    expect(container).toMatchSnapshot();
  });

  it('Image watermark snapshot', () => {
    const { container } = render(
      <Watermark image="https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-4fc5-93a0-2645f64a3aca.svg" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Invalid image watermark', () => {
    mockSrcSet.mockImplementation(function fn() {
      // @ts-ignore
      this.onerror?.();
    });
    const { container } = render(
      <Watermark className="watermark" content="Ant Design" image="https://test.svg" />,
    );
    expect(container.querySelector('.watermark div')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('MutationObserver should work properly', async () => {
    let counter = 0;
    const spyCanvas = spyElementPrototypes(HTMLCanvasElement, {
      toDataURL(originDescriptor: any) {
        counter += 1;
        return originDescriptor.value.call(this);
      },
    });
    const { container } = render(<Watermark className="watermark" content="MutationObserver" />);
    const target = container.querySelector<HTMLDivElement>('.watermark div');
    await waitFakeTimer();
    expect(counter).toBe(1);

    target?.remove();
    await waitFakeTimer();
    expect(counter).toBe(1);

    expect(container).toMatchSnapshot();

    spyCanvas.mockRestore();
  });

  describe('Observe the modification of style', () => {
    it('watermark', async () => {
      const { container } = render(
        <Watermark offset={[-200, -200]} className="watermark" content="MutationObserver" />,
      );
      const target = container.querySelector<HTMLDivElement>('.watermark div');
      await waitFakeTimer();
      target?.setAttribute('style', '');
      await waitFakeTimer();
      expect(container).toMatchSnapshot();
    });

    it('container', async () => {
      const { container } = render(
        <Watermark offset={[-200, -200]} className="watermark" content="MutationObserver" />,
      );

      const target = container.querySelector<HTMLDivElement>('.watermark');
      await waitFakeTimer();
      target?.setAttribute('style', '');
      await waitFakeTimer();

      expect(target).toHaveStyle({
        overflow: 'hidden',
      });
    });
  });

  describe('nest component', () => {
    function test(name: string, children: React.ReactNode, getWatermarkElement: () => Node) {
      it(name, async () => {
        const { rerender } = render(<Watermark className="test">{children}</Watermark>);
        await waitFakeTimer();

        const watermark = getWatermarkElement();

        expect(watermark).toHaveStyle({ zIndex: '999' });

        // Not crash when children removed
        rerender(<Watermark className="test" />);
      });
    }

    test(
      'Modal',
      <Modal open />,
      () => document.body.querySelector('.ant-modal-container')!.lastChild!,
    );

    test(
      'Drawer',
      <Drawer open />,
      () => document.body.querySelector('.ant-drawer-section')!.lastChild!,
    );

    it('inherit = false', async () => {
      render(
        <Watermark inherit={false}>
          <Drawer open />
        </Watermark>,
      );
      await waitFakeTimer();

      expect(document.body.querySelector('.ant-drawer-section')!.lastChild).toHaveClass(
        'ant-drawer-body',
      );
    });
  });

  it('should not crash if content is empty string', async () => {
    const spy = jest.spyOn(CanvasRenderingContext2D.prototype, 'drawImage');
    render(<Watermark content="" className="watermark" />);
    await waitFakeTimer();
    expect(spy).not.toHaveBeenCalledWith(expect.anything(), 0, 0);
    expect(spy).not.toHaveBeenCalledWith(expect.anything(), -0, 0);
    expect(spy).not.toHaveBeenCalledWith(expect.anything(), -0, -0);
    expect(spy).not.toHaveBeenCalledWith(expect.anything(), 0, -0);
    spy.mockRestore();
  });

  it('should not draw a zero-sized canvas if content is undefined', async () => {
    const spy = jest.spyOn(CanvasRenderingContext2D.prototype, 'drawImage');
    render(<Watermark className="watermark" />);
    await waitFakeTimer();

    expect(
      spy.mock.calls.some(
        ([image]) => image instanceof HTMLCanvasElement && (!image.width || !image.height),
      ),
    ).toBe(false);
    spy.mockRestore();
  });

  it('should call onRemove when watermark is hard removed', async () => {
    const onRemove = jest.fn();
    const { container } = render(<Watermark content="Ant" onRemove={onRemove} />);
    await waitFakeTimer();

    const watermarkEle = container.querySelector<HTMLDivElement>('[style*="background-image"]');
    watermarkEle?.remove();
    await waitFakeTimer();

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('should not call onRemove when unmount', async () => {
    const onRemove = jest.fn();
    const { unmount } = render(<Watermark content="Ant" onRemove={onRemove} />);
    await waitFakeTimer();
    unmount();
    await waitFakeTimer();
    expect(onRemove).not.toHaveBeenCalled();
  });
});

describe('Watermark content changes in one animation frame', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('draws content supplied by a parent mount effect', async () => {
    const fillText = jest.spyOn(CanvasRenderingContext2D.prototype, 'fillText');
    function Demo() {
      const [content, setContent] = React.useState('');
      React.useEffect(() => {
        setContent('Account 42');
      }, []);
      return (
        <Watermark content={content}>
          <span>Report</span>
        </Watermark>
      );
    }
    render(<Demo />);
    await waitFakeTimer();
    expect(fillText.mock.calls.some(([text]) => text === 'Account 42')).toBe(true);
  });

  it('uses the last content update when several updates arrive before the next frame', async () => {
    const fillText = jest.spyOn(CanvasRenderingContext2D.prototype, 'fillText');
    const { rerender } = render(<Watermark content="first" />);
    rerender(<Watermark content="second" />);
    rerender(<Watermark content="final" />);
    await waitFakeTimer();
    const texts = fillText.mock.calls.map(([text]) => text);
    expect(texts[texts.length - 1]).toBe('final');
  });

  it('restores the updated watermark after removal without continuously redrawing', async () => {
    const fillText = jest.spyOn(CanvasRenderingContext2D.prototype, 'fillText');
    const { container, rerender } = render(<Watermark content="first" />);
    rerender(<Watermark content="final" />);
    await waitFakeTimer();

    const watermark = container.querySelector('[style*="background-image"]')!;
    expect(watermark).toBeTruthy();
    act(() => watermark.remove());
    await waitFakeTimer();

    expect(container.contains(watermark)).toBe(true);
    expect(fillText.mock.calls[fillText.mock.calls.length - 1][0]).toBe('final');
    const drawCount = fillText.mock.calls.length;
    await waitFakeTimer();
    expect(fillText).toHaveBeenCalledTimes(drawCount);
  });
});

describe('Watermark asynchronous image updates', () => {
  const images: HTMLImageElement[] = [];

  beforeEach(() => {
    jest.useFakeTimers();
    images.length = 0;
    jest.spyOn(Image.prototype, 'src', 'set').mockImplementation(function (this: HTMLImageElement) {
      images.push(this);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it.each(['load', 'error'] as const)(
    'ignores an old image %s after a newer image loads',
    async (event) => {
      const drawImage = jest.spyOn(CanvasRenderingContext2D.prototype, 'drawImage');
      const fillText = jest.spyOn(CanvasRenderingContext2D.prototype, 'fillText');
      const { container, rerender } = render(
        <Watermark image="old.svg" width={100} rotate={0} content="old fallback" />,
      );
      const oldImage = images[0];
      rerender(<Watermark image="new.svg" width={200} rotate={0} content="new fallback" />);
      const newImage = images[images.length - 1];

      act(() => newImage.dispatchEvent(new Event('load')));
      expect(container.querySelector('[style*="background-image"]')).toHaveStyle({
        backgroundSize: '600px',
      });
      drawImage.mockClear();
      fillText.mockClear();

      act(() => oldImage.dispatchEvent(new Event(event)));
      await waitFakeTimer();

      expect(drawImage).not.toHaveBeenCalled();
      expect(fillText).not.toHaveBeenCalled();
      expect(container.querySelector('[style*="background-image"]')).toHaveStyle({
        backgroundSize: '600px',
      });
    },
  );

  it('still draws the latest image when the old image finishes first', () => {
    const drawImage = jest.spyOn(CanvasRenderingContext2D.prototype, 'drawImage');
    const { container, rerender } = render(<Watermark image="old.svg" width={100} rotate={0} />);
    const oldImage = images[0];
    rerender(<Watermark image="new.svg" width={200} rotate={0} />);
    const newImage = images[images.length - 1];

    act(() => oldImage.dispatchEvent(new Event('load')));
    expect(drawImage).not.toHaveBeenCalled();
    act(() => newImage.dispatchEvent(new Event('load')));
    expect(drawImage).toHaveBeenCalledWith(newImage, 0, 0, 200, 64);
    expect(container.querySelector('[style*="background-image"]')).toHaveStyle({
      backgroundSize: '600px',
    });
  });

  it('keeps text when a previous image finishes loading', async () => {
    const drawImage = jest.spyOn(CanvasRenderingContext2D.prototype, 'drawImage');
    const { container, rerender } = render(<Watermark image="old.svg" width={100} rotate={0} />);
    const oldImage = images[0];
    rerender(<Watermark content="latest text" width={200} rotate={0} />);
    drawImage.mockClear();

    act(() => oldImage.dispatchEvent(new Event('load')));
    await waitFakeTimer();

    expect(drawImage).not.toHaveBeenCalled();
    expect(container.querySelector('[style*="background-image"]')).toHaveStyle({
      backgroundSize: '600px',
    });
  });

  it.each(['load', 'error'] as const)('does not draw on image %s after unmount', (event) => {
    const drawImage = jest.spyOn(CanvasRenderingContext2D.prototype, 'drawImage');
    const fillText = jest.spyOn(CanvasRenderingContext2D.prototype, 'fillText');
    const { unmount } = render(<Watermark image="pending.svg" content="fallback" />);
    const pendingImage = images[0];
    unmount();

    act(() => pendingImage.dispatchEvent(new Event(event)));
    expect(drawImage).not.toHaveBeenCalled();
    expect(fillText).not.toHaveBeenCalled();
  });
});
