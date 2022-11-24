import React from 'react';
import QRCode from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('QRCode test', () => {
  mountTest(QRCode);
  rtlTest(QRCode);
  it('should correct render ', () => {
    const { container } = render(<QRCode value="test" />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should render `null` when value not exist', () => {
    const { container } = render(<QRCode value={undefined as unknown as string} />);
    expect(container.firstChild).toBe(null);
  });

  it('support icon', () => {
    const { container } = render(<QRCode value="test" icon="test" />);
    expect(container.querySelector<HTMLImageElement>('img')).toBeTruthy();
  });
  it('support size', () => {
    const { container } = render(<QRCode value="test" size={100} />);
    const wapper = container.querySelector<HTMLDivElement>('.ant-qrcode');
    expect(wapper?.style?.width).toBe('100px');
    expect(wapper?.style?.height).toBe('100px');
  });
});
