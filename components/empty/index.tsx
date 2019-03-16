import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultEmptyImg from './empty.svg';
import simpleEmptyImg from './simple.svg';

export interface TransferLocale {
  description: string;
}

type ImageMode = 'default' | 'simple' | React.ReactNode;
export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  image?: ImageMode;
  description?: React.ReactNode;
  /**
   * @since 3.16.0
   */
  imageSize?: number;
  children?: React.ReactNode;
}

const Empty: React.SFC<EmptyProps> = (props: EmptyProps) => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        className,
        prefixCls: customizePrefixCls,
        image = 'default',
        description,
        imageSize,
        children,
        ...restProps
      } = props;
      const prefixCls = getPrefixCls('empty', customizePrefixCls);

      return (
        <LocaleReceiver componentName="Empty">
          {(locale: TransferLocale) => {
            const des = description || locale.description;
            const alt = typeof des === 'string' ? des : 'empty';

            let imageNode: React.ReactNode = null;
            if (typeof image === 'string') {
              switch (image) {
                case 'default': {
                  imageNode = <img alt={alt} src={defaultEmptyImg} />;
                  break;
                }
                case 'simple': {
                  imageNode = <img alt={alt} src={simpleEmptyImg} />;
                  break;
                }
                default: {
                  imageNode = <img alt={alt} src={image} />;
                }
              }
            } else {
              imageNode = image;
            }

            return (
              <div className={classNames(prefixCls, className)} {...restProps}>
                <div
                  style={imageSize ? { height: `${imageSize}px` } : undefined}
                  className={`${prefixCls}-image`}
                >
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

export default Empty;
