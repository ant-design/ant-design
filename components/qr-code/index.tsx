import React from 'react';
import { QRCodeCanvas, QRCodeSVG } from '@rc-component/qrcode';
import { omit } from '@rc-component/util';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import { useLocale } from '../locale';
import { useToken } from '../theme/internal';
import type { QRCodeProps, QRProps, QRPropsCanvas, QRPropsSvg } from './interface';
import QRcodeStatus from './QrcodeStatus';
import useStyle from './style/index';

export type { QRCodeProps, QRProps, QRPropsCanvas, QRPropsSvg };

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
    marginSize,
    statusRender,
    classNames,
    styles,
    boostLevel /* 👈 5.28.0+ */,
    ...rest
  } = props;

  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('qrcode');

  // =========== Merged Props for Semantic ===========
  const mergedProps: QRCodeProps = {
    ...props,
    bgColor,
    type,
    size,
    status,
    bordered,
    errorLevel,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      props: mergedProps,
    },
  );

  const prefixCls = getPrefixCls('qrcode', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

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
    marginSize,
    boostLevel,
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

  const rootClassNames = clsx(
    prefixCls,
    className,
    rootClassName,
    hashId,
    cssVarCls,
    contextClassName,
    mergedClassNames.root,
    {
      [`${prefixCls}-borderless`]: !bordered,
    },
  );

  const rootStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    ...mergedStyles.root,
    ...contextStyle,
    ...style,
    width: style?.width ?? size,
    height: style?.height ?? size,
  };

  return (
    <div {...restProps} className={rootClassNames} style={rootStyle}>
      {status !== 'active' && (
        <div
          className={clsx(`${prefixCls}-cover`, mergedClassNames.cover)}
          style={mergedStyles.cover}
        >
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
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  QRCode.displayName = 'QRCode';
}

export default QRCode;
