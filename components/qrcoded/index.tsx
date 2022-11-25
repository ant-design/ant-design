import React, { useMemo, useContext } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import type { QRCodeProps, QRPropsCanvas } from './interface';
import useStyle from './style/index';

const QRCode: React.FC<QRCodeProps> = (props) => {
  const {
    value,
    icon = '',
    size = 128,
    bgColor = '#fff',
    fgColor = '#000',
    iconSize = 32,
    errorLevel = 'M',
    style,
    className,
    prefixCls: customizePrefixCls,
  } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('qrcode', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const qrCodeProps = useMemo<QRPropsCanvas>(() => {
    const imageSettings: QRCodeProps['imageSettings'] = {
      src: icon,
      x: undefined,
      y: undefined,
      height: iconSize,
      width: iconSize,
      excavate: true,
    };
    return {
      value,
      size,
      level: errorLevel,
      bgColor,
      fgColor,
      imageSettings: icon ? imageSettings : undefined,
    };
  }, [bgColor, errorLevel, fgColor, icon, iconSize, size, value]);

  if (!value) {
    return null;
  }

  return wrapSSR(
    <div
      style={{ ...style, width: size, height: size }}
      className={classNames(prefixCls, className, hashId)}
    >
      <QRCodeCanvas {...qrCodeProps} />
    </div>,
  );
};

export default QRCode;
