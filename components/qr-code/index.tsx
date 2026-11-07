import React from 'react';
import { QRCodeCanvas, QRCodeSVG } from '@rc-component/qrcode';
import { omit, pickAttrs } from '@rc-component/util';
import { clsx } from 'clsx';

import { useMergeSemantic, useSemanticRootStyle } from '../_util/hooks/useMergeSemantic';
import { isNumber } from '../_util/is';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import { useLocale } from '../locale';
import { useToken } from '../theme/internal';
import type {
  QRCodeProps,
  QRCodeSemanticAllType,
  QRProps,
  QRPropsCanvas,
  QRPropsSvg,
} from './interface';
import QRcodeStatus from './QrcodeStatus';
import useStyle from './style/index';

export type { QRCodeProps, QRProps, QRPropsCanvas, QRPropsSvg };

export interface QRCodeRef {
  nativeElement: HTMLDivElement;
}

const QRCode = React.forwardRef<QRCodeRef, QRCodeProps>((props, ref) => {
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

  const contextStyleRoot = useSemanticRootStyle(contextStyle);
  const styleRoot = useSemanticRootStyle(style);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    QRCodeSemanticAllType['classNames'],
    QRCodeSemanticAllType['styles'],
    QRCodeProps
  >([contextClassNames, classNames], [contextStyles, contextStyleRoot, styles, styleRoot], {
    props: mergedProps,
  });

  const prefixCls = getPrefixCls('qrcode', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const imageSettings: QRProps['imageSettings'] = {
    src: icon,
    x: undefined,
    y: undefined,
    height: isNumber(iconSize) ? iconSize : (iconSize?.height ?? 40),
    width: isNumber(iconSize) ? iconSize : (iconSize?.width ?? 40),
    excavate: true,
    crossOrigin: 'anonymous',
  };

  const a11yProps: React.AriaAttributes = pickAttrs(rest, true);

  const restProps = omit<React.HTMLAttributes<HTMLDivElement>, keyof React.AriaAttributes>(
    rest,
    Object.keys(a11yProps) as (keyof React.AriaAttributes)[],
  );

  // `value` also accepts several segments, which are encoded as one concatenated payload.
  const encodedText = Array.isArray(value) ? value.join('') : value;

  // The code itself is rendered with `role="img"`, which requires an accessible name.
  // Fall back to the encoded text when the caller supplies neither `aria-label` nor
  // `aria-labelledby`, so a QRCode is never announced as an unnamed image.
  // `pickAttrs` keeps an ARIA key even when its value is `undefined`, which is a common
  // shape for an optional prop, so check the resolved value instead of the key.
  const hasA11yLabel = !!(a11yProps['aria-label'] || a11yProps['aria-labelledby']);

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
    // Applied last so it also wins over an `aria-label` that was explicitly `undefined`.
    ...(hasA11yLabel ? undefined : { 'aria-label': encodedText }),
  };

  const [locale] = useLocale('QRCode');

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('QRCode');

    warning(!!encodedText, 'usage', 'need to receive `value` props');

    warning(
      !(icon && errorLevel === 'L'),
      'usage',
      'ErrorLevel `L` is not recommended to be used with `icon`, for scanning result would be affected by low level.',
    );
  }

  const nativeElementRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: nativeElementRef.current!,
  }));

  // An empty payload cannot carry an accessible name, and `value=""` already renders
  // nothing, so treat `[]` and `['']` the same way instead of emitting a nameless
  // `role="img"` element.
  if (!encodedText) {
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
    width: style?.width ?? size,
    height: style?.height ?? size,
  };

  return (
    <div ref={nativeElementRef} {...restProps} className={rootClassNames} style={rootStyle}>
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
});

if (process.env.NODE_ENV !== 'production') {
  QRCode.displayName = 'QRCode';
}

export default QRCode;
