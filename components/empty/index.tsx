import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultEmptyImg from './empty.svg';
import simpleEmptyImg from './simple.svg';

export interface TransferLocale {
  description: string;
}

export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * @since 3.16.0
   */
  imageStyle?: React.CSSProperties;
  image?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

const OriginEmpty: React.SFC<EmptyProps> = (props: EmptyProps) => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        className,
        prefixCls: customizePrefixCls,
        image = defaultEmptyImg,
        description,
        children,
        imageStyle,
        ...restProps
      } = props;

      return (
        <LocaleReceiver componentName="Empty">
          {(locale: TransferLocale) => {
            const prefixCls = getPrefixCls('empty', customizePrefixCls);
            const des = description || locale.description;
            const alt = typeof des === 'string' ? des : 'empty';

            let imageNode: React.ReactNode = null;

            if (typeof image === 'string') {
              imageNode = <img alt={alt} src={image} />;
            } else {
              imageNode = image;
            }

            return (
              <div className={classNames(prefixCls, className)} {...restProps}>
                <div className={`${prefixCls}-image`} style={imageStyle}>
                  {imageNode}
                </div>

                <p className={`${prefixCls}-description`}>{des}</p>

                {children && <div className={`${prefixCls}-footer`}>{children}</div>}
              </div>
            );
          }}
        </LocaleReceiver>
      );
    }}
  </ConfigConsumer>
);

type EmptyType = typeof OriginEmpty & {
  PRESENTED_IMAGE_DEFAULT: string;
  PRESENTED_IMAGE_SIMPLE: string;
};

const Empty: EmptyType = OriginEmpty as EmptyType;
Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

export default Empty;
