import React from 'react';
import Watermark from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('Watermark', () => {
  mountTest(Watermark);
  rtlTest(Watermark);

  const mockSrcSet = jest.spyOn(Image.prototype, 'src', 'set');

  beforeAll(() => {
    mockSrcSet.mockImplementation(function fn() {
      if (this.onload) {
        this.onload();
      }
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
    const target = container.querySelector('.watermark div') as HTMLDivElement;
    expect(target.style.left).toBe('100px');
    expect(target.style.top).toBe('100px');
    expect(target.style.width).toBe('calc(100% - 100px)');
    expect(target.style.height).toBe('calc(100% - 100px)');
    expect(container).toMatchSnapshot();
  });

  it('Image watermark snapshot', () => {
    const { container } = render(
      <Watermark image="https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-4fc5-93a0-2645f64a3aca.svg" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('MutationObserver should work properly', () => {
    const { container } = render(<Watermark className="watermark" content="MutationObserver" />);
    const target = container.querySelector('.watermark div') as HTMLDivElement;
    target.remove();
    expect(container).toMatchSnapshot();
  });

  it('Observe the modification of style', () => {
    const { container } = render(
      <Watermark offset={[-200, -200]} className="watermark" content="MutationObserver" />,
    );
    const target = container.querySelector('.watermark div') as HTMLDivElement;
    target.setAttribute('style', '');
    expect(container).toMatchSnapshot();
  });
});
