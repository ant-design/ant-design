import React from 'react';
import QRCode from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('QRCode test', () => {
  mountTest(QRCode);
  rtlTest(QRCode);

  it('should correct render', () => {
    const { container } = render(<QRCode value="test" />);
    expect(
      container
        ?.querySelector<HTMLDivElement>('.ant-qrcode')
        ?.querySelector<HTMLCanvasElement>('canvas'),
    ).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should render `null` and console Error when value not exist', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<QRCode value={undefined as unknown as string} />);
    expect(container.firstChild).toBe(null);
    expect(container.firstChild).toMatchSnapshot();
    expect(errSpy).toHaveBeenCalledWith('Warning: [antd: QRCode] need to receive `value` props');
    errSpy.mockRestore();
  });

  it('support custom icon', () => {
    const { container } = render(<QRCode value="test" icon="test" />);
    expect(
      container
        ?.querySelector<HTMLDivElement>('.ant-qrcode')
        ?.querySelector<HTMLImageElement>('img'),
    ).toBeTruthy();
  });

  it('support custom size', () => {
    const { container } = render(<QRCode value="test" size={100} />);
    const wapper = container.querySelector<HTMLDivElement>('.ant-qrcode');
    expect(wapper?.style?.width).toBe('100px');
    expect(wapper?.style?.height).toBe('100px');
  });
});
