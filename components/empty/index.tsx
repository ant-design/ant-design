import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import emptyImg from './empty.svg';

export interface TransferLocale {
  description: string;
}
export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  image?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

const Empty: React.SFC<EmptyProps> = (props: EmptyProps) => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const { className, image, description, children, ...restProps } = props;
      const prefixCls = getPrefixCls('empty', props.prefixCls);

      return (
        <LocaleReceiver componentName="Empty">
          {(locale: TransferLocale) => {
            const des = description || locale.description;
            const alt = typeof des === 'string' ? des : 'empty';

            let imageNode: React.ReactNode = null;
            if (!image) {
              imageNode = <img alt={alt} src={emptyImg} />;
            } else if (typeof image === 'string') {
              imageNode = <img alt={alt} src={image} />;
            } else {
              imageNode = image;
            }

            return (
              <div className={classNames(prefixCls, className)} {...restProps}>
                <div className={`${prefixCls}-image`}>{imageNode}</div>

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
