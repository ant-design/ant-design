import React, { useMemo, useContext } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import classNames from 'classnames';
import { ReloadOutlined } from '@ant-design/icons';
import { ConfigContext } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import type { ConfigConsumerProps } from '../config-provider';
import type { QRCodeProps, QRPropsCanvas } from './interface';
import warning from '../_util/warning';
import useStyle from './style/index';
import Spin from '../spin';
import Button from '../button';

const QRCode: React.FC<QRCodeProps> = (props) => {
  const {
    value,
    icon = '',
    size = 160,
    iconSize = 40,
    color = '#000',
    errorLevel = 'M',
    status = 'active',
    onRefresh,
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
      size: size - 20, // 两边各留10px
      level: errorLevel,
      bgColor: 'transparent',
      fgColor: color,
      imageSettings: icon ? imageSettings : undefined,
    };
  }, [errorLevel, color, icon, iconSize, size, value]);

  if (!value) {
    if (process.env.NODE_ENV !== 'production') {
      warning(false, 'QRCode', 'need to receive `value` props');
    }
    return null;
  }

  return wrapSSR(
    <LocaleReceiver componentName="QRCode">
      {(locale) => (
        <div
          style={{ ...style, width: size, height: size }}
          className={classNames(prefixCls, className, hashId)}
        >
          {status !== 'active' && (
            <div className={classNames(`${prefixCls}-mask`)}>
              {status === 'loading' && <Spin />}
              {status === 'expired' && (
                <>
                  <p>{locale.expired}</p>
                  {typeof onRefresh === 'function' && (
                    <Button type="link" icon={<ReloadOutlined />} onClick={onRefresh}>
                      {locale.refresh}
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
          <QRCodeCanvas {...qrCodeProps} />
        </div>
      )}
    </LocaleReceiver>,
  );
};

export default QRCode;
