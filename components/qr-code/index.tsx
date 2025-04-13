import React, { useContext } from 'react';
import { QRCodeCanvas, QRCodeSVG } from '@rc-component/qrcode';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import pickAttrs from 'rc-util/lib/pickAttrs';

import { devUseWarning } from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import { useLocale } from '../locale';
import { useToken } from '../theme/internal';
import type { QRCodeProps, QRProps } from './interface';
import QRcodeStatus from './QrcodeStatus';
import useStyle from './style/index';

const QRCode: React.FC<QRCodeProps> = (props) => {
  const [, token] = useToken();
  const {
    value,
    type = 'canvas',
    icon = '',
    size = 160,
    iconSize,
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
    statusRender,
    ...rest
  } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('qrcode', customizePrefixCls);

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const imageSettings: QRProps['imageSettings'] = {
    src: icon,
    x: undefined,
    y: undefined,
    height: typeof iconSize === 'number' ? iconSize : (iconSize?.height ?? 40),
    width: typeof iconSize === 'number' ? iconSize : (iconSize?.width ?? 40),
    excavate: true,
    crossOrigin: 'anonymous',
  };

  const a11yProps = pickAttrs(rest, true);

  const restProps = omit<React.HTMLAttributes<HTMLDivElement>, keyof React.AriaAttributes>(
    rest,
    Object.keys(a11yProps) as (keyof React.AriaAttributes)[],
  );

  const qrCodeProps = {
    value,
    size,
    level: errorLevel,
    bgColor,
    fgColor: color,
    style: { width: style?.width, height: style?.height },
    imageSettings: icon ? imageSettings : undefined,
    ...a11yProps,
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

  const mergedCls = classNames(prefixCls, className, rootClassName, hashId, cssVarCls, {
    [`${prefixCls}-borderless`]: !bordered,
  });

  const mergedStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    ...style,
    width: style?.width ?? size,
    height: style?.height ?? size,
  };

  return wrapCSSVar(
    <div {...restProps} className={mergedCls} style={mergedStyle}>
      {status !== 'active' && (
        <div className={`${prefixCls}-mask`}>
          <QRcodeStatus
            prefixCls={prefixCls}
            locale={locale}
            status={status}
            onRefresh={onRefresh}
            statusRender={statusRender}
          />
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
