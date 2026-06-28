import React from 'react';
import { spyElementPrototypes } from '@rc-component/util';
import { vi } from 'vitest';

import Watermark from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, waitFakeTimer } from '../../../tests/utils';
import Drawer from '../../drawer';
import Modal from '../../modal';

describe('Watermark', () => {
  mountTest(Watermark);
  rtlTest(Watermark);

  const mockSrcSet = vi.spyOn(Image.prototype, 'src', 'set');

  beforeAll(() => {
    mockSrcSet.mockImplementation(function fn() {
      // @ts-ignore
      this.onload?.();
    });
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  afterAll(() => {
    mockSrcSet.mockRestore();
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
    const fillText = vi.spyOn(CanvasRenderingContext2D.prototype, 'fillText');
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
            { text: 'Ant Design', font: { fontSize: 20, fontWeight: 'bold' } },
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
          'normal normal bold 20px sans-serif',
          'italic normal normal 12px serif',
          'normal normal normal 16px monospace',
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
    const spy = vi.spyOn(CanvasRenderingContext2D.prototype, 'drawImage');
    render(<Watermark content="" className="watermark" />);
    await waitFakeTimer();
    expect(spy).not.toHaveBeenCalledWith(expect.anything(), 0, 0);
    expect(spy).not.toHaveBeenCalledWith(expect.anything(), -0, 0);
    expect(spy).not.toHaveBeenCalledWith(expect.anything(), -0, -0);
    expect(spy).not.toHaveBeenCalledWith(expect.anything(), 0, -0);
    spy.mockRestore();
  });

  it('should call onRemove when watermark is hard removed', async () => {
    const onRemove = vi.fn();
    const { container } = render(<Watermark content="Ant" onRemove={onRemove} />);
    await waitFakeTimer();

    const watermarkEle = container.querySelector<HTMLDivElement>('[style*="background-image"]');
    watermarkEle?.remove();
    await waitFakeTimer();

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('should not call onRemove when unmount', async () => {
    const onRemove = vi.fn();
    const { unmount } = render(<Watermark content="Ant" onRemove={onRemove} />);
    await waitFakeTimer();
    unmount();
    await waitFakeTimer();
    expect(onRemove).not.toHaveBeenCalled();
  });
});
