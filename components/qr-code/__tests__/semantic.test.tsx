import React from 'react';

import QRCode from '..';
import { render } from '../../../tests/utils';

describe('QRCode.Semantic', () => {
  it('should apply custom styles to QRCode', () => {
    const customClassNames = {
      root: 'custom-root',
      cover: 'custom-cover',
    };

    const customStyles = {
      root: { color: 'red' },
      cover: { color: 'blue' },
    };

    const { container } = render(
      <QRCode classNames={customClassNames} styles={customStyles} value="antd" status="loading" />,
    );

    const QRCodeElement = container.querySelector('.ant-qrcode') as HTMLElement;
    const QRCodeCoverElement = container.querySelector('.ant-qrcode-cover') as HTMLElement;

    // check classNames
    expect(QRCodeElement).toHaveClass('custom-root');
    expect(QRCodeCoverElement).toHaveClass('custom-cover');

    // check styles
    expect(QRCodeElement.style.color).toBe('red');
    expect(QRCodeCoverElement.style.color).toBe('blue');
  });

  it('support classNames and styles as functions', () => {
    const { container } = render(
      <QRCode
        value="test"
        size={160}
        type="svg"
        bordered={true}
        status="expired"
        onRefresh={() => {}}
        classNames={(info) => ({
          root: info.props.type === 'svg' ? 'svg-qrcode' : 'canvas-qrcode',
          cover: `cover-${info.props.status}`,
        })}
        styles={(info) => ({
          root: {
            backgroundColor: info.props.type === 'svg' ? 'lightgreen' : 'lightcoral',
            borderRadius: info.props.size && info.props.size > 120 ? '8px' : '4px',
          },
          cover: {
            backgroundColor:
              info.props.status === 'expired' ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 255, 0, 0.8)',
            color: 'white',
          },
        })}
      />,
    );

    const qrcode = container.querySelector('.ant-qrcode');
    const cover = container.querySelector('.ant-qrcode-cover');

    expect(qrcode).toHaveClass('svg-qrcode');
    expect(cover).toHaveClass('cover-expired');

    expect(qrcode).toHaveAttribute('style');
    const rootStyle = qrcode?.getAttribute('style');
    expect(rootStyle).toContain('background-color: lightgreen');
    expect(rootStyle).toContain('border-radius: 8px');

    expect(cover).toHaveAttribute('style');
    const coverStyle = cover?.getAttribute('style');
    expect(coverStyle).toContain('background-color: rgba(255, 0, 0, 0.8)');
    expect(coverStyle).toContain('color: white');
  });
});
