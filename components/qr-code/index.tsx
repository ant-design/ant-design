import type { CSSProperties, FC } from 'react';
import { useEffect, useState } from 'react';
import React from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { ReloadOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { noop } from 'lodash';
import classNames from 'classnames';

import { QRCODE, CLICK_REFRESH } from './constants';
import useStyle from './style/index';
import getPrefixCls from '../_util/getPrefixCls';

/**
 * 统计数据组件的基础 props 类型定义
 */
export interface QrCodeBaseProps {
  /**
   * @description 附加样式
   * @ignore
   */
  style?: CSSProperties;
  /**
   * @description 类名
   * @ignore
   */
  className?: string;
  /**
   * @description 自定义 CSS classname 前缀
   * @ignore
   */
  prefixCls?: string;
}

/**
 * 统计数据组件列表的 props 类型定义
 */
export interface QrCodeProps extends QrCodeBaseProps {
  /**
   * @title 渲染模式
   * @description 二维码渲染模式
   * @default "svg"
   */
  mode?: 'canvas' | 'svg' | string;
  /**
   * @title 二维码地址
   * @description 扫描后的地址
   */
  value: string;
  /**
   * @title 二维码图片大小
   * @description 二维码图片大小
   * @default "128"
   */
  size?: number;
  /**
   * @title 背景颜色
   * @description 二维码背景颜色
   * @default "#FFFFFF"
   */
  bgColor?: string;
  /**
   * @title 前景颜色
   * @description 二维码前景颜色
   * @default 	"#000000"
   */
  fgColor?: string;
  /**
   * @title Logo 图片地址
   * @description 二维码中图片的地址（目前只支持图片地址）
   */
  logo?: string;
  /**
   * @title Logo 图片大小
   * @description 二维码中 logo 大小
   * @default "32"
   */
  logoSize?: number;
  /**
   * @title 展现气泡卡片
   * @description 是否展现气泡卡片
   * @default false
   */
  popover?: boolean;
  /**
   * @title 点击刷新的回调
   * @description 点击刷新的回调
   */
  onRefresh?: React.MouseEventHandler<HTMLElement>;
  /**
   * @title 是否过期
   * @description 是否过期
   * @default false
   */
  expired?: boolean;
  /**
   * @title 纠错级别
   * @description 纠错级别
   * @default "L"
   */
  errorLevel?: 'L' | 'M' | 'Q' | 'H' | string;
}

const QRCode: FC<QrCodeProps> = ({
  mode = 'canvas',
  value = '',
  logo = '',
  size = 128,
  bgColor = '#FFFFFF',
  fgColor = '#000000',
  logoSize = 32,
  popover = false,
  errorLevel = 'L',
  onRefresh = noop,
  style,
  className,
  prefixCls: p,
  expired = false,
}) => {
  const prefixCls = getPrefixCls('qrcode', p);
  const { hashId, wrapSSR } = useStyle(prefixCls);

  const [qrCodeProps, setQrCodeProps] = useState<any>({});
  useEffect(() => {
    const imageSettingsProps = {
      src: logo,
      x: undefined,
      y: undefined,
      height: logoSize ? logoSize : 24,
      width: logoSize ? logoSize : 24,
      excavate: true,
    };
    setQrCodeProps({
      value: value,
      imageSettings: logo ? { ...imageSettingsProps } : null,
      size: size,
      level: errorLevel,
      bgColor: bgColor,
      fgColor: fgColor,
      ke: value,
    });
  }, [bgColor, errorLevel, fgColor, logo, logoSize, size, value]);

  if (!value) return null;

  const qrcode =
    mode === 'svg' ? <QRCodeSVG {...qrCodeProps} /> : <QRCodeCanvas {...qrCodeProps} />;

  if (popover) {
    return (
      <Popover trigger="hover" content={qrcode}>
        <img src={logo} alt="qrcode" width={logoSize} />
      </Popover>
    );
  }
  return wrapSSR(
    <div
      className={classNames(prefixCls, className, hashId)}
      style={{ width: size, height: size, ...style }}
    >
      {expired && (
        <div className={`${prefixCls}-mask ${hashId}`} style={{ width: size, height: size }}>
          <span className={`${prefixCls}-icon  ${hashId}`}>
            <ReloadOutlined
              className={`${prefixCls}-icon ${hashId}`}
              style={{ marginBlockStart: size / 4 }}
              onClick={onRefresh}
            />
          </span>
          <div>{QRCODE}</div>
          <div>{CLICK_REFRESH}</div>
        </div>
      )}
      {qrcode}
    </div>,
  );
};
export default QRCode;
