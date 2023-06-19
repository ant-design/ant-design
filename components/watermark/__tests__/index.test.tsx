import React from 'react';
import Watermark from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, waitFakeTimer, waitFor } from '../../../tests/utils';

describe('Watermark', () => {
  mountTest(Watermark);
  rtlTest(Watermark);

  const mockSrcSet = jest.spyOn(Image.prototype, 'src', 'set');

  beforeAll(() => {
    mockSrcSet.mockImplementation(function fn() {
      this.onload?.();
    });
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
    expect(target?.style.backgroundSize).toBe('600px');
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
    await waitFor(() => expect(target).toBeTruthy());
    expect(container).toMatchSnapshot();
  });

  it('Observe the modification of style', async () => {
    const { container } = render(
      <Watermark offset={[-200, -200]} className="watermark" content="MutationObserver" />,
    );
    const target = container.querySelector<HTMLDivElement>('.watermark div');
    await waitFakeTimer();
    target?.setAttribute('style', '');
    await waitFor(() => expect(target).toBeTruthy());
    expect(container).toMatchSnapshot();
  });
});
