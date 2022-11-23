import React from 'react';
import QrCode from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('QrCode test', () => {
  mountTest(QrCode);
  rtlTest(QrCode);
  it('should correct render ', () => {
    const { container } = render(<QrCode value="test" />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should render `null` when value not exist', () => {
    const { container } = render(<QrCode value={undefined as unknown as string} />);
    expect(container.firstChild).toBe(null);
  });

  it('support icon', () => {
    const { container } = render(<QrCode value="test" icon="test" />);
    expect(container.querySelector<HTMLImageElement>('img')).toBeTruthy();
  });
  it('support size', () => {
    const { container } = render(<QrCode value="test" size={100} />);
    const wapper = container.querySelector<HTMLDivElement>('.ant-qrcode');
    expect(wapper?.style?.width).toBe('100px');
    expect(wapper?.style?.height).toBe('100px');
  });
});
