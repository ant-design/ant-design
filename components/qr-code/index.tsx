import React, { useContext } from 'react';
import ReloadOutlined from '@ant-design/icons/ReloadOutlined';
import classNames from 'classnames';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';

import { devUseWarning } from '../_util/warning';
import Button from '../button';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import { useLocale } from '../locale';
import Spin from '../spin';
import { useToken } from '../theme/internal';
import type { QRCodeProps, QRProps } from './interface';
import useStyle from './style/index';

const QRCode: React.FC<QRCodeProps> = (props) => {
  const [, token] = useToken();
  const {
    value,
    type = 'canvas',
    icon = '',
    size = 160,
    iconSize = 40,
    color = token.colorText,
    errorLevel = 'M',
    status = 'active',
    bordered = true,
    onRefresh,
    style,
    className,
    rootClassName,
    prefixCls: customizePrefixCls,
    bgColor = 'transparent',
  } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('qrcode', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const imageSettings: QRProps['imageSettings'] = {
    src: icon,
    x: undefined,
    y: undefined,
    height: iconSize,
    width: iconSize,
    excavate: true,
  };

  const qrCodeProps = {
    value,
    size: size - (token.paddingSM + token.lineWidth) * 2,
    level: errorLevel,
    bgColor,
    fgColor: color,
    imageSettings: icon ? imageSettings : undefined,
  };

  const [locale] = useLocale('QRCode');

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('QRCode');

    warning(!!value, 'usage', 'need to receive `value` props');

    warning(
      !(icon && errorLevel === 'L'),
      'usage',
      'ErrorLevel `L` is not recommended to be used with `icon`, for scanning result would be affected by low level.',
    );
  }

  if (!value) {
    return null;
  }

  const cls = classNames(prefixCls, className, rootClassName, hashId, {
    [`${prefixCls}-borderless`]: !bordered,
  });

  return wrapSSR(
    <div style={{ ...style, width: size, height: size, backgroundColor: bgColor }} className={cls}>
      {status !== 'active' && (
        <div className={`${prefixCls}-mask`}>
          {status === 'loading' && <Spin />}
          {status === 'expired' && (
            <>
              <p className={`${prefixCls}-expired`}>{locale?.expired}</p>
              {onRefresh && (
                <Button type="link" icon={<ReloadOutlined />} onClick={onRefresh}>
                  {locale?.refresh}
                </Button>
              )}
            </>
          )}
        </div>
      )}
      {type === 'canvas' ? <QRCodeCanvas {...qrCodeProps} /> : <QRCodeSVG {...qrCodeProps} />}
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  QRCode.displayName = 'QRCode';
}

export default QRCode;
