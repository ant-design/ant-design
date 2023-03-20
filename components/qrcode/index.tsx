import { ReloadOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { QRCodeCanvas } from 'qrcode.react';
import React, { useContext, useMemo } from 'react';
import Button from '../button';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useLocale from '../locale/useLocale';
import Spin from '../spin';
import theme from '../theme';
import warning from '../_util/warning';
import type { QRCodeProps, QRPropsCanvas } from './interface';
import useStyle from './style/index';

const { useToken } = theme;

const QRCode: React.FC<QRCodeProps> = (props) => {
  const {
    value,
    icon = '',
    size = 160,
    iconSize = 40,
    color = '#000',
    errorLevel = 'M',
    status = 'active',
    bordered = true,
    onRefresh,
    style,
    className,
    rootClassName,
    prefixCls: customizePrefixCls,
  } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('qrcode', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { token } = useToken();
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
      size: size - (token.paddingSM + token.lineWidth) * 2,
      level: errorLevel,
      bgColor: 'transparent',
      fgColor: color,
      imageSettings: icon ? imageSettings : undefined,
    };
  }, [errorLevel, color, icon, iconSize, size, value]);

  const [locale] = useLocale('QRCode');

  if (!value) {
    if (process.env.NODE_ENV !== 'production') {
      warning(false, 'QRCode', 'need to receive `value` props');
    }
    return null;
  }

  if (process.env.NODE_ENV !== 'production') {
    warning(
      !(icon && errorLevel === 'L'),
      'QRCode',
      'ErrorLevel `L` is not recommended to be used with `icon`, for scanning result would be affected by low level.',
    );
  }

  const cls = classNames(prefixCls, className, rootClassName, hashId, {
    [`${prefixCls}-borderless`]: !bordered,
  });

  return wrapSSR(
    <div style={{ ...style, width: size, height: size }} className={cls}>
      {status !== 'active' && (
        <div className={`${prefixCls}-mask`}>
          {status === 'loading' && <Spin />}
          {status === 'expired' && (
            <>
              <p className={`${prefixCls}-expired`}>{locale?.expired}</p>
              {typeof onRefresh === 'function' && (
                <Button type="link" icon={<ReloadOutlined />} onClick={onRefresh}>
                  {locale?.refresh}
                </Button>
              )}
            </>
          )}
        </div>
      )}
      <QRCodeCanvas {...qrCodeProps} />
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  QRCode.displayName = 'QRCode';
}

export default QRCode;
