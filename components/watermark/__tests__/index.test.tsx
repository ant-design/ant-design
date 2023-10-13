import React from 'react';

import Watermark from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, waitFakeTimer } from '../../../tests/utils';
import Drawer from '../../drawer';
import Modal from '../../modal';

describe('Watermark', () => {
  mountTest(Watermark);
  rtlTest(Watermark);

  const mockSrcSet = jest.spyOn(Image.prototype, 'src', 'set');

  beforeAll(() => {
    mockSrcSet.mockImplementation(function fn() {
      this.onload?.();
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    mockSrcSet.mockRestore();
  });

  afterEach(() => {
    jest.useRealTimers();
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
    expect(target?.style.left).toBe('150px');
    expect(target?.style.top).toBe('150px');
    expect(target?.style.width).toBe('calc(100% - 150px)');
    expect(target?.style.height).toBe('calc(100% - 150px)');
    expect(container).toMatchSnapshot();
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
    expect(target?.style.backgroundSize).toBe('720px');
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
      this.onerror?.();
    });
    const { container } = render(
      <Watermark className="watermark" content="Ant Design" image="https://test.svg" />,
    );
    expect(container.querySelector('.watermark div')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('MutationObserver should work properly', async () => {
    const { container } = render(<Watermark className="watermark" content="MutationObserver" />);
    const target = container.querySelector<HTMLDivElement>('.watermark div');
    await waitFakeTimer();
    target?.remove();
    await waitFakeTimer();
    expect(container).toMatchSnapshot();
  });

  it('Observe the modification of style', async () => {
    const { container } = render(
      <Watermark offset={[-200, -200]} className="watermark" content="MutationObserver" />,
    );
    const target = container.querySelector<HTMLDivElement>('.watermark div');
    await waitFakeTimer();
    target?.setAttribute('style', '');
    await waitFakeTimer();
    expect(container).toMatchSnapshot();
  });

  describe('nest component', () => {
    function test(name: string, children: React.ReactNode, getWatermarkElement: () => Node) {
      it(name, async () => {
        const { rerender } = render(<Watermark className="test">{children}</Watermark>);
        await waitFakeTimer();

        const watermark = getWatermarkElement();

        expect(watermark).toHaveStyle({
          zIndex: '9',
        });

        // Not crash when children removed
        rerender(<Watermark className="test" />);
      });
    }

    test(
      'Modal',
      <Modal open />,
      () => document.body.querySelector('.ant-modal-content')!.lastChild!,
    );

    test(
      'Drawer',
      <Drawer open />,
      () => document.body.querySelector('.ant-drawer-content')!.lastChild!,
    );

    it('inherit = false', async () => {
      render(
        <Watermark inherit={false}>
          <Drawer open />
        </Watermark>,
      );
      await waitFakeTimer();

      expect(document.body.querySelector('.ant-drawer-content')!.lastChild).toHaveClass(
        'ant-drawer-wrapper-body',
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
});
